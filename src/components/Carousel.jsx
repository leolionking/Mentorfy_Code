import React from "react";
import { Carousel } from "antd";

export default function CarouselComponent() {
  return (
    <Carousel effect="fade" autoplay dots={true} className=" text-white">
      <div className="bg-heroOne carousel-body">
        <div className="carousel-content h-full">
          <div className="flex items-center flex-col justify-center h-full gap-4">
            <h1 className="headOne w-full lg:w-[70%] text-center">
              Mentorship on a Seamless Mentoring App
            </h1>
            <div className="subtitle">
              Match Mentors, Peer Groups anywhere, at any time.{" "}
            </div>
            <div className="flex items-center gap-4">
              <button className="white-btn ">Get Started</button>
              <button className="ter-btn">Request a demo</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-heroThree carousel-body">
        <div className="carousel-content h-full">
          <div className="flex items-center flex-col justify-center h-full gap-4">
            <h1 className="headOne w-full lg:w-[70%] text-center">
              Wouldn’t you rather shape lives with Mentorfy?
            </h1>
            <div className="subtitle">Set goals, chat, share feedback.</div>
            <div className="flex items-center gap-4">
              <button className="white-btn ">Get Started</button>
              <button className="ter-btn">Request a demo</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-heroTwo carousel-body">
        <div className="carousel-content h-full">
          <div className="flex items-center flex-col justify-center h-full gap-4">
            <h1 className="headOne w-full lg:w-[70%] text-center">
              Mentorfy is not just a software. It is a STORY{" "}
            </h1>
            <div className="subtitle">
              Set up meetings and run scalable mentoring programs in your
              organization
            </div>
            <div className="flex items-center gap-4">
              <button className="white-btn ">Get Started</button>
              <button className="ter-btn">Request a demo</button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
