import * as yup from 'yup'

const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

const registerUser = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
})
const loginuser = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().required("Required"),
})

const otpverification = yup.object().shape({
    otp: yup.string().required("Required"),
})

const forgotPassword = yup.object().shape({
    email: yup.string().required("Required"),
    password: yup.string().required("Required"),
    repeat_password: yup.string().required("Required"),
})

const reforgotPassword = yup.object().shape({
    old_password: yup.string().required("Required"),
    new_password: yup.string().required("Required"),
    repeat_new_password: yup.string().required("Required"),
})

const requestNewPassword = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
})

const stage1 = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    password: yup.string().min(5).max(25).matches(passwordRule, {message: "Please create a stronger password"}).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Required")
})

const stage2 = yup.object().shape({
    province: yup.string().required("Required"),
    postalcode: yup.string().required("Required"),
    phone: yup.string().required("Required"),
})

const userOnboard3 = yup.object().shape({
    yearsOfExperience: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    city: yup.string().required("Required"),
})


const workspace1 = yup.object().shape({
    workspace: yup.string().required("Required"),
    professionalArea: yup.string().required("Required"),
    maxMentors: yup.number().required("Required"),
    maxMentees: yup.number().required("Required"),
})

const editWorkspace = yup.object().shape({
    workspace: yup.string().required("Required"),
    description: yup.string().required("Required"),
    maxMentors: yup.number().required("Required"),
    maxMentees: yup.number().required("Required"),
})

const userDynamicForm = yup.object().shape({
    label: yup.string().required("Required"),
    options: yup.array().required("Required"),
    acceptedValue: yup.string().required("Required"),
})

const profile = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    city: yup.string().required("Required"),
    postalcode: yup.string().required("Required"),
    profilesummary: yup.string().required("Required"),
    province: yup.string().required("Required"),
    yearsofprofessionalinterest: yup.string().required("Required"),
})


export {
    registerUser,
    loginuser,
    otpverification,
    forgotPassword,
    reforgotPassword,
    requestNewPassword,
    stage1,
    stage2,
    workspace1,
    userDynamicForm,
    userOnboard3,
    profile,
    editWorkspace
}
