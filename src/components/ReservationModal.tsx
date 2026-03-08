'use client'

import { useState } from 'react'

export default function ReservationModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ date: '', time: '', guests: '2' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col p-8 sm:p-12 animate-in fade-in zoom-in-95 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h3 className="text-3xl font-serif italic mb-2 text-white/90">Curate Your Evening</h3>
        <p className="text-white/50 text-sm mb-8 font-light uppercase tracking-widest">Reserve a table at Sky Hii</p>

        {step === 1 && (
          <form 
            onSubmit={(e) => { e.preventDefault(); setStep(2); }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Time</label>
                  <select 
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  >
                    <option value="" className="bg-[#111]">Select Time</option>
                    <option value="18:00" className="bg-[#111]">6:00 PM</option>
                    <option value="19:00" className="bg-[#111]">7:00 PM</option>
                    <option value="20:00" className="bg-[#111]">8:00 PM</option>
                    <option value="21:00" className="bg-[#111]">9:00 PM</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Guests</label>
                  <select 
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    <option value="1" className="bg-[#111]">1 Person</option>
                    <option value="2" className="bg-[#111]">2 People</option>
                    <option value="3" className="bg-[#111]">3 People</option>
                    <option value="4" className="bg-[#111]">4 People</option>
                    <option value="5+" className="bg-[#111]">5+ People</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black font-medium tracking-wide rounded-full py-4 mt-8 hover:bg-white/90 transition-colors"
            >
              Confirm Availability
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
             </div>
             <h4 className="text-2xl font-serif italic text-white/90">Request Received</h4>
             <p className="text-white/60 font-light max-w-[250px]">
               Our concierge will review your request for a table of {formData.guests} on {formData.date} and contact you shortly.
             </p>
             <button 
                onClick={onClose}
                className="text-sm font-mono tracking-widest text-white/40 border-b border-white/20 pb-1 mt-8 hover:text-white transition-colors"
             >
               Return to site
             </button>
          </div>
        )}
      </div>
    </div>
  )
}
