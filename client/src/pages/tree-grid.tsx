import { useState } from 'react';
import { Link } from 'wouter';
import { TreeGridDiagram } from '@/components/diagrams/tree-grid-diagram';
import { treeGridSpheres, TreeGridSphere } from '@/lib/spiritual-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TreePine, Shield, Zap, Star, Eye, Crown } from 'lucide-react';

export default function TreeGridPage() {
  const [selectedSphere, setSelectedSphere] = useState<TreeGridSphere | null>(null);

  const handleSphereSelect = (sphere: TreeGridSphere) => {
    setSelectedSphere(sphere);
  };

  return (
    <div className="min-h-screen bg-cosmic-950 text-cosmic-100">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cosmic-950 via-cosmic-900 to-cosmic-950">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
              12-Tree Grid Blueprint
            </h1>
            <p className="text-xl md:text-2xl text-cosmic-200 mb-8 leading-relaxed">
              The Kathara Grid: Universal Template of Multidimensional Consciousness
            </p>
            <p className="text-lg text-cosmic-300 max-w-3xl mx-auto">
              The 12-Tree Grid, also known as the Kathara Grid, is the primary holographic template
              that governs the mechanics of manifestation in all dimensional systems. This sacred
              geometric pattern forms the blueprint for consciousness evolution and dimensional ascension.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Grid Section */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <Card className="sacred-card mb-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-sacred text-sacred-gold text-center">
                Interactive 12-Tree Grid (Kathara Grid)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TreeGridDiagram
                selectedSphere={selectedSphere?.id || null}
                onSphereSelect={(sphereId) => {
                  const sphere = treeGridSpheres.find(s => s.id === sphereId);
                  setSelectedSphere(sphere || null);
                }}
                showPaths={true}
                interactive={true}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Grid Information */}
              <div className="sacred-card p-8">
                <h3 className="text-2xl font-sacred text-sacred-gold mb-4">
                  The Sacred Tree of Life
                </h3>
                <p className="text-cosmic-100 mb-6">
                  The 12-Tree Grid represents the divine blueprint for consciousness evolution.
                  Each sphere (Sephirah) contains specific dimensional frequencies and spiritual qualities
                  that guide souls through their ascension journey.
                </p>
              </div>

              {/* Sphere Information */}
              <div className="space-y-6">
                {selectedSphere ? (
                  <Card className="sacred-card">
                    <CardHeader>
                      <CardTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                        <Crown className="w-6 h-6 mr-3" />
                        Sphere {selectedSphere.id}: {selectedSphere.name}
                      </CardTitle>
                      <Badge variant="outline" className="w-fit border-sacred-silver text-sacred-silver">
                        {selectedSphere.dimension}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-sacred text-sacred-silver mb-2">Primary Function:</h4>
                        <p className="text-cosmic-100 text-sm leading-relaxed">
                          {selectedSphere.function}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-sacred text-sacred-silver mb-2">Dimensional Connections:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSphere.connections.map((connectionId) => {
                            const connectedSphere = treeGridSpheres.find(s => s.id === connectionId);
                            return connectedSphere ? (
                              <Badge
                                key={connectionId}
                                variant="secondary"
                                className="text-xs bg-cosmic-800 text-cosmic-200"
                              >
                                {connectedSphere.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 border-sacred-gold text-sacred-gold hover:bg-sacred-gold hover:text-cosmic-900">
                              <Eye className="w-4 h-4 mr-2" />
                              Detailed Guide
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                                <Crown className="w-6 h-6 mr-3" />
                                {selectedSphere.name} - Complete Guide
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 text-cosmic-100">
                              <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                                <p className="text-sacred-gold font-semibold mb-2">Sphere {selectedSphere.id} Overview</p>
                                <p className="text-sm">
                                  {selectedSphere.name} represents {selectedSphere.dimension} consciousness and serves as a key gateway
                                  in the multidimensional architecture of the human lightbody system.
                                </p>
                              </div>

                              <div>
                                <h4 className="text-lg font-sacred text-sacred-silver mb-3">Consciousness Functions:</h4>
                                <p className="text-sm leading-relaxed mb-4">{selectedSphere.function}</p>

                                <div className="space-y-3 text-sm">
                                  <div>
                                    <h5 className="font-semibold text-sacred-gold mb-2">Dimensional Access:</h5>
                                    <p className="text-cosmic-300">
                                      This sphere provides access to {selectedSphere.dimension} frequencies and consciousness states,
                                      allowing integration of higher-dimensional awareness into your current embodiment.
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-sacred-gold mb-2">DNA Correlation:</h5>
                                    <p className="text-cosmic-300">
                                      Sphere {selectedSphere.id} directly correlates to DNA strand {selectedSphere.id}, activating
                                      genetic potentials and restoring original divine blueprint functions.
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <Separator className="bg-cosmic-700" />

                              <div>
                                <h4 className="text-lg font-sacred text-sacred-silver mb-3">Activation Practices:</h4>
                                <div className="space-y-4 text-sm">
                                  <div className="border border-cosmic-600 rounded-lg p-4">
                                    <h5 className="font-semibold text-sacred-gold mb-2">Sphere Meditation</h5>
                                    <p className="mb-2">Focus meditation to activate this specific sphere:</p>
                                    <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                      <li>• Visualize brilliant {selectedSphere.color.toLowerCase()} light at the sphere location</li>
                                      <li>• Breathe the color frequency into your entire being</li>
                                      <li>• Call upon {selectedSphere.name} consciousness to activate</li>
                                      <li>• Hold the activation for 12-15 minutes minimum</li>
                                    </ul>
                                  </div>

                                  <div className="border border-cosmic-600 rounded-lg p-4">
                                    <h5 className="font-semibold text-sacred-gold mb-2">Grid Integration</h5>
                                    <p className="mb-2">Connect this sphere to the full Kathara Grid:</p>
                                    <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                      <li>• Activate all connected spheres in sequence</li>
                                      <li>• Visualize light pathways between connections</li>
                                      <li>• Feel the geometric template stabilizing in your field</li>
                                      <li>• Anchor the pattern into your cellular memory</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                                <p className="text-xs text-cosmic-300">
                                  <strong>Note:</strong> Consistent practice with {selectedSphere.name} will gradually restore
                                  the natural functions of this dimensional gateway, supporting your overall ascension process
                                  and multidimensional awareness.
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 border-sacred-silver text-sacred-silver hover:bg-sacred-silver hover:text-cosmic-900">
                              <TreePine className="w-4 h-4 mr-2" />
                              Grid Techniques
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-sacred text-sacred-gold flex items-center">
                                <TreePine className="w-6 h-6 mr-3" />
                                Kathara Grid Techniques
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 text-cosmic-100">
                              <div className="bg-sacred-gold/10 rounded-lg p-4 border border-sacred-gold/20">
                                <p className="text-sacred-gold font-semibold mb-2">Advanced Grid Activation</p>
                                <p className="text-sm">
                                  These techniques work with the complete 12-Tree Grid to restore your multidimensional
                                  template and activate dormant DNA strands through sacred geometric activation.
                                </p>
                              </div>

                              <div>
                                <h4 className="text-lg font-sacred text-sacred-silver mb-3">Core Techniques:</h4>
                                <div className="space-y-4 text-sm">
                                  <div className="border border-cosmic-600 rounded-lg p-4">
                                    <h5 className="font-semibold text-sacred-gold mb-2">12-Point Activation</h5>
                                    <p className="mb-2">Complete grid activation sequence:</p>
                                    <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                      <li>• Begin at Malkuth (Sphere 1) and work upward systematically</li>
                                      <li>• Spend 2-3 minutes activating each sphere with its color frequency</li>
                                      <li>• Connect each sphere to all its pathway connections</li>
                                      <li>• Complete the circuit by linking back to Malkuth</li>
                                    </ul>
                                  </div>

                                  <div className="border border-cosmic-600 rounded-lg p-4">
                                    <h5 className="font-semibold text-sacred-gold mb-2">Triad Breathing</h5>
                                    <p className="mb-2">Work with the four dimensional triads:</p>
                                    <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                      <li>• Foundation Triad (1-2-3): Physical dimensional anchoring</li>
                                      <li>• Soul Triad (4-5-6): Soul matrix integration and healing</li>
                                      <li>• Monadic Triad (7-8-9): Higher self embodiment and wisdom</li>
                                      <li>• Avatar Triad (10-11-12): Cosmic consciousness and unity</li>
                                    </ul>
                                  </div>

                                  <div className="border border-cosmic-600 rounded-lg p-4">
                                    <h5 className="font-semibold text-sacred-gold mb-2">DNA Strand Restoration</h5>
                                    <p className="mb-2">Link each sphere to its corresponding DNA strand:</p>
                                    <ul className="space-y-1 text-xs text-cosmic-300 ml-4">
                                      <li>• Visualize double helix spiraling through each activated sphere</li>
                                      <li>• Call for restoration of original 12-strand DNA template</li>
                                      <li>• Feel genetic activation occurring at cellular level</li>
                                      <li>• Anchor new genetic patterns into physical body</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-cosmic-800/30 rounded-lg p-4 border-l-4 border-sacred-gold">
                                <p className="text-xs text-cosmic-300">
                                  <strong>Practice Guidance:</strong> Begin with 15-20 minute sessions, gradually building
                                  to longer practices as your energy field stabilizes. Regular practice develops your
                                  capacity to hold higher frequencies and multidimensional awareness.
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="sacred-card">
                    <CardContent className="p-8 text-center">
                      <TreePine className="w-16 h-16 mx-auto mb-4 text-sacred-gold opacity-50" />
                      <h3 className="text-xl font-sacred text-sacred-gold mb-2">
                        Select a Sphere
                      </h3>
                      <p className="text-cosmic-300">
                        Click on any sphere in the Kathara Grid to explore its consciousness functions,
                        dimensional connections, and activation practices.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-20 bg-cosmic-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sacred font-bold mb-12 text-center text-sacred-gold">
              Understanding the Kathara Grid
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Link href="/sacred-geometry">
                <a className="block transition-transform hover:scale-[1.02] cursor-pointer">
                  <Card className="sacred-card h-full hover:border-sacred-gold/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                        <Shield className="w-5 h-5 mr-3" />
                        Sacred Geometry
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-cosmic-100 text-sm leading-relaxed">
                        The Kathara Grid is based on eternal sacred geometric principles that govern
                        the structure of consciousness throughout all dimensional systems.
                      </p>
                      <ul className="space-y-2 text-sm text-cosmic-300">
                        <li>• 12 spheres representing dimensional consciousness levels</li>
                        <li>• 15 pathways connecting spheres in specific geometric patterns</li>
                        <li>• Mathematical base-12 system reflecting natural cosmic law</li>
                        <li>• Template for all manifestation and consciousness evolution</li>
                      </ul>
                    </CardContent>
                  </Card>
                </a>
              </Link>

              <Link href="/dna-activation">
                <a className="block transition-transform hover:scale-[1.02] cursor-pointer">
                  <Card className="sacred-card h-full hover:border-sacred-gold/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                        <Zap className="w-5 h-5 mr-3" />
                        DNA Activation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-cosmic-100 text-sm leading-relaxed">
                        Each sphere corresponds to a DNA strand, making the grid a powerful tool
                        for genetic restoration and evolutionary activation.
                      </p>
                      <ul className="space-y-2 text-sm text-cosmic-300">
                        <li>• Spheres 1-3: Physical DNA template restoration</li>
                        <li>• Spheres 4-6: Soul matrix DNA integration</li>
                        <li>• Spheres 7-9: Monadic DNA embodiment</li>
                        <li>• Spheres 10-12: Avatar consciousness DNA activation</li>
                      </ul>
                    </CardContent>
                  </Card>
                </a>
              </Link>

              <Link href="/dimensional-access">
                <a className="block transition-transform hover:scale-[1.02] cursor-pointer">
                  <Card className="sacred-card h-full hover:border-sacred-gold/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                        <Star className="w-5 h-5 mr-3" />
                        Dimensional Access
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-cosmic-100 text-sm leading-relaxed">
                        The grid provides structured access to multidimensional consciousness,
                        allowing safe expansion beyond 3D limitation.
                      </p>
                      <ul className="space-y-2 text-sm text-cosmic-300">
                        <li>• Systematic consciousness expansion through dimensions</li>
                        <li>• Safe integration of higher frequency awareness</li>
                        <li>• Access to guidance from higher dimensional aspects</li>
                        <li>• Platform for interdimensional communication</li>
                      </ul>
                    </CardContent>
                  </Card>
                </a>
              </Link>

              <Link href="/ascension-mechanics">
                <a className="block transition-transform hover:scale-[1.02] cursor-pointer">
                  <Card className="sacred-card h-full hover:border-sacred-gold/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center">
                        <Crown className="w-5 h-5 mr-3" />
                        Ascension Tool
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-cosmic-100 text-sm leading-relaxed">
                        The Kathara Grid serves as the primary ascension technology, providing
                        the template for consciousness evolution and spiritual sovereignty.
                      </p>
                      <ul className="space-y-2 text-sm text-cosmic-300">
                        <li>• Foundation for lightbody construction and activation</li>
                        <li>• Template for healing and clearing dimensional distortions</li>
                        <li>• Platform for reclaiming spiritual sovereignty</li>
                        <li>• Blueprint for cosmic consciousness embodiment</li>
                      </ul>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}