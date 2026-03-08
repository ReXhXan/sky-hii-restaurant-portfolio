import Link from 'next/link'
import DynamicIslandButton from './DynamicIslandButton'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
      {/* Glassmorphism Pill Container */}
      <div className="mx-auto flex items-center justify-between w-full max-w-7xl glass-panel rounded-full px-6 py-3">
        
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-bold tracking-tighter uppercase">
          SKY HII
        </Link>
        
        {/* Center Links (Optional, desktop mostly) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
          <Link href="#chef" className="hover:text-white transition-colors">Chef's Vision</Link>
          <Link href="#experience" className="hover:text-white transition-colors">Experience</Link>
        </div>

        {/* Dynamic Island Reservation */}
        <DynamicIslandButton />
        
      </div>
    </nav>
  )
}
