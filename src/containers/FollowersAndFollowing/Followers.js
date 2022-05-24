import React from 'react'
import { View } from 'react-native'
import { getFollowersFollowing } from '../../CommonApis'
import { UserList } from '../../components'
import { AppStyles } from '../../theme'
import { USER_LIST_TYPES } from '../../theme/String'

const Followers = (props) => {

  const { } = props

  const getFollowers = (isConcat, params, cbOnSuccess, cbOnFailure) => {
    let _params = { list_type: 'followers', ...params }
    getFollowersFollowing(
      isConcat,
      _params,
      cbOnSuccess,
      cbOnFailure
    )
  }

  return (
    <View style={[AppStyles.flex, AppStyles.hBasePadding]}>
      <UserList
        fetchRequest={getFollowers}
        listType={USER_LIST_TYPES.FOLLOWERS}
        hideSearch={true}
      />
    </View>
  )
}

export default Followers
