import React, { useEffect, useState } from "react";
import { Dropdown, Space, Table, Tag } from "antd";
import { workspaceStore } from "../../atom/workspaceAtom";
import { useRecoilValue } from "recoil";
import { authState } from "../../atom/authAtom";
import { user } from "../../atom/userAtom";
import { useNavigate } from "react-router-dom";
import { getMenteesByWorkspaceId } from "../../utils/mentee/menteeApi";
import { banUserByWorkspace } from "../../utils/client/clientApi";
import { toast } from "react-toastify";
import InviteDialog from "../../components/InviteDialog";
import { Avatar } from "primereact/avatar";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";

export default function ClientMentees() {
  const workspaceData = useRecoilValue(workspaceStore);
  const userData = useRecoilValue(user);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const [show, setShow] = useState(false);
  const [menteesUsers, setMenteesUsers] = useState([]);
  const [loading, setLoaded] = useState(false);
  const [details, setDetails] = useState();
  const [suspendUser, setSuspendUser] = useState(false);
  const [activateUser, setActivateUser] = useState(false);
  const [others, setOthers] = useState();
  const [type, setType] = useState();
  const [items, setItems] = useState([]);

  const handleMenuClick = (data) => {
    setDetails(data);
  };
  const openuser = () => {
    setViewUser((viewUser) => !viewUser);
  };
  const openSuspension = (data) => {
    setLoaded(false);
    setSuspendUser((suspendUser) => !suspendUser);
    setType(data);
    setOthers();
    setSelectedCategories([]);
  };

  const openActivate = () => {
    setLoaded(false);
    setActivateUser((activateUser) => !activateUser);
  };

  const categories = [
    { name: "Violating Community Guidelines", key: "A" },
    { name: "Spam or Misuse", key: "B" },
    { name: "Impersonation", key: "C" },
    { name: "Copyright or Intellectual Property Infringement", key: "D" },
    { name: "Hate Speech and Harassment", key: "E" },
  ];
  const [selectedCategories, setSelectedCategories] = useState([categories[1]]);

  const onCategoryChange = (e) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(
        (category) => category.key !== e.value.key
      );

    setSelectedCategories(_selectedCategories);
  };

  const columns = [
    {
      title: "Full name",
      dataIndex: "firstName",
      render: (_, { lastName, firstName }) => (
        <>
          <p>{lastName + " " + firstName}</p>
        </>
      ),
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
    // {
    //   title: "Sign up date",
    //   dataIndex: "@dateCreated",
    //   key: "@dateCreated",
    // },
    {
      title: "Contact",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: " Status",
      render: (_, { isBanned, isClosured }) => (
        <>
          {isClosured === false && isBanned  ? (
            <Tag bordered={false} color="volcano">
              Suspended
            </Tag>
          ) : (
            isClosured === false && isBanned===false ?
            <Tag bordered={false} color="green">
              Active
            </Tag>
            : ''
          )}
          {isClosured ? (
            <Tag bordered={false} color="volcano">
              Account Closed
            </Tag>
          ) : (
            ""
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
  const suspendAccount = () => {
    setLoaded(true);
    const action = "banOfAccountByOwner";
    const payload = {
      _action: action,
      _creatorId: userData.id,
      _userByworkSpace: details.id,
      _banReason: selectedCategories.slice(-1)[0].name,
    };
    setShow(!show);
    banUserByWorkspace(payload)
      .then((res) => {
        openSuspension();
        setLoaded(false);
        toast.error("User has ben suspended");
        listMentees();
      })
      .catch((err) => console.log(err));
  };
  const reactivateAccount = () => {
    setLoaded(true);
    const action = "unbanOfAccountByOwner";
    const payload = {
      _action: action,
      _creatorId: userData.id,
      _userByworkSpace: details.id,
    };

    banUserByWorkspace(payload)
      .then((res) => {
        setLoaded(false);
        openActivate()
        toast.success("User has been re-activated");
        listMentees();
      })
      .catch((err) => console.log(err));
  };

  const closeAccount = () => {
    setLoaded(true);

    const action = "closureOfAccountByOwner";
    const userPayload = {
      sessionID: auth?.sessionID,
      _action: action,
      _creatorId: userData.id,
      _userByworkSpace: details.id,
      _banReason: selectedCategories.slice(-1)[0].name,
    };

    banUserByWorkspace(userPayload)
      .then((res) => {
        openSuspension();
        setLoaded(false);
        toast.error("User Account has been closed");
        navigate("/list-workspace");
      })
      .catch((err) => console.log(err));
    setShow(!show);
  };

  const openInvite = () => {
    setVisible((visible) => !visible);
  };

  useEffect(() => {
    listMentees();
  }, []);

  useEffect(() => {
    const itemMenu = [
      {
        key: "1",
        label: (
          <p className="text-xs p-1" onClick={openuser}>
            View Mentee info
          </p>
        ),
      },
      {
        key: "2",
        label: (
          <p className="text-xs p-1" onClick={() => openSuspension("suspend")}>
            Suspend Mentee
          </p>
        ),
      },
      {
        key: "3",
        label: (
          <p className="text-xs p-1" onClick={() => openSuspension("close")}>
            Close Account
          </p>
        ),
      },
    ];

    const bannedMenu = [
      {
        key: "1",
        label: (
          <p className="text-xs p-1" onClick={openuser}>
            View Mentee info
          </p>
        ),
      },
      {
        key: "2",
        label: (
          <p className="text-xs p-1" onClick={() => openActivate()}>
            Reactivate Mentee
          </p>
        ),
      },
      {
        key: "3",
        label: (
          <p className="text-xs p-1" onClick={() => openSuspension("close")}>
            Close Account
          </p>
        ),
      },
    ];
    if (details?.isBanned) {
      setItems(bannedMenu);
    } else {
      setItems(itemMenu);
    }
  }, [details]);

  return (
    <div className=" w-full">
      <div className="">
        <div className="flex items-center justify-between mb-10">
          <h3 className="font-['ginto-bold'] text-xl ">Mentees </h3>
          <button className="pri-btn" onClick={openInvite}>
            <i className="pi pi-users"></i>
            Invite Mentees
          </button>
        </div>
        <Table
          columns={columns}
          loading={loading}
          pagination={1}
          dataSource={menteesUsers}
          className=" !box-shadow-[0px_12px_40px_0px_rgba(22,33,242,0.05)];
            "
        />
      </div>
      <InviteDialog visibility={visible} type={"Mentee"} />

      {viewUser ? (
        <div className="dialog">
          <div className=" main transition-all w-full lg:w-[55vw] bg-white shadow-small p-5 lg:p-10 absolute top-[50%] z-[1000] left-[50%] translate-y-[-50%] translate-x-[-50%] h-fit rounded-2xl ">
            <div className=" grid gap-2">
              <i
                 className="pi pi-times text-black absolute top-5 right-5 p-3 cursor-pointer hover:bg-gray-200 rounded-full transition-all"
                onClick={openuser}
              ></i>
              <h2 className="headFour text-center flex items-center gap-2 justify-center">
                Mentees Details
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
                    <h4 className="text-xs text-gray-400">FULL NAME</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.gender}
                    </p>
                    <h4 className="text-xs text-gray-400">GENDER</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">0</p>
                    <h4 className="text-xs text-gray-400">ACTIVE SESSIONS</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.phone}
                    </p>
                    <h4 className="text-xs text-gray-400">MOBILE NUMBER</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.email}
                    </p>
                    <h4 className="text-xs text-gray-400">EMAIL</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] flex items-center gap-2 text-gray-900">
                      {details?.mentee__profAreaIds?.map((res, i) => (
                        <p key={i}>{res.area_title}</p>
                      ))}
                    </p>
                    <h4 className="text-xs text-gray-400">PROFESSIONAL AREA</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.yearsofprofessionalinterest}
                    </p>
                    <h4 className="text-xs text-gray-400">
                      YEARS OF EXPERIENCE
                    </h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.provinceId}
                    </p>
                    <h4 className="text-xs text-gray-400">PROVINCE</h4>
                  </div>
                  <div className="">
                    <p classname="font-bold text-[.85rem] text-gray-900">
                      {details?.postalcode}
                    </p>
                    <h4 className="text-xs text-gray-400">POSTAL CODE</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {suspendUser ? (
        <div className="dialog">
          <div className=" main transition-all w-full lg:w-[35vw] bg-white shadow-small p-5 lg:p-10 absolute top-[50%] z-[1000] left-[50%] translate-y-[-50%] translate-x-[-50%] h-fit rounded-2xl ">
            <div className=" grid gap-2">
              <i
                 className="pi pi-times text-black absolute top-5 right-5 p-3 cursor-pointer hover:bg-gray-200 rounded-full transition-all"
                onClick={openSuspension}
              ></i>
              <h2 className="text-xl font-['ginto-bold'] text-center flex items-center gap-2 justify-center">
                {type === "suspend" ? "Suspend Mentee" : "Close Account"}
              </h2>
              <div className="questions">
                <p className="my-3 text-sm">Select reason for Suspension</p>
                <div className="grid gap-2">
                  {categories.map((category) => {
                    return (
                      <div
                        key={category.key}
                        className="flex align-center gap-2"
                      >
                        <Checkbox
                          inputId={category.key}
                          name="category"
                          className="border border-black  rounded-md"
                          value={category}
                          onChange={onCategoryChange}
                          checked={selectedCategories.some(
                            (item) => item.key === category.key
                          )}
                        />
                        <label htmlFor={category.key} className="ml-2">
                          {category.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4">
                  <p className="text-sm mb-3">Others</p>
                  <InputTextarea
                    cols={4}
                    rows={6}
                    className=" resize-none border p-3 border-gray-300"
                    value={others}
                    onChange={(e) => setOthers(e.target.value)}
                  ></InputTextarea>
                </div>
                <button
                  className="pri-btn w-full my-3"
                  disabled={selectedCategories.length === 0 || loading}
                  onClick={suspendAccount}
                >
                  {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {activateUser ? (
        <div className="dialog">
          <div className=" main transition-all w-full lg:w-[35vw] bg-white shadow-small p-5 lg:p-10 absolute top-[50%] z-[1000] left-[50%] translate-y-[-50%] translate-x-[-50%] h-fit rounded-2xl ">
            <div className=" grid gap-2">
              <i
                className="pi pi-times text-black absolute top-5 right-5 p-3 cursor-pointer hover:bg-gray-200 rounded-full transition-all"
                onClick={openActivate}
              ></i>
              <h2 className="text-xl font-['ginto-bold'] text-center flex items-center gap-2 justify-center">
                Re-activate Account
              </h2>
              <div className="text-sm py-3 text-center">
                Are you sure you want to Re-activate Mentor’s Account?
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  className="outline-btn w-full my-3"
                  disabled={loading}
                  onClick={openActivate}
                >
                  {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
                  Cancel
                </button>
                <button
                  className="pri-btn w-full my-3"
                  disabled={loading}
                  onClick={reactivateAccount}
                >
                  {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
                  Re-activate Mentor
                </button>
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
