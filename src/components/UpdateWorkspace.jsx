import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { workspaceStore } from "../atom/workspaceAtom";
import { user } from "../atom/userAtom";
import {
  getOwnerWorkspaceById,
  ownerWorkspaceEdit,
} from "../utils/client/clientApi";
import { toast } from "react-toastify";
import { authState } from "../atom/authAtom";

export default function UpdateWorkspace() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  const userData = useRecoilValue(user);
  const auth = useRecoilValue(authState);

  const updateWorkspace = () => {
    setLoading(true);
    const userPayload = {
      name: name,
      _creatorId: userData.id,
      description: description,
      id: workspace.id,
    };

    ownerWorkspaceEdit(userPayload)
      .then((res) => {
        toast.success("Workspace edit successful");
        const data = {
          id: workspace.id,
          sessionID: auth?.sessionID,
        };
        getOwnerWorkspaceById(data)
          .then((res) => {
            setWorkspace(res.payload[0]);
          })
          .catch((err) => {
            toast.error(err.response.data.msg);
          });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        setLoading(false);
      });
  };

  useEffect(() => {
    setName(workspace.name);
    setDescription(workspace.description);
  }, []);
  return (
    <div className="p-5 lg:p-10 bg-white rounded-md shadow-small">
      <h3 className="pb-5 font-['ginto-bold']">Workspace Details</h3>

      <div className="form w-full lg:w-[70%] grid gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Workspace Name</label>
          <InputText
            id="username"
            aria-describedby="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Workspace Description</label>
          <InputTextarea
            id="username"
            aria-describedby="name"
            cols={4}
            rows={4}
            value={description}
            className=" resize-none"
            onChange={(e) => setDescription(e.target.value)}
          ></InputTextarea>
        </div>
        <button
          className="pri-btn w-fit"
          disabled={loading || name === "" || description === ""}
          onClick={updateWorkspace}
        >
          {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
          Update
        </button>
      </div>
    </div>
  );
}
