import React from "react";
import { Space, Table } from "antd";

export default function ClientMentees() {
    const columns = [
        {
          title: "FIRST NAME",
          dataIndex: "firstName",
          key: "firstName",
        },
        {
          title: "LAST NAME",
          dataIndex: "lastName",
          key: "lastName",
        },
        {
          title: "GENDER",
          dataIndex: "gender",
          key: "gender",
        },
        {
          title: "EMAIL",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "SIGN UP DATE",
          dataIndex: "date",
          key: "date",
        },
        {
          title: "CONTACT",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "STATUS",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "ACTIONS",
          dataIndex: "action",
          key: "action",
        },
      ];
    
      const data = []
      return (
        <div className=" w-full">
          <div className="p-4">
            <h3 className="font-['ginto-bold'] mb-3">Mentees </h3>
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
    