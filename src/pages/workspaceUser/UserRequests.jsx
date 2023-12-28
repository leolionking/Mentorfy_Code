import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { getUserByWorkspace } from "../../utils/general/generalApi";
import { getMatchingByMentee } from "../../utils/mentee/menteeApi";
import { getMatchingByMentor } from "../../utils/mentor/mentorApi";

export default function UserRequests() {
  const [requests, setRequests] = useState([]);
  const auth = useRecoilValue(authState);
  const workspace = useRecoilValue(workspaceStore);

  const getRequests = () => {
    const payload = {
      sessionID: auth?.sessionID,
      userId: auth?.username,
      status: "new",
      workspaceId: workspace?.id,
    };

    getUserByWorkspace(payload).then((res) => {
      if (auth.role === "mentor") {
        const newPayload = {
          sessionID: auth?.sessionID,
          id: res.payload[0].id,
          status: "requested_by_mentee",
        };
        getMatchingByMentee(newPayload).then((res) => {
          setRequests(res.payload);
        });
      } else {
        const newPayload = {
          sessionID: auth?.sessionID,
          id: res.payload[0].id,
          status: "requested_by_mentor",
        };
        getMatchingByMentor(newPayload).then((res) => {
          setRequests(res.payload);
        });
      }
    });
  };
  useEffect(() => {
    getRequests();
  }, []);
  return (
    <div>
      <h1 className="text-xl lg:text-2xl font-['ginto-bold']">
        Mentee Requests
      </h1>
      <p className="text-sm">
        Temporary Text you have no these mentees suggestions
      </p>
      <div className="py-10">
        <div className="grid grid-cols-4 gap-5">
          {requests.map((res, i) => (
            <UserCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
