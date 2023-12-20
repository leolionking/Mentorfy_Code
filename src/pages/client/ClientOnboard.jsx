/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { useFormik } from "formik";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { onboardClientValidation } from "../../utils/Validation";
import { Dropdown } from "primereact/dropdown";
import { getProvinces, loginApi } from "../../utils/general/generalApi";
import {
  createWorkspaceWithPayment,
  workspaceGenericForm,
} from "../../utils/client/clientApi";
import { toast } from "react-toastify";
import { Chips } from "primereact/chips";
import { InboxOutlined } from "@ant-design/icons";
import { ColorPicker } from "antd";
import { authState } from "../../atom/authAtom";
import { useNavigate } from "react-router-dom";

export default function ClientOnboard() {
  const [registration, setRegistration] = useRecoilState(registerUserAtom);
  const [auth, setAuth] = useRecoilState(authState);
  const [formProperties, setFormProperties] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [image, setImage] = useState();
  const [color, setColor] = useState("000000");

  const [loading, setLoading] = useState(false);
  const [dataUrl, setDataUrl] = useState();
  const countries = ["Canada", "Others"];
  const stages = 7;
  const navigate = useNavigate();
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

  // stage 5
  const workspaceSetup = () => {
    const payload = {
      ...registration,
      workspace: {
        name: values.workspaceName,
        professionalArea: values.professionalArea,
        description: values.description,
      },
      onboardStep: 6,
    };
    setRegistration(payload);
  };
  // stage 6
  const submitForm = () => {
    const property = {
      label: values.label,
      options: values.options,
      acceptedValue: values.acceptedValue,
    };
    setFormProperties([...formProperties, property]);
    resetForm();
  };

  const saveAcceptanceForm = () => {
    const payload = {
      ...registration,
      onboardStep: 7,
      acceptanceForm: formProperties,
    };
    setRegistration(payload);
  };

  const removeData = (index) => {
    const newData = formProperties.splice(index, 1);
    setFormProperties(newData);
  };

  const editData = (data) => {
    setValues({
      acceptedValue: data.acceptedValue,
      options: data.options,
      label: data.label,
    });
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
    resetForm,
    handleBlur,
    handleChange,
    setValues,
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
      label: "",
      acceptedValue: "",
      options: [],
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL?.createObjectURL(e.target.files[0]));
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setDataUrl(reader.result);
      };
    }
  };

  const saveData = () => {
    setLoading(true);
    const payload = {
      ...registration,
      workspace: {
        ...registration.workspace,
        logo: dataUrl,
      },
    };

    setRegistration(payload);
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

  const finishSetup = () => {
    setLoading(true);
    const { fullName, ...others } = registration?.user;
    const firstname = fullName.split(" ")[0];
    const lastname = fullName.split(" ")[1];
    const userPayload = {
      name: registration.workspace.name,
      workspaceLogo: dataUrl,
      color: color.split("#")[1],
      invoice: registration.pricingId,
      description: registration.workspace.description,
      lastName: lastname,
      firstame: firstname,
      newMail: registration.user.email,
      mail: registration.user.email,
      _fiirstProfArea: registration.workspace.professionalArea,
      _password: registration.user.confirmPassword,
      _phone: registration.user.phone,
      _country: registration.user.country,
      _provinceId: registration.user.province,
      _postalcode: registration.user.postalcode,
      _action: "createWithPayment",
    };

    createWorkspaceWithPayment(userPayload)
      .then((data) => {
        setLoading(false);
        toast.success("successful");
        const { email, password } = registration?.user;
        loginApi(email, password)
          .then((res) => {
            const payload = {
              workspace: {
                id: data.result[0].workspaceId,
                userId: data.result[0].id,
              },
              user: res,
            };
            setAuth(payload);
            createDynamicForm(data.result[0].workspaceId);
            navigate("/select-workspace");
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.response.data.msg);
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.msg);
      });
  };

  const createDynamicForm = (workspaceId) => {
    let acceptedValueList = [];
    for (let value = 0; value < registration.acceptanceForm.length; value++) {
      acceptedValueList.push(registration.acceptanceForm[value].acceptedValue);
    }
    const filteredData = registration.acceptanceForm.map((data) => {
      const { acceptedValue, ...others } = data;
      return others;
    });

    const payload = {
      sessionID: auth?.sessionID,
      id: workspaceId,
      acceptance_criteria: acceptedValueList,
      generic_forms: JSON.stringify(filteredData),
    };

    workspaceGenericForm(payload).then((res) => {
      setRegistration(null);
    });
  };

  useEffect(() => {
    setData();
    fetchProvinces();
  }, []);

  return (
    <div className="h-[90vh] w-full ">
      <div
        className={
          registration.onboardStep === 6
            ? "main  grid lg:grid-cols-2 place-items-center relative h-full"
            : "main  grid place-items-center h-full"
        }
      >
        <div className="form w-full md:w-[60vw] h-fit lg:w-[32vw] py-10 shadow-small rounded-2xl">
          <div className="">
            {registration.onboardStep === 1 ? (
              <div className="main py-3">
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
              <div className="main py-3">
                <div className="flex items-center justify-between w-full pb-2">
                  <i
                    className="pi pi-arrow-left cursor-pointer"
                    onClick={() => previous(1)}
                  ></i>
                  <div className="">
                    {registration.onboardStep}/{stages}
                  </div>
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
              <div className="main py-3">
                <div className="flex items-center justify-between w-full pb-2">
                  <i
                    className="pi pi-arrow-left cursor-pointer"
                    onClick={() => previous(2)}
                  ></i>
                  <div className="">
                    {registration.onboardStep}/{stages}
                  </div>
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
              <div className="main py-3">
                <div className="flex items-center justify-between w-full pb-2">
                  <div className="ml-auto">
                    {registration.onboardStep}/{stages}
                  </div>
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
              <div className="main py-3">
                <div className="flex items-center justify-between w-full pb-2">
                  <i
                    className="pi pi-arrow-left cursor-pointer"
                    onClick={() => previous(4)}
                  ></i>
                  <div className="">
                    {registration.onboardStep}/{stages}
                  </div>
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
                    disabled={
                      errors.description ||
                      errors.professionalArea ||
                      errors.workspaceName
                    }
                    onClick={workspaceSetup}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : registration.onboardStep === 6 ? (
              <div className="main py-3">
                <div className="flex items-center justify-between w-full pb-2">
                  <i
                    className="pi pi-arrow-left cursor-pointer"
                    onClick={() => previous(5)}
                  ></i>
                  <div className="">
                    {registration.onboardStep}/{stages}
                  </div>
                </div>
                <div className="header font-['ginto-bold'] text-2xl text-center pb-5">
                  Mentor acceptance criteria
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Enter Field Label</label>
                    <InputText
                      id="username"
                      name="label"
                      onChange={handleChange}
                      value={values.label}
                    />
                    {errors.label && touched.label && (
                      <p className="error">{errors.label}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="options">
                      Enter options separated by comma (,)
                    </label>
                    <Chips
                      name="options"
                      value={values.options}
                      onChange={handleChange}
                      separator=","
                    />

                    {errors.options && touched.options && (
                      <p className="error">{errors.options}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="username">Accepted Value</label>
                    <Dropdown
                      name="acceptedValue"
                      options={values.options}
                      value={values.acceptedValue}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    className="outline-btn"
                    disabled={
                      errors.options || errors.label || errors.acceptedValue
                    }
                    onClick={submitForm}
                  >
                    Add More
                  </button>
                  <button
                    className="pri-btn"
                    disabled={formProperties?.length === 0}
                    onClick={saveAcceptanceForm}
                  >
                    Save & proceed
                  </button>
                </div>
              </div>
            ) : registration.onboardStep === 7 ? (
              <div className="main py-3">
                <div className="flex items-center justify-between w-full pb-2">
                  <i
                    className="pi pi-arrow-left cursor-pointer"
                    onClick={() => previous(5)}
                  ></i>
                  <div className="">
                    {registration.onboardStep}/{stages}
                  </div>
                </div>
                <div className="header font-['ginto-bold'] text-2xl text-center pb-5">
                  Upload Logo & set workspace color
                </div>
                <div className="flex flex-col gap-3">
                  <div className=" w-full mx-auto ">
                    <div className="mt-10 flex flex-col items-center w-full mx-auto justify-center">
                      <div className="">
                        <label htmlFor="upload-button">
                          {image ? (
                            <div className="">
                              <img
                                src={image}
                                alt="logo"
                                className="object-cover w-full h-[80px]"
                              />
                            </div>
                          ) : (
                            <div className="p-4 rounded-lg border-dashed border-[1px] border-blue-300 bg-gray-50 flex items-center flex-col justify-center text-center">
                              <p className=" text-[3rem] p-3 text-blue-600">
                                <InboxOutlined />
                              </p>
                              <p className=" text-[1rem] text-gray-700"></p>
                              <p className="text-xs pt-2 pb-10 text-gray-500 w-[80%]">
                                File size limit is 5MB. Accepted formats are PNG
                                and JPG.
                              </p>
                            </div>
                          )}
                        </label>
                        <input
                          type="file"
                          id="upload-button"
                          accept="image/png, image/jpeg"
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="options">
                      Click to select workspace color
                    </label>
                    <ColorPicker
                      value={color}
                      onChange={(value, color) => setColor(color)}
                      allowClear
                      disabledAlpha
                    />
                  </div>

                  <button className="pri-btn" onClick={finishSetup}>
                    {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
                    Finish
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {registration.onboardStep === 6 ? (
          <div className="relative h-full pt-10 w-full top-0">
            <h2 className="text-lg font-['ginto-bold'] font-black">
              Acceptance Criteria
            </h2>
            <div className="grouped flex flex-col gap-2">
              {formProperties.map((res, i) => (
                <div
                  className="p-5 mt-2 grid lg:grid-cols-[10fr,1fr]  gap-2 w-full shadow-small"
                  key={i}
                >
                  <div className="grid gap-1 text-sm">
                    <div className="question font-['ginto-bold']">
                      {res.label}
                    </div>
                    <div className="options flex items-center gap-4">
                      <span className="font-['ginto-bold']">Options:</span>
                      <p className="">
                        {res?.options.map((option) => (
                          <span>{option} </span>
                        ))}
                      </p>
                    </div>
                    <div className="accepted flex items-center gap-4">
                      <span className="font-['ginto-bold']">
                        Accepted Value:
                      </span>
                      <p>{res.acceptedValue}</p>
                    </div>
                  </div>
                  <div className="text-sm h-full flex justify-start gap-4">
                    <i
                      className="pi pi-pencil text-sm cursor-pointer p-2 hover:bg-slate-200 transition-all rounded-md w-fit h-fit"
                      onClick={() => editData(res)}
                    ></i>
                    <i
                      className="pi pi-trash text-sm cursor-pointer p-2 hover:bg-slate-200 transition-all rounded-md w-fit h-fit"
                      onClick={() => removeData(i)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
