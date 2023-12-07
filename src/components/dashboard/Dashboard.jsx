import React from "react";
import { useRecoilValue } from "recoil";
import { user } from '../../atom/userAtom';

export default function Dashboard() {
  const userData = useRecoilValue(user)
  return (
    <div>
      <div className="main">
        <h1> Welcome {userData?.firstName + " " + userData?.lastName}</h1>
      </div>
    </div>
  );
}
