import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface DnaVisualizationCanvasProps {
  strandCount: number;
}

export default function DnaVisualizationCanvas({ strandCount }: DnaVisualizationCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(true); // Ref to access latest state in animation loop
  
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    dnaGroup: THREE.Group;
    controls: OrbitControls;
    animationId: number;
  } | null>(null);

  // Update ref when state changes
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  // Colors adapted from source
  const colors = [
    0x00ff00, // Green
    0x0000ff, // Blue
    0xff8000, // Orange
    0x8000ff, // Purple
    0xff0080, // Pink
    0x80ff00, // Lime
    0x0080ff, // Cyan
    0xff00ff, // Magenta
    0x00ffff, // Aqua
    0xffff00, // Yellow
    0xff4444, // Red
    0x44ff44  // Light Green
  ];

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Cleanup previous scene
    if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
        sceneRef.current.controls.dispose();
        // Clear references
        sceneRef.current = null;
    }

    // Initialize Scene
    const scene = new THREE.Scene();
    // Transparent background to blend with UI
    scene.background = null; 
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    const cameraDistance = 30 + (strandCount * 2);
    camera.position.set(0, 0, cameraDistance);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 20;
    controls.maxDistance = 150;
    controls.autoRotate = false;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 10, 7.5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x4CAF50, 0.3);
    fillLight.position.set(-5, -5, -5);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0x2196F3, 0.3);
    backLight.position.set(0, 5, -10);
    scene.add(backLight);

    // Dynamic Point Lights
    const lightCount = Math.min(strandCount, 4);
    for (let i = 0; i < lightCount; i++) {
        const angle = (i / lightCount) * Math.PI * 2;
        const distance = 15;
        const pointLight = new THREE.PointLight(colors[i % colors.length], 0.4, 60);
        pointLight.position.set(
            Math.cos(angle) * distance,
            Math.sin(angle) * distance,
            10
        );
        scene.add(pointLight);
    }

    // DNA Group
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // Materials
    const strandMaterials: THREE.MeshPhongMaterial[] = [];
    for (let i = 0; i < strandCount; i++) {
        const color = colors[i % colors.length];
        const emissive = (color >> 4) & 0x0f0f0f;
        strandMaterials.push(
            new THREE.MeshPhongMaterial({
                color: color,
                shininess: 100,
                emissive: emissive,
                emissiveIntensity: 0.2
            })
        );
    }

    const basePairMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        shininess: 100,
        emissive: 0x330000,
        transparent: true,
        opacity: 0.8
    });

    // DNA Construction Logic
    const calculateRadius = (count: number) => 5 * Math.max(1, Math.sqrt(count / 2));
    const radius = calculateRadius(strandCount);
    const height = 40;
    const turns = 3;
    const segments = 150;

    // Create Strands
    for (let strandIndex = 0; strandIndex < strandCount; strandIndex++) {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const angleOffset = (strandIndex * 2 * Math.PI) / strandCount;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const angle = t * turns * Math.PI * 2 + angleOffset;
            const y = (t - 0.5) * height;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            positions.push(x, y, z);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        const line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: strandMaterials[strandIndex].color,
                linewidth: 2
            })
        );
        dnaGroup.add(line);

        // Spheres
        const sphereInterval = strandCount > 6 ? 4 : 3;
        for (let i = 0; i <= segments; i += sphereInterval) {
            const t = i / segments;
            const angle = t * turns * Math.PI * 2 + angleOffset;
            const y = (t - 0.5) * height;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            const sphereSize = strandCount > 8 ? 0.3 : 0.4;
            const sphereGeometry = new THREE.SphereGeometry(sphereSize, 16, 16);
            const sphere = new THREE.Mesh(sphereGeometry, strandMaterials[strandIndex]);
            sphere.position.set(x, y, z);
            sphere.castShadow = true;
            dnaGroup.add(sphere);
        }
    }

    // Connections
    if (strandCount <= 4) {
        // Base Pairs
        const basePairsPerTurn = 10;
        const totalBasePairs = turns * basePairsPerTurn;

        for (let i = 0; i < totalBasePairs; i++) {
            const t = i / totalBasePairs;
            const angle = t * turns * Math.PI * 2;
            const y = (t - 0.5) * height;

            for (let s = 0; s < Math.floor(strandCount / 2); s++) {
                const angle1 = angle + (s * 2 * Math.PI) / strandCount;
                const angle2 = angle1 + Math.PI;

                const x1 = Math.cos(angle1) * radius;
                const z1 = Math.sin(angle1) * radius;
                const x2 = Math.cos(angle2) * radius;
                const z2 = Math.sin(angle2) * radius;

                const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2));

                const basePairGeometry = new THREE.CylinderGeometry(0.15, 0.15, distance, 8);
                const basePair = new THREE.Mesh(basePairGeometry, basePairMaterial);

                basePair.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
                basePair.rotation.z = Math.PI / 2;
                basePair.rotation.y = angle1;
                basePair.castShadow = true;
                dnaGroup.add(basePair);
            }
        }
    } else {
        // Radial Connections
        const connectionInterval = strandCount > 8 ? 8 : 6;
        
        for (let i = 0; i <= segments; i += connectionInterval) {
            const t = i / segments;
            const y = (t - 0.5) * height;

            for (let strand = 0; strand < strandCount; strand++) {
                const angleOffset = (strand * 2 * Math.PI) / strandCount;
                const angle = t * turns * Math.PI * 2 + angleOffset;

                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                const connectionGeometry = new THREE.CylinderGeometry(0.08, 0.08, radius, 6);
                const connection = new THREE.Mesh(connectionGeometry, basePairMaterial);

                connection.position.set(x / 2, y, z / 2);
                connection.rotation.z = Math.PI / 2 - angle;
                connection.rotation.x = Math.PI / 2;
                dnaGroup.add(connection);
            }

            const centralSphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.25, 12, 12),
                basePairMaterial
            );
            centralSphere.position.set(0, y, 0);
            dnaGroup.add(centralSphere);
        }
    }

    sceneRef.current = {
      scene,
      camera,
      renderer,
      dnaGroup,
      controls,
      animationId: 0
    };

    const animate = () => {
      if (!sceneRef.current) return;
      
      sceneRef.current.animationId = requestAnimationFrame(animate);
      
      if (isRotatingRef.current && sceneRef.current.dnaGroup) {
          sceneRef.current.dnaGroup.rotation.y += 0.005;
      }
      
      sceneRef.current.controls.update();
      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
    };

    animate();

    const handleResize = () => {
        if (!containerRef.current || !sceneRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        sceneRef.current.camera.aspect = width / height;
        sceneRef.current.camera.updateProjectionMatrix();
        sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        if (sceneRef.current) {
            cancelAnimationFrame(sceneRef.current.animationId);
            sceneRef.current.renderer.dispose();
            sceneRef.current.controls.dispose();
        }
    };
  }, [strandCount]); // Re-run if strand count changes

  const handleReset = () => {
    if (sceneRef.current) {
        const cameraDistance = 30 + (strandCount * 2);
        sceneRef.current.camera.position.set(0, 0, cameraDistance);
        sceneRef.current.controls.target.set(0, 0, 0);
        sceneRef.current.dnaGroup.rotation.set(0, 0, 0);
        sceneRef.current.controls.update();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsRotating(!isRotating)}
            className="bg-black/20 backdrop-blur-md border-white/10 hover:bg-white/10 text-white"
        >
            {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button 
            variant="outline" 
            size="icon"
            onClick={handleReset}
            className="bg-black/20 backdrop-blur-md border-white/10 hover:bg-white/10 text-white"
        >
            <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}