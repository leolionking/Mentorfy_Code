import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useFormik } from "formik";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { onboardClientValidation } from "../../utils/Validation";
import { Dropdown } from "primereact/dropdown";

export default function ClientOnboard() {
  const [registration, setRegistration] = useRecoilState(registerUserAtom);
  const countries = ["Canada", "Others"];

  const onSubmit = async (values) => {
    const { user, ...others } = registration;
    const payload = {
      ...others,
      user: {
        ...values,
        ...user,
      },
    };
  };

  const proceed = () => {
    const payload = {
      ...registration,
      user: {
        ...registration.user,
        confirmPassword: values.confirmPassword,
        password: values.password,
      },
      onboardStep: 2,

    };
    setRegistration(payload);
  };

  const saveCountry = () => {
    const payload = {
      ...registration,
      user: {
        ...registration.user,
        country: values.country,
      },
      onboardStep: 3,

    };
    setRegistration(payload);
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
      password: "",
      confirmPassword: "",
      country: "",
      province: "",
      postalcode: "",
      phone: "",
      professionalArea: "",
      description: "",
      logo: "",
      workspaceName: "",
    },
    validationSchema: onboardClientValidation,
    onSubmit,
  });

  const setData = () => {
    if (registration.onboardStep === undefined) {
      const payload = {
        ...registration,
        onboardStep: 1,
      };
      setRegistration(payload);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <div className="h-full lg:h-[90vh] w-full ">
      <div className="main  grid place-items-center h-full">
        <div className="form w-full md:w-[60vw] h-fit lg:w-[30vw] py-10 shadow-small rounded-2xl">
          <div className="">
            {registration.onboardStep === 1 ? (
              <div className="main py-5">
                <div className="header font-['ginto-bold'] text-2xl text-center pb-5">
                  Setup Account password
                </div>

                <div className="grid gap-3">
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
                    {errors.password && touched.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Confirm Password</label>
                    <Password
                      toggleMask
                      feedback={false}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="error">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <button
                    className="pri-btn"
                    disabled={errors.confirmPassword || errors.password}
                    onClick={proceed}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            ) : registration.onboardStep === 2 ? (
              <div className="main py-5">
                <div className="flex items-center justify-between w-full pb-2">
                  <i className="pi pi-arrow-left"></i>
                  <div className="">2/6</div>
                </div>
                <div className="header font-['ginto-bold'] text-2xl text-center pb-5">
                  Select a country
                </div>

                <div className="grid gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Country</label>
                    <Dropdown
                      id="username"
                      name="country"
                      value={values.country}
                      options={countries}
                      className=" !text-black"
                      filter
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.country && touched.country && (
                      <p className="error">{errors.country}</p>
                    )}
                  </div>
                  <button
                    className="pri-btn"
                    disabled={errors.country}
                    onClick={saveCountry}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
