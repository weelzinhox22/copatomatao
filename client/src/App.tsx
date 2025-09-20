import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import CookieBanner from "@/components/cookie-banner";
import ResourceOptimizer from "@/components/resource-optimizer";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Teams from "@/pages/teams";
import TeamDetails from "@/pages/team-details";
import Players from "@/pages/players";
import RiotPlayerDetails from "@/pages/riot-player-details";
import Tournament from "@/pages/tournament";
import HallOfFame from "@/pages/hall-of-fame";
import Article from "@/pages/article";
import Rules from "@/pages/rules";
import Watch from "@/pages/watch";
import About from "@/pages/about";
import Admin from "@/pages/admin";
import Draft from "@/pages/draft";
import Blog from "@/pages/blog";
import CookiePolicy from "@/pages/cookie-policy";
import PrivacyPolicy from "@/pages/privacy-policy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <ScrollToTop>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/teams" component={Teams} />
            <Route path="/teams/:id" component={TeamDetails} />
            <Route path="/players" component={Players} />
            <Route path="/riot-player/:gameName/:tagLine" component={RiotPlayerDetails} />
            <Route path="/tournament" component={Tournament} />
            <Route path="/hall-of-fame" component={HallOfFame} />
            <Route path="/article" component={Article} />
            <Route path="/rules" component={Rules} />
            <Route path="/watch" component={Watch} />
            <Route path="/about" component={About} />
            <Route path="/admin" component={Admin} />
            <Route path="/draft" component={Draft} />
            <Route path="/blog" component={Blog} />
            <Route path="/cookie-policy" component={CookiePolicy} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route component={NotFound} />
          </Switch>
        </ScrollToTop>
      </div>
      <Footer />
      <ScrollToTopButton />
      <CookieBanner />
      <ResourceOptimizer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
