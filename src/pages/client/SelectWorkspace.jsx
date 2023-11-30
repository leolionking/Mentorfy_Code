/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getClientWorkspace } from "../../utils/client/clientApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { getProfile } from "../../utils/general/generalApi";
import { toast } from "react-toastify";
import { authState } from "../../atom/authAtom";
import WorkspaceCard from "../../components/WorkspaceCard";
import Header from "../../components/Header";

export default function SelectWorkspace() {
  const auth = useRecoilValue(authState);
  const [workspace, setWorkspace] = useState([]);
  const [userData, setUserData] = useRecoilState(user);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);

  function listMyWorkspace ()  {
    const payload = {
      sessionID: auth?.sessionID,
    };
    getClientWorkspace(payload)
      .then((res) => {
        setWorkspace(res.payload);
        if (res.payload.length === 1) {
          setWorkspaceData(res.payload[0]);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
    getProfile(payload)
      .then((res) => {
        setUserData(res.payload[0]);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  useEffect(() => {
    listMyWorkspace();
  }, []);
  
  return (
    <div className="">
      <Header />
    <div className="h-full pt-10 lg:h-[70vh] w-full">
      <div className="main h-full grid place-items-center">
        <div className="text-center">
          <p>
            Hello {userData.firstName} {userData.lastName}
          </p>
          <h4 className="font-['ginto-bold'] text-xl">Select your Workspace</h4>

          <div className="pt-10">
            {workspace?.map((res, i) => (
              <WorkspaceCard data={res}/>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
