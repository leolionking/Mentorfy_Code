import Directual from "directual-api";
const api = new Directual({ apiHost: "/" });

const banUserByWorkspace = async (payload) =>
  await api
    .structure("_userByworkSpace")
    .setData("banUserByWorkspace", payload);

const workspaceGenericForm = async (payload) =>
  await api.structure("workspace").setData("workspaceGenericForm", payload);

const getProfAreasByWorkSpace = async (payload) =>
  await api
    .structure("professional_areas")
    .getData("getProfAreaByWorkspaceOwner", payload);

const getProfAreaByWorkspaceOwner = async (payload) =>
  await api
    .structure("professional_areas")
    .getData("getProfAreaByWorkspaceOwner", payload);

const professionalAreaAction = async (payload) =>
  await api
    .structure("_professional_areasAction")
    .setData("professionalAreaAction", payload);

const getClientWorkspace = async (payload) =>
  await api.structure("workspace").getData("ownerWorkspaseListing", payload);

const ownerWorkspaceEdit = async (payload) =>
  await api.structure("workspace").setData("ownerWorkspaceEdit", payload);


const createWorkspaceWithPayment = async (payload) =>
  await api
    .structure("_workcpaseAction")
    .setData("createWorkspaceWithPayment", payload);

const editRequestWorkspaceUser = async (payload) =>
  await api
    .structure("_workcpaseAction")
    .setData("editRequestWorkspaceUser", payload);

const createWorkspaceUser = async (payload) =>
  await api
    .structure("_workcpaseAction")
    .setData("createWorkspaceUser", payload);

const requestWorkspace = async (payload) =>
  await api
    .structure("requestWorkspace")
    .getData("myRequstToWorkspace", payload);

const manageRequstByWorkspace = async (payload) =>
  await api
    .structure("requestWorkspace")
    .getData("manageRequstByWorkspace", payload);

const newRequestToWorkspace = async (payload) =>
  await api
    .structure("_workcpaseAction")
    .getData("newRequestToWorkspace", payload);

const getInvoiceByWorkspace = async (payload) =>
  await api.structure("invoice").getData("getInvoiceByWorkspace", payload);

export {
  banUserByWorkspace,
  workspaceGenericForm,
  getProfAreasByWorkSpace,
  getProfAreaByWorkspaceOwner,
  professionalAreaAction,
  getClientWorkspace,
  ownerWorkspaceEdit,
  newRequestToWorkspace,
  manageRequstByWorkspace,
  requestWorkspace,
  createWorkspaceUser,
  getInvoiceByWorkspace,
  editRequestWorkspaceUser,
  createWorkspaceWithPayment
};
