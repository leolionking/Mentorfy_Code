import React from "react";

export default function Team() {
  return (
    <div className="bg-[var(--secondary)] h-full py-[10vh] lg:h-[80vh] text-white ">
      <div className="main flex items-center justify-center flex-col h-full gap-10">
        <div className="">
          <h2 className="headTwo text-center"> Our Team</h2>
          <p className="text-sm text-center">
            We are Mentorfy, we are all about you and the connections you have
            and make with Mentees
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((res) => (
            <div className="w-[230px] h-[230px] bg-[#D9D9D9] rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
