import Directual from "directual-api";
const api = new Directual({ apiHost: "/" });

const getMenteesByWorkspaceId = async (payload) =>
  await api
    .structure("userByworkSpace")
    .getData("getMenteesByWorkspaceId", payload);

const getMenteeProfile = async (payload) =>
  await api.structure("WebUser").getData("getMenteeProfile", payload);


export { getMenteesByWorkspaceId, getMenteeProfile };
