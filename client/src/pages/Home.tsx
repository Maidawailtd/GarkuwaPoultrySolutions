import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import LivestockCategories from "@/components/sections/LivestockCategories";
import About from "@/components/sections/About";
import TrainingPrograms from "@/components/sections/TrainingPrograms";
import LivestockGallery from "@/components/sections/LivestockGallery";
import Testimonials from "@/components/sections/Testimonials";
import FarmFacilities from "@/components/sections/FarmFacilities";
import Contact from "@/components/sections/Contact";
import Map from "@/components/sections/Map";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <LivestockCategories />
        <About />
        <TrainingPrograms />
        <LivestockGallery />
        <Testimonials />
        <FarmFacilities />
        <Contact />
        <Map />
      </main>
      <Footer />
    </div>
  );
}
