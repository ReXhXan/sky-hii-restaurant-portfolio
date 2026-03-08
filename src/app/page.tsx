import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import Preloader from '@/components/Preloader'
import SplitTextReveal from '@/components/SplitTextReveal'
import ScrollytellingCanvas from '@/components/ScrollytellingCanvas'
import CollageOverlay from '@/components/CollageOverlay'
export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black text-white selection:bg-white/30 selection:text-white">
        <Navbar />
        {/* <Preloader onComplete={() => console.log('Loaded')} /> */}
        
        {/* The Scrollytelling Showcase - NOW AT TOP */}
        <section className="w-full relative z-20 bg-black pt-20">
          <ScrollytellingCanvas />
        </section>

        {/* Deep Scroll Spacer & Text Panel */}
        <section className="min-h-[150vh] w-full flex flex-col items-center justify-center p-8 bg-black relative overflow-hidden">
          {/* Background Image Setup */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/images/collages/dish-1.jpg" 
              alt="Background Dish" 
              className="w-full h-full object-cover opacity-40 brightness-50 mix-blend-luminosity"
            />
            {/* Gradient top and bottom to blend with other sections */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </div>

          <div className="sticky top-1/2 -translate-y-1/2 max-w-4xl text-center space-y-12 relative z-10">
            <h3 className="text-3xl md:text-6xl font-serif italic text-white/90 leading-tight drop-shadow-lg">
              "We didn't invent comfort food.<br/>We merely elevated it to a symphony of flavor."
            </h3>
            <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
              From handcrafted indulgent beverages and elevated pasta dishes, to algorithmically perfected baked cheese penne. Every ingredient is meticulously curated to bypass your tastebuds and connect directly with your soul.
            </p>
          </div>
        </section>

        {/* Collage Display Section */}
        <CollageOverlay />

        {/* Chef's Vision Section */}
        <section id="chef" className="min-h-screen relative flex items-center justify-center p-8 bg-[#0a0a0a] border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-7xl font-serif italic text-white/90 leading-tight">
                The Architect<br/>Behind the Plate
              </h2>
              <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
                "We approach cooking as a structural discipline. Each element is drafted, prototyped, and tested until the final flavor profile achieves perfect equilibrium."
              </p>
              <div className="pt-4">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 border-b border-white/20 pb-2">Chef John Doe // Executive Visionary</span>
              </div>
            </div>
            <div className="flex-1 w-full aspect-square relative rounded-full overflow-hidden border border-white/10">
              <img src="/images/collages/dish-2.jpg" alt="Chef Vision" className="w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-[80vh] relative flex flex-col items-center justify-center p-8 bg-black text-center space-y-12">
           <h2 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase text-white/90">
              Immerse Yourself
           </h2>
           <p className="max-w-3xl text-lg md:text-2xl text-white/50 font-light leading-relaxed">
             Dining at Sky Hii is not merely a meal; it is a meticulously choreographed sequence of sensory activations. From the ambient acoustic dampening, to the algorithmically calibrated lighting, every variable is designed to amplify the culinary event.
           </p>
        </section>

        {/* Outro Video Section - NOW AT END */}
        <section className="relative h-[200vh] w-full bg-black">
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-8 text-center overflow-hidden">
            {/* Ambient Background Video */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              suppressHydrationWarning
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
            >
              <source src="/videos/restaurant-promo.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlay for text readability and cinematic fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black pointer-events-none" />

            <SplitTextReveal 
              text="REDEFINING" 
              className="text-white/60 text-sm md:text-xl uppercase tracking-[0.5em] mb-4 font-light relative z-10"
              delay={0.5}
            />
            <SplitTextReveal 
              text="CULINARY PERFECTION" 
              className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mix-blend-difference relative z-10"
              delay={0.8}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-20 border-t border-white/10 text-center text-white/30 text-sm uppercase tracking-widest relative z-30 bg-black">
            © 2026 SKY HII. All Systems Operational.
        </footer>
      </main>
    </SmoothScroll>
  )
}
