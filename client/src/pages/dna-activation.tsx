import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Activity, Dna, Layers } from "lucide-react";

export default function DnaActivationPage() {
    return (
        <div className="min-h-screen bg-cosmic-950 text-cosmic-100">
            <section className="py-20 bg-gradient-to-b from-cosmic-950 via-cosmic-900 to-cosmic-950">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
                        DNA Activation
                    </h1>
                    <p className="text-xl md:text-2xl text-cosmic-200 mb-8 max-w-3xl mx-auto">
                        Restoring the Diamond Sun 12-Strand Template
                    </p>
                </div>
            </section>

            <section className="py-12 bg-cosmic-900">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid gap-8">
                        <Card className="sacred-card">
                            <CardHeader>
                                <CardTitle className="text-sacred-gold flex items-center gap-2">
                                    <Dna className="w-6 h-6" />
                                    Silicate Matrix
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>The human genome was originally designed as a 12-strand DNA template called the Diamond Sun DNA. Through genetic manipulation and de-evolution, most of humanity operates on only 2-3 strands.</p>
                                <p>Ascension is the process of accreting frequency to activate the dormant "junk" DNA and reassembling the original 12-strand potential.</p>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="sacred-card">
                                <CardHeader><CardTitle className="text-sacred-silver flex items-center gap-2"><Zap className="w-5 h-5" /> Fire Letters</CardTitle></CardHeader>
                                <CardContent>Scalar wave programs that form the base codes of DNA. Activation involves "firing" these letters to build the strands.</CardContent>
                            </Card>
                            <Card className="sacred-card">
                                <CardHeader><CardTitle className="text-sacred-silver flex items-center gap-2"><Layers className="w-5 h-5" /> Strand Overlay</CardTitle></CardHeader>
                                <CardContent>Each of the 12 DNA strands corresponds to a dimensional frequency band and a chakra center.</CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
