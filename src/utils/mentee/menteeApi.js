import Directual from "directual-api";
const api = new Directual({ apiHost: "/" });

const getMenteesByWorkspaceId = async (payload) =>
  await api
    .structure("userByworkSpace")
    .getData("getMenteesByWorkspaceId", payload);

const getMenteeProfile = async (payload) =>
  await api.structure("WebUser").getData("getMenteeProfile", payload);

const getMatchingByMentee = async (payload) =>
  await api.structure("matching").getData("getMatchingByMentee_copy", payload);

export { getMenteesByWorkspaceId, getMenteeProfile,getMatchingByMentee };
