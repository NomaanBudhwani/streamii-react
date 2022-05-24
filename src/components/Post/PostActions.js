import React, { memo, useContext } from 'react';
import { View, Text } from 'react-native';
import { AppStyles, Colors, Images, Metrics } from '../../theme';
import styles from './styles';
import { TextImageButton } from '../../reuseableComponents';
import { PostContext } from '../../contexts';
import { loggedInUser } from '../../data';

const btnWidth = Metrics.screenWidth / 4;
const PostActions = props => {
  const { onLike, onDislike, onComment, onToken } = props;
  const { is_user_like, is_user_dislike, total_token, type, user } = useContext(PostContext);

  const likeStyle = is_user_like
    ? {
      source: Images.icLiked,
      titleColor: Colors.like,
    }
    : {
      source: Images.icUnliked,
      titleColor: Colors.inactive,
    };

  const dislikeStyle = is_user_dislike
    ? {
      source: Images.icDisliked,
      titleColor: Colors.dislike,
    }
    : {
      source: Images.icUnDisliked,
      titleColor: Colors.inactive,
    };

  const showSupportUser = user.id == loggedInUser.id;

  return (
    <View style={styles.actionsContainer}>
      <TextImageButton
        onPress={onLike}
        title="Like"
        disabled={false}
        {...likeStyle}
        style={styles.growOne}
      />
      <TextImageButton
        onPress={onDislike}
        title="Dislike"
        disabled={false}
        {...dislikeStyle}
        style={styles.growOne}
      />
      <TextImageButton
        onPress={onComment}
        title="Comment"
        disabled={false}
        source={Images.icComment}
        titleColor={Colors.inactive}
        style={styles.growOne}
      />
      {type != 'support' && (
        <TextImageButton
          onPress={onToken}
          title={`${total_token} Tokens`}
          disabled={!showSupportUser}
          source={Images.icToken}
          titleColor={Colors.token}
          style={styles.growOne}
        />
      )}
    </View>
  );
};

export default PostActions;
