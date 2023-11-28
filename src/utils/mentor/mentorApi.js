import Directual from "directual-api";
const api = new Directual({ apiHost: "/" });

const getMentorsByWorkspaceId = async (payload) =>
  await api
    .structure("userByworkSpace")
    .getData("getMentorsByWorkspaceId", payload);

const getMentorProfile = async (payload) =>
  await api.structure("WebUser").getData("getMentorProfile_copy", payload);

export { getMentorsByWorkspaceId, getMentorProfile };
