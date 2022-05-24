import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { getFollowersFollowing } from '../../CommonApis'
import { UserList } from '../../components'
import { SearchBar, TextButton } from '../../reuseableComponents'
import { navigate } from '../../services/NavigationService'
import { AppStyles, Colors } from '../../theme'
import { USER_LIST_TYPES } from '../../theme/String'

const index = (props) => {

  const { navigation, route } = props
  const _selectedIds = useRef(route.params?.selectedIds ?? [])
  const _selectedUsers = useRef(route.params?.selectedUsers ?? [])

  useEffect(() => {
    navigation.setOptions({ headerRight: renderHeaderRight })
  }, [])

  const confirm = () => {

    navigate(
      'CreatePost',
      {
        selectedUserIds: _selectedIds.current,
        selectedUser: _selectedUsers.current,
      })
  }

  const renderHeaderRight = () => {
    return (
      <TextButton
        title={'Confirm'}
        style={AppStyles.headerMargin}
        onPress={confirm}
        textColor={Colors.theme}
      />
    )
  }

  const getTagUsers = (isConcat, params, cbOnSuccess, cbOnFailure) => {
    let _params = { list_type: 'all', ...params }
    getFollowersFollowing(
      isConcat,
      _params,
      cbOnSuccess,
      cbOnFailure
    )
  }

  const updateSelectedUser = (selectedIds, selectedUsers) => {
    _selectedIds.current = selectedIds
    _selectedUsers.current = selectedUsers
  }

  return (
    <View style={[AppStyles.flex, AppStyles.hBasePadding]}>
      <UserList
        fetchRequest={getTagUsers}
        listType={USER_LIST_TYPES.SELECTION}
        disabled={false}
        selectedIds={_selectedIds.current}
        selectedUsers={_selectedUsers.current}
        onSelectionChange={updateSelectedUser}
      />
    </View>
  )
}

export default index
