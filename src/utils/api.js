
import Directual from 'directual-api';
const api = new Directual({apiHost: '/'});

const login = async (username, password) =>  await api.auth.login(username, password);


const logout = async (payload) =>  await api.auth.logout(payload);

const checkIfUserExist = async (payload) => await api.structure('WebUser').getData('checkEmail', payload)

const checkUserEmailByWorkspace = async (payload) => await api.structure('userByworkSpace').getData('checkUserEmailByWorkspace', payload)

const generateOtp = async (payload) => await api.structure('prespective_customers').setData('generateOtp', payload)

const generateOtp2 = async (payload) => await api.structure('uservalidation').getData('generateOtp2', payload)

const checkUser = async (payload) => await api.structure('uservalidation').getData('checkUser', payload)

const validateOtp = async (payload) => await api.structure('uservalidation').getData('validateOtp', payload)

const validateUser = async (payload) => await api.structure('uservalidation').setData('validateOtp', payload)

const checkUserForValidation = async (payload) => await api.structure('uservalidation').getData('checkUserForValidation', payload)

const resetPassword = async (payload) => await api.structure('reset_password_inputs').setData('resetPassword', payload)

const requestPasswordChange = async (payload) => await api.structure('ResetPasswordRequest').setData('requestPasswordChange', payload)

const resetPwdFromProfile = async (payload) => await api.structure('reset_password_from_profile').setData('resetPwdFromProfile', payload)

const getPricing = async () => await api.structure('tariff').getData('getTarif');

const getProvinces = async () => await api.structure('provinces').getData('getProvince');

const getWorkspace = async (payload) => await api.structure('workspace').getData('ownerWorkspaseListing', payload);

const ownerWorkspaceEdit = async (payload) => await api.structure('workspace').setData('ownerWorkspaceEdit', payload);
 
const getUserWorkspace = async (payload) => await api.structure('workspace').getData('getUserWorkspaceById', payload);

const createWorkspaceWithPayment = async (payload) => await api.structure('_workcpaseAction').setData('createWorkspaceWithPayment', payload)

const editRequestWorkspaceUser = async (payload) => await api.structure('_workcpaseAction').setData('editRequestWorkspaceUser', payload)

const createWorkspaceUser = async (payload) => await api.structure('_workcpaseAction').setData('createWorkspaceUser', payload)

const getProfile = async (payload) => await api.structure('WebUser').getData('profile', payload);

const editOwnerProfile = async (payload) => await api.structure('WebUser').setData('editOwnerProfile', payload)

const requestWorkspace = async (payload) => await api.structure('requestWorkspace').getData('myRequstToWorkspace', payload);

const manageRequstByWorkspace = async (payload) => await api.structure('requestWorkspace').getData('manageRequstByWorkspace', payload);

const newRequestToWorkspace = async (payload) => await api.structure('_workcpaseAction').getData('newRequestToWorkspace', payload);

const getInvoiceByWorkspace = async (payload) => await api.structure('invoice').getData('getInvoiceByWorkspace', payload);

const getMentorsByWorkspaceId = async (payload) => await api.structure('userByworkSpace').getData('getMentorsByWorkspaceId', payload);

const getMenteesByWorkspaceId = async (payload) => await api.structure('userByworkSpace').getData('getMenteesByWorkspaceId', payload);

// Client 
const getProfAreasByWorkSpace = async (payload) => await api.structure('professional_areas').getData('getProfAreaByWorkspaceOwner', payload);
const getProfAreaByWorkspaceOwner = async (payload) => await api.structure('professional_areas').getData('getProfAreaByWorkspaceOwner', payload);

const professionalAreaAction = async (payload) => await api.structure('_professional_areasAction').setData('professionalAreaAction', payload);


// Mentees 
const getMenteeProfile = async (payload) => await api.structure('WebUser').getData('getMenteeProfile', payload);

// Mentees 
const getMentorProfile = async (payload) => await api.structure('WebUser').getData('getMentorProfile_copy', payload);

const banUserByWorkspace = async (payload) => await api.structure('_userByworkSpace').setData('banUserByWorkspace', payload);

// Form
const workspaceGenericForm = async (payload) => await api.structure('workspace').setData('workspaceGenericForm', payload)

const getUserGenericForm = async (payload) => await api.structure('workspace').getData('getUserGenericForm', payload)


export {
    login,
    logout,
    resetPassword,
    requestPasswordChange,
    resetPwdFromProfile,
    getPricing,
    getProvinces,
    createWorkspaceWithPayment,
    editRequestWorkspaceUser,
    getWorkspace,
    getProfile,
    editOwnerProfile,
    getUserWorkspace,
    createWorkspaceUser,
    requestWorkspace,
    newRequestToWorkspace,
    manageRequstByWorkspace,
    getMentorsByWorkspaceId,
    getMenteesByWorkspaceId,
    ownerWorkspaceEdit,
    getInvoiceByWorkspace,
    getMenteeProfile,
    banUserByWorkspace,
    getProfAreasByWorkSpace,
    getProfAreaByWorkspaceOwner,
    professionalAreaAction,
    workspaceGenericForm,
    getUserGenericForm,
    checkIfUserExist,
    checkUserEmailByWorkspace,
    generateOtp,
    generateOtp2,
    checkUser,
    validateOtp,
    validateUser,
    checkUserForValidation,
    getMentorProfile,
}