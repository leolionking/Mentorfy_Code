import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { workspaceStore } from "../atom/workspaceAtom";
import { inviteUsers } from "../utils/general/generalApi";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";

export default function InviteDialog({ visibility, type }) {
  const [visible, setVisible] = useState(false);
  const workspaceData = useRecoilValue(workspaceStore);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');

  const openInvite = () => {
    setVisible((visible) => !visible);
  };
  let mentorLink = `${window.location.origin}/mentor-signup/${workspaceData?.id}`;
  let menteeLink = `${window.location.origin}/mentee-signup/${workspaceData?.id}`;

  const sendInvite = () => {
    setLoading(true);
    const payload = {
      email: email,
      url: link,
      workspaceName: workspaceData.name,
    };
    inviteUsers(payload)
      .then((res) => {
        setEmail("");
        setLoading(false);
        toast.error("Invite has been sent successfully");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (visibility) {
      setVisible(visibility);
      setLoading(false);
    }
    if(type === 'Mentor'){
        setLink(mentorLink);
    }
    else{
        setLink(menteeLink);
    }
  }, [visibility, loading]);
  return (
    <div>
      {visible ? (
        <div className="dialog">
          <div className=" main transition-all w-full lg:w-[35vw] bg-white shadow-small p-5 lg:p-10 absolute top-[50%] z-[1000] left-[50%] translate-y-[-50%] translate-x-[-50%] h-fit rounded-2xl ">
            <div className="main grid gap-2">
              <i
                className="pi pi-times text-black absolute top-5 right-5 p-4"
                onClick={openInvite}
              ></i>
              <h2 className="headFour text-center flex items-center gap-2 justify-center">
                {type} Invite
              </h2>

              <div className="grid gap-3 py-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullname">Email</label>
                  <InputText
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby="fullname-help"
                    className="!border-gray-300"
                  />
                </div>

                <button className="pri-btn mt-3" disabled={loading || email === ''} onClick={sendInvite}>
                  {loading ? (
                    <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                  ) : (
                    ""
                  )}
                  Send Invite
                </button>
                <p className="text-sm text-center">Or</p>
                <CopyToClipboard
                  text={link}
                  onCopy={() => toast.success("Copied")}
                >
                  <button className="pri-btn" disabled={loading}>
                    {loading ? (
                      <i className="pi pi-spin pi-spinner !text-[20px]"></i>
                    ) : (
                      <i className="pi pi-copy"></i>
                    )}
                    Copy link to clipboard
                  </button>
                </CopyToClipboard>
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
