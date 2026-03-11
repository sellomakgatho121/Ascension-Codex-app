import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cosmic-900 text-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Card className="sacred-card max-w-md mx-auto text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-red-500/20 border-2 border-red-500">
                <AlertCircle className="w-12 h-12 text-red-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-sacred text-sacred-gold">
              Page Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-6xl font-bold text-cosmic-600 mb-4">
              404
            </div>
            <p className="text-cosmic-300 leading-relaxed">
              The page you're looking for seems to have drifted into another dimension. 
              Let us guide you back to the main ascension path.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="border-cosmic-600 text-cosmic-300 hover:bg-cosmic-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
