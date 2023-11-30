import React from "react";

export default function Footer() {
  return (
    <div className="bg-white relative z-[1000]">
      <div className="main flex items-center justify-center py-6 flex-wrap gap-4">
        <p className="text-sm">
          Start your Mentorship today by checking out our Free Trial *No credit
          card required to set up
        </p>
        <button className="pri-btn">Create Account</button>
      </div>
    </div>
  );
}
