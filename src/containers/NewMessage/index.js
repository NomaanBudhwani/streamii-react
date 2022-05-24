import React, { useCallback, useRef } from 'react'
import { View, Text } from 'react-native'
import { UserList } from '../../components'
import { users } from '../../data'
import { navigate } from '../../services/NavigationService'
import { AppStyles } from '../../theme'
import { USER_LIST_TYPES } from '../../theme/String'

const index = (props) => {

  const { } = props

  const onSelect = (ids, users) => {
    navigate('ChatRoom', { user: users[0] })
  }

  return (
    <View style={[AppStyles.flex, AppStyles.hBasePadding]}>
      <UserList
        users={users}
        listType={USER_LIST_TYPES.DEFAULT}
        disabled={false}
        onSelectionChange={onSelect}
      />
    </View>
  )
}

export default index
