import * as yup from "yup";

const passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const registerUser = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});
const pricing = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  fullName: yup.string().required("Required"),
});
const loginuser = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().required("Required"),
});

const otpverification = yup.object().shape({
  otp: yup.string().required("Required"),
});

const forgotPassword = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .max(25)
    .matches(passwordRule, { message: "Please create a stronger password" })
    .required("Required"),
  repeat_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const resetPassword = yup.object().shape({
  old_password: yup.string().required("Required"),
  new_password: yup.string().required("Required"),
  repeat_new_password: yup.string().required("Required"),
});

const clientProfileValidation = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  country: yup.string().required("Required"),
  province: yup.string().required("Required"),
  postalcode: yup.string().required("Required"),
});

const requestNewPassword = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});

const onboardClientValidation = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .max(25)
    .matches(passwordRule, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  country: yup.string().required("Required"),
  province: yup.string().required("Required"),
  postalcode: yup.string().required("Required"),
  phone: yup.string().required("Required"),
  professionalArea: yup.string().required("Required"),
  description: yup.string().required("Required"),
  logo: yup.string().required("Required"),
  workspaceName: yup.string().required("Required"),
  label: yup.string().required("Required"),
  acceptedValue: yup.string().required("Required"),
  options: yup.array().required("Required"),
});

const acceptanceCriteriaValidation = yup.object().shape({
  label: yup.string().required("Required"),
  acceptedValue: yup.string().required("Required"),
  options: yup.array().required("Required"),
});

const onboardUserValidation = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .max(25)
    .matches(passwordRule, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  phone: yup.string().required("Required"),
  postalcode: yup.string().required("Required"),
  province: yup.string().required("Required"),
  city: yup.string().required("Required"),
  yearsOfExperience: yup.string().required("Required"),
  firstName: yup.string().required("Required"),
  gender: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  professionalArea: yup.string().required("Required"),
  email: yup.string().required("Required"),
  otp: yup.string().required("Required"),
  summary: yup.string().required("Required"),
  linkedin: yup.string().required("Required"),
});

const stage2 = yup.object().shape({
  province: yup.string().required("Required"),
  postalcode: yup.string().required("Required"),
  phone: yup.string().required("Required"),
});

const userOnboard3 = yup.object().shape({
  yearsOfExperience: yup.string().required("Required"),
  gender: yup.string().required("Required"),
  city: yup.string().required("Required"),
});

const workspace1 = yup.object().shape({
  workspace: yup.string().required("Required"),
  professionalArea: yup.string().required("Required"),
  maxMentors: yup.number().required("Required"),
  maxMentees: yup.number().required("Required"),
});

const editWorkspace = yup.object().shape({
  workspace: yup.string().required("Required"),
  description: yup.string().required("Required"),
  maxMentors: yup.number().required("Required"),
  maxMentees: yup.number().required("Required"),
});

const userDynamicForm = yup.object().shape({
  label: yup.string().required("Required"),
  options: yup.array().required("Required"),
  acceptedValue: yup.string().required("Required"),
});

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
});

export {
  registerUser,
  loginuser,
  otpverification,
  forgotPassword,
  resetPassword,
  requestNewPassword,
  onboardClientValidation,
  pricing,
  stage2,
  workspace1,
  userDynamicForm,
  userOnboard3,
  profile,
  editWorkspace,
  clientProfileValidation,
  onboardUserValidation,
  acceptanceCriteriaValidation
};
