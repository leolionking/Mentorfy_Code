import Directual from "directual-api";
const api = new Directual({ apiHost: "/" });

const loginApi = async (username, password) =>
  await api.auth.login(username, password);

const logout = async (payload) => await api.auth.logout(payload);

const checkIfUserExist = async (payload) =>
  await api.structure("WebUser").getData("checkEmail", payload);

const generateOtp = async (payload) =>
  await api.structure("prespective_customers").setData("generateOtp", payload);

const checkUser = async (payload) =>
  await api.structure("uservalidation").getData("checkUser", payload);

const validateOtp = async (payload) =>
  await api.structure("uservalidation").getData("validateOtp", payload);

const validateUser = async (payload) =>
  await api.structure("uservalidation").setData("validateOtp", payload);

const resetPassword = async (payload) =>
  await api
    .structure("reset_password_inputs")
    .setData("resetPassword", payload);

const getPricing = async () =>
  await api.structure("tariff").getData("getTarif");

const inviteUsers = async (payload) =>
  await api.structure("invites").setData("inviteUsers", payload);

const getProvinces = async () =>
  await api.structure("provinces").getData("getProvince");

const getProfile = async (payload) =>
  await api.structure("WebUser").getData("profile", payload);

const editProfile = async (payload) =>
  await api.structure("WebUser").setData("editOwnerProfile", payload);

const getUserGenericForm = async (payload) =>
  await api.structure("workspace").getData("getUserGenericForm", payload);

const getUserWorkspace = async (payload) =>
  await api.structure("workspace").getData("getUserWorkspaceById", payload);

const checkUserEmailByWorkspace = async (payload) =>
  await api
    .structure("userByworkSpace")
    .getData("checkUserEmailByWorkspace", payload);

const checkUserForValidation = async (payload) =>
  await api
    .structure("uservalidation")
    .getData("checkUserForValidation", payload);

export {
  loginApi,
  logout,
  checkIfUserExist,
  generateOtp,
  validateOtp,
  validateUser,
  resetPassword,
  checkUser,
  getPricing,
  getProvinces,
  getProfile,
  editProfile,
  getUserGenericForm,
  getUserWorkspace,
  checkUserEmailByWorkspace,
  checkUserForValidation,
  inviteUsers
};
