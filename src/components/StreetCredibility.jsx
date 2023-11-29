import React from "react";

export default function StreetCredibility() {
  return (
    <div className="bg-[#18181B] h-full py-[10vh] lg:h-[80vh] text-gray-100 ">
      <div className=" main grid md:grid-cols-2 items-center h-full gap-10">
        <div className="lg:w-[70%] mx-auto ">
          <h2 className="headTwo font-black "> "Street Credibility"</h2>
          <p className="text-sm py-4">
            "Mentorfy is just awesome. It contains tons of predesigned
            components and pages starting from login screen to complex
            dashboard. Perfect choice for mentorship."
          </p>
          <p className="text-sm ">
            Bankole Dapo <br />
            CEO at Mentorfy
          </p>
        </div>
        <div className="">
          <div className="w-[300px] h-[400px] bg-[#D9D9D9] mx-auto rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
