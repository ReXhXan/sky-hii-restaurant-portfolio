'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollytellingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  
  const frameCount = 120
  const currentFrame = (index: number) => `/assets/sequence/dish-frame-${index.toString().padStart(3, '0')}.png`

  // Preload Images
  useEffect(() => {
    let _images: HTMLImageElement[] = []
    let loadedImages = 0

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image()
        img.src = currentFrame(i)
        _images.push(img)
    }

    setImages(_images)

    return () => {
        _images = []
    }
  }, [])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!canvasRef.current || !containerRef.current || images.length === 0) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context) return
    contextRef.current = context

    // Set Canvas Dimensions directly to match aspect ratio
    canvas.width = 1920
    canvas.height = 1080

    const render = (index: number) => {
        if (!images[index] || !contextRef.current) return
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height)
        contextRef.current.drawImage(images[index], 0, 0, canvas.width, canvas.height)
    }

    // Initial render
    // images[0].onload = () => render(0)
    render(0)

    const scrollData = { frame: 0 }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%', // Pin for 2x viewport height instead of 4x to reduce scrolling amount
            pin: true,
            scrub: 0.1, // Small scrub value for smoother frame updates without delay
        }
    })

    // Animate canvas frames
    tl.to(scrollData, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        duration: 1, // Normalized timeline duration
        onUpdate: () => render(Math.round(scrollData.frame))
    }, 0) // Start at time 0 of timeline

    // Animate text size and opacity
    if (textRef.current) {
        tl.to(textRef.current, {
            scale: 5, // Increase size dynamically
            ease: 'power1.inOut',
            duration: 0.5 // Text grows for the first 50% of the scroll
        }, 0)
        
        // Text vanishes very early mid-zoom when it covers the table
        tl.to(textRef.current, {
            opacity: 0,
            duration: 0.10 // Fades out completely and quickly
        }, 0.05) // Starts fading at just 5%, fully gone at 15% of the scroll
    }

    return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
    }
  }, [images])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
         <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover max-w-full max-h-[100vh]"
         />
      </div>

      {/* Overlay Text elements revealed via ScrollTrigger separate from Canvas logic */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none text-center will-change-transform [transform:translate3d(0,0,0)]"
      >
         <p className="text-xl md:text-3xl uppercase tracking-[0.2em] font-light text-white/50 mb-2">The Symphony</p>
         <h2 className="text-4xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter mix-blend-difference text-white">
            Taste the Future
         </h2>
      </div>
    </div>
  )
}
