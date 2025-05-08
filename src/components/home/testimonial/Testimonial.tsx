import React from 'react'
import TestimonialCard from './TestimonialCard'

export const Testimonial = () => {
  return (
    <section className="container  py-16 px-4 mt-[100px] font-sans">
      <div className=" mx-auto text-center">
        <div className="inline-block bg-[#0872ba4d] text-black px-4 py-2 -rotate-6 rounded-lg text-sm mb-6 font-sans">
          Testimonial
        </div>
        <h1 className="text-3xl md:text-[48px] font-bold text-slate-900 mb-6 font-sans">
          What Our Members Say
        </h1>
        <p className="text-[16px] md:text-[20px] text-[#344054]  mx-auto font-sans">
        Hear from others who share your passion for 
        exploring new cultures, experiencing life abroad, and making the most of every opportunity
        </p>
      </div>
      <TestimonialCard />
    </section>
  );
}
