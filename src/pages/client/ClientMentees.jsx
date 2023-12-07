import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import { getMenteesByWorkspaceId } from "../../utils/mentee/menteeApi";
import { inviteUsers } from "../../utils/general/generalApi";
import { banUserByWorkspace } from "../../utils/client/clientApi";
import { toast } from "react-toastify";

export default function ClientMentees() {
    const workspaceData = useRecoilValue(workspaceStore);
    const userData = useRecoilValue(user);
    const auth = useRecoilValue(authState);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [unBanUser, setUnbanUser] = useState(false);
    const [menteesUsers, setMenteesUsers] = useState([]);
    const [userPass, setUserPass] = useState({});
    const [loading, setLoaded] = useState(false);
    const [email, setEmail] = useState("");
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
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Contact",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Status",
        dataIndex: "isBanned",
        key: "isBanned",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
      },
    ];
  
    let inviteLink = `${window.location.origin}/mentee-signup/${workspaceData?.id}`;
  
    const sendInvite = () => {
      const payload = {
        email: email,
        url: inviteLink,
        workspaceName: workspaceData.name,
      };
      inviteUsers(payload).then((res) => {
        setVisible(!visible);
        setEmail("");
        toast.error("Invite has been sent successfully");
      });
    };
  
    const listMentees = () => {
      setLoaded(true);
      const payload = {
        sessionID: auth?.sessionID,
        id: workspaceData.id,
      };
      getMenteesByWorkspaceId(payload)
        .then((res) => {
            setMenteesUsers(res.payload);
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
          listMentees();
        })
        .catch((err) => console.log(err));
    };
    const DeactivateBanUser = () => {
      setUnbanUser(!unBanUser);
      const action = "unbanOfAccountByOwner";
      const payload = {
        // sessionID: auth[0]?.sessionID,
        _action: action,
        _creatorId: userData.id,
        _userByworkSpace: userPass.id,
      };
  
      banUserByWorkspace(payload)
        .then((res) => {
          toast.success("User has been activated!!!");
          listMentees();
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
  
    useEffect(() => {
        listMentees();
    }, []);
  
    return (
      <div className=" w-full min-h-[90vh]">
        <div className="w-[90%] mx-auto pt-10">
          <h3 className="font-['ginto-bold'] text-xl mb-10">Mentees </h3>
          <Table
            columns={columns}
            loading={loading}
            pagination={1}
            dataSource={menteesUsers}
            className=" !box-shadow-[0px_12px_40px_0px_rgba(22,33,242,0.05)];
              "
          />
        </div>
      </div>
    );
}