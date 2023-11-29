import React from "react";

export default function HowItWorks() {
  return (
    <div className="bg-[var(--primary)] h-full py-[10vh] lg:h-[80vh]">
      <div className="main text-white flex items-center flex-col justify-center h-full gap-10">
        <div className="text-center">
          <h2 className="text-2xl lg:text-4xl font-['ginto-bold'] ">How Mentorfy Works</h2>
          <p className="text-sm py-2">
            Our mentorship system connects mentors with mentees, fostering
            meaningful guidance and support
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="flex items-center flex-col justify-center gap-4 w-[300px]">
            <div className="title font-['ginto-bold'] text-center">Create Account</div>
            <div className=" h-[120px] w-[120px] bg-[#EDEDED] rounded-xl "></div>
            <div className="text-xs text-center">
              Explore our competitive pricing plan to create an account
            </div>
          </div>
          <div className="flex items-center flex-col justify-center gap-4 w-[300px]">
            <div className="title font-['ginto-bold'] text-center">Setup Workspace</div>
            <div className=" h-[120px] w-[120px] bg-[#FFA726] rounded-xl "></div>
            <div className="text-xs text-center">
            Customize your workspace for an optimized experience on our mentor-mentee platform
            </div>
          </div>
          <div className="flex items-center flex-col justify-center gap-4 w-[300px]">
            <div className="title font-['ginto-bold'] leading-[1] text-center">Auto Mentor-Mentee Pairing</div>
            <div className=" h-[120px] w-[120px] bg-[#EDEDED] rounded-xl "></div>
            <div className="text-xs text-center">
            Experience effortless mentor-mentee pairing with our seamless, automatic matching system.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
