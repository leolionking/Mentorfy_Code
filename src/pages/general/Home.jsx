import React from 'react'
import CarouselComponent from '../../components/Carousel'
import HowItWorks from '../../components/HowItWorks'
import Benefits from '../../components/Benefits'
import Team from '../../components/Team'
import StreetCredibility from '../../components/StreetCredibility'

export default function Home() {
  return (
    <div>
      <CarouselComponent/>
      <HowItWorks/>
      <Benefits/>
      <Team/>
       <StreetCredibility/>
    </div>
  )
}
