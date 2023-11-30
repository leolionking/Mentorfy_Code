import React from 'react'

export default function WorkspaceCard({data}) {
  return (
    <div
    className="h-[200px] w-[200px] rounded-2xl shadow-small flex flex-col items-center gap-4 justify-center
  "
  >
    <div className="h-[100px] w-[100px]">
      <img
        src={data?.logo ? data?.logo : ""}
        alt=""
        className="w-full h-full object-cover rounded-full"
      />
    </div>
    <p className="text-sm">{data?.name}</p>
  </div>
  )
}
