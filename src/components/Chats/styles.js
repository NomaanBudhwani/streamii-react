import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 25,
  },
  unread: {
    backgroundColor: Colors.theme,
    height: 12,
    width: 12,
    borderRadius: 6,
    position: 'absolute',
    top: 25,
    right: 0,
  },
  date: {
    position: 'absolute',
    top: 3,
    right: 0,
  },
  avatar: {
    marginRight: 12,
  },
});
