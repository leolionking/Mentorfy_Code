import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useFormik } from "formik";
import { loginuser } from "../../utils/Validation";
import { authState } from "../../atom/authAtom";
import { useRecoilState } from "recoil";
import { loginApi } from "../../utils/general/generalApi";
import { toast } from "react-toastify";
export default function LoginClient() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/");
  };
  const onSubmit = async (values) => {
    setLoading(true);
    const { email, password } = values;
    loginApi(email.toLowerCase(), password)
      .then((res) => {
        setAuth(res);
        setLoading(false);
        toast.success("Signin Successful");
        navigate("/select-workspace");
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.response.data.msg);
      });
  };

  const {
    values,
    errors,
    isValid,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginuser,
    onSubmit,
  });
  return (
    <div className="h-[100vh] w-full ">
      <div className="main  grid md:grid-cols-2 place-items-center h-full">
        <div className="h-full w-full ">
          <img
            src={logo}
            alt=""
            onClick={gotoHome}
            className="relative cursor-pointer top-[20%] left-0"
          />
        </div>
        <div className="form w-full md:w-[60vw] h-fit lg:w-[30vw] shadow-small rounded-2xl">
          <div className="">
            <div className="header bg-[var(--primary)] text-white font-['ginto-bold'] text-2xl p-4 flex items-center justify-center text-center rounded-t-2xl h-[20vh]">
              Welcome back to <br /> Mentorfy
            </div>
            <div className="main py-5">
              <p className="pb-5">Sign in to continue</p>
              <form onSubmit={handleSubmit} className="grid gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Email</label>
                  <InputText
                    id="username"
                    name="email"
                    aria-describedby="username-help"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Password</label>
                  <Password
                    toggleMask
                    feedback={false}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <button
                  className="pri-btn"
                  disabled={!isValid || isSubmitting || loading}
                >
                  {loading ? (
                    <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                  ) : (
                    ""
                  )}
                  Sign in
                </button>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
