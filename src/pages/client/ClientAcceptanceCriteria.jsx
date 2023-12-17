import React from "react";

export default function ClientAcceptanceCriteria() {
  return (
    <div className="pt-10">
      <div className="p-5 lg:p-10 lg:py-14 bg-white rounded-md shadow-small">
        <div className="grid gap-5 w-full mx-auto">
          <h3 className="pb-5 text-lg font-['ginto-bold']">
            Created Acceptance Criteria
          </h3>

          <div className="flex items-center gap-3">
            <button className="pri-btn w-fit">Add Acceptance Criteria </button>
            <button className="pri-btn w-fit">Save </button>
          </div>
        </div>
      </div>
    </div>
  );
}
