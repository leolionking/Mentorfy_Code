import React, { useEffect, useState } from "react";
import { getMyALLNotification } from "../utils/general/generalApi";
import { useRecoilValue } from "recoil";
import { authState } from "../atom/authAtom";
import DOMPurify from 'dompurify';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const auth = useRecoilValue(authState);
  const getNotification = () => {
    const payload = {
      sessionID: auth?.sessionID,
      id: auth.username,
    };
    getMyALLNotification(payload).then((res) => {
      setNotifications(res.payload);
    });
  };
  const sanitizeHtml = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  useEffect(() => {
    getNotification();
  }, []);
  return (
    <div className="w-[90%] mx-auto">
      <div className="py-4 lg:py-10">
        <h1 className="pt-3 text-xl lg:text-3xl font-['ginto-bold']">
          Notifications
        </h1>
        <p>See all notifications</p>
      </div>
      <div className=" grid gap-4">
        {notifications?.map((res, i) => (
          <div className="grid md:grid-cols-[.4fr,10fr,1.5fr] items-center gap-4 pb-5 border-b border-gray-200" key={i}>
            <i className="pi pi-bell p-3 bg-gray-100 rounded-full w-fit"></i>
            <div className="">
              <p className="text-gray-600">{res.headline}</p>
              <p className="text-sm !font-light text-gray-400" dangerouslySetInnerHTML={sanitizeHtml(res.body)}></p>
            </div>
            <p className="text-sm text-gray-500">{res.dateCreateDisplayed}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
