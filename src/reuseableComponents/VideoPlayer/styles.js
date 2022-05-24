import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: 'black'
  },
  videoContainer: {
    backgroundColor: Colors.black,
  },
  controlsWrapper: {
    ...StyleSheet.absoluteFill,
    zIndex: 10
  },
  playPauseContainer: {
    flex: 1,
  },
  playPauseView: {
    ...StyleSheet.absoluteFill,
    ...AppStyles.centerAligned,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 15
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 35,
    right: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 15
  },
  seekbarCont: {
    backgroundColor: Colors.shark,
    height: Metrics.heightRatio(2.8),
    marginTop: Metrics.smallMargin,
    justifyContent: 'center',
  },
  timeCont: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.smallMargin,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seekbar: {
    height: Metrics.heightRatio(2.8),
    backgroundColor: 'white'
  },
  seekbarPin: {
    position: 'absolute',
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    zIndex: 20
  },
  txtTime: {
    ...Fonts.Regular(12),
  },
  loader: {
    ...StyleSheet.absoluteFill,
    zIndex: 99
  }
})