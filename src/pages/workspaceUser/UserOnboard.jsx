import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { registerUserAtom } from "../../atom/registrationAtom";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import {
  checkUser,
  checkUserEmailByWorkspace,
  generateOtp,
  getProvinces,
  getUserGenericForm,
  getUserWorkspace,
  validateOtp,
  validateUser,
} from "../../utils/general/generalApi";
import { workspaceStore } from "../../atom/workspaceAtom";
import { onboardUserValidation } from "../../utils/Validation";
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import { InputTextarea } from "primereact/inputtextarea";
import { getProfAreaByWorkspaceOwner } from "../../utils/client/clientApi";
import avaterNew from "../../assets/avatar-new.png";
import { InboxOutlined } from "@ant-design/icons";

export default function UserOnboard() {
  const params = useParams();
  const route = useLocation();
  const [registration, setRegistration] = useRecoilState(registerUserAtom);
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [professionalArea, setProfessionalArea] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [image, setImage] = useState();
  const [dataUrl, setDataUrl] = useState();

  const genders = ["Male", "Female", "Others"];
  const yearsOfExperiences = [
    "Less than 2 years",
    "2-4 years",
    "5-8 years",
    "More than 8 years",
  ];
  let newArray = new Map();
  const setValues = (data, i) => {
    newArray.set(i, data);
  };
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
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      step: 2,
    };
    const verifiedUserPayload = {
      ...registration,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      step: 3,
    };
    const checkEmail = {
      id: values.email.toLowerCase(),
    };
    const emailData = {
      email: values.email.toLowerCase(),
    };

    const data = {
      id: params.id,
      email: values.email.toLowerCase(),
    };

    checkUser(checkEmail).then((res) => {
      setLoading(false);

      if (res?.payload.length === 0 || res.payload[0].isVerified === false) {
        generateOtp(emailData).then((res) => {
          setRegistration(payload);
        });
      } else {
        checkUserEmailByWorkspace(data)
          .then((res) => {
            setLoading(false);
            if (res.payload.length === 1) {
              toast.error("User already exists. Please login");
            } else {
              setRegistration(verifiedUserPayload);
            }
          })
          .catch((e) => {
            setLoading(false);
            toast.error(e.response.data.msg);
          });
      }
    });
  };

  // step 2

  const validateOtpEntry = async () => {
    setLoading(true);
    const payload = {
      otp: values.otp,
      id: registration.email.toLowerCase(),
    };

    validateOtp(payload)
      .then((res) => {
        if (res.payload.length === 0) {
          toast.error("Invalid OTP");
        } else {
          const userPayload = {
            id: registration.email,
          };
          validateUser(userPayload).then((res) => {
            toast.success("OTP validation successful");
            const newPayload = {
              ...registration,
              step: 3,
            };
            setRegistration(newPayload);
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  const regenerateOtp = () => {
    setLoading(true);
    const payload = {
      email: registration.email,
    };
    generateOtp(payload)
      .then((res) => {
        toast.success("Check your email for new OTP");
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
    setLoading(false);
  };

  // step 3

  const proceedToDetails = () => {
    const payload = {
      ...registration,
      password: values.password,
      confirmPassword: values.confirmPassword,
      step: 4,
    };
    setRegistration(payload);
  };

  // step 4
  const proceedToEvaluation = () => {
    const payload = {
      ...registration,
      step: 5,
    };
    setRegistration(payload);
  };
  // step 5
  const proceedToSummary = () => {
    let selectedValues = [];
    newArray.forEach((res) => {
      selectedValues.push(res);
    });
    const payload = {
      ...registration,
      form: selectedValues[0],
      step: 6,
    };
    setRegistration(payload);
  };

  // step 6
  const proceedToWorksapce = () => {
    const payload = {
      ...registration,
      summary: values.summary,
      step: 7,
    };
    setRegistration(payload);
  };

  let stages = 8;

  const previous = (data) => {
    const payload = {
      ...registration,
      step: data,
    };
    setRegistration(payload);
  };

  // step 7
  const proceedToImage = () => {
    const payload = {
      ...registration,
      linkedin: values.linkedin,
      yearsOfExperiences: values.yearsOfExperience,
      professionalArea: values.professionalArea,
      step: 8,
    };
    setRegistration(payload);
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
  const initialValues = {
    password: "",
    confirmPassword: "",
    phone: "",
    postalcode: "",
    province: "",
    city: "",
    yearsOfExperience: "",
    firstName: "",
    gender: "",
    lastName: "",
    professionalArea: "",
    email: "",
    otp: "",
    summary: "",
    linkedin: "",
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
    validationSchema: onboardUserValidation,
    initialValues: initialValues,
    onSubmit,
  });

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
    let role;
    const type = route.pathname.includes("mentor");

    if (type) {
      role = "mentor";
    } else {
      role = "mentee";
    }
    if (registration.step === undefined) {
      const payload = {
        ...registration,
        step: 1,
        role: role,
      };
      setRegistration(payload);
      const data = {
        id: params.id,
      };
      getUserWorkspace(data).then((res) => {
        setWorkspace(res.payload[0]);
      });
    }
    fetchProvinces();
    const payload = {
      id: params.id,
    };
    getUserGenericForm(payload).then((res) => {
      setFormData(JSON.parse(res.payload[0]?.generic_forms));
    });
    getProfAreaByWorkspaceOwner(payload).then((res) => {
      setProfessionalArea(res.payload);
    });
  }, []);
  return (
    <div>
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
                <i className="pi pi-check"></i> Customized Workspace for
                optimized Experience
              </p>
              <p className="flex items-center gap-3">
                <i className="pi pi-check"></i>Effortless/Automatic
                Mentor-Mentee pairing{" "}
              </p>
            </div>
          </div>
          <div className="form w-full md:w-[60vw] h-fit lg:w-[32vw] py-10  shadow-small rounded-2xl">
            <div className="">
              {registration?.step === 1 ? (
                <div className="main py-3">
                  <div className="form w-full md:w-[60vw] h-fit lg:w-[30vw] shadow-small rounded-2xl">
                    <div className="">
                      <div className="header bg-[var(--primary)] text-white font-['ginto-bold'] text-2xl p-4 flex items-center justify-center text-center rounded-t-2xl h-[20vh] px-10">
                        Let’s create your Mentor Account
                      </div>
                      <div className="main py-5">
                        <form onSubmit={handleSubmit} className="grid gap-3">
                          <div className="grid md:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="username">First Name</label>
                              <InputText
                                id="username"
                                name="firstName"
                                aria-describedby="username-help"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.firstName && touched.firstName && (
                                <p className="error">{errors.firstName}</p>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="username">Last Name</label>
                              <InputText
                                id="username"
                                name="lastName"
                                aria-describedby="username-help"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.lastName && touched.lastName && (
                                <p className="error">{errors.lastName}</p>
                              )}
                            </div>
                          </div>
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
                          <button
                            className="pri-btn"
                            disabled={
                              errors.firstName ||
                              errors.lastName ||
                              errors.email
                            }
                            onClick={proceed}
                          >
                            {loading ? (
                              <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                            ) : (
                              ""
                            )}
                            Proceed
                          </button>
                          <div className="text-sm text-center grid gap-2">
                            <div className="flex items-center gap-2 justify-center">
                              Already have an account?
                              <Link
                                to="/pricing"
                                className=" cursor-pointer text-[var(--primary)]"
                              >
                                Sign in
                              </Link>{" "}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : registration?.step === 2 ? (
                <div className="main py-3">
                  <div className="form w-full md:w-[60vw] h-fit lg:w-[30vw] shadow-small rounded-2xl">
                    <div className="">
                      <div className="header bg-[var(--primary)] text-white font-['ginto-bold'] text-2xl p-4 flex items-center justify-center text-center rounded-t-2xl h-[20vh] px-10">
                        OTP Verification
                      </div>
                      <div className="main py-5">
                        <form onSubmit={handleSubmit} className="grid gap-3">
                          <div className="text-center text-sm">
                            <p className="">
                              We've sent an OTP to {registration?.email}
                            </p>
                            <p className=" py-1">
                              Didn’t get OTP?{" "}
                              <span
                                onClick={regenerateOtp}
                                className="text-[var(--primary)] cursor-pointer"
                              >
                                {" "}
                                Resend OTP{" "}
                              </span>
                            </p>
                          </div>
                          <div className="grid gap-3">
                            <div className="flex flex-col gap-2 w-full">
                              <label htmlFor="username">Enter OTP</label>
                              <InputText
                                id="username"
                                name="otp"
                                keyfilter="int"
                                className=" !tracking-[20px] !text-center !font-bold !text-xl"
                                value={values.otp}
                                maxLength={4}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.otp && touched.otp && (
                                <p className="error">{errors.otp}</p>
                              )}
                            </div>
                          </div>

                          <button
                            className="pri-btn"
                            disabled={errors.otp || loading}
                            onClick={validateOtpEntry}
                          >
                            {loading ? (
                              <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                            ) : (
                              ""
                            )}
                            Verify OTP
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : registration?.step === 3 ? (
                <div className="main py-3 ">
                  <div className="flex items-center justify-between w-full pb-2">
                    <div className="ml-auto">
                      {registration.step}/{6}
                    </div>
                  </div>
                  <div className="header font-['ginto-bold'] text-2xl text-center pb-5">
                    Hello, Let’s Create your Account Password
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
                      onClick={proceedToDetails}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              ) : registration?.step === 4 ? (
                <div className="main py-3">
                  <div className="flex items-center justify-between w-full pb-2">
                    <i
                      className="pi pi-arrow-left cursor-pointer"
                      onClick={() => previous(2)}
                    ></i>
                    <div className="">
                      {registration.step}/{stages}
                    </div>
                  </div>
                  <div className="header font-['ginto-bold'] text-2xl text-center pb-5">
                    Province & other details
                  </div>

                  <div className="grid gap-3">
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
                    <div className="flex flex-col gap-2">
                      <label htmlFor="gender">Sex</label>
                      <Dropdown
                        id="gender"
                        name="gender"
                        value={values.gender}
                        options={genders}
                        className=" !text-black"
                        filter
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.gender && touched.gender && (
                        <p className="error">{errors.gender}</p>
                      )}
                    </div>
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
                        <label htmlFor="username">City</label>
                        <InputText
                          id="city"
                          name="city"
                          aria-describedby="phone-help"
                          value={values.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.city && touched.city && (
                          <p className="error">{errors.city}</p>
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
                      onClick={proceedToEvaluation}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : registration.step === 5 ? (
                <div className="main py-3">
                  <div className="flex items-center justify-between w-full pb-2">
                    <i
                      className="pi pi-arrow-left cursor-pointer"
                      onClick={() => previous(2)}
                    ></i>
                    <div className="">
                      {registration.step}/{stages}
                    </div>
                  </div>
                  <div className="header font-['ginto-bold'] text-2xl text-center">
                    Mentor Evaluation
                  </div>
                  <p className="text-sm text-center py-2 pb-5">
                    We’ll use this to match you with the right Mentee
                  </p>

                  <div className="grid gap-3">
                    {formData &&
                      formData?.map((data, i) => (
                        <>
                          <label>{data.label}</label>
                          <span key={i} className="p-float-label">
                            <select
                              name=""
                              id=""
                              value={newArray[i]}
                              onChange={(e) => setValues(e.target.value, i)}
                              className=" w-full h-[50px] px-3 text-black bg-white border border-gray-300  rounded"
                            >
                              <>
                                <option disabled> Select an option </option>
                                {data?.options.map((res, index) => (
                                  <option value={res} key={index}>
                                    {res}
                                  </option>
                                ))}
                              </>
                            </select>
                          </span>
                        </>
                      ))}
                    <button className="pri-btn" onClick={proceedToSummary}>
                      Next
                    </button>
                  </div>
                </div>
              ) : registration.step === 6 ? (
                <div className="main py-3">
                  <div className="flex items-center justify-between w-full pb-2">
                    <i
                      className="pi pi-arrow-left cursor-pointer"
                      onClick={() => previous(2)}
                    ></i>
                    <div className="">
                      {registration.step}/{stages}
                    </div>
                  </div>
                  <div className="header font-['ginto-bold'] text-2xl text-center">
                    Tell us about your yourself
                  </div>
                  <p className="text-sm text-center py-2 pb-5">
                    How would you like to be introduced? Add a short bio
                  </p>
                  <div className="grid gap-3">
                    <div className="flex flex-col gap-2">
                      <InputTextarea
                        id="phone"
                        name="summary"
                        cols={5}
                        rows={7}
                        aria-describedby="phone-help"
                        value={values.summary}
                        placeholder="Maximum of 350 characters..."
                        className=" resize-none bg-[#F8F8F8] border-none p-3"
                        onChange={handleChange}
                        maxLength={350}
                        onBlur={handleBlur}
                      ></InputTextarea>
                      {errors.summary && touched.summary && (
                        <p className="error">{errors.summary}</p>
                      )}
                    </div>
                    <button
                      className="pri-btn"
                      disabled={errors.summary}
                      onClick={proceedToWorksapce}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : registration.step === 7 ? (
                <div className="main py-3">
                  <div className="flex items-center justify-between w-full pb-2">
                    <i
                      className="pi pi-arrow-left cursor-pointer"
                      onClick={() => previous(2)}
                    ></i>
                    <div className="">
                      {registration.step}/{stages}
                    </div>
                  </div>
                  <div className="header font-['ginto-bold'] text-2xl text-center">
                    Workspace Information
                  </div>
                  <p className="text-sm text-center py-2 pb-5">
                    We’ll use this to setup your Mentor Profile
                  </p>
                  <div className="grid gap-3">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="username">LinkedIn Profile</label>
                      <InputText
                        id="username"
                        name="linkedin"
                        aria-describedby="username-help"
                        value={values.linkedin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.linkedin && touched.linkedin && (
                        <p className="error">{errors.linkedin}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="username">Years of Experience</label>
                      <Dropdown
                        id="username"
                        name="yearsOfExperience"
                        value={values.yearsOfExperience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        options={yearsOfExperiences}
                        className=" !text-black"
                        filter
                      />
                      {errors.yearsOfExperience &&
                        touched.yearsOfExperience && (
                          <p className="error">{errors.yearsOfExperience}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="username">Professionl Areas</label>
                      <Dropdown
                        id="username"
                        name="professionalArea"
                        value={values.professionalArea}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        optionLabel="area_title"
                        optionValue="id"
                        filter
                        options={professionalArea}
                        className=" !text-black"
                      />
                      {errors.professionalArea && touched.professionalArea && (
                        <p className="error">{errors.professionalArea}</p>
                      )}
                    </div>

                    <button
                      className="pri-btn"
                      disabled={
                        errors.professionalArea ||
                        errors.yearsOfExperience ||
                        errors.linkedin
                      }
                      onClick={proceedToImage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : registration.step === 8 ? (
                <div className="main py-3">
                  <div className="flex items-center justify-between w-full pb-2">
                    <i
                      className="pi pi-arrow-left cursor-pointer"
                      onClick={() => previous(2)}
                    ></i>
                    <div className="">
                      {registration.step}/{stages}
                    </div>
                  </div>
                  <div className="h-[90px] w-[90px] mx-auto rounded-full">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src={avaterNew}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="header font-['ginto-bold'] text-2xl text-center">
                    Put a face to your Profile
                  </div>
                  <p className="text-sm text-center py-2 pb-5">
                    A face helps you get Requests and let people know who
                    they're Requesting from.
                  </p>
                  <div className="grid gap-3">
                    <div className="">
                      <label htmlFor="upload-button">
                        <div className="p-4 rounded-lg border-dashed border-[1px] border-blue-300 bg-gray-50 flex items-center flex-col justify-center text-center">
                          <p className=" text-[3rem] p-3 text-blue-600">
                            <InboxOutlined />
                          </p>
                          <p className=" text-[1rem] text-gray-700"></p>
                          <p className="text-xs pt-2 pb-10 text-gray-500 w-[80%]">
                            File size limit is 5MB. Accepted formats are PNG and
                            JPG.
                          </p>
                        </div>
                      </label>
                      <input
                        type="file"
                        id="upload-button"
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                    </div>
                    <button
                      className="pri-btn"
                      disabled={
                        !image 
                      }
                      onClick={proceedToEvaluation}
                    >
                      Finish
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
    </div>
  );
}
