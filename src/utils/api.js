
import Directual from 'directual-api';
const api = new Directual({apiHost: '/'});



const checkUserEmailByWorkspace = async (payload) => await api.structure('userByworkSpace').getData('checkUserEmailByWorkspace', payload)


const checkUserForValidation = async (payload) => await api.structure('uservalidation').getData('checkUserForValidation', payload)



// Client 



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