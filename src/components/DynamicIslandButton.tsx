'use client'

import { useState } from 'react'
import ReservationModal from './ReservationModal'

export default function DynamicIslandButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div 
        className={`relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer flex items-center justify-center bg-black border border-white/20 hover:border-white/50
          ${isHovered ? 'w-[200px] h-[50px] rounded-[24px]' : 'w-[120px] h-[40px] rounded-full'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <span className={`absolute transition-all duration-300 text-sm font-medium tracking-wide
          ${isHovered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}>
          Reserve
        </span>

        <div className={`absolute flex items-center justify-between w-full px-5 transition-all duration-500 delay-100
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
           <span className="text-sm font-semibold text-white">Book Table</span>
           <span className="text-xs font-mono text-white/70">8:00 PM</span>
        </div>
      </div>

      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
