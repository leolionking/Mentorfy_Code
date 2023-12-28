import React from "react";

export default function UserCard() {
  return (
    <div className="grid gap-2">
      <div className="image relative bg-gray-600 rounded-xl h-[250px] w-full">
        <div className=" absolute bottom-4 text-white text-sm left-4">
          <div className="pb-1 text-lg font-['ginto-bold']">
            Esse Sylvester{" "}
          </div>
          <div className="flex text-sm items-center gap-2">
            <i className="pi pi-map-marker text-sm"></i> Alabama{" "}
          </div>
        </div>
      </div>
      <div className="text-sm flex items-center gap-2">
        <i className="pi pi-map text-sm"></i> Interested in Economics, AI,...
      </div>
      <div className="flex items-start gap-2 mt-2">
        <i className="pi pi-user-plus"></i>
        <div className="text-xs ">
          On a mission to build 1M designers | Building up to $1M ARR. Sharing
          tips and guides on design...
        </div>
      </div>
      <button className="outline-btn mt-3">View Profile</button>
    </div>
  );
}
