import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AudiencePicker from "@/components/AudiencePicker";
import EntryPoints from "@/components/EntryPoints";
import BusinessTypes from "@/components/BusinessTypes";
import FeaturedSection from "@/components/FeaturedSection";
import Agents from "@/components/Agents";
import InteractiveMap from "@/components/InteractiveMap";
import SiteFooter from "@/components/SiteFooter";
import db from "@/lib/db";

export default async function Home() {
  // Fetch real properties from Supabase
  const { data: properties } = await db
    .from('properties_inventory')
    .select('*');

  // Fetch Elite Agents
  const { data: agents } = await db
    .from('agents')
    .select('*')
    .limit(3);

  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <Hero />

      {/* Pick your track: consumer vs business */}
      <AudiencePicker />

      {/* Consumer journeys */}
      <EntryPoints />

      {/* Interactive Geographical View */}
      <InteractiveMap properties={properties || []} />

      {/* Featured Properties Section */}
      <FeaturedSection properties={properties?.slice(0, 3) || []} />

      <Agents agents={agents || []} />

      {/* Business platform preview */}
      <BusinessTypes variant="section" />

      <SiteFooter />
    </div>
  );
}
