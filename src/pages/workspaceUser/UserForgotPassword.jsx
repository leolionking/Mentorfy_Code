import React, { useEffect, useState } from "react";
import { forgotPassword } from "../../utils/Validation";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilState } from "recoil";
import {
  checkIfUserExist,
  getUserWorkspace,
} from "../../utils/general/generalApi";
import { toast } from "react-toastify";
import { storeData } from "../../atom/storeAtom";
import { InputText } from "primereact/inputtext";

export default function UserForgotPassword() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState();
  const [store, setStore] = useRecoilState(storeData);
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  const navigate = useNavigate();
  const route = useLocation();
  const params = useParams();

  const resetPassword = () => {
    const payload = {
      user_id: email.toLowerCase(),
    };
    checkIfUserExist({ email: email.toLowerCase() }).then((res) => {
      if (res.payload.length === 1) {
        forgotPassword(payload).then((res) => {
          toast.success("Check your email for otp");
          const payload = {
            email: email,
          };
          setStore(payload);
          navigate("/reset-otp");
        });
      } else {
        toast.error("User doesn't exists. Please signup");
      }
    });
  };

  useEffect(() => {
    let role;
    const type = route.pathname.includes("mentor");

    if (type) {
      role = "mentor";
    } else {
      role = "mentee";
    }
    const data = {
      id: params.id,
    };
    setRole(role);
    getUserWorkspace(data).then((res) => {
      setWorkspace(res.payload[0]);
    });
  }, []);

  return (
    <div className="h-[100vh] w-full ">
      <div className="main  grid md:grid-cols-2 gap-4 items-center h-full">
        <div className="">
          <div className="w-full">
            <img
              src={workspace.logo}
              alt=""
              className=" pb-2 h-[80px] object-contain"
            />
          </div>
          <h4 className="headFour my-3">Shape Lives with {workspace.name}</h4>
          <div className="">
            <p className="flex items-center gap-3">
              <i className="pi pi-check"></i> Customized Workspace for optimized
              Experience
            </p>
            <p className="flex items-center gap-3">
              <i className="pi pi-check"></i>Effortless/Automatic Mentor-Mentee
              pairing{" "}
            </p>
          </div>
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
                  <InputText
                    id="username"
                    aria-describedby="username-help"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  className="pri-btn"
                  disabled={!email}
                  onClick={resetPassword}
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
