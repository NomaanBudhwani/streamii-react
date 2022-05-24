import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/constants";

// export const formValues = [
//   {
//     type: INPUT_TYPES.TEXT,
//     identifier: 'fName',
//     label: 'Full Name',
//     length: 25,
//     error: 'Full name is required',
//   },
//   {
//     type: INPUT_TYPES.TEXT,
//     identifier: 'uName',
//     label: 'User Name',
//     length: 25,
//     error: 'User name is required',
//   },
//   {
//     type: INPUT_TYPES.EMAIL,
//     identifier: 'email',
//     label: 'Your Email',
//     length: 100,
//     error: 'Email is required',
//   },
//   {
//     type: INPUT_TYPES.PHONE,
//     identifier: 'phoneNum',
//     label: 'Phone Number',
//     length: 15,
//     error: 'Phone Number is required',
//   },
//   {
//     type: INPUT_TYPES.PASSWORD,
//     identifier: 'password',
//     label: 'Create a strong password',
//     length: 50,
//     error: 'Password is required',
//   },
//   {
//     type: INPUT_TYPES.CONFIRM_PASSWORD,
//     identifier: 'cPassword',
//     label: 'Repeat password',
//     length: 50,
//     error: 'Confirm password is required',
//   },
// ]

// export const artistTypeValues = {
//   data: [],
//   type: INPUT_TYPES.SELECTABLE,
//   identifier: 'artistType',
//   label: 'Artist Type',
//   error: 'Select artist type',
//   schema: {
//     label: 'title',
//     value: 'value'
//   }
// }

// export const musicGenre = {
//   data: [],
//   type: INPUT_TYPES.SELECTABLE,
//   identifier: 'musicGenre',
//   label: 'Music Genre',
//   error: 'Select music genre',
//   schema: {
//     label: 'title',
//     value: 'value'
//   }
// }

export const artistForm = [
  {
    type: INPUT_TYPES.TEXT,
    identifier: 'fName',
    label: 'Full Name',
    length: 25,
    error: 'Full name is required',
  },
  {
    type: INPUT_TYPES.TEXT,
    identifier: 'uName',
    label: 'User Name',
    length: 25,
    error: 'User name is required',
  },
  {
    type: INPUT_TYPES.EMAIL,
    identifier: 'email',
    label: 'Your Email',
    length: 100,
    error: 'Email is required',
  },
  {
    type: INPUT_TYPES.PHONE,
    identifier: 'phoneNum',
    label: 'Phone Number',
    length: 15,
    error: 'Invalid Phone Number',
  },
  {
    data: [],
    type: INPUT_TYPES.SELECTABLE,
    identifier: 'musicGenre',
    label: 'Music Genre',
    error: 'Select music genre',
    schema: {
      label: 'title',
      value: 'id'
    }
  },
  {
    data: [],
    type: INPUT_TYPES.SELECTABLE,
    identifier: 'artistType',
    label: 'Artist Type',
    error: 'Select artist type',
    schema: {
      label: 'title',
      value: 'id'
    }
  },
  {
    type: INPUT_TYPES.PASSWORD,
    identifier: 'password',
    label: 'Create a strong password',
    length: 50,
    error: 'Password is required',
  },
  {
    type: INPUT_TYPES.CONFIRM_PASSWORD,
    identifier: 'cPassword',
    label: 'Repeat password',
    length: 50,
    error: 'Confirm password is required',
  },
]


export const fanForm = [
  {
    type: INPUT_TYPES.TEXT,
    identifier: 'fName',
    label: 'Full Name',
    length: 25,
    error: 'Full name is required',
  },
  {
    type: INPUT_TYPES.TEXT,
    identifier: 'uName',
    label: 'User Name',
    length: 25,
    error: 'User name is required',
  },
  {
    type: INPUT_TYPES.EMAIL,
    identifier: 'email',
    label: 'Your Email',
    length: 100,
    error: 'Email is required',
  },
  {
    type: INPUT_TYPES.PHONE,
    identifier: 'phoneNum',
    label: 'Phone Number',
    length: 15,
    error: 'Phone Number is required',
  },
  {
    type: INPUT_TYPES.PASSWORD,
    identifier: 'password',
    label: 'Create a strong password',
    length: 50,
    error: 'Password is required',
  },
  {
    type: INPUT_TYPES.CONFIRM_PASSWORD,
    identifier: 'cPassword',
    label: 'Repeat password',
    length: 50,
    error: 'Confirm password is required',
  },
]