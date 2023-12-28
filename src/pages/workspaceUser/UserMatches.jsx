import React from "react";
import UserCard from "../../components/UserCard";

export default function UserMatches() {
  return (
    <div>
      <h1 className="text-xl lg:text-2xl font-['ginto-bold']">
        Proposed Mentees
      </h1>
      <p className="text-sm">
        Temporary Text you have no these mentees suggestions
      </p>
      <div className="py-10">
        <div className="grid grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((res) => (
            <UserCard  />
          ))}
        </div>
      </div>
    </div>
  );
}
