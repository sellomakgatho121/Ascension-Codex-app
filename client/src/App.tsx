import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { FloatingMeditationButton } from "@/components/floating-meditation-button";
import { OnboardingSystem } from "@/components/onboarding-system";
import { AccessibilityProvider } from "@/components/accessibility-provider";
import { AscensionFooter } from "@/components/ascension-footer";
import { SpiritualProgressProvider } from "@/lib/spiritual-progress-context";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper";
import { AmbientBackground } from "@/components/ambient-background";
import { AntiCursor } from "@/components/anti-design/custom-cursor";
import { AntiScrollIndicator } from "@/components/anti-design/scroll-indicator";
import { VERSProvider, useVERS } from "@/lib/vers-context";
import { VERSFloatingWidget } from "@/components/vers-floating-widget";

// Lazy-loaded pages — only loaded when their route is first visited
const HomePage = lazy(() => import("@/pages/home"));
const ChakraDevelopmentPage = lazy(() => import("@/pages/chakra-development"));
const ChakrasPage = lazy(() => import("@/pages/chakras"));
const LightbodyPage = lazy(() => import("@/pages/lightbody"));
const HovaBodiesPage = lazy(() => import("@/pages/hova-bodies"));
const TreeGridPage = lazy(() => import("@/pages/tree-grid"));
const MeditationPage = lazy(() => import("@/pages/meditation"));
const ProgressPage = lazy(() => import("@/pages/progress"));
const GlossaryPage = lazy(() => import("@/pages/glossary"));
const SoulCodexPage = lazy(() => import("@/pages/soul-codex"));
const CommunityPage = lazy(() => import("@/pages/community"));
const ToolsPage = lazy(() => import("@/pages/tools"));
const EnhancedToolsPage = lazy(() => import("@/pages/enhanced-tools"));
const KnowledgeBasePage = lazy(() => import("@/pages/knowledge-base"));
const ChakraDetailPage = lazy(() => import("@/pages/chakra-detail"));
const LightbodyDetailPage = lazy(() => import("@/pages/lightbody-detail"));
const ConceptBrowserPage = lazy(() => import("@/pages/concept-browser"));
const GSFPage = lazy(() => import("@/pages/gsf"));
const ConceptDetailPage = lazy(() => import("@/pages/concept-detail"));
const HGSPage = lazy(() => import("@/pages/hgs"));
const HumanityCreationPage = lazy(() => import("@/pages/humanity-creation"));
const TimelineWarsPage = lazy(() => import("@/pages/timeline-wars"));
const UniversalTimeMatrixPage = lazy(() => import("@/pages/universal-time-matrix"));
const Visualizations3DPage = lazy(() => import("@/pages/3d-visualizations"));
const PsychicSelfDefensePage = lazy(() => import("@/pages/psychic-self-defense"));
const BeingsEntitiesPage = lazy(() => import("@/pages/beings-entities"));
const HigherSelfEvolutionPage = lazy(() => import("@/pages/higher-self-evolution"));
const BlogTimelineShiftPage = lazy(() => import("@/pages/blog-timeline-shift"));
const NAAToolsWeaponsPage = lazy(() => import("@/pages/naa-tools-weapons"));
const NotFound = lazy(() => import("@/pages/not-found"));
const AdvancedConversationalAIPage = lazy(() => import("@/pages/advanced-conversational-ai"));
const EnhancedVERSPage = lazy(() => import("@/pages/enhanced-vers"));
const VERSWhisperLivePage = lazy(() => import("@/pages/vers-whisper-live"));
const CreativeVisualsPage = lazy(() => import("@/pages/creative-visuals"));
const VisualDiagrams = lazy(() => import("@/pages/visual-diagrams"));
const AdvancedVisualizationsPage = lazy(() => import("@/pages/advanced-visualizations"));
const TypeScriptDemoPage = lazy(() => import("@/pages/typescript-demo"));
const SacredGeometryPage = lazy(() => import("@/pages/sacred-geometry"));
const DnaActivationPage = lazy(() => import("@/pages/dna-activation"));
const DnaVisualizationPage = lazy(() => import("@/pages/dna-visualization"));
const DimensionalAccessPage = lazy(() => import("@/pages/dimensional-access"));
const AscensionMechanicsPage = lazy(() => import("@/pages/ascension-mechanics"));

// Loading fallback shown while a page chunk loads
function PageFallback() {
  return (
    <div className="min-h-screen bg-anti-bg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-anti-acid/30 border-t-anti-acid rounded-full animate-spin" />
    </div>
  );
}

// Route consolidation: /assistant is now a redirect wrapper
function VERSAssistantRedirect() {
  const [, setLocation] = useLocation();
  const { openChat } = useVERS();

  useEffect(() => {
    openChat();
    setLocation("/");
  }, [openChat, setLocation]);

  return null;
}

