import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { getUserByWorkspace } from "../../utils/general/generalApi";
import { getMatchingByMentee } from "../../utils/mentee/menteeApi";
import { getMatchingByMentor } from "../../utils/mentor/mentorApi";

export default function UserMatches() {
  const auth = useRecoilValue(authState);
  const workspace = useRecoilValue(workspaceStore);
  const [matches, setMatches] = useState([]);

  const getMatches = () => {
    const payload = {
      sessionID: auth?.sessionID,
      userId: auth?.username,
      status: "new",
      workspaceId: workspace?.id,
    };

    getUserByWorkspace(payload).then((res) => {
      const newPayload = {
        sessionID: auth?.sessionID,
        id: res.payload[0].id,
        status: "new",
      };

      if (auth.role === "mentor") {
        getMatchingByMentee(newPayload).then((res) => {
          setMatches(res.payload);
        });
      }
      {
        getMatchingByMentor(newPayload).then((res) => {
          setMatches(res.payload);
        });
      }
    });
  };

  useEffect(() => {
    getMatches();
  }, []);
  return (
    <div>
      <h1 className="text-xl lg:text-2xl font-['ginto-bold']">
        Proposed {auth.role === "mentor" ? "Mentees" : "Mentors"}
      </h1>
      <p className="text-sm">
        Temporary Text you have no these mentees suggestions
      </p>
      <div className="py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {matches.map((res) => (
            <UserCard />
          ))}
        </div>
      </div>
    </div>
  );
}
