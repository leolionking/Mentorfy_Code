import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from "react-router-dom";
import {
  forgotPassword,
  validateResetOtp,
} from "../../utils/general/generalApi";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { storeData } from "../../atom/storeAtom";
export default function ResetPasswordOtp() {
  const [store, setStore] = useRecoilState(storeData)
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const regenerateOtp = () => {
    const payload = {
      user_id: store.email,
    };
    forgotPassword(payload).then((res) => {
      toast.success("Check your email for otp");
    });
  };

  const validateResetUser = () => {
    const payload = {
      id: store.email,
      otp: otp,
    };
    validateResetOtp(payload).then((res) => {
      if (res.payload[0].length === 0) {
        toast.error("invalid OTP. Try again");
      } else {
        toast.success("User verified");
        const payload = {
          ...store,
          otp: otp,
        }
        setStore(payload)
        navigate("/reset-password");
      }
    });
  };
  return (
    <div className="h-[100vh] w-full ">
      <div className="main  grid md:grid-cols-2 place-items-center h-full">
        <div className="h-full w-full "></div>
        <div className="form w-full md:w-[60vw] h-fit lg:w-[30vw] py-10 shadow-small rounded-2xl">
          <div className="">
            <div className="main py-5">
              <div className="header font-['ginto-bold'] text-2xl">
                Check your inbox
              </div>
              <p className="pb-5 text-xs pt-1">
                We've sent an OTP to {store.email}.
              </p>
              <p className="text-center text-sm">
                Didn’t get OTP?{" "}
                <span
                  className="text-[var(--primary)] cursor-pointer"
                  onClick={regenerateOtp}
                >
                  {" "}
                  Resend OTP{" "}
                </span>
              </p>
              <div className="grid gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Otp</label>
                  <InputText
                    id="otp"
                    keyfilter="int"
                    className=" !tracking-[20px] !text-center !font-bold !text-xl"
                    value={otp}
                    maxLength={4}
                    onChange={(e) => setOtp(e.target.value)}
                    aria-describedby="email-help"
                  />
                </div>
                <button
                  className="pri-btn"
                  disabled={!otp}
                  onClick={validateResetUser}
                >
                  Send Email
                </button>
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
