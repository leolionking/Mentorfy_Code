import React, { useEffect, useState } from "react";
import { authState } from "../../atom/authAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getUserGenericForm } from "../../utils/general/generalApi";
import { workspaceStore } from "../../atom/workspaceAtom";
import { acceptanceCriteriaValidation } from "../../utils/Validation";
import { InputText } from "primereact/inputtext";
import { Chips } from "primereact/chips";
import { Dropdown } from "primereact/dropdown";
import { useFormik } from "formik";

export default function ClientAcceptanceCriteria() {
  const [createdForm, setCreatedForm] = useState([]);
  const [acceptanceValue, setAcceptacevalue] = useState([]);
  const [formProperties, setFormProperties] = useState([]);

  const workspaceData = useRecoilValue(workspaceStore);
  const auth = useRecoilValue(authState);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    const payload = {
      id: workspaceData.id,
    };
    getUserGenericForm(payload)
      .then((res) => {
        if (res?.payload[0]["generic_forms"]) {
          setCreatedForm(JSON.parse(res?.payload[0]["generic_forms"]));
          setAcceptacevalue(res?.payload[0]["acceptance_criteria"]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const saveAcceptanceForm = () => {};

  const submitForm = () => {
    const property = {
      label: values.label,
      options: values.options,
      acceptedValue: values.acceptedValue,
    };
    setFormProperties([...formProperties, property]);
    resetForm();
  };

  const onSubmit = async (values) => {};

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
      label: "",
      acceptedValue: "",
      options: [],
    },
    validationSchema: acceptanceCriteriaValidation,
    onSubmit,
  });

  return (
    <div className=" w-full">
      <div className="pt-10">
        <div className="p-5 lg:p-10 lg:py-14 bg-white rounded-md shadow-small">
          <div className="grid gap-5 w-full mx-auto">
            <h3 className="pb-5 text-lg font-['ginto-bold']">
              Created Acceptance Criteria
            </h3>
            <div className="grouped grid md:grid-cols-2 gap-2">
              {createdForm?.map((res, i) => (
                <div
                  className="p-5 mt-2 grid lg:grid-cols-[10fr,1fr] bg-[#F8F8F8] rounded-md gap-2 w-full border border-dashed"
                  key={i}
                >
                  <div className="grid gap-1 text-sm">
                    <div className="question font-['ginto-bold']">
                      {res.label}
                    </div>
                    <div className="options flex items-center gap-4">
                      <span className="font-['ginto-bold']">Options:</span>
                      <p className="flex items-center gap-3 flex-wrap">
                        {res?.options.map((option) => (
                          <span>{option} </span>
                        ))}
                      </p>
                    </div>
                    <div className="accepted flex items-center gap-4">
                      <span className="font-['ginto-bold']">
                        Accepted Value:
                      </span>
                      <p>{acceptanceValue[i]}</p>
                    </div>
                  </div>
                  <div className="text-sm h-full flex justify-start gap-2">
                    <i className="pi pi-pencil text-sm cursor-pointer p-2 hover:bg-slate-200 transition-all rounded-md w-fit h-fit"></i>
                    <i className="pi pi-trash text-sm cursor-pointer p-2 hover:bg-slate-200 transition-all rounded-md w-fit h-fit"></i>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className="pri-btn w-fit" onClick={openModal}>
                Add Acceptance Criteria{" "}
              </button>
              <button className="pri-btn w-fit">Save </button>
            </div>
          </div>
        </div>
      </div>
      {open ? (
        <div className="dialog">
          <div className=" main transition-all w-full lg:w-[40vw] bg-white shadow-small p-5 lg:p-10 absolute top-[50%] z-[1000] left-[50%] translate-y-[-60%] translate-x-[-50%] h-fit rounded-2xl ">
            <div className=" grid gap-2">
              <div className="main py-3">
                <div className="header font-['ginto-bold'] text-2xl text-center pb-5">
                  <i
                    className="pi pi-times text-black absolute top-5 right-5 p-3 cursor-pointer hover:bg-gray-200 rounded-full transition-all"
                    onClick={openModal}
                  ></i>
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
                    className="pri-btn"
                    disabled={
                      errors.options || errors.label || errors.acceptedValue
                    }
                    onClick={submitForm}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
