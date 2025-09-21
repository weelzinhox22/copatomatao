import HeroSection from "@/components/hero-section";
import TournamentStatus from "@/components/tournament-status";
import FeaturedTeams from "@/components/featured-teams";
import LiveStreaming from "@/components/live-streaming";
import LatestNews from "@/components/latest-news";
import ShareFeaturePopup from "@/components/share-feature-popup";
import ValorantSlider from "@/components/valorant-slider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TournamentStatus />
      <ValorantSlider />
      <FeaturedTeams />
      <LiveStreaming />
      <LatestNews />
      <ShareFeaturePopup />
    </>
  );
}
