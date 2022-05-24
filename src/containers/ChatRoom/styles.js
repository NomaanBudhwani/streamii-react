import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.greenishBlack,
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.heightRatio(48),
  },
  inputSecContainer: {
    backgroundColor: Colors.greenishBlack,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.heightRatio(10),
    paddingHorizontal: 5,
  },
  inputField: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    height: Metrics.heightRatio(48),
    color: Colors.white,
  },
  messageWrapper: {
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    marginTop: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: Metrics.screenWidth - Metrics.doubleBaseMargin * 3,
    marginBottom: Metrics.heightRatio(10),
    borderRadius: 15,
  },
  messageText: {
    ...Fonts.Regular(14),
    fontSize: 14,
    color: Colors.lynch,
    lineHeight: 21,
  },
  messageTextSender: {
    color: Colors.dislike,
    lineHeight: 21,
    ...Fonts.Regular(14),
  },
  containerInput: {
    flex: 1,
    backgroundColor: Colors.containerInput,
  },
  sendCon: {
    marginRight: 10,
    marginBottom: 5,
  },

  time: {
    color: Colors.lynch,
    position: 'absolute',
    bottom: -10,
    right: 100,
    left: 100,
  },
  timeRight: {right: 10, textAlign: 'right'},
  timeLeft: {left: 10, textAlign: 'left'},
  userMsg: {
    backgroundColor: Colors.theme,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 15,
  },
  senderMsg: {
    backgroundColor: Colors.shark,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 0,
  },
  imageButton: {
    marginLeft: 10,
  },
});
