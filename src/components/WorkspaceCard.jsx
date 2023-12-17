import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { workspaceStore } from "../atom/workspaceAtom";

export default function WorkspaceCard({ data }) {
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);
  const navigate = useNavigate();
  const selectWorkspace = (item) => {
    setWorkspaceData(item);
    navigate("/client-dashboard");
  };
  return (
    <div
      className="h-[200px] w-[200px] bg-white rounded-2xl shadow-small flex flex-col items-center gap-4 justify-center hover:border hover:border-[var(--primary)] cursor-pointer transition-all ease-in-out
  "
      onClick={() => selectWorkspace(data)}
    >
      <div className="h-[100px] w-[100px]">
        <img
          src={data?.logo ? data?.logo : ""}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <p className="text-sm">{data?.name}</p>
    </div>
  );
}
