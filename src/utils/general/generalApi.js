import Directual from "directual-api";
const api = new Directual({ apiHost: "/" });

const login = async (username, password) =>
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

const resetPassword = async (payload) =>
  await api
    .structure("reset_password_inputs")
    .setData("resetPassword", payload);

const getPricing = async () =>
  await api.structure("tariff").getData("getTarif");

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

export {
  login,
  logout,
  checkIfUserExist,
  generateOtp,
  validateOtp,
  resetPassword,
  checkUser,
  getPricing,
  getProvinces,
  getProfile,
  editProfile,
  getUserGenericForm,
  getUserWorkspace
};
