import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Sparkles, MoveUp, Sunrise } from "lucide-react";

export default function AscensionMechanicsPage() {
    return (
        <div className="min-h-screen bg-cosmic-950 text-cosmic-100">
            <section className="py-20 bg-gradient-to-b from-cosmic-950 via-cosmic-900 to-cosmic-950">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
                        Ascension Mechanics
                    </h1>
                    <p className="text-xl md:text-2xl text-cosmic-200 mb-8 max-w-3xl mx-auto">
                        The Physics of Spiritual Evolution
                    </p>
                </div>
            </section>

            <section className="py-12 bg-cosmic-900">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid gap-8">
                        <Card className="sacred-card">
                            <CardHeader>
                                <CardTitle className="text-sacred-gold flex items-center gap-2">
                                    <Crown className="w-6 h-6" />
                                    Bio-Regenesis
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>Ascension is not just a spiritual concept but a tangible biological and energetic process. It involves transmuting the carbon-based anatomy into a silica-based crystal body.</p>
                                <p>This allows the biological form to hold higher frequencies of source light, eventually leading to full starseed awakening and liberation.</p>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="sacred-card">
                                <CardHeader><CardTitle className="text-sacred-silver flex items-center gap-2"><MoveUp className="w-5 h-5" /> Frequency Holding</CardTitle></CardHeader>
                                <CardContent>The ability of the CNS to run high-voltage currents without burning out. This is built through consistent clearing and practice.</CardContent>
                            </Card>
                            <Card className="sacred-card">
                                <CardHeader><CardTitle className="text-sacred-silver flex items-center gap-2"><Sunrise className="w-5 h-5" /> Soul Integration</CardTitle></CardHeader>
                                <CardContent>Merging the personality with the Soul, Oversoul, and Avatar identities to operate as a unified multidimensional being.</CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
