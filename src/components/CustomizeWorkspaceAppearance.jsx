import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { workspaceStore } from "../atom/workspaceAtom";
import { InboxOutlined } from "@ant-design/icons";
import { ColorPicker } from "antd";
import {
  getOwnerWorkspaceById,
  ownerWorkspaceEdit,
} from "../utils/client/clientApi";
import { authState } from "../atom/authAtom";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";

export default function CustomizeWorkspaceAppearance() {
  const [workspace, setWorkspace] = useRecoilState(workspaceStore);
  const [color, setColor] = useState("000000");
  const [textColor, setTextColor] = useState("000000");
  const [image, setImage] = useState();
  const [dataUrl, setDataUrl] = useState();
  const [loading, setLoading] = useState(false);
  const auth = useRecoilValue(authState);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL?.createObjectURL(e.target.files[0]));
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setDataUrl(reader.result);
      };
    }
  };

  const customize = () => {
    setLoading(true);
    const userPayload = {
      _creatorId: auth.username,
      color: color.split("#")[1] ?? color,
      logo: dataUrl,
      id: workspace.id,
    };

    ownerWorkspaceEdit(userPayload)
      .then((res) => {
        toast.success("Workspace edit successful");
        const data = {
          id: workspace.id,
          sessionID: auth?.sessionID,
        };
        getOwnerWorkspaceById(data)
          .then((res) => {
            setWorkspace(res.payload[0]);
          })
          .catch((err) => {
            toast.error(err.response.data.msg);
          });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        setLoading(false);
      });
  };

  useEffect(() => {
    setImage(workspace.logo);
    setColor(workspace.color);

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    if(workspace.color){
      const addColor = () => {
        document.documentElement.style.setProperty(
          "--primary",
          "#" + workspace.color
        );
        const rgb = hexToRgb(workspace.color)
        rgb[0] = Math.round(.173 * 255);
        rgb[1] = Math.round(.223 * 255);
        rgb[2] = Math.round(.3 * 255);
        const backgroundColour = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        document.documentElement.style.setProperty(
          "--complementary",
          backgroundColour
        );
      };
      addColor();
    }
  }, [workspace]);
  return (
    <div className="p-5 lg:p-10 bg-white rounded-md shadow-small">
      <h3 className="pb-5 text-lg font-['ginto-bold']">
        Customize Workspace Appearance
      </h3>

      <div className=" w-full grid gap-4">
        <div className=" grid md:grid-cols-2 gap-2">
          <div className="flex flex-col gap-2 border-gray-300 bg-[#DFDFDF]/10 justify-center p-4 rounded-md border border-dashed">
            <div className="flex items-center gap-2">
              <InputText
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <ColorPicker
                value={color}
                onChange={(value, color) => setColor(color)}
                allowClear
                disabledAlpha
                className="w-[20%] h-full"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="upload-button">
              <div className="p-2 rounded-lg border-dashed border-[1px] border-gray-300 bg-[#DFDFDF]/10 flex items-center flex-col justify-center text-center">
                <img
                  src={image}
                  alt="logo"
                  className="object-cover h-[80px] w-[80px] rounded-full pb-2"
                />
                <p className="pri-btn">
                  <i className="pi pi-upload"> </i>
                  Browse Logo
                </p>
                <small className="pt-1">
                  Upload file must be PNG or JPG format
                </small>
              </div>
            </label>
            <input
              type="file"
              id="upload-button"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              className="valid:border-green-500 "
              onChange={handleImageChange}
            />
          </div>
        </div>
        <button
          className="pri-btn w-fit"
          onClick={customize}
          disabled={image === "" || loading}
        >
          {loading ? <i className="pi pi-spin pi-spinner"></i> : ""}
          Save changes
        </button>
      </div>
    </div>
  );
}
