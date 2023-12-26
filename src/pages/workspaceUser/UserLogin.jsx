import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { useEffect, useState } from "react";
import { loginuser } from "../../utils/Validation";
import { getUserWorkspace } from "../../utils/general/generalApi";
import { useRecoilState } from "recoil";
import { workspaceStore } from "../../atom/workspaceAtom";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function UserLogin() {
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const route = useLocation();

  const onSubmit = async (values) => {
    const payload = {};
  };

  const login = () => {};

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
    validationSchema: loginuser,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

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
        <div className="main py-3">
          <div className="form w-full md:w-[60vw] h-fit lg:w-[30vw] shadow-small rounded-2xl">
            <div className="">
              <div className="header bg-[var(--primary)] text-white font-['ginto-bold'] text-2xl p-4 flex flex-col items-center justify-center text-center rounded-t-2xl h-[20vh] px-10">
                Welcome Back
                <small className="font-['ginto'] text-sm pt-3 w-[65%]">
                  To keep connected, please sign in with your Email & password
                </small>
              </div>

              <div className="main py-5">
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
                    {errors.email && touched.email && (
                      <p className="error">{errors.email}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Password</label>
                    <Password
                      id="username"
                      name="password"
                      aria-describedby="username-help"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>
                  <button
                    className="pri-btn"
                    disabled={errors.email || errors.password}
                    onClick={login}
                  >
                    {loading ? (
                      <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                    ) : (
                      ""
                    )}
                    Proceed
                  </button>
                  <div className="text-sm text-center grid gap-2">
                    <Link
                     to={"/" + role + "-forgot-password" + "/" + params.id}
                    className="">
                      Forgot Password?
                      <span   className=" pl-2 cursor-pointer text-[var(--primary)]">Reset</span>
                    </Link>
                    <div className="flex items-center gap-2 justify-center">
                      Don't have an account?
                      <Link
                        to={"/" + role + "-signup" + "/" + params.id}
                        className=" cursor-pointer text-[var(--primary)]"
                      >
                        Sign up
                      </Link>{" "}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
