import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts, AppStyles } from '../../theme';

export default StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.baseMargin,
  },
  contentContainer: {
    backgroundColor: Colors.greenishBlack,
    justifyContent: 'center',
    marginTop: Metrics.baseMargin,
  },
  contentWrapper: {
    paddingBottom: Metrics.baseMargin,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.inactive,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.inactive,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin,
  },
  bgFade: {
    position: 'absolute',
    bottom: 0,
    height: Metrics.heightRatio(46),
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    padding: Metrics.heightRatio(4),
    alignItems: 'center',
  },
  actionTitle: {
    marginLeft: Metrics.heightRatio(4),
    ...Fonts.SemiBold(12),
  },
  contentMargin: {
    marginBottom: Metrics.heightRatio(46),
    marginHorizontal: Metrics.baseMargin,
  },
  supportContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  supportText: {
    marginHorizontal: Metrics.baseMargin,
    lineHeight: 25,
    flex: 1
  },
  message: {
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin
  },
  btnSupport: {
    marginHorizontal: Metrics.smallMargin,
  },
  growOne: {
    flexGrow: 1,
  },

});
