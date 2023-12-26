import React, { useEffect } from "react";
import { getUserWorkspace, validateResetOtp } from "../../utils/general/generalApi";
import SelectWorkspace from "../client/SelectWorkspace";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilState } from "recoil";
import { storeData } from "../../atom/storeAtom";
import { forgotPassword } from "../../utils/Validation";

export default function UserOtp() {
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const [store, setStore] = useRecoilState(storeData);
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  const navigate = useNavigate();
  const route = useLocation();
  const params = useParams();

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
      if (res?.payload[0]?.secret) {
        toast.success("User verified");
        const payload = {
          ...store,
          otp: otp,
        }
        setStore(payload)
        navigate("/reset-password");
      } else {
        toast.error("invalid OTP. Try again");
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
      SelectWorkspace(res.payload[0]);
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
              <div className="header text-center font-['ginto-bold'] text-2xl">
                Check your inbox
              </div>
              <p className="pb-5 text-center text-xs pt-1">
                We've sent an OTP to {store.email}.
              </p>
              <p className="text-center text-sm">
                Didn’t get OTP?{" "}
                <span
                  className="text-[var(--primary)] cursor-pointer"
                  onClick={regenerateOtp}
                >
                  Resend OTP{" "}
                </span>
              </p>
              <div className="grid gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">OTP</label>
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
