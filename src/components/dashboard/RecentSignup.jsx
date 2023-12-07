import React from "react";
import { Space, Table } from "antd";

export default function RecentSignup() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  const data = []
  return (
    <div className="bg-white w-full shadow-small">
      <div className="p-4">
        <h3 className="font-['ginto-bold'] mb-3">Recent Onboarding </h3>
        <Table
          columns={columns}
          pagination={1}
          dataSource={data}
          className=" !box-shadow-[0px_12px_40px_0px_rgba(22,33,242,0.05)];
        "
        />
      </div>
    </div>
  );
}
