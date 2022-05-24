import { artistType, gender, musicGenre } from "../../data";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/constants";

export const artistForm = [
  {
    type: INPUT_TYPES.TEXT,
    identifier: 'name',
    label: 'Full Name',
    length: 25,
    error: 'Full name is required',
    optional: false,
    disabled: false
  },
  {
    type: INPUT_TYPES.TEXT,
    identifier: 'username',
    label: 'User Name',
    length: 25,
    error: 'User name is required',
    optional: false,
    disabled: true
  },
  {
    type: INPUT_TYPES.EMAIL,
    identifier: 'email',
    label: 'Your Email',
    length: 100,
    error: 'Email is required',
    optional: false,
    disabled: true
  },
  {
    type: INPUT_TYPES.PHONE,
    identifier: 'phone',
    label: 'Phone Number',
    length: 15,
    error: 'Phone Number is required',
    optional: false,
    disabled: true
  },
  {
    data: 'artistTypes',
    type: INPUT_TYPES.SELECTABLE,
    identifier: 'artistType',
    label: 'Artist Type',
    error: 'Select artist type',
    schema: {
      label: 'title',
      value: 'id'
    },
    optional: false,
    disabled: false
  },
  {
    data: 'musicTypes',
    type: INPUT_TYPES.SELECTABLE,
    identifier: 'musicGenre',
    label: 'Music Genre',
    error: 'Select music genre',
    schema: {
      label: 'title',
      value: 'id'
    },
    optional: false,
    disabled: false
  },
  {
    data: 'genders',
    type: INPUT_TYPES.SELECTABLE,
    identifier: 'gender',
    label: 'Gender',
    error: 'Select gender',
    schema: {
      label: 'title',
      value: 'id'
    },
    optional: true,
    disabled: false
  },
  {
    type: INPUT_TYPES.DATETIME,
    identifier: 'dob',
    label: 'Date of Birth',
    error: 'Date of birth is required',
    optional: true,
    disabled: false
  },
  {
    type: INPUT_TYPES.TEXT,
    identifier: 'bio',
    label: 'Bio',
    error: 'Bio is required',
    multiline: true,
    height: 135,
    optional: true,
    disabled: false
  },
]


export const fanForm = [
  {
    type: INPUT_TYPES.TEXT,
    identifier: 'name',
    label: 'Full Name',
    length: 25,
    error: 'Full name is required',
    optional: false,
    disabled: false
  },
  {
    type: INPUT_TYPES.TEXT,
    identifier: 'username',
    label: 'User Name',
    length: 25,
    error: 'User name is required',
    optional: false,
    disabled: true
  },
  {
    type: INPUT_TYPES.EMAIL,
    identifier: 'email',
    label: 'Your Email',
    length: 100,
    error: 'Email is required',
    optional: false,
    disabled: true
  },
  {
    type: INPUT_TYPES.PHONE,
    identifier: 'phone',
    label: 'Phone Number',
    length: 15,
    error: 'Phone Number is required',
    optional: false,
    disabled: true
  },
  {
    data: 'genders',
    type: INPUT_TYPES.SELECTABLE,
    identifier: 'gender',
    label: 'Gender',
    error: 'Select gender',
    schema: {
      label: 'title',
      value: 'id'
    },
    optional: true,
    disabled: false
  },
  {
    type: INPUT_TYPES.DATETIME,
    identifier: 'dob',
    label: 'Date of Birth',
    error: 'Date of birth is required',
    optional: true,
    disabled: false
  },
  {
    type: INPUT_TYPES.TEXT,
    identifier: 'bio',
    label: 'Bio',
    error: 'Bio is required',
    multiline: true,
    height: 135,
    optional: true,
    disabled: false
  },
]