import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

export default function AddAreasOfInterest() {
    const [interest, setInterest] = useState('')
  return (
    <div className="p-5 lg:p-10 bg-white rounded-md shadow-small">
    <h3 className="pb-5 font-['ginto-bold']">Areas of Interest</h3>

    <div className="form w-full lg:w-[70%] grid gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="username">New Area of interest</label>
        <InputText
          id="username"
          aria-describedby="name"
          value={interest}
          onChange={(e)=> setInterest(e.target.value)}
        />
      </div>

      <button className="pri-btn w-fit">Add Area of Interest</button>
    </div>
  </div>
  )
}
