import { Switch, Route } from "wouter";
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
import { AnimatePresence } from "framer-motion";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper";
import { AmbientBackground } from "@/components/ambient-background";

// Pages
import HomePage from "@/pages/home";
import ChakraDevelopmentPage from "@/pages/chakra-development";
import ChakrasPage from "@/pages/chakras";
import LightbodyPage from "@/pages/lightbody";
import HovaBodiesPage from "@/pages/hova-bodies";
import TreeGridPage from "@/pages/tree-grid";
import MeditationPage from "@/pages/meditation";
import ProgressPage from "@/pages/progress";
import GlossaryPage from "@/pages/glossary";
import SoulCodexPage from "@/pages/soul-codex";
import CommunityPage from "@/pages/community";
import ToolsPage from "@/pages/tools";
import KnowledgeBasePage from "@/pages/knowledge-base";
import ChakraDetailPage from "@/pages/chakra-detail";
import LightbodyDetailPage from "@/pages/lightbody-detail";
import ConceptBrowserPage from "@/pages/concept-browser";
import GSFPage from "@/pages/gsf";
import ConceptDetailPage from "@/pages/concept-detail";
import HGSPage from "@/pages/hgs";
import HumanityCreationPage from "@/pages/humanity-creation";
import TimelineWarsPage from "@/pages/timeline-wars";
import UniversalTimeMatrixPage from "@/pages/universal-time-matrix";
import Visualizations3DPage from "@/pages/3d-visualizations";
import PsychicSelfDefensePage from "@/pages/psychic-self-defense";
import BeingsEntitiesPage from "@/pages/beings-entities";
import HigherSelfEvolutionPage from "@/pages/higher-self-evolution";
import BlogTimelineShiftPage from "@/pages/blog-timeline-shift";
import NAAToolsWeaponsPage from "./pages/naa-tools-weapons";
import NotFound from "@/pages/not-found";
import VERSAssistantPage from './pages/vers-assistant';
import EnhancedVERSPage from './pages/enhanced-vers';
import AdvancedConversationalAIPage from './pages/advanced-conversational-ai';
import VERSWhisperLivePage from './pages/vers-whisper-live';
import CreativeVisualsPage from './pages/creative-visuals';
import VisualDiagrams from "./pages/visual-diagrams";
import AdvancedVisualizationsPage from './pages/advanced-visualizations';
import TypeScriptDemoPage from './pages/typescript-demo';
import SacredGeometryPage from './pages/sacred-geometry';
import DnaActivationPage from './pages/dna-activation';
import DnaVisualizationPage from './pages/dna-visualization';
import DimensionalAccessPage from './pages/dimensional-access';
import AscensionMechanicsPage from './pages/ascension-mechanics';
import EnhancedToolsPage from './pages/enhanced-tools';

function Router() {
  return (
    <div className="relative min-h-screen mobile-min-vh-fix bg-cosmic-900 no-overscroll selection:bg-sacred-gold/30 selection:text-white">
      <AmbientBackground />
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navigation />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNavigation />
      </div>

      <BreadcrumbNav />
      <AnimatePresence mode="wait">
        <Switch key={location.toString()}>
          <Route path="/">
            <PageTransitionWrapper variant="portal">
              <HomePage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/chakra-development">
            <PageTransitionWrapper>
              <ChakraDevelopmentPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/chakras">
            <PageTransitionWrapper variant="dimensional">
              <ChakrasPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/lightbody">
            <PageTransitionWrapper variant="portal">
              <LightbodyPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/hova-bodies">
            <PageTransitionWrapper>
              <HovaBodiesPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/tree-grid">
            <PageTransitionWrapper variant="dimensional">
              <TreeGridPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/meditation">
            <PageTransitionWrapper variant="portal">
              <MeditationPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/progress">
            <PageTransitionWrapper>
              <ProgressPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/glossary">
            <PageTransitionWrapper>
              <GlossaryPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/soul-codex">
            <PageTransitionWrapper variant="portal">
              <SoulCodexPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/community">
            <PageTransitionWrapper>
              <CommunityPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/tools">
            <PageTransitionWrapper variant="portal">
              <ToolsPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/enhanced-tools">
            <PageTransitionWrapper variant="portal">
              <EnhancedToolsPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/knowledge-base">
            <PageTransitionWrapper>
              <KnowledgeBasePage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/concept/:id">
            <PageTransitionWrapper>
              <ConceptDetailPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/chakra-detail">
            <PageTransitionWrapper>
              <ChakraDetailPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/lightbody-detail">
            <PageTransitionWrapper>
              <LightbodyDetailPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/concept-browser">
            <PageTransitionWrapper>
              <ConceptBrowserPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/gsf">
            <PageTransitionWrapper variant="portal">
              <GSFPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/concept-detail/:id">
            <PageTransitionWrapper>
              <ConceptDetailPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/hgs">
            <PageTransitionWrapper>
              <HGSPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/humanity-creation">
            <PageTransitionWrapper variant="portal">
              <HumanityCreationPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/timeline-wars">
            <PageTransitionWrapper>
              <TimelineWarsPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/universal-time-matrix">
            <PageTransitionWrapper variant="dimensional">
              <UniversalTimeMatrixPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/3d-visualizations">
            <PageTransitionWrapper variant="portal">
              <Visualizations3DPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/psychic-self-defense">
            <PageTransitionWrapper variant="portal">
              <PsychicSelfDefensePage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/beings-entities">
            <PageTransitionWrapper>
              <BeingsEntitiesPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/higher-self-evolution">
            <PageTransitionWrapper>
              <HigherSelfEvolutionPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/blog-timeline-shift">
            <PageTransitionWrapper>
              <BlogTimelineShiftPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/naa-tools-weapons">
            <PageTransitionWrapper>
              <NAAToolsWeaponsPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/vers">
            <PageTransitionWrapper variant="portal">
              <AdvancedConversationalAIPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/assistant">
            <PageTransitionWrapper>
              <VERSAssistantPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/enhanced-vers">
            <PageTransitionWrapper variant="portal">
              <EnhancedVERSPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/advanced-ai">
            <PageTransitionWrapper>
              <AdvancedConversationalAIPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/vers-whisper-live">
            <PageTransitionWrapper>
              <VERSWhisperLivePage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/creative-visuals">
            <PageTransitionWrapper variant="dimensional">
              <CreativeVisualsPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/visual-diagrams">
            <PageTransitionWrapper variant="portal">
              <VisualDiagrams />
            </PageTransitionWrapper>
          </Route>
          <Route path="/advanced-visualizations">
            <PageTransitionWrapper variant="dimensional">
              <AdvancedVisualizationsPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/typescript-demo">
            <PageTransitionWrapper>
              <TypeScriptDemoPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/sacred-geometry">
            <PageTransitionWrapper variant="dimensional">
              <SacredGeometryPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/dna-activation">
            <PageTransitionWrapper variant="portal">
              <DnaActivationPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/dna-visualization">
            <PageTransitionWrapper variant="dimensional">
              <DnaVisualizationPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/dimensional-access">
            <PageTransitionWrapper>
              <DimensionalAccessPage />
            </PageTransitionWrapper>
          </Route>
          <Route path="/ascension-mechanics">
            <PageTransitionWrapper>
              <AscensionMechanicsPage />
            </PageTransitionWrapper>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
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
          <Router />
          <AccessibilityProvider />
          <OnboardingSystem />
          <AscensionFooter />
          <Toaster />
        </SpiritualProgressProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;