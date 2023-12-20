import React from "react";
import { useNavigate } from "react-router-dom";
import { Password } from "primereact/password";
import {
  changePassword,
  validateResetOtp,
} from "../../utils/general/generalApi";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { storeData } from "../../atom/storeAtom";
import { useFormik } from "formik";
import { forgotPassword } from "../../utils/Validation";

export default function ResetPasswordClient() {
  const navigate = useNavigate();
  const [store, setStore] = useRecoilState(storeData);
  const gotoHome = () => {
    navigate("/");
  };

  const onSubmit = (values) => {
    if (store?.otp && store?.email) {
      const payload2 = {
        id: store.email,
        otp: store.otp,
      };
      validateResetOtp(payload2).then((res) => {
        if (res?.payload[0]?.secret) {
          const payload = {
            user_id: store.email,
            password: values.password,
            repeat_password: values.repeat_password,
          };
          changePassword(payload)
            .then((res) => {
              toast.success("Password reset successful");
              setStore(null);
              gotoHome();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast.error("invalid OTP. Try again");
        }
      });
    } else {
      toast.error("Sorry you can`t reset ");
      gotoHome();
    }
  };

  const {
    values,
    errors,
    isValid,
    isSubmitting,
    resetForm,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      password: "",
      repeat_password: "",
    },
    validationSchema: forgotPassword,
    onSubmit,
  });
  return (
    <div className="h-[100vh] w-full ">
      <div className="main  grid md:grid-cols-2 place-items-center h-full">
        <div className="h-full w-full "></div>
        <div className="form w-full md:w-[60vw] h-fit lg:w-[30vw] py-10 shadow-small rounded-2xl">
          <div className="">
            <div className="main py-5">
              <div className="header font-['ginto-bold'] text-2xl pb-8">
                Enter New Password
              </div>

              <div className="grid gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">New Password</label>
                  <Password
                    id="username"
                    name="password"
                    aria-describedby="name"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    feedback={false}
                    toggleMask={true}
                  />
                  {errors.password && touched.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Confirm New Password</label>
                  <Password
                    id="username"
                    aria-describedby="name"
                    name="repeat_password"
                    value={values.repeat_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    feedback={false}
                    toggleMask={true}
                  />
                  {errors.repeat_password && touched.repeat_password && (
                    <p className="error">{errors.repeat_password}</p>
                  )}
                </div>
                <button
                  className="pri-btn w-fit"
                  disabled={!isValid || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <i className="pi pi-spin pi-spinner"></i>
                  ) : (
                    ""
                  )}
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
