import React, { useEffect, useState } from "react";
import { Space, Table, Dropdown, Tag } from "antd";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import { getMentorsByWorkspaceId } from "../../utils/mentor/mentorApi";
import { inviteUsers } from "../../utils/general/generalApi";
import { banUserByWorkspace } from "../../utils/client/clientApi";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import { InputText } from "primereact/inputtext";
import InviteDialog from "../../components/InviteDialog";
import { Avatar } from "primereact/avatar";

export default function ClientMentors() {
  const workspaceData = useRecoilValue(workspaceStore);
  const userData = useRecoilValue(user);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [unBanUser, setUnbanUser] = useState(false);
  const [mentorUsers, setMentorUsers] = useState([]);
  const [userPass, setUserPass] = useState({});
  const [loading, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const [details, setDetails] = useState();
  const handleMenuClick = (data) => {
    setDetails(data);
  };
  const openuser = () => {
    setViewUser((viewUser) => !viewUser);
  };
  const items = [
    {
      key: "1",
      label: <p className="text-xs p-1">View Mentee info</p>,
    },
    {
      key: "2",
      label: <p className="text-xs p-1">Suspend Mentee</p>,
    },
    {
      key: "3",
      label: <p className="text-xs p-1">Close Account</p>,
    },
  ];

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Sign up date",
      dataIndex: "@dateCreated",
      key: "@dateCreated",
    },
    {
      title: "Contact",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: " Status",
      render: (_, isBanned) => (
        <>
          {isBanned === "false" ? (
            <Tag bordered={false} color="volcano">
              Banned
            </Tag>
          ) : (
            <Tag bordered={false} color="green">
              Active
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, data) => (
        <Space size="middle">
          <Dropdown
            className="text-sm"
            menu={{
              items,
            }}
          >
            <i
              className=" pi pi-ellipsis-v"
              onClick={(e) => handleMenuClick(data)}
            ></i>
          </Dropdown>
        </Space>
      ),
    },
  ];




  const listMentors = () => {
    setLoaded(true);
    const payload = {
      sessionID: auth?.sessionID,
      id: workspaceData.id,
    };
    getMentorsByWorkspaceId(payload)
      .then((res) => {
        setMentorUsers(res.payload);
        setLoaded(false);
      })
      .catch((err) => console.log(err));
  };
  const activateBanUser = () => {
    const action = "banOfAccountByOwner";
    const payload = {
      _action: action,
      _creatorId: userData.id,
      _userByworkSpace: userPass.id,
    };
    setShow(!show);
    banUserByWorkspace(payload)
      .then((res) => {
        toast.error("User has ben banned!!!");
        listMentors();
      })
      .catch((err) => console.log(err));
  };
  const DeactivateBanUser = () => {
    setUnbanUser(!unBanUser);
    const action = "unbanOfAccountByOwner";
    const payload = {
      _action: action,
      _creatorId: userData.id,
      _userByworkSpace: userPass.id,
    };

    banUserByWorkspace(payload)
      .then((res) => {
        toast.success("User has been activated!!!");
        listMentors();
      })
      .catch((err) => console.log(err));
  };

  const closureBanUser = () => {
    const action = "closureOfAccountByOwner";
    const userPayload = {
      sessionID: auth?.sessionID,
      _action: action,
      _creatorId: userData.id,
      _userByworkSpace: userPass.id,
    };

    banUserByWorkspace(userPayload)
      .then((res) => {
        // console.log(res);
        toast.error("User Account Closure!!!");
        navigate("/list-workspace");
      })
      .catch((err) => console.log(err));
    setShow(!show);
  };

  const openInvite = () => {
    setVisible(visible => !visible);

  };

  useEffect(() => {
    listMentors();
  }, []);

  return (
    <div className=" w-full min-h-[90vh]">
      <div className="w-[90%] mx-auto pt-10">
        <div className="flex items-center justify-between mb-10">
          <h3 className="font-['ginto-bold'] text-xl ">Mentors </h3>
          <button className="pri-btn" onClick={openInvite}>
            <i className="pi pi-users"></i>
            Invite Mentors
          </button>
        </div>
        <Table
          columns={columns}
          loading={loading}
          pagination={1}
          dataSource={mentorUsers}
          className=" !box-shadow-[0px_12px_40px_0px_rgba(22,33,242,0.05)];
            "
        />
      </div>
        <InviteDialog visibility={visible} type={'Mentor'}/>

        {viewUser ? (
        <div className="dialog">
          <div className=" main transition-all w-full lg:w-[55vw] bg-white shadow-small p-5 lg:p-10 absolute top-[50%] z-50 left-[50%] translate-y-[-50%] translate-x-[-50%] h-fit rounded-2xl ">
            <div className=" grid gap-2">
              <i
                className="pi pi-times text-black absolute top-5 right-5 p-4"
                onClick={openuser}
              ></i>
              <h2 className="headFour text-center flex items-center gap-2 justify-center">
                Mentee Details
              </h2>
              <div className="grid md:grid-cols-[1fr,10fr] gap-8 w-full pt-10">
                <div className="">
                  <Avatar
                    label={details?.firstName?.split("")[0]}
                    size="xlarge"
                    shape="circle"
                  />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  <div className="">
                    <p className="font-bold text-[.85rem] text-gray-900">
                      {details?.firstName + " " + details?.lastName}
                    </p>
                    <h4 className="text-sm text-gray-400">FULL NAME</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.gender}
                    </p>
                    <h4 className="text-sm text-gray-400">GENDER</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">0</p>
                    <h4 className="text-sm text-gray-400">ACTIVE SESSIONS</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.phone}
                    </p>
                    <h4 className="text-sm text-gray-400">MOBILE NUMBER</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.email}
                    </p>
                    <h4 className="text-sm text-gray-400">EMAIL</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] flex items-center gap-2 text-gray-900">
                      {details?.mentee__profAreaIds?.map((res, i) => (
                        <p key={i}>{res.area_title}</p>
                      ))}
                    </p>
                    <h4 className="text-sm text-gray-400">PROFESSIONAL AREA</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.yearsofprofessionalinterest}
                    </p>
                    <h4 className="text-sm text-gray-400">
                      YEARS OF EXPERIENCE
                    </h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.provinceId}
                    </p>
                    <h4 className="text-sm text-gray-400">PROVINCE</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.postalcode}
                    </p>
                    <h4 className="text-sm text-gray-400">POSTAL CODE</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
