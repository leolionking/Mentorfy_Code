import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { professionalAreaAction } from "../utils/client/clientApi";
import { toast } from "react-toastify";
import { authState } from "../atom/authAtom";
import { workspaceStore } from "../atom/workspaceAtom";
import { useRecoilValue } from "recoil";

export default function AddAreasOfInterest({patchValue}) {
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);
  const workspace = useRecoilValue(workspaceStore);
  const auth = useRecoilValue(authState);

  const createArea = () => {
    setLoading(true);
    const payload = {
      _action: "createAuto",
      _creatorId: auth.username,
      _newName: area,
      _url: `${window.location.origin}/${workspace.id}`,
      area_title: area,
    };
    professionalAreaAction(payload)
      .then((res) => {
        toast.success("Area of interest has been added");
        setArea("");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const renameProfArea = () => {
    const payload = {
      _action: "rename",
      _creatorId: auth.username,
      _newName: area,
      area_title: area,
      _url: `${window.location.origin}/${workspace.id}`,
      professional_areaId: patchValue.id,
    };
    professionalAreaAction(payload)
      .then((res) => {
        toast.success("Area of interest has been added");
        setArea("");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div className="p-5 lg:p-10 bg-white rounded-md shadow-small">
      <h3 className="pb-5 font-['ginto-bold']">Areas of Interest</h3>

      <div className="form w-full lg:w-[70%] grid gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">New Area of interest</label>
          <InputText
            id="username"
            aria-describedby="name"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        <button
          className="pri-btn w-fit"
          disabled={loading || area === ''}
          onClick={createArea}
        >
          {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
          Add Area of Interest
        </button>
      </div>
    </div>
  );
}
