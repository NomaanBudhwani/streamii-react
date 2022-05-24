import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: Metrics.baseMargin,
    height: 100,
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  unread: {
    backgroundColor: Colors.theme,
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  avatar: {
    marginRight: Metrics.baseMargin,
  },
});
