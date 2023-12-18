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
      render: () => (
        <Space size="middle">
          <Dropdown
            className="text-sm"
            menu={{
              items,
            }}
          >
            <i className=" pi pi-ellipsis-v"></i>
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
    </div>
  );
}
