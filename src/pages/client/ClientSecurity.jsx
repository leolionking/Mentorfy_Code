import React, { useState } from "react";
import { Password } from "primereact/password";
import { useFormik } from "formik";
import { resetPassword } from "../../utils/general/generalApi";
import { toast } from "react-toastify";
import { forgotPassword } from "../../utils/Validation";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";

export default function ClientSecurity() {
  const userData = useRecoilValue(user)

  const onSubmit = async (values) => {
    const payload = {
      password: values.password,
      repeat_password: values.repeat_password,
      user_id: userData.id,
    };
    resetPassword(payload)
      .then((res) => {
        res = res.result[0];
        if (
          res.is_success === false ||
          res.result_title === "Secrets don't match"
        ) {
          toast.error("Incorrect token !!!");
        } else if (
          res.is_success === true &&
          res.result_title === "New password is set"
        ) {
          resetForm()
          toast.success("New password set successfully");
        }
      })
      .catch((e) => {
        if (!e.response) {
          toast.error("please check ");
        }
        if (e.response && e.response.status === 403) {
          toast.error("please check ");
        }
      });
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
              <label htmlFor="username">Confirm new password</label>
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
            Change Password{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
