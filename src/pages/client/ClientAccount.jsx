import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";

export default function ClientAccount() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
  return (
    <div>
     <div className=" w-full min-h-[90vh]">
      <div className="w-[90%] mx-auto pt-10">
        <div className="flex items-center justify-center mb-10">
          <div className="">
            <h3 className="font-['ginto-bold'] text-2xl pb-1">
            Manage your personal information
            </h3>
            <p className="text-sm">
            Edit personal information
            </p>
          </div>
         
        </div>
        <div className="grid gap-5">
        
        </div>
      </div>
    </div>
    </div>
  );
}
