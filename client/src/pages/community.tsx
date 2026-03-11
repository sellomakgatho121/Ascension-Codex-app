import { CommunityFeatures } from "@/components/community-features";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-cosmic-900 text-white">
      {/* Hero Section */}
      <section className="cosmic-gradient sacred-geometry py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-sacred-gold rounded-full transform rotate-45 sacred-geometry-bg"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-sacred-silver opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-sacred font-bold mb-6 text-sacred-gold">
            Spiritual Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cosmic-100 max-w-4xl mx-auto leading-relaxed">
            Connect with fellow practitioners on the path of consciousness evolution
          </p>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-12 bg-cosmic-900">
        <div className="container mx-auto px-4">
          <CommunityFeatures />
        </div>
      </section>
    </div>
  );
}