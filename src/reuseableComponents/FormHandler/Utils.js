import _ from "lodash";
import { INPUT_TYPES } from "./constants";

function isEmpty(data: any) {
  return _.isEmpty(data);
}

function isEmailValid(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isPasswordValid(password: string) {
  return password.length > 5;
}

function validate(value, type, password) {
  // if (!checkEmptyOnly) {
  switch (type) {
    case INPUT_TYPES.PHONE: {
      return value.isValid;
    }
    case INPUT_TYPES.EMAIL: {
      return !isEmpty(value) && isEmailValid(value);
    }
    case INPUT_TYPES.PASSWORD: {
      return !isEmpty(value) && isPasswordValid(value);
    }
    case INPUT_TYPES.TEXT: {
      return !isEmpty(value);
    }
    case INPUT_TYPES.NUMBER: {
      return !isEmpty(value);
    }
    case INPUT_TYPES.DECIMAL: {
      return !isEmpty(value);
    }
    case INPUT_TYPES.CONFIRM_PASSWORD: {
      return !isEmpty(value) && value === password;
    }
    case INPUT_TYPES.SELECTABLE: {
      return _.isUndefined(value) || _.isNull(value) ? false : true
    }
    case INPUT_TYPES.DATETIME: {
      return _.isDate(value);
    }
    case INPUT_TYPES.GOOGLE_PLACES: {
      return !_.isEmpty(value.address)
    }
    default: {
      return true;
    }
  }
  // }
  // else {
  //   return !isEmpty(value)
  // }
}

function getError(type, val, originalError) {

  const { EMAIL, PASSWORD, CONFIRM_PASSWORD, SELECTABLE, DATETIME } = INPUT_TYPES;

  if (
    type != SELECTABLE &&
    type != DATETIME &&
    val == ''
  ) {
    if (type === EMAIL) {
      return "Email is required";
    }

    if (type === PASSWORD) {
      return "Password is required";
    }

    if (type === CONFIRM_PASSWORD) {
      return "Confirm password is required";
    }
  }

  if (type === EMAIL && !isEmailValid(val)) {
    return 'Enter valid email';
  }

  if (type === CONFIRM_PASSWORD && val.length < 6) {
    return "Password length must be greater than 6 characters";
  }

  if (type === CONFIRM_PASSWORD && val.length >= 6) {
    return "Confirm password and password don't match";
  }

  if (type === PASSWORD && val.length < 6) {
    return "Password length must be greater than 6 characters";
  }

  return originalError;
}

// showPassword is passed to input to as props
function isSecureTextEntry(childProps) {
  // handling password field
  if (
    childProps.type &&
    childProps.type === INPUT_TYPES.PASSWORD &&
    !childProps.showPassword
  ) {
    return true;
  }

  // handling confirm password field
  if (
    childProps.type &&
    childProps.type === INPUT_TYPES.CONFIRM_PASSWORD &&
    !childProps.showPassword
  ) {
    return true;
  }

  return false;
}

function getKeyboardType(childProps) {
  if (childProps.type) {
    switch (childProps.type) {
      case INPUT_TYPES.EMAIL: {
        return "email-address";
      }
      case INPUT_TYPES.NUMBER: {
        return "number-pad";
      }
      case INPUT_TYPES.DECIMAL: {
        return "decimal-pad";
      }
      case INPUT_TYPES.PHONE: {
        return "phone-pad";
      }
      default:
        return "default";
    }
  }
  return "default";
}

export { getKeyboardType, validate, isSecureTextEntry, getError };
