import React from "react";

export default function ClientWorkspaceInsights() {
  return (
    <div className=" w-full min-h-[90vh]">
      <div className="w-[90%] mx-auto pt-10">
        <div className="flex items-center justify-between mb-10">
          <div className="">
            <h3 className="font-['ginto-bold'] text-2xl pb-1">
              Workspace Settings{" "}
            </h3>
            <p className="text-sm">
              Manage your Workspace, fully customizable.{" "}
            </p>
          </div>
            <div className="flex items-center gap-2">
                <button className="outline-btn text-sm">Switch Workspace</button>
                <button className="outline-btn text-sm">Add Workspace</button>
            </div>
        </div>
      </div>
    </div>
  );
}
