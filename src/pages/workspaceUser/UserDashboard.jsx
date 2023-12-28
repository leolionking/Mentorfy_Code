import React from "react";
import { useRecoilValue } from "recoil";
import { user } from "../../atom/userAtom";
import emptyActivity from "../../assets/empty-activity.svg";
import noMatch from "../../assets/no-match.svg";
export default function UserDashboard() {
  const userData = useRecoilValue(user);

  return (
      <div >
          <h1 className="pt-3 text-xl lg:text-3xl font-['ginto-bold']">
          Welcome {userData?.firstName} 👏
        </h1>
        <p>You have no upcoming sessions</p>
        <div className="py-6">
          <div className="grid grid-cols-[3fr,4.5fr,4.5fr] gap-4" >
            <div className="grid gap-2">
              <div className=""></div>
              <div className=""></div>
            </div>
            <div className="">
              <h3 className="text-lg font-['ginto-bold'] ">Proposed Mentees to Meet</h3>
              <p className="text-sm pb-4">Temporary text It is also known by names like tempmail, 10minutemail, 10minmail</p>
              <div className="flex flex-col bg-[#F8F9FA] rounded-lg h-[400px] items-center justify-center" >
                <img src={noMatch} alt="" />
                <div className="text-xs">No Mentee  Match available yet</div>
              </div>
            </div>
            <div className="">
              <h3 className="text-lg font-['ginto-bold'] ">Recent Activities</h3>
              <p className="text-sm pb-4">Temporary text It is also known by names like tempmail, 10minutemail, 10minmail</p>
              <div className="flex flex-col bg-[#F8F9FA] rounded-lg  h-[400px] items-center justify-center">
                <img src={emptyActivity} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
