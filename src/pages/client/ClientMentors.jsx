import React from "react";
import { Space, Table } from "antd";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import {getMentorsByWorkspaceId} from '../../utils/mentor/mentorApi'
import {inviteUsers} from '../../utils/general/generalApi'
import { banUserByWorkspace } from "../../utils/client/clientApi";


export default function ClientMentors() {
  const workspaceData = useRecoilValue(workspaceStore);
  const userData = useRecoilValue(user);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [unBanUser, setUnbanUser] = useState(false);
  const [mentorUsers, setMentorUsers] = useState([]);
  const [loading, setLoaded] = useState(false);
  const [email, setEmail] = useState("");
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
      // sessionID: auth[0]?.sessionID,
      _action: action,
      _creatorId: ownerData.id,
      _userByworkSpace: userPass.id,
    };
    setShow(!show);
    banUserByWorkspace(payload)
      .then((res) => {
        toast.error("User has ben banned!!!");
        listMyMenteesUser();
      })
      .catch((err) => console.log(err));
  };
  const DeactivateBanUser = () => {
    setUnbanUser(!unBanUser);
    const action = "unbanOfAccountByOwner";
    const payload = {
      // sessionID: auth[0]?.sessionID,
      _action: action,
      _creatorId: ownerData.id,
      _userByworkSpace: userPass.id,
    };

    banUserByWorkspace(payload)
      .then((res) => {
        toast.success("User has been activated!!!");
        listMyMenteesUser();
      })
      .catch((err) => console.log(err));
  };

  const closureBanUser = () => {
    const action = "closureOfAccountByOwner";
    const userPayload = {
      sessionID: auth?.sessionID,
      _action: action,
      _creatorId: ownerData.id,
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
    listMentors();
  }, []);

  return (
    <div className=" w-full">
      <div className="p-4">
        <h3 className="font-['ginto-bold'] mb-3">Mentors </h3>
        <Table
          columns={columns}
          pagination={1}
          dataSource={mentorUsers}
          className=" !box-shadow-[0px_12px_40px_0px_rgba(22,33,242,0.05)];
            "
        />
      </div>
    </div>
  );
}
