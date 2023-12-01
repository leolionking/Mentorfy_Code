import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { useFormik } from "formik";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { onboardClientValidation } from "../../utils/Validation";
import { Dropdown } from "primereact/dropdown";
import { getProvinces } from "../../utils/general/generalApi";
import { toast } from "react-toastify";

export default function ClientOnboard() {
  const [registration, setRegistration] = useRecoilState(registerUserAtom);
  const [provinces, setProvinces] = useState([]);
  const countries = ["Canada", "Others"];
  const stages = 7
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
  // stage 1
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
  // stage 2
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
  // stage 3
  const saveProvices = () => {
    const payload = {
      ...registration,
      user: {
        ...registration.user,
        province: values.province,
        postalcode: values.postalcode,
        phone: values.phone,
      },
      onboardStep: 4,
    };
    setRegistration(payload);
  };
  // stage 4
  const proceedToWorkspace = () => {
    const payload = {
      ...registration,
      onboardStep: 5,
    };
    setRegistration(payload);
  };

  const previous = (data) => {
    const payload = {
      ...registration,
      onboardStep: data,
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

  const fetchProvinces = () => {
    getProvinces()
      .then((res) => {
        setProvinces(res.payload);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };
  useEffect(() => {
    setData();
    fetchProvinces();
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
                  <i
                    className="pi pi-arrow-left"
                    onClick={() => previous(1)}
                  ></i>
                  <div className="">{registration.onboardStep}/{stages}</div>
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
            ) : registration.onboardStep === 3 ? (
              <div className="main py-5">
                <div className="flex items-center justify-between w-full pb-2">
                  <i
                    className="pi pi-arrow-left"
                    onClick={() => previous(2)}
                  ></i>
                  <div className="">{registration.onboardStep}/{stages}</div>
                </div>
                <div className="header font-['ginto-bold'] text-2xl text-center pb-5">
                  Province & other details
                </div>

                <div className="grid gap-3">
                  <div className="grid md:grid-cols-2 gap-2 w-full h-full">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="username">Province</label>
                      <Dropdown
                        id="username"
                        name="province"
                        value={values.province}
                        options={provinces}
                        optionLabel="Province"
                        optionValue="Province"
                        className=" !text-black"
                        filter
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.province && touched.province && (
                        <p className="error">{errors.province}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="username">Phone Number</label>
                      <InputText
                        id="phone"
                        name="phone"
                        aria-describedby="phone-help"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phone && touched.phone && (
                        <p className="error">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Postal code</label>
                    <InputText
                      id="postalcode"
                      name="postalcode"
                      aria-describedby="postalcode-help"
                      value={values.postalcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.postalcode && touched.postalcode && (
                      <p className="error">{errors.postalcode}</p>
                    )}
                  </div>
                  <button
                    className="pri-btn"
                    disabled={
                      errors.phone || errors.postalcode || errors.province
                    }
                    onClick={saveProvices}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : registration.onboardStep === 4 ? (
              <div className="main py-5">
                <div className="flex items-center justify-between w-full pb-2">
                  <div className="ml-auto">{registration.onboardStep}/{stages}</div>
                </div>
                <div className=" text-center text-5xl">🎉</div>
                <div className="header font-['ginto-bold'] font-black text-2xl text-center pb-5">
                  Welcome, <br /> {registration.user.fullName}
                </div>

                <div className="grid gap-3">
                  <p className="pb-10 text-center">
                    Let’s get your workspace configured
                  </p>
                  <button className="pri-btn" onClick={proceedToWorkspace}>
                    Next
                  </button>
                </div>
              </div>
            ) : registration.onboardStep === 5 ? (
              <div className="main py-5">
                <div className="flex items-center justify-between w-full pb-2">
                  <i
                    className="pi pi-arrow-left"
                    onClick={() => previous(4)}
                  ></i>
                  <div className="">{registration.onboardStep}/{stages}</div>
                </div>
                <div className="header font-['ginto-bold'] text-2xl text-center pb-5">
                  🙌 Right on! configure your Workspace
                </div>

                <div className="grid gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Workspace Name</label>
                    <InputText
                      id="username"
                      name="workspaceName"
                      aria-describedby="username-help"
                      value={values.workspaceName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.workspaceName && touched.workspaceName && (
                      <p className="error">{errors.workspaceName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Areas of Interest</label>
                    <InputText
                      id="username"
                      name="professionalArea"
                      aria-describedby="username-help"
                      value={values.professionalArea}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.professionalArea && touched.professionalArea && (
                      <p className="error">{errors.professionalArea}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Workspace Description</label>
                    <InputTextarea
                      id="username"
                      name="description"
                      aria-describedby="username-help"
                      cols={4}
                      rows={4}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.description && touched.description && (
                      <p className="error">{errors.description}</p>
                    )}
                  </div>
                  <button
                    className="pri-btn"
                    disabled={errors.description || errors.professionalArea || errors.workspaceName}
                    onClick={saveCountry}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : registration.onboardStep === 6 ? (
              <div className="main py-5">
                <div className="flex items-center justify-between w-full pb-2">
                  <i
                    className="pi pi-arrow-left"
                    onClick={() => previous(5)}
                  ></i>
                  <div className="">{registration.onboardStep}/{stages}</div>
                </div>
                <div className="header font-['ginto-bold'] text-2xl text-center pb-5">
                  Province & other details
                </div>

                <div className="grid gap-3">
                  <div className="grid md:grid-cols-2 gap-2 w-full h-full">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="username">Province</label>
                      <Dropdown
                        id="username"
                        name="province"
                        value={values.province}
                        options={provinces}
                        optionLabel="Province"
                        optionValue="Province"
                        className=" !text-black"
                        filter
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.province && touched.province && (
                        <p className="error">{errors.province}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="username">Phone Number</label>
                      <InputText
                        id="phone"
                        name="phone"
                        aria-describedby="phone-help"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phone && touched.phone && (
                        <p className="error">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Postal code</label>
                    <InputText
                      id="postalcode"
                      name="postalcode"
                      aria-describedby="postalcode-help"
                      value={values.postalcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.postalcode && touched.postalcode && (
                      <p className="error">{errors.postalcode}</p>
                    )}
                  </div>
                  <button
                    className="pri-btn"
                    disabled={
                      errors.phone || errors.postalcode || errors.province
                    }
                    onClick={saveProvices}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              registration.onboardStep === 7("")
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
