// Advanced Creative Coding Engine for Spiritual Visualizations
// Integrating awesome-creative-coding techniques with TypeScript enhancements

import { SpiritualLogger, performanceMonitor } from "./typescript-enhancements";

// Advanced shader programs for spiritual visualizations
export const SPIRITUAL_SHADERS = {
  chakraEnergy: `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;
    uniform float frequency;
    uniform vec3 chakraColor;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(uv, center);
      
      // Golden ratio spiral energy pattern
      float phi = 1.618034;
      float spiral = sin(dist * phi * 10.0 - time * frequency * 0.01) * 0.5 + 0.5;
      
      // Pulsing chakra energy with sacred geometry
      float pulse = sin(time * frequency * 0.02) * 0.3 + 0.7;
      float energy = spiral * pulse / (dist * 2.0 + 0.1);
      
      // Sacred geometry mandala pattern
      float angle = atan(uv.y - 0.5, uv.x - 0.5);
      float mandala = sin(angle * 8.0 + time * 0.1) * 0.2 + 0.8;
      
      vec3 color = chakraColor * energy * mandala;
      gl_FragColor = vec4(color, energy * 0.8);
    }
  `,
  
  lightbodyActivation: `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;
    uniform float activationLevel;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 center = vec2(0.5, 0.5);
      
      // Multiple energy layer visualization
      float layer1 = sin(distance(uv, center) * 15.0 - time * 2.0) * 0.5 + 0.5;
      float layer2 = sin(distance(uv, center) * 25.0 + time * 1.5) * 0.3 + 0.7;
      float layer3 = sin(distance(uv, center) * 35.0 - time * 3.0) * 0.2 + 0.8;
      
      // DNA helix pattern
      float helix = sin(uv.x * 20.0 + time) * sin(uv.y * 20.0 + time * 0.5);
      
      // Activation energy based on user progress
      float activation = activationLevel * (layer1 + layer2 + layer3) * 0.33;
      
      vec3 color = vec3(0.8, 0.9, 1.0) * activation + vec3(1.0, 0.8, 0.6) * helix * 0.2;
      gl_FragColor = vec4(color, activation);
    }
  `,
  
  merkaba: `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;
    uniform float rotationSpeed;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 center = vec2(0.5, 0.5);
      vec2 pos = uv - center;
      
      // Rotate coordinates for merkaba spinning
      float angle = time * rotationSpeed;
      mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      pos = rotation * pos;
      
      // Create tetrahedron patterns (merkaba geometry)
      float tetra1 = abs(pos.x) + abs(pos.y) - 0.3;
      float tetra2 = abs(pos.x - 0.1) + abs(pos.y + 0.1) - 0.25;
      
      // Counter-rotating merkaba
      angle = -time * rotationSpeed * 1.5;
      rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      vec2 pos2 = rotation * (uv - center);
      float tetra3 = abs(pos2.x) + abs(pos2.y) - 0.28;
      
      float merkaba = min(min(tetra1, tetra2), tetra3);
      float energy = 1.0 - smoothstep(0.0, 0.1, abs(merkaba));
      
      vec3 color = vec3(1.0, 0.8, 0.3) * energy;
      gl_FragColor = vec4(color, energy);
    }
  `
};

