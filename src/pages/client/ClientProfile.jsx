import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { user } from "../../atom/userAtom";
import { useRecoilValue } from "recoil";
import { getProvinces } from "../../utils/general/generalApi";
import { toast } from "react-toastify";
import { Dropdown } from "primereact/dropdown";

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
    setFirstname(userData?.firstName);
    setLastname(userData?.lastName);
    setCountry(userData?.country);
    setProvince(userData?.province);
    setPostalCode(userData?.postalcode);
    fetchProvinces();
  }, []);

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
        {/* <div className="">
              <Avatar
                label={userData?.firstName?.slice(0, 2)}
                size="xlarge"
                shape="circle"
                className="lg:h-[100px] lg:w-[100px] text-white bg-[var(--primary)]  flex justify-center items-center mx-auto  top-[20px]"
              />
            </div> */}
        <div className="grid gap-4">
          <div className="p-5 lg:p-10 lg:py-14 bg-white rounded-md shadow-small">
            <h3 className="pb-5 text-lg font-['ginto-bold']">
            Manage your personal information
            </h3>
            <div className="grid gap-5 w-full mx-auto">
              <div className="form w-full grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">First name</label>
                  <InputText
                    id="username"
                    aria-describedby="name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Last name</label>
                  <InputText
                    id="username"
                    aria-describedby="name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Country</label>
                  <InputText
                    id="username"
                    aria-describedby="name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Last name</label>
                  <Dropdown
                    id="username"
                    value={province}
                    options={provinces}
                    optionLabel="Province"
                    optionValue="Province"
                    className=" !text-black"
                    filter
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Postal Code</label>
                  <InputText
                    id="username"
                    aria-describedby="name"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="pri-btn w-fit"
                disabled={
                  loading ||
                  postalCode === "" ||
                  firstname === "" ||
                  lastname == "" ||
                  province === ""
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
