import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { workspaceStore } from "../atom/workspaceAtom";
import { authState } from "../atom/authAtom";
import {
  getProfAreasByWorkSpace,
  professionalAreaAction,
} from "../utils/client/clientApi";

export default function ListAreasOfInterest() {
  const [area, setArea] = useState();
  const [patchData, setPatchData] = useState();
  const [loading, setLoading] = useState(false);
  const [myArea, setMyArea] = useState();
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  const auth = useRecoilValue(authState);

  const openEdit = (data) => {
    setArea(data.area_title);
    setPatchData(data);
  };

  const getProfessionalAreas = () => {
    const payload = {
      id: workspace.id,
      sessionID: auth.sessionID,
    };
    getProfAreasByWorkSpace(payload).then((res) => {
      setMyArea(res.payload);
    });
  };

  const deleteProfArea = (data) => {
    const payload = {
      _action: "delete",
      _creatorId: auth.username,
      _url: `${window.location.origin}/${workspace.id}`,
      professional_areaId: data.id,
    };
    professionalAreaAction(payload).then((res) => {
      getProfessionalAreas();
    });
  };

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

  const renameProfArea = (data) => {
    const payload = {
      _action: "rename",
      _creatorId: auth.username,
      _newName: area,
      area_title: area,
      _url: `${window.location.origin}/${workspace.id}`,
      professional_areaId: data.id,
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

  useEffect(() => {
    getProfessionalAreas();
  }, []);

  return (
    <div className="grid gap-4">
      <div className="p-5 lg:p-10 bg-white rounded-md shadow-small">
        <h3 className="pb-5 text-lg font-['ginto-bold']">Areas of Interest</h3>

        <div className="form w-full grid gap-4">
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
            disabled={loading || area === ""}
            onClick={createArea}
          >
            {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
            {patchData ? "Update Area of Interest" : " Add Area of Interest"}
          </button>
        </div>
      </div>

      <div className="p-5 lg:p-10 bg-white rounded-md shadow-small">
        <h3 className="pb-5 text-lg font-['ginto-bold']">
          Added Areas of Interest
        </h3>
        <div className="form w-full lg:w-[70%] grid gap-4">
          <div className="flex flex-col gap-2">
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {myArea &&
                myArea.map((area, i) => (
                  <>
                    <div
                      key={i}
                      className="grid grid-cols-[8fr,4fr] items-center text-sm gap-4 p-4 px-6 bg-gray-100 rounded w-full"
                    >
                      <div className="card">{area?.area_title}</div>

                      <div className="">
                        <i
                          className="pi pi-trash !text-xs p-1 w-6 h-6 flex rounded-full cursor-pointer"
                          onClick={() => deleteProfArea(area)}
                        ></i>
                        <i
                          className="pi pi-pencil cursor-pointer p-2  !text-xs"
                          onClick={() => openEdit(area)}
                        ></i>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