// Particle system for spiritual energy effects
export class SpiritualParticleSystem {
  private particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: [number, number, number];
    size: number;
    frequency: number;
  }> = [];
  
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationId: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  // Create chakra energy particles
  createChakraParticles(chakraId: number, centerX: number, centerY: number): void {
    const chakraColors = [
      [255, 0, 0],     // Root - Red
      [255, 127, 0],   // Sacral - Orange
      [255, 255, 0],   // Solar Plexus - Yellow
      [0, 255, 0],     // Heart - Green
      [0, 191, 255],   // Throat - Blue
      [75, 0, 130],    // Third Eye - Indigo
      [148, 0, 211],   // Crown - Violet
    ];

    const color = chakraColors[chakraId - 1] || [255, 255, 255];
    const frequency = 100 + (chakraId * 50); // Different frequencies per chakra

    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const radius = 50 + Math.random() * 30;
      
      this.particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: Math.cos(angle) * 0.5,
        vy: Math.sin(angle) * 0.5,
        life: 1.0,
        maxLife: 120 + Math.random() * 60,
        color: color as [number, number, number],
        size: 2 + Math.random() * 3,
        frequency
      });
    }
  }

  // Create DNA activation particles
  createDNAParticles(x: number, y: number, height: number): void {
    for (let i = 0; i < 12; i++) {
      const helixAngle = (i / 12) * Math.PI * 4;
      const helixRadius = 20;
      const helixY = (i / 12) * height;
      
      // Double helix structure
      this.particles.push({
        x: x + Math.cos(helixAngle) * helixRadius,
        y: y + helixY,
        vx: Math.cos(helixAngle + Math.PI) * 0.3,
        vy: -1,
        life: 1.0,
        maxLife: 180,
        color: [0, 255, 200],
        size: 3,
        frequency: 528 // DNA activation frequency
      });
      
      this.particles.push({
        x: x + Math.cos(helixAngle + Math.PI) * helixRadius,
        y: y + helixY,
        vx: Math.cos(helixAngle) * 0.3,
        vy: -1,
        life: 1.0,
        maxLife: 180,
        color: [255, 200, 0],
        size: 3,
        frequency: 741 // Awakening frequency
      });
    }
  }

  // Create merkaba light vehicle particles
  createMerkabaParticles(centerX: number, centerY: number): void {
    const points = 6; // Hexagonal merkaba base
    
    for (let i = 0; i < points * 2; i++) {
      const angle = (Math.PI * 2 * i) / points;
      const radius = 60;
      const isUpper = i < points;
      
      this.particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius + (isUpper ? -30 : 30),
        vx: Math.cos(angle + Math.PI/2) * (isUpper ? 1 : -1),
        vy: Math.sin(angle + Math.PI/2) * (isUpper ? 1 : -1),
        life: 1.0,
        maxLife: 240,
        color: [255, 215, 0], // Golden light
        size: 4,
        frequency: 963 // Divine connection frequency
      });
    }
  }

  // Update and render particle system
  update(): void {
    const stopMeasurement = performanceMonitor.startRenderMeasurement();
    
    // Clear canvas with sacred geometry background
    this.ctx.fillStyle = 'rgba(10, 5, 30, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Update particles
    this.particles = this.particles.filter(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Apply golden ratio spiral motion
      const phi = 1.618034;
      const spiralForce = 0.02;
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const dx = centerX - particle.x;
      const dy = centerY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        particle.vx += (dx / distance) * spiralForce * phi;
        particle.vy += (dy / distance) * spiralForce * phi;
      }

      // Update life
      particle.life = particle.maxLife / 60; // Convert to seconds
      particle.maxLife--;

      // Render particle with spiritual glow
      const alpha = particle.maxLife / 240;
      const glowSize = particle.size * 3;
      
      // Create radial gradient for spiritual glow
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, glowSize
      );
      gradient.addColorStop(0, `rgba(${particle.color.join(',')}, ${alpha})`);
      gradient.addColorStop(1, `rgba(${particle.color.join(',')}, 0)`);
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Core particle
      this.ctx.fillStyle = `rgba(${particle.color.join(',')}, ${alpha * 1.5})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();

      return particle.maxLife > 0;
    });

    stopMeasurement();
    
    // Continue animation
    this.animationId = requestAnimationFrame(() => this.update());
  }

  // Start particle system
  start(): void {
    SpiritualLogger.info('Starting spiritual particle system');
    this.update();
  }

  // Stop particle system
  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = 0;
    }
    SpiritualLogger.info('Stopped spiritual particle system');
  }

  // Clear all particles
  clear(): void {
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// Sacred geometry pattern generator
export class SacredGeometryGenerator {
  static generateFlowerOfLife(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number): void {
    const circles = 7; // Classic Flower of Life has 7 overlapping circles
    const angles = [];
    
    // Calculate circle positions using golden ratio
    for (let i = 0; i < 6; i++) {
      angles.push((Math.PI * 2 * i) / 6);
    }

    ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';
    ctx.lineWidth = 2;

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Surrounding circles
    angles.forEach(angle => {
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  static generateMetatronsCube(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, size: number): void {
    const points = 13; // Metatron's Cube has 13 circles
    const radius = size * 0.8;
    const phi = 1.618034; // Golden ratio

    ctx.strokeStyle = 'rgba(138, 43, 226, 0.7)';
    ctx.lineWidth = 1.5;

    // Create the 13 circles of Metatron's Cube
    const positions = [];
    
    // Center circle
    positions.push({ x: centerX, y: centerY });
    
    // Inner hexagon
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6;
      positions.push({
        x: centerX + Math.cos(angle) * radius * 0.5,
        y: centerY + Math.sin(angle) * radius * 0.5
      });
    }
    
    // Outer hexagon
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6;
      positions.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      });
    }

    // Draw circles
    positions.forEach(pos => {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size * 0.1, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw connecting lines (simplified Metatron pattern)
    ctx.strokeStyle = 'rgba(138, 43, 226, 0.4)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        ctx.beginPath();
        ctx.moveTo(positions[i].x, positions[i].y);
        ctx.lineTo(positions[j].x, positions[j].y);
        ctx.stroke();
      }
    }
  }

  static generateSriYantra(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, size: number): void {
    ctx.strokeStyle = 'rgba(255, 20, 147, 0.6)';
    ctx.lineWidth = 1.5;

    // Central point (bindu)
    ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw interlocking triangles (simplified Sri Yantra)
    const triangles = [
      { size: size * 0.3, rotation: 0 },
      { size: size * 0.4, rotation: Math.PI },
      { size: size * 0.5, rotation: 0 },
      { size: size * 0.6, rotation: Math.PI },
      { size: size * 0.7, rotation: 0 }
    ];

    triangles.forEach(triangle => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(triangle.rotation);
      
      ctx.beginPath();
      ctx.moveTo(0, -triangle.size);
      ctx.lineTo(-triangle.size * 0.866, triangle.size * 0.5);
      ctx.lineTo(triangle.size * 0.866, triangle.size * 0.5);
      ctx.closePath();
      ctx.stroke();
      
      ctx.restore();
    });

    // Outer circles
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * (0.8 + i * 0.1), 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

// Advanced WebGL shader manager for spiritual visualizations
export class SpiritualShaderManager {
  private gl: WebGLRenderingContext;
  private programs: Map<string, WebGLProgram> = new Map();
  private uniforms: Map<string, Map<string, WebGLUniformLocation>> = new Map();

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      throw new Error('WebGL not supported');
    }
    this.gl = gl as WebGLRenderingContext;
    this.setupWebGL();
  }

  private setupWebGL(): void {
    this.gl.clearColor(0.02, 0.02, 0.1, 1.0);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  }

  private createShader(type: number, source: string): WebGLShader | null {
    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      SpiritualLogger.error('Shader compilation error', new Error(this.gl.getShaderInfoLog(shader) || 'Unknown error'));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  createProgram(name: string, vertexSource: string, fragmentSource: string): boolean {
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);

    if (!vertexShader || !fragmentShader) {
      return false;
    }

    const program = this.gl.createProgram();
    if (!program) return false;

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      SpiritualLogger.error('Program linking error', new Error(this.gl.getProgramInfoLog(program) || 'Unknown error'));
      return false;
    }

    this.programs.set(name, program);
    this.cacheUniforms(name, program);
    
    SpiritualLogger.info(`Created spiritual shader program: ${name}`);
    return true;
  }

  private cacheUniforms(name: string, program: WebGLProgram): void {
    const uniformMap = new Map<string, WebGLUniformLocation>();
    const numUniforms = this.gl.getProgramParameter(program, this.gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < numUniforms; i++) {
      const uniformInfo = this.gl.getActiveUniform(program, i);
      if (uniformInfo) {
        const location = this.gl.getUniformLocation(program, uniformInfo.name);
        if (location) {
          uniformMap.set(uniformInfo.name, location);
        }
      }
    }

    this.uniforms.set(name, uniformMap);
  }

  useProgram(name: string): boolean {
    const program = this.programs.get(name);
    if (!program) {
      SpiritualLogger.error(`Shader program not found: ${name}`, new Error('Program not found'));
      return false;
    }

    this.gl.useProgram(program);
    return true;
  }

  setUniform(programName: string, uniformName: string, value: number | number[]): void {
    const uniformMap = this.uniforms.get(programName);
    if (!uniformMap) return;

    const location = uniformMap.get(uniformName);
    if (!location) return;

    if (typeof value === 'number') {
      this.gl.uniform1f(location, value);
    } else if (value.length === 2) {
      this.gl.uniform2f(location, value[0], value[1]);
    } else if (value.length === 3) {
      this.gl.uniform3f(location, value[0], value[1], value[2]);
    } else if (value.length === 4) {
      this.gl.uniform4f(location, value[0], value[1], value[2], value[3]);
    }
  }

  render(): void {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
    // Create full-screen quad for shader effects
    const vertices = new Float32Array([
      -1, -1, 0, 0,
       1, -1, 1, 0,
      -1,  1, 0, 1,
       1,  1, 1, 1
    ]);

    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 16, 0);
    this.gl.enableVertexAttribArray(0);

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }
}

// Export main creative coding engine
export const creativeEngine = {
  SpiritualParticleSystem,
  SacredGeometryGenerator,
  SpiritualShaderManager,
  SPIRITUAL_SHADERS
};

SpiritualLogger.info('Creative coding engine initialized for spiritual visualizations');