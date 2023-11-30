import React, { useEffect } from "react";

export default function RequestDemo() {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://widgets.tucalendi.com/assets/iframewidget_cf.js";
    script.async = true;

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script);
    }
  }, []);
  return (
    <div className="pt-5">
      <div
        id="tucalendi_iframe_root"
        data-tucalendi-domain="mopheth.tucalendi.com/mentorfy/mentorfy-demo"
        data-tucalendi-options=""
      ></div>
    </div>
  );
}
