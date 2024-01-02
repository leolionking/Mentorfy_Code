import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { workspaceStore } from "../../atom/workspaceAtom";
import { authState } from "../../atom/authAtom";
import { useRecoilValue } from "recoil";
import { getRecentOnboarding } from "../../utils/client/clientApi";

export default function RecentSignup() {
  const auth = useRecoilValue(authState);
  const [loading, setLoading] = useState(false);
  const workspaceData = useRecoilValue(workspaceStore);
  const [onboardings, setOnboardings] = useState([]);

  const columns = [
    {
      title: "Name",
      render: (_, { firstName, lastName }) => (
        <>
          <p>{firstName + " " + lastName}</p>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  const data = [];
  const getOnboarding = () => {
    setLoading(true);
    const payload = {
      sessionID: auth?.sessionID,
      id: workspaceData.id,
    };
    getRecentOnboarding(payload)
      .then((res) => {
        setLoading(false);
        setOnboardings(res.payload.slice(0, 5));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getOnboarding();
  }, []);
  return (
    <div className="bg-white w-full shadow-small">
      <div className="p-4">
        <h3 className="font-['ginto-bold'] mb-3">Recent Onboarding </h3>
        <Table
          columns={columns}
          pagination={false}
          dataSource={onboardings}
          loading={loading}
          className=" !box-shadow-[0px_12px_40px_0px_rgba(22,33,242,0.05)];
        "
        />
      </div>
    </div>
  );
}
