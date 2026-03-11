import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, DoorOpen, ArrowUpRight, Network } from "lucide-react";

export default function DimensionalAccessPage() {
    return (
        <div className="min-h-screen bg-cosmic-950 text-cosmic-100">
            <section className="py-20 bg-gradient-to-b from-cosmic-950 via-cosmic-900 to-cosmic-950">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
                        Dimensional Access
                    </h1>
                    <p className="text-xl md:text-2xl text-cosmic-200 mb-8 max-w-3xl mx-auto">
                        Navigating the 15-Dimensional Time Matrix
                    </p>
                </div>
            </section>

            <section className="py-12 bg-cosmic-900">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid gap-8">
                        <Card className="sacred-card">
                            <CardHeader>
                                <CardTitle className="text-sacred-gold flex items-center gap-2">
                                    <Network className="w-6 h-6" />
                                    Harmonic Universes
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>Reality is structured into 5 Harmonic Universes (HU), each containing 3 dimensional frequency bands. We are currently in HU-1 (Dimensions 1-3) moving towards HU-2 (Dimensions 4-6).</p>
                                <p>Accessing higher dimensions requires raising one's bodily frequency to match the oscillation rates of those higher planes.</p>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="sacred-card">
                                <CardHeader><CardTitle className="text-sacred-silver flex items-center gap-2"><DoorOpen className="w-5 h-5" /> Star Gates</CardTitle></CardHeader>
                                <CardContent>Natural portals that connect the dimensional systems. Controlling these gates determines who has access to the planetary sphere.</CardContent>
                            </Card>
                            <Card className="sacred-card">
                                <CardHeader><CardTitle className="text-sacred-silver flex items-center gap-2"><ArrowUpRight className="w-5 h-5" /> Frequency Accretion</CardTitle></CardHeader>
                                <CardContent>The mechanics of drawing light into the morphogenetic field to bridge the gaps between dimensional bands.</CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
