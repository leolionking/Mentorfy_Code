
import { Tabs, ConfigProvider } from "antd";
import ClientWorkspace from "./ClientWorkspace";
import { Link } from "react-router-dom";
import ClientProfile from "./ClientProfile";
import ClientSecurity from "./ClientSecurity";
import ClientAcceptanceCriteria from "./ClientAcceptanceCriteria";

export default function ClientSettings() {
 
  const items = [
    {
      key: "1",
      label: "Account",
      children: <ClientWorkspace />,
    },
    {
      key: "2",
      label: "Acceptance Criteria",
      children: <ClientAcceptanceCriteria/>,
    },

    {
      key: "3",
      label: "Profile",
      children: <ClientProfile/>,
    },
    {
      key: "4",
      label: "Security",
      children: <ClientSecurity/>,
    },
    // {
    //   key: "5",
    //   label: "Notifications",
    //   children: "Content of Tab Pane 3",
    // },
    // {
    //   key: "7",
    //   label: "Themes",
    //   children: "Content of Tab Pane 3",
    // },
  ];
  return (
    <div className="">
      <div className=" w-full ">
        <div className="">
          <div className="grid md:grid-cols-2 gap-4 items-center justify-between my-5 ">
            <div className="">
              <h3 className="font-['ginto-bold'] text-2xl pb-1">
                Workspace Settings{" "}
              </h3>
              <p className="text-sm">
                Manage your Workspace, fully customizable.{" "}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Link to="/select-workspace" className="outline-btn text-sm">
                Switch Workspace
              </Link>
              <button className="outline-btn text-sm">Add Workspace</button>
            </div>
          </div>
          <Tabs defaultActiveKey="1" items={items} className=" relative z-40" />
        </div>
      </div>
    </div>
  );
}
