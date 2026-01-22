import Hero from '@/sections/Hero';
import LatestArticles from '@/sections/LatestArticles';
import Podcasts from '@/sections/Podcasts';
import Events from '@/sections/Events';
import About from '@/sections/About';
import CTA from '@/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LatestArticles />
      <Podcasts />
      <Events />
      <About />
      <CTA />
    </>
  );
}
