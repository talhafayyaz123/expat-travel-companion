import React from 'react'
import { WhyChooseCard } from './WhyChooseCard'

export const WhyChoose = () => {
  return (

     <section className="container bg-slate-50 lg:p-[40px] p-4 mt-[100px]">
      <div className=" mx-auto text-center">
        <div className="inline-block bg-[#0872ba4d] text-gray-800 px-4 py-2 -rotate-6 rounded-lg text-sm mb-6 font-sans">
     
          Why choose us?
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-sans">
        Why Choose Expat Global Group
        </h1>
        <p className="text-lg md:text-xl text-slate-600  mx-auto font-sans">
        Empowering solo globetrotters to travel with confidence and ease worldwide
        </p>
      </div>
      <WhyChooseCard/>

    </section>

  )
}
