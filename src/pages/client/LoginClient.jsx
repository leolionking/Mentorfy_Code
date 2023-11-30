import React from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.svg'
export default function LoginClient() {
    const navigate = useNavigate()
    const gotoHome = ()=> {
        navigate('/')
    }
  return (
    <div className="h-[100vh] w-full ">
      <div className="main  grid md:grid-cols-2 place-items-center h-full">
        <div className="h-full w-full ">
            <img src={logo} alt="" onClick={gotoHome} className="relative cursor-pointer top-[20%] left-0" />
        </div>
        <div className="form w-full md:w-[60vw] h-fit lg:w-[30vw] shadow-small rounded-2xl">
          <div className="">
            <div className="header bg-[var(--primary)] text-white font-['ginto-bold'] text-2xl p-4 flex items-center justify-center text-center rounded-t-2xl h-[20vh]">
              Welcome back to <br /> Mentorfy
            </div>
            <div className="main py-5">
              <p className="pb-5">Sign in to continue</p>
              <div className="grid gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Email</label>
                  <InputText id="username" aria-describedby="username-help" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Password</label>
                  <Password toggleMask feedback={false} />
                </div>
                <button className="pri-btn">Sign in</button>
                <div className="text-sm text-center grid gap-2">
                  <Link to="/forgot-password" className="">
                    Forgot Password?
                  </Link>
                  <div className="">
                    Don’t have an account?{" "}
                    <Link
                      to="/pricing"
                      className=" cursor-pointer text-[var(--primary)]"
                    >
                      Create account
                    </Link>{" "}
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
