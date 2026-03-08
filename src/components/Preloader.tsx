'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface PreloaderProps {
  onComplete: () => void
  totalFrames?: number
}

export default function Preloader({ onComplete, totalFrames = 120 }: PreloaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let loadedCount = 0
    let isMounted = true

    // Function to handle progress updates securely
    const handleProgress = () => {
      loadedCount++
      if (isMounted) {
        setProgress(Math.round((loadedCount / totalFrames) * 100))
      }
    }

    // Preload image sequence frames
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image()
      const paddedIndex = i.toString().padStart(3, '0')
      img.src = `/assets/sequence/dish-frame-${paddedIndex}.png`
      img.onload = handleProgress
      img.onerror = handleProgress // Continue even if one fails
    }

    return () => {
      isMounted = false
    }
  }, [totalFrames])

  useEffect(() => {
    if (progress === 100) {
      // Small delay for smooth exit
      gsap.to('.preloader-container', {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.inOut',
        onComplete: onComplete
      })
    }
  }, [progress, onComplete])

  return (
    <div className="preloader-container fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white">
      <div className="text-6xl font-light tracking-tighter mix-blend-difference">
        {progress.toString().padStart(2, '0')}%
      </div>
      <div className="absolute bottom-10 text-xs font-mono uppercase tracking-widest text-white/50">
        Preparing the Experience
      </div>
    </div>
  )
}
