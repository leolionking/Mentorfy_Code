import React from "react";

export default function ClientBilling() {
  return (
    <div className="w-[90%] mx-auto">
      <div className="py-4 lg:py-10">
        <h1 className="pt-3 text-xl lg:text-3xl font-['ginto-bold']">
          Overview
        </h1>
        <p>See all billing history</p>
      </div>
      <div
        className="grid items-center gap-4 bg-white rounded-sm p-5 border border-gray-200"
      ></div>
    </div>
  );
}