function LazyRoute({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

function Router() {
  return (
    <div className="relative min-h-screen mobile-min-vh-fix bg-anti-bg no-overscroll selection:bg-anti-acid/30 selection:text-anti-static anti-scrollbar">
      <AmbientBackground />
      <AntiCursor />
      <AntiScrollIndicator />
      <div className="anti-noise-overlay" />
      <div className="anti-scan-line" />

      <div className="hidden md:block">
        <Navigation />
      </div>

      <div className="md:hidden">
        <MobileNavigation />
      </div>

      <BreadcrumbNav />
      <Switch>
          <Route path="/">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <HomePage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/chakra-development">
            <LazyRoute>
              <PageTransitionWrapper>
                <ChakraDevelopmentPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/chakras">
            <LazyRoute>
              <PageTransitionWrapper variant="dimensional">
                <ChakrasPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/lightbody">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <LightbodyPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/hova-bodies">
            <LazyRoute>
              <PageTransitionWrapper>
                <HovaBodiesPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/tree-grid">
            <LazyRoute>
              <PageTransitionWrapper variant="dimensional">
                <TreeGridPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/meditation">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <MeditationPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/progress">
            <LazyRoute>
              <PageTransitionWrapper>
                <ProgressPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/glossary">
            <LazyRoute>
              <PageTransitionWrapper>
                <GlossaryPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/soul-codex">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <SoulCodexPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/community">
            <LazyRoute>
              <PageTransitionWrapper>
                <CommunityPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/tools">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <ToolsPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/enhanced-tools">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <EnhancedToolsPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/knowledge-base">
            <LazyRoute>
              <PageTransitionWrapper>
                <KnowledgeBasePage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/concept/:id">
            <LazyRoute>
              <PageTransitionWrapper>
                <ConceptDetailPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/chakra-detail">
            <LazyRoute>
              <PageTransitionWrapper>
                <ChakraDetailPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/lightbody-detail">
            <LazyRoute>
              <PageTransitionWrapper>
                <LightbodyDetailPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/concept-browser">
            <LazyRoute>
              <PageTransitionWrapper>
                <ConceptBrowserPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/gsf">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <GSFPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/concept-detail/:id">
            <LazyRoute>
              <PageTransitionWrapper>
                <ConceptDetailPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/hgs">
            <LazyRoute>
              <PageTransitionWrapper>
                <HGSPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/humanity-creation">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <HumanityCreationPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/timeline-wars">
            <LazyRoute>
              <PageTransitionWrapper>
                <TimelineWarsPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/universal-time-matrix">
            <LazyRoute>
              <PageTransitionWrapper variant="dimensional">
                <UniversalTimeMatrixPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/3d-visualizations">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <Visualizations3DPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/psychic-self-defense">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <PsychicSelfDefensePage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/beings-entities">
            <LazyRoute>
              <PageTransitionWrapper>
                <BeingsEntitiesPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/higher-self-evolution">
            <LazyRoute>
              <PageTransitionWrapper>
                <HigherSelfEvolutionPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/blog-timeline-shift">
            <LazyRoute>
              <PageTransitionWrapper>
                <BlogTimelineShiftPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/naa-tools-weapons">
            <LazyRoute>
              <PageTransitionWrapper>
                <NAAToolsWeaponsPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          {/* Consolidated VERS routes: /vers is canonical, others redirect */}
          <Route path="/vers">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <AdvancedConversationalAIPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/assistant">
            <LazyRoute>
              <VERSAssistantRedirect />
            </LazyRoute>
          </Route>
          <Route path="/enhanced-vers">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <EnhancedVERSPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/advanced-ai">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <AdvancedConversationalAIPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/vers-whisper-live">
            <LazyRoute>
              <PageTransitionWrapper>
                <VERSWhisperLivePage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/creative-visuals">
            <LazyRoute>
              <PageTransitionWrapper variant="dimensional">
                <CreativeVisualsPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/visual-diagrams">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <VisualDiagrams />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/advanced-visualizations">
            <LazyRoute>
              <PageTransitionWrapper variant="dimensional">
                <AdvancedVisualizationsPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/typescript-demo">
            <LazyRoute>
              <PageTransitionWrapper>
                <TypeScriptDemoPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/sacred-geometry">
            <LazyRoute>
              <PageTransitionWrapper variant="dimensional">
                <SacredGeometryPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/dna-activation">
            <LazyRoute>
              <PageTransitionWrapper variant="portal">
                <DnaActivationPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/dna-visualization">
            <LazyRoute>
              <PageTransitionWrapper variant="dimensional">
                <DnaVisualizationPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/dimensional-access">
            <LazyRoute>
              <PageTransitionWrapper>
                <DimensionalAccessPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route path="/ascension-mechanics">
            <LazyRoute>
              <PageTransitionWrapper>
                <AscensionMechanicsPage />
              </PageTransitionWrapper>
            </LazyRoute>
          </Route>
          <Route>
            <LazyRoute>
              <NotFound />
            </LazyRoute>
          </Route>
        </Switch>
      <FloatingMeditationButton />

      {/* Mobile bottom padding to account for bottom navigation */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SpiritualProgressProvider>
          <VERSProvider>
            <Router />
            <VERSFloatingWidget />
            <AccessibilityProvider />
            <OnboardingSystem />
            <AscensionFooter />
            <Toaster />
          </VERSProvider>
        </SpiritualProgressProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
