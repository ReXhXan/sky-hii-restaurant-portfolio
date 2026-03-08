'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextRevealProps {
  text: string
  className?: string
  delay?: number
}

export default function SplitTextReveal({ text, className = "", delay = 0 }: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Setup animation
    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll('.char-wrap span')
      
      gsap.fromTo(chars, 
        { 
          yPercent: 100, 
          opacity: 0 
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out",
          delay: delay,
          scrollTrigger: {
            trigger: el,
            start: "top 80%", // trigger when top of element hits 80% viewport height
          }
        }
      )
    }, el)

    return () => ctx.revert()
  }, [text, delay])

  // Custom logic to split text into words and then characters
  const words = text.split(' ')

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word-wrap inline-flex mr-[0.25em] whitespace-nowrap overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="char-wrap inline-block overflow-hidden">
              <span className="inline-block transform translate-y-full opacity-0">
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </div>
  )
}
