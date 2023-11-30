import React from "react";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
export default function ForgotPasswordClient() {

  return (
    <div className="h-[100vh] w-full ">
      <div className="main  grid md:grid-cols-2 place-items-center h-full">
        <div className="h-full w-full ">
     
        </div>
        <div className="form w-full md:w-[60vw] h-fit lg:w-[30vw] py-10 shadow-small rounded-2xl">
          <div className="">
            <div className="main py-5">
              <div className="header font-['ginto-bold'] text-2xl">
                Forgot Password?
              </div>
              <p className="pb-5 text-xs pt-1">
                Enter your email address and we’ll send you password reset link
              </p>
              <div className="grid gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Email</label>
                  <InputText id="username" aria-describedby="username-help" />
                </div>
                <button className="pri-btn">Send Email</button>
                <div className="text-sm text-center grid gap-2">
                  <div className="">
                    <Link
                      to="/signin"
                      className=" cursor-pointer text-[var(--primary)]"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
