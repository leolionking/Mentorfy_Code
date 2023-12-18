import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import RecentSignup from "./RecentSignup";
import { getMentorsByWorkspaceId } from "../../utils/mentor/mentorApi";
import { authState } from "../../atom/authAtom";
import { workspaceStore } from "../../atom/workspaceAtom";
import { getMenteesByWorkspaceId } from "../../utils/mentee/menteeApi";
import { getRecentOnboarding } from "../../utils/client/clientApi";

export default function Dashboard() {
  const userData = useRecoilValue(user);
  const auth = useRecoilValue(authState);
  const workspaceData = useRecoilValue(workspaceStore);

  const [mentors, setMentors] = useState(0);
  const [mentees, setMentees] = useState(0);

  const listMentors = () => {
    const payload = {
      sessionID: auth?.sessionID,
      id: workspaceData.id,
    };
    getMentorsByWorkspaceId(payload)
      .then((res) => {
        setMentors(res.payload.length);
      })
      .catch((err) => console.log(err));
  };

  const listMentees = () => {
    const payload = {
      sessionID: auth?.sessionID,
      id: workspaceData.id,
    };
    getMenteesByWorkspaceId(payload)
      .then((res) => {
        setMentees(res.payload.length);
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    listMentors();
    listMentees();
  }, []);

  return (
    <div>
      <div className="p-4 lg:p-10">
        <h1 className="pt-3 text-xl lg:text-3xl font-['ginto-bold']">
          {" "}
          Welcome {userData?.firstName} 👏
        </h1>
        <p>Track and Manage your Mentorship Workspace</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
          <div className="card border border-[#F2F2F2] shadow-card p-6 rounded-lg bg-white">
            <div className="top flex items-center justify-between">
              <p>Total Mentors</p>
              <i className="pi pi-users p-2 bg-[var(--primary)] text-white rounded-full"></i>
            </div>
            <div className="pt-10">
              <p className="text-5xl"> {mentors}</p>
            </div>
          </div>
          <div className="card border border-[#F2F2F2] shadow-card p-6 rounded-lg bg-white">
            <div className="top flex items-center justify-between">
              <p>Total Mentees</p>
              <i className="pi pi-users p-2 bg-[var(--primary)] text-white rounded-full"></i>
            </div>
            <div className="pt-10">
              <p className="text-5xl"> {mentees}</p>
            </div>
          </div>
          <div className="card border border-[#F2F2F2] shadow-card p-6 rounded-lg bg-white">
            <div className="top flex items-center justify-between">
              <p>Avg. Weekly Engagement</p>
              <i className="pi pi-users p-2 bg-[var(--primary)] text-white rounded-full"></i>
            </div>
            <div className="pt-10">
              <p className="text-5xl"> 0</p>
            </div>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-[8fr,4fr] gap-4">
          <RecentSignup />
          <div className="card border border-[#F2F2F2] shadow-card p-6 rounded-lg bg-white">
            <div className="top flex items-center justify-between">
              <p>Recent Activities</p>
            </div>
            <div className="pt-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
