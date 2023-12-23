import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { user } from "../../atom/userAtom";
import { useRecoilValue } from "recoil";
import { getProvinces } from "../../utils/general/generalApi";
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { editOwnerProfile } from "../../utils/client/clientApi";
import { useFormik } from "formik";
import { clientProfileValidation } from "../../utils/Validation";

export default function ClientProfile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useRecoilValue(user);

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
    fetchProvinces();
  }, []);

  const onSubmit = () => {
    const payload = {};
    editOwnerProfile(payload)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    country: "",
    province: "",
    postalcode: "",
  };

  const loadedValues = {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    country: userData?.country,
    province: userData?.province,
    postalcode: userData?.postalcode,
  }

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
    initialValues: userData ? loadedValues : initialValues,
    validationSchema: clientProfileValidation,
    onSubmit,
  });

  return (
    <div>
      <div className="profile pt-10">
        {/* <div className="flex items-center justify-center mb-4">
              <div className="">
                <h3 className="font-['ginto-bold'] text-lg text-center lg:text-2xl pb-1">
                  Manage your personal information
                </h3>
                <p className="text-sm text-center">Edit personal information</p>
              </div>
            </div> */}
        <div className="">
          <Avatar
            label={userData?.firstName?.slice(0, 1)}
            size="xlarge"
            shape="circle"
            className="lg:h-[120px] text-xl lg:w-[120px] text-white bg-[var(--primary)] absolute left-[50%] translate-x-[-50%] flex justify-center items-center mx-auto  top-[0px]"
          />
          <div className=" absolute left-[50%] translate-x-[-50%] top-[4.7rem] bg-white/40 p-3 rounded-full w-[40px] h-[40px] flex items-center justify-center ">
            <i className="pi pi-camera text-sm"></i>

          </div>
        </div>
        <div className="grid gap-4">
          <div className="p-5 lg:p-10 lg:py-14 bg-white mt-10 rounded-md shadow-small">
            <h3 className="pb-5 text-lg font-['ginto-bold']">
              Manage your personal information
            </h3>
            <div className="grid gap-5 w-full mx-auto">
              <div className="form w-full grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">First name</label>
                  <InputText
                    id="username"
                    name="firstName"
                    aria-describedby="name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Last name</label>
                  <InputText
                    id="username"
                    name="lastName"
                    aria-describedby="name"
                    value={values.lasttName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Country</label>
                  <InputText
                    id="username"
                    name="country"
                    aria-describedby="name"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
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
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Postal Code</label>
                  <InputText
                    id="username"
                    aria-describedby="name"
                    value={values.postalcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <button className="pri-btn w-fit" disabled={!isValid || loading}>
                {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
