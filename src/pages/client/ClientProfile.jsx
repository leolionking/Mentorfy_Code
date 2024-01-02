import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { user } from "../../atom/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getProfile, getProvinces } from "../../utils/general/generalApi";
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { editOwnerProfile } from "../../utils/client/clientApi";
import { useFormik } from "formik";
import { clientProfileValidation } from "../../utils/Validation";
import { authState } from "../../atom/authAtom";

export default function ClientProfile() {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useRecoilState(user);
  const [image, setImage] = useState();
  const auth = useRecoilValue(authState);

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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const saveImage = () => {
    const formData = new FormData();
    const payload = {
      userpic: image,
    };
    formData.append("file", payload);

    editOwnerProfile(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = () => {
    setLoading(true);
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      country: values.country,
      province: values.province,
      postalcode: values.postalcode,
      id: userData?.email,
    };
    editOwnerProfile(payload)
      .then(() => {
        setLoading(false);
        const data = {
          sessionID: auth?.sessionID,
        };
        getProfile(data)
          .then((res) => {
            setUserData(res.payload[0]);
          })
          .catch((err) => {
            toast.error(err.response.data.msg);
          });
        toast.success("Profile updated successfully");
      })
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
    initialValues: userData ? loadedValues : initialValues,
    validationSchema: clientProfileValidation,
    onSubmit,
  });

  useEffect(() => {
    const payload = {
      id: userData.id,
      email: userData.email,
    };
    getProfile(payload).then((res) => {
      setUserData(res.payload[0]);
    });
  }, []);

  return (
    <div>
      <div className="profile pt-10">
        <div className="flex items-center justify-center mb-4">
          <div className="">
            <h3 className="font-['ginto-bold'] text-lg text-center lg:text-2xl pb-1">
              Manage your personal information
            </h3>
            <p className="text-sm text-center">Edit personal information</p>
          </div>
        </div>
        <div className="relative">
          <Avatar
            label={userData?.firstName?.slice(0, 1)}
            size="xlarge"
            shape="circle"
            className="lg:h-[120px] text-xl lg:w-[120px] text-white bg-[var(--primary)] absolute left-[50%] translate-x-[-50%] flex justify-center items-center mx-auto  top-[0px]"
          />
          <div className=" absolute left-[50%] translate-x-[-50%] top-[4.7rem] bg-white/40 p-3 rounded-full w-[40px] h-[40px] flex items-center justify-center ">
            <label htmlFor="upload-button">
              <i className="pi pi-camera text-sm"></i>
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
        <div className="grid gap-4">
          <div className="p-5 lg:p-10 lg:py-14 bg-white mt-10 rounded-md shadow-small">
            <h3 className="pb-5 text-lg font-['ginto-bold']">
              Manage your personal information
            </h3>
            <form onSubmit={handleSubmit} className="grid gap-5 w-full mx-auto">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
