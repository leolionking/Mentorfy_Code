import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { InputText } from "primereact/inputtext";
import avatar from "../../assets/avatar.svg";
import { useFormik } from "formik";
import { pricing } from "../../utils/Validation";
import {
  checkIfUserExist,
  checkUser,
  generateOtp,
  validateOtp,
  validateUser,
} from "../../utils/general/generalApi";
import { toast } from "react-toastify";

export default function PricingClient() {
  const [plan, setPlan] = useState("monthly");
  const [otp, setOtp] = useState("");
  const [registration, setRegistration] = useRecoilState(registerUserAtom);
  const [loading, setLoading] = useState(false);
  const changePlan = (data) => {
    setPlan(data);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const payload = {
      user: {
        ...values,
      },
      step: 1,
    };
    setRegistration(payload);
    const emailData = {
      email: values.email.toLowerCase(),
    };
    const checkEmail = {
      id: values.email.toLowerCase(),
    };

    checkUser(checkEmail).then((res) => {
      setLoading(false);

      if (res?.payload.length === 0 || res.payload[0].isVerified === false) {
        generateOtp(emailData)
          .then((res) => {
            const payload = {
              user: {
                ...values,
              },
              step: 2,
            };
            setRegistration(payload);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        checkIfUserExist({ email: values.email })
          .then((res) => {
            setLoading(false);
            const payload = {
              user: {
                ...values,
              },
              step: 3,
            };
            if (res.payload.length === 1) {
              setRegistration(payload);
              toast.error("User already exists. Please login");
            } else {
              setRegistration(payload);
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    });
  };

  const validate = () => {
    setLoading(true);

    const payload = {
      otp: otp,
      id: registration?.user?.email,
    };
    validateOtp(payload)
      .then((res) => {
        if (res.payload.length === 0) {
          toast.error("Invalid OTP");
          setLoading(false);
        } else {
          const userPayload = {
            id: registration.user.email,
          };
          validateUser(userPayload).then((res) => {
            toast.success("OTP validation successful");
            const payload = {
              ...registration,
              step: 3,
            };
            setRegistration(payload);
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        setLoading(false);
      });
  };

  const regenerateOtp = () => {
    setLoading(true);
    const payload = {
      email: registration.user.email,
    };
    generateOtp(payload)
      .then((res) => {
        toast.success("Check your email for new OTP");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        setLoading(false);
      });
  };

  const changeEmail = () => {
    changeData()
  }

  const initialValue = {
    email: "",
    fullName: "",
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
    initialValues: initialValue,
    validationSchema: pricing,
    onSubmit,
  });

  const setData = () => {
    if ( registration === undefined ||registration?.step === undefined  ) {
      const payload = {
        ...registration,
        step: 1
      };
      setRegistration(payload);
    }
  }
  const changeData = () => {
      const payload = {
        ...registration,
        step: 1
      };
      setRegistration(payload);
  }
  useEffect(() => {
    setData()
  }, []);
  return (
    <div className="relative">
      <div className={registration?.step === 3 ? "  " : "blur-md "}>
        <div className="h-[60vh] bg-[var(--primary)]">
          <div className="grid place-items-center h-full">
            <div className="">
              {registration && registration?.user ? (
                <div className="flex items-center justify-center gap-2">
                  <div className=" text-center">Hello {registration?.user?.fullName}</div>
                  <button onClick={changeEmail} className="white-btn !h-8 hover:bg-transparent hover:border hover:border-white hover:text-white transition-all ">Change Email</button>
                </div>

              ) : (
                ""
              )}
              <div className="subtitle font-bold">
                Choose your Mentorfy Plan
              </div>
              <h1 className="headTwo text-center w-[75%] mx-auto">
                Designed for{" "}
                <span className="text-white"> Business Teams Like yours</span>{" "}
              </h1>
              <div className="w-fit mx-auto pt-20">
                <div className="border p-1 w-fit rounded-full border-white flex items-center justify-center gap-4">
                  <div
                    className={
                      plan === "monthly"
                        ? "px-8 p-2 bg-white rounded-full"
                        : "px-3 cursor-pointer text-white transition-all ease-in  p-2"
                    }
                    onClick={() => changePlan("monthly")}
                  >
                    Monthly
                  </div>
                  <div
                    className={
                      plan === "quarterly"
                        ? "px-8 p-2 bg-white rounded-full"
                        : "px-3 cursor-pointer text-white transition-all ease-in  p-2"
                    }
                    onClick={() => changePlan("quarterly")}
                  >
                    Quarterly
                  </div>
                  <div
                    className={
                      plan === "yearly"
                        ? "px-8 p-2 bg-white rounded-full"
                        : "px-3 cursor-pointer text-white transition-all ease-in p-2"
                    }
                    onClick={() => changePlan("yearly")}
                  >
                    Yearly
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 py-10">
            <div className="plan border flex  border-orange-400 w-full rounded-xl h-[350px]">
              <div className=" main text-center flex items-center justify-center flex-col gap-2">
                <div className="font-[ginto-bold] text-xl">Pro</div>
                <p>Allows 1 mentor to 1 mentee</p>
                <div className="price">
                  $1,000.00 <span> /month </span>
                </div>
                <button className="border border-orange-400 text-orange-400 w-full rounded-md h-[45px]">
                  Get Started
                </button>
                <div className="">
                  <div className="feature">
                    <i className="pi pi-check"></i>
                    Custom feature 1
                  </div>
                  <div className="feature">
                    <i className="pi pi-check"></i>
                    Custom feature 3
                  </div>
                </div>
              </div>
            </div>
            <div className="plan border flex flex-col border-orange-400 rounded-xl h-[400px] w-full">
              <div className="w-full bg-orange-50 p-2 text-orange-400 text-sm text-center mb-10 rounded-t-xl">
                Recommended
              </div>
              <div className=" main text-center flex items-center justify-center flex-col gap-2">
                <div className="font-[ginto-bold] text-xl">Enterprise</div>
                <p className=" pb-12">Contact sales for pricing</p>
                <button className="border border-orange-400 bg-orange-400 text-white w-full rounded-md h-[45px]">
                  Contact Sales
                </button>
                <div className="">
                  <div className="feature">
                    <i className="pi pi-check"></i>
                    Custom feature 1
                  </div>
                  <div className="feature">
                    <i className="pi pi-check"></i>
                    Custom feature 2
                  </div>
                  <div className="feature">
                    <i className="pi pi-check"></i>
                    Custom feature 3
                  </div>
                </div>
              </div>
            </div>
            <div className="plan border flex  border-orange-400 rounded-xl h-[350px] w-full">
              <div className=" main text-center flex items-center justify-center flex-col gap-2">
                <div className="font-[ginto-bold] text-xl">Pro Plus</div>
                <p>New Tariff description</p>
                <div className="price">
                  $1,400.00 <span> /month </span>
                </div>
                <button className="border border-orange-400 text-orange-400 w-full rounded-md h-[45px]">
                  Get Started
                </button>
                <div className="">
                  <div className="feature">
                    <i className="pi pi-check"></i>
                    Custom feature 1
                  </div>
                  <div className="feature">
                    <i className="pi pi-check"></i>
                    Custom feature 3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {registration?.step !== 3 ? (
        <div className="bg-black/70 h-full absolute top-0 left-0 z-100 w-full">
          <div className="main w-full lg:w-[35vw] bg-white shadow-small p-5 lg:p-10 absolute top-[50%] left-[50%] translate-y-[-70%] translate-x-[-50%] h-fit rounded-2xl ">
            {registration.step === 1 ? (
              <form onSubmit={handleSubmit} className="main grid gap-2">
                <h2 className="headThree text-center flex items-center gap-2 justify-center">
                  Hey there! <img src={avatar} alt="" />
                </h2>
                <p className="text-sm text-center">
                  Stay in the loop by sharing your name & email with us! Don’t
                  worry, we won’t spam your email
                </p>
                <div className="grid gap-3 py-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="fullname">Fullname</label>
                    <InputText
                      id="fullname"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-describedby="fullname-help"
                    />
                    {errors.fullName && touched.fullName && (
                      <p className="error">{errors.fullName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <InputText
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-describedby="email-help"
                    />
                    {errors.email && touched.email && (
                      <p className="error">{errors.email}</p>
                    )}
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
                    Proceed
                  </button>
                </div>
              </form>
            ) : registration.step === 2 ? (
              <div className="main grid gap-2">
                <h2 className="headThree text-center flex items-center gap-2 justify-center">
                  <i className="pi pi-inbox text-2xl text-[var(--primary)]"></i>{" "}
                  Check your inbox
                </h2>
                <p className="text-sm text-center">
                  We've sent an OTP to {registration?.user?.email}.
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
                <div className="grid gap-3 py-5">
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
                    onClick={validate}
                    disabled={loading}
                  >
                    {loading ? (
                      <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                    ) : (
                      ""
                    )}
                    Verify OTP
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
