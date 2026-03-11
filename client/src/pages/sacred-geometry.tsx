import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hexagon, Circle, Triangle, Square, Shield } from "lucide-react";

export default function SacredGeometryPage() {
    return (
        <div className="min-h-screen bg-cosmic-950 text-cosmic-100">
            <section className="py-20 bg-gradient-to-b from-cosmic-950 via-cosmic-900 to-cosmic-950">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
                        Sacred Geometry
                    </h1>
                    <p className="text-xl md:text-2xl text-cosmic-200 mb-8 max-w-3xl mx-auto">
                        The Blueprint of Creation & The Language of Light
                    </p>
                </div>
            </section>

            <section className="py-12 bg-cosmic-900 can-h-screen">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid gap-8">
                        <Card className="sacred-card">
                            <CardHeader>
                                <CardTitle className="text-sacred-gold flex items-center gap-2">
                                    <Shield className="w-6 h-6" />
                                    The Kathara Grid
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>The Kathara Grid is the primary mathematical-geometrical organization of units of consciousness upon which the Partiki scalar wave templates are built. It is the core level of scalar standing wave grids.</p>
                                <p>It represents the "Tree of Life" and governs the structure of all dimensional systems.</p>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="sacred-card">
                                <CardHeader><CardTitle className="text-sacred-silver flex items-center gap-2"><Circle className="w-5 h-5" /> Vesica Piscis</CardTitle></CardHeader>
                                <CardContent>The intersection of two circles, representing the first day of creation and the polarity of spirit entering matter.</CardContent>
                            </Card>
                            <Card className="sacred-card">
                                <CardHeader><CardTitle className="text-sacred-silver flex items-center gap-2"><Triangle className="w-5 h-5" /> Merkaba</CardTitle></CardHeader>
                                <CardContent>Star Tetrahedron fields that form the lightbody vehicle, consisting of counter-rotating electromagnetic fields.</CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
