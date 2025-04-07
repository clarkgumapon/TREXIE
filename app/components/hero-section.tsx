"use client"

import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-black/50" />
      <Image
        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&auto=format&fit=crop&q=60"
        alt="Fashion Store Background"
        fill
        className="object-cover -z-10"
        priority
      />
      
      {/* Overlay Images */}
      <div className="absolute -right-20 top-20 w-[300px] h-[400px] rotate-12 opacity-90">
        <Image
          src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&auto=format&fit=crop&q=60"
          alt="Fashion Model 1"
          fill
          className="object-cover rounded-2xl shadow-2xl"
        />
      </div>
      <div className="absolute -left-20 bottom-20 w-[250px] h-[350px] -rotate-12 opacity-90">
        <Image
          src="https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&auto=format&fit=crop&q=60"
          alt="Fashion Model 2"
          fill
          className="object-cover rounded-2xl shadow-2xl"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display">
          Elevate Your Style
        </h1>
        <p className="text-xl text-gray-200 max-w-2xl">
          Discover the latest trends in fashion. From elegant dresses to casual wear,
          find your perfect look with our curated collection.
        </p>
      </div>
    </section>
  )
} 