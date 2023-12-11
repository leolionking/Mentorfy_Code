import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { workspaceStore } from '../atom/workspaceAtom'
import { authState } from '../atom/authAtom'

export default function UpdateWorkspace() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const workspace = useRecoilValue(workspaceStore);
    const auth = useRecoilValue(authState);
  
    useEffect(()=> {
        setName(workspace.name)
        setDescription(workspace.description)
    }, [])
  return (
    <div className="p-5 lg:p-10 bg-white rounded-md shadow-small">
    <h3 className="pb-5 font-['ginto-bold']">Workspace Details</h3>

    <div className="form w-full lg:w-[70%] grid gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Workspace Name</label>
        <InputText
          id="username"
          aria-describedby="name"
          value={name}
          onChange={(e)=> setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Workspace Description</label>
        <InputTextarea
          id="username"
          aria-describedby="name"
          cols={4}
          rows={4}
          value={description}
          className=" resize-none"
          onChange={(e)=> setDescription(e.target.value)}
        ></InputTextarea>
      </div>
      <button className="pri-btn w-fit">Update</button>
    </div>
  </div>
  )
}
