import HeroSection from "@/components/hero-section";
import TournamentStatus from "@/components/tournament-status";
import FeaturedTeams from "@/components/featured-teams";
import LiveStreaming from "@/components/live-streaming";
import LatestNews from "@/components/latest-news";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TournamentStatus />
      <FeaturedTeams />
      <LiveStreaming />
      <LatestNews />
    </>
  );
}
