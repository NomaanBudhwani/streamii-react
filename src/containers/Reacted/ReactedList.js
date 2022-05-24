import React from 'react'
import { View } from 'react-native'
import { getReactedUsers } from '../../CommonApis'
import { UserList } from '../../components'
import { AppStyles } from '../../theme'
import { USER_LIST_TYPES } from '../../theme/String'

const Liked = (props) => {

  const { route: { params: { postId, type } } } = props

  const getUsers = (isConcat, _params, cbOnSuccess, cbOnFailure) => {

    getReactedUsers(
      isConcat,
      {
        ..._params,
        reaction_type: type.toLowerCase(),
        module: 'posts',
        module_id: postId
      },
      cbOnSuccess,
      cbOnFailure
    )
  }

  return (
    <View style={[AppStyles.flex, AppStyles.hBasePadding]}>
      <UserList
        fetchRequest={getUsers}
        listType={USER_LIST_TYPES.REACTED}
        hideSearch={true}
      />
    </View>
  )
}

export default Liked
