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
import HomePage from "@/pages/home";
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
import ConceptPage from "@/pages/concept/[id]";
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
import CreativeVisualsPage from './pages/creative-visuals';
import VisualDiagrams from "./pages/visual-diagrams";
import AdvancedVisualizationsPage from './pages/advanced-visualizations';
import TypeScriptDemoPage from './pages/typescript-demo';


function Router() {
  return (
    <div className="min-h-screen mobile-min-vh-fix bg-cosmic-900 no-overscroll">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navigation />
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNavigation />
      </div>
      
      <BreadcrumbNav />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/chakras" component={ChakrasPage} />
        <Route path="/lightbody" component={LightbodyPage} />
        <Route path="/hova-bodies" component={HovaBodiesPage} />
        <Route path="/tree-grid" component={TreeGridPage} />
        <Route path="/meditation" component={MeditationPage} />
        <Route path="/progress" component={ProgressPage} />
        <Route path="/glossary" component={GlossaryPage} />
        <Route path="/soul-codex" component={SoulCodexPage} />
        <Route path="/community" component={CommunityPage} />
        <Route path="/tools" component={ToolsPage} />
        <Route path="/knowledge-base" component={KnowledgeBasePage} />
        <Route path="/concept/:id" component={ConceptPage} />
        <Route path="/chakra-detail" component={ChakraDetailPage} />
        <Route path="/lightbody-detail" component={LightbodyDetailPage} />
        <Route path="/concept-browser" component={ConceptBrowserPage} />
        <Route path="/gsf" component={GSFPage} />
        <Route path="/concept-detail/:id" component={ConceptDetailPage} />
        <Route path="/hgs" component={HGSPage} />
        <Route path="/humanity-creation" component={HumanityCreationPage} />
        <Route path="/timeline-wars" component={TimelineWarsPage} />
        <Route path="/universal-time-matrix" component={UniversalTimeMatrixPage} />
        <Route path="/3d-visualizations" component={Visualizations3DPage} />
        <Route path="/psychic-self-defense" component={PsychicSelfDefensePage} />
        <Route path="/beings-entities" component={BeingsEntitiesPage} />
        <Route path="/higher-self-evolution" component={HigherSelfEvolutionPage} />
        <Route path="/blog-timeline-shift" component={BlogTimelineShiftPage} />
        <Route path="/naa-tools-weapons" component={NAAToolsWeaponsPage} />
        <Route path="/vers" component={AdvancedConversationalAIPage} />
        <Route path="/assistant" component={VERSAssistantPage} />
        <Route path="/enhanced-vers" component={EnhancedVERSPage} />
        <Route path="/advanced-ai" component={AdvancedConversationalAIPage} />
        <Route path="/creative-visuals" component={CreativeVisualsPage} />
        <Route path="/visual-diagrams" component={VisualDiagrams} />
        <Route path="/advanced-visualizations" component={AdvancedVisualizationsPage} />
        <Route path="/typescript-demo" component={TypeScriptDemoPage} />
        <Route component={NotFound} />
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
        <Router />
        <AccessibilityProvider />
        <OnboardingSystem />
        <AscensionFooter />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;