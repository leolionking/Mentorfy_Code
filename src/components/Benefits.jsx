import React from "react";
import ribbon from "../assets/shape.svg";
export default function Benefits() {
  return (
    <div className="h-full py-[10vh] lg:h-[80vh] my-auto w-full">
      <div className="main h-full gap-10 flex items-center flex-col md:flex-row justify-evenly">
        <div className="flex gap-4">
          <div className="">
            <img src={ribbon} alt="" />
          </div>
          <div className="flex items-center flex-col gap-4 lg:w-[50%]">
            <h2 className="headTwo font-black">
              Benefits of{" "}
              <span className="text-[var(--primary)]">Mentorfy </span>{" "}
            </h2>
            <p className="text-sm">
              Our platform connects you with the right Mentorship opportunities,
              whether you're seeking guidance or looking to make a meaningful
              impact
            </p>
          </div>
        </div>
        <div className="">
          <div className=" h-[55vh] w-full lg:w-[30vw] rounded-xl bg-slate-100">
            <div className="">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
