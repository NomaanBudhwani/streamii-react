import React, { useContext } from 'react'
import { View } from 'react-native'
import { PostContext } from '../../contexts'
import { Avatar, ButtonView, ImageButton, RoundButton } from '../../reuseableComponents'
import { Paragraph, Title } from '../../reuseableComponents/Typography'
import { navigate, push } from '../../services/NavigationService'
import { AppStyles, Colors, Images } from '../../theme'
import styles from './styles'
import { getLoggedInUser, isFan } from '../../reuseableFunctions'
import utility from '../../utility'

const PostHeader = (props) => {

  const { onPostOptions } = props
  const { user, location, address } = useContext(PostContext)
  const loggedInUser = getLoggedInUser()

  const showotherProfile = () => {
    if (user.id == loggedInUser.id) {
      navigate('Profile')
    } else {
      push('OtherProfile', { userSlug: user.slug })
    }

  }

  const onSupport = () => {
    navigate('SupportArtist', { user })
  }

  return (
    <ButtonView
      disableRipple={true}
      style={styles.headerContainer}
      onPress={showotherProfile}>
      <Avatar source={{ uri: user.image_url }} size={36} />
      <View style={AppStyles.flex}>
        <Title style={AppStyles.leftMargin10} numberOfLines={1}>
          {user.name}
        </Title>
        {!utility.isEmpty(address) && address != "null" &&
          <Paragraph
            size={12}
            color={Colors.inactive}
            style={AppStyles.leftMargin10}>
            {address}
          </Paragraph>
        }
      </View>
      {isFan() &&
        <RoundButton
          title={'Support Artist'}
          style={styles.btnSupport}
          onPress={onSupport}
        />
      }
      <ImageButton
        source={Images.icVerticalDots}
        onPress={onPostOptions}
      />
    </ButtonView>
  )
}

export default PostHeader
