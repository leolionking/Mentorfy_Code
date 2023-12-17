import React, { useEffect, useState } from "react";
import { authState } from "../../atom/authAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getUserGenericForm } from "../../utils/general/generalApi";
import { workspaceStore } from "../../atom/workspaceAtom";

export default function ClientAcceptanceCriteria() {
  const [createdForm, setCreatedForm] = useState([]);
  const [ acceptanceValue, setAcceptacevalue] = useState([])
  const workspaceData = useRecoilValue(workspaceStore);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    const payload = {
      id: workspaceData.id,
    };
    getUserGenericForm(payload)
      .then((res) => {
        if (res?.payload[0]["generic_forms"]) {
            setCreatedForm(JSON.parse(res?.payload[0]['generic_forms']))
            setAcceptacevalue(res?.payload[0]['acceptance_criteria'])
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
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
                    <span className="font-['ginto-bold']">Accepted Value:</span>
                    <p>{acceptanceValue[i]}</p>
                  </div>
                </div>
                <div className="text-sm h-full flex justify-start gap-2">
                  <i
                      className="pi pi-pencil text-sm cursor-pointer p-2 hover:bg-slate-200 transition-all rounded-md w-fit h-fit"
                    ></i>
                    <i
                      className="pi pi-trash text-sm cursor-pointer p-2 hover:bg-slate-200 transition-all rounded-md w-fit h-fit"
                    ></i>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="pri-btn w-fit">Add Acceptance Criteria </button>
            <button className="pri-btn w-fit">Save </button>
          </div>
        </div>
      </div>
    </div>
  );
}
