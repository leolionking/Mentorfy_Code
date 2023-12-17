import React, { useState } from "react";
import { Password } from "primereact/password";


export default function ClientSecurity() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="pt-10">
      <div className="p-5 lg:p-10 lg:py-14 bg-white rounded-md shadow-small">
        <div className="grid gap-5 w-full mx-auto">
          <h3 className="pb-5 text-lg font-['ginto-bold']">
            Change your Account password
          </h3>
          <div className="form w-full grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Enter new password</label>
              <Password
                id="username"
                aria-describedby="name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask={true}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Confirm new password</label>
              <Password
                id="username"
                aria-describedby="name"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                toggleMask={true}

              />
            </div>
          </div>
          <button className="pri-btn w-fit">Change Password </button>
        </div>
      </div>
    </div>
  );
}
