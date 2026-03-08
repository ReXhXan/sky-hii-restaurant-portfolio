'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

export default function CollageOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Staggered reveal for the collage items
    const items = gsap.utils.toArray('.collage-item')
    
    items.forEach((item: any, i) => {
      gsap.fromTo(item, 
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100', // Trigger slightly before it enters fully
            end: 'top center',
            scrub: 1, // Tie animation to scroll momentum
          },
          y: 0,
          opacity: 1,
          ease: 'power3.out'
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="w-full min-h-screen bg-black py-32 px-4 md:px-12 relative z-20">
      
      <div className="max-w-7xl mx-auto mb-24 text-center">
         <h2 className="text-4xl md:text-7xl font-serif italic text-white mb-6">Visual Symphony</h2>
         <p className="text-white/50 tracking-[0.2em] uppercase text-sm">The Anatomy of Flavor</p>
      </div>

      {/* CSS Grid for the Collage Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Collage Item 1 */}
        <div className="collage-item relative aspect-[4/5] group overflow-hidden rounded-xl bg-white/5 border border-white/10">
          {/* USER: Replace the src below with your actual image path, e.g., "/images/collages/pizza.jpg" */}
          <img src="/images/collages/dish-1.jpg" alt="Dish 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 mix-blend-lighten" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             <h4 className="text-2xl font-bold text-white mb-2">Signature Mocha Frappe</h4>
             <p className="text-white/70 text-sm font-light">Decadent layers of cocoa and cream. Topped with structural perfection.</p>
          </div>
        </div>

        {/* Collage Item 2 (Layout offset for organic feel) */}
        <div className="collage-item relative aspect-square md:translate-y-24 group overflow-hidden rounded-xl bg-white/5 border border-white/10">
          {/* USER: Replace the src below with your actual image path */}
          <img src="/images/collages/dish-2.jpg" alt="Dish 2" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 mix-blend-lighten" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             <h4 className="text-2xl font-bold text-white mb-2">Artisan Tomato Pasta</h4>
             <p className="text-white/70 text-sm font-light">Sourced locally, engineered globally. A complex masterpiece of umami and herbs.</p>
          </div>
        </div>

        {/* Collage Item 3 */}
        <div className="collage-item relative aspect-[4/5] md:-translate-y-12 lg:translate-y-0 group overflow-hidden rounded-xl bg-white/5 border border-white/10">
           {/* USER: Replace the src below with your actual image path */}
          <img src="/images/collages/dish-3.jpg" alt="Dish 3" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 mix-blend-lighten" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             <h4 className="text-2xl font-bold text-white mb-2">Four-Cheese Baked Penne</h4>
             <p className="text-white/70 text-sm font-light">Algorithmic dairy dispersion. A perfectly golden crust masking a molten core.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
