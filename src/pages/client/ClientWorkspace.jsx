import React from "react";
import UpdateWorkspace from "../../components/UpdateWorkspace";
import ListAreasOfInterest from "../../components/ListAreasOfInterest";
import CustomizeWorkspaceAppearance from "../../components/CustomizeWorkspaceAppearance";

export default function ClientWorkspace() {
  return (
    <div className=" w-full min-h-[90vh]">
      <div className="w-full mx-auto pt-10">
        <div className="grid gap-5">
          <UpdateWorkspace />
          <ListAreasOfInterest />
          <CustomizeWorkspaceAppearance />
        </div>
      </div>
    </div>
  );
}
