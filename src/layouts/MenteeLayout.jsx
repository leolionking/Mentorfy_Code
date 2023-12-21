import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MenteeLayout() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}
