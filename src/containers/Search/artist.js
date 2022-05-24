import React from 'react'
import { View } from 'react-native'
import { getUsers } from '../../CommonApis'
import { UserList } from '../../components'
import { users } from '../../data'
import { AppStyles } from '../../theme'
import { USER_LIST_TYPES } from '../../theme/String'

const Artist = (props) => {

  const { } = props

  const getArtists = (isConcat, params, cbOnSuccess, cbOnFailure) => {
    getUsers(
      isConcat,
      params,
      cbOnSuccess,
      cbOnFailure
    )
  }

  return (
    <View style={[AppStyles.flex, AppStyles.hBasePadding]}>
      <UserList
        fetchRequest={getArtists}
        hideSearch={true} // hide searchbar inside userlist
        searching={true} // search through outside search
        tabName='artist'
      />
    </View>
  )
}

export default Artist
