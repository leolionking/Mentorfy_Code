import React from 'react'
import CarouselComponent from '../../components/Carousel'
import HowItWorks from '../../components/HowItWorks'
import Benefits from '../../components/Benefits'

export default function Home() {
  return (
    <div>
      <CarouselComponent/>
      <HowItWorks/>
      <Benefits/>
    </div>
  )
}
