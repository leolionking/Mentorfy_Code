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
import SkeletonBody from '../../components/SkeletonBody';

export default function SelectWorkspace() {
  const auth = useRecoilValue(authState);
  const [workspace, setWorkspace] = useState([]);
  const [userData, setUserData] = useRecoilState(user);
  const [loading, setLoading] = useState(false);
  const [workspaceData, setWorkspaceData] = useRecoilState(workspaceStore);

  const listMyWorkspace = () => {
    setLoading(true);
    const payload = {
      sessionID: auth?.sessionID,
    };
    getClientWorkspace(payload)
      .then((res) => {
        setLoading(false);
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
  }

  useEffect(() => {
    listMyWorkspace();
  }, []);

  return (
    <div className="">
      <Header />
      <div className="h-[70vh] pt-10 min-h-[90vh] w-full bg-[#E6F9EB]/[0.2]">
        <div className="main h-full grid place-items-center">
          <div className="text-center">
            <p>
              Hello {userData.firstName} {userData.lastName}
            </p>
            <h4 className="font-['ginto-bold'] text-xl">
              Select your Workspace
            </h4>

            <div className="pt-10">
              {workspace?.map((res, i) => (
                <WorkspaceCard data={res} />
              ))}
            </div>
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-5">
                {[1,2,3].map((res)=> (
                  <div key={res}>
                     <SkeletonBody type={1}/>
                  </div>

                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
