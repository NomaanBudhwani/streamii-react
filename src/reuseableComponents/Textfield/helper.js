import constants from "./constants";

export const calculateLabelPosistion = (height, labelHeight) => {
  return (height / 2) - (labelHeight / 2)
}

export const calculateLabelTopPosition = (height, labelHeight) => {
  return Math.floor((height - labelHeight) / 2 + constants.LABEL_TOP_POSITION);
};