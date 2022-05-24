import React, {
  useCallback, useEffect, useRef
} from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { deleteFollowRequest, followUser, unblockUser } from '../../CommonApis'
import { useMergeState } from '../../hooks'
import { FlatListHandler, SearchBar } from '../../reuseableComponents'
import { closeAlert, showAlert, subscribeBusEvent, updateByIndex, updateMultiSelect } from '../../reuseableFunctions'
import { AppStyles } from '../../theme'
import { BUS_EVENTS, USER_LIST_TYPES } from '../../theme/String'
import UserListCell from '../UserListCell'

const {
  DEFAULT,
  SELECTION
} = USER_LIST_TYPES

const index = (props) => {

  const {
    listType, fetchRequest,
    selectedIds, selectedUsers,
    disabled, onSelectionChange,
    hideSearch, searching, tabName
  } = props

  const mountRef = useRef(false)
  const stateRef = useRef(false)
  const user = useSelector(({ user }) => user.data)
  const searchText = useRef('');

  global.log('userlist');

  const [state, setState] = useMergeState({
    users: [],
    meta: null,
    isFetching: false,
    selectedIds: selectedIds,
    selectedUsers: selectedUsers
  })

  useEffect(() => {

    if (searching) {
      subscribeBusEvent(BUS_EVENTS.SEARCH_TEXT_CHANGE, cbOnSearch)
    } else {
      fetchUsers()
    }

    return () => {
      mountRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true
    } else {
      onSelectionChange?.(state.selectedIds, state.selectedUsers)
    }
  }, [state.selectedIds])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  const updateState = (state = {}) => {
    if (mountRef.current) {
      setState(state)
    }
  }

  const fetchUsers = (isConcat, params) => {

    let _params = { ...params, screen_name: 'default' }

    if (searching) {
      _params = { ...params, screen_name: 'search', keyword: searchText.current, user_type: 'artist' }
    }

    if (fetchRequest) {
      setState({ isFetching: true })
      fetchRequest(
        isConcat,
        _params,
        cbOnSuccess,
        cbOnFailure
      )
    }
  }

  const cbOnSuccess = (users, message, meta) => {
    updateState({ users, meta, isFetching: false })
  }

  const cbOnFailure = () => { updateState({ isFetching: false }) }

  const cbOnSearch = ({ text, activeTab }) => {
    global.log({ activeTab, tabName, text, ref: searchText.current });
    if (activeTab == tabName && searchText.current != text) {
      searchText.current = text
      fetchUsers()
    }
  }

  const follow = (item, index) => () => {
    if (item.following) {
      //unfollow
      deleteFollowRequest(item.id)
    } else {
      //follow
      followUser({
        actor_id: user.id,
        target_id: item.id,
        status: 1
      })
    }

    const users = updateByIndex(
      stateRef.current.users,
      index,
      { following: !item.following }
    )

    setState({ users })
  }

  const removeFollower = () => () => { }
  const removeFollowing = () => () => { }
  const confirmFollowReq = () => () => { }
  const cancelFollowReq = () => () => { }

  const confirmUnblock = (item, index) => () => {
    showAlert({
      message: `Are you sure you want to unblock “${item.name}”?`,
      canChoose: true,
      onRightPress: () => unblock(item, index),
      isRightNegative: true
    })
  }

  const unblock = (item, index) => {
    closeAlert()
    const updatedUsers = [...state.users].splice(index, 1);
    updateState({ users: updatedUsers })
    unblockUser(item.id)
  }

  const onPress = useCallback((user) => () => {
    if (listType == SELECTION) {
      const { selectedIds, selectedUsers } = stateRef.current
      const { updatedIds, updatedData } = updateMultiSelect(selectedUsers, selectedIds, user)

      updateState({
        selectedIds: updatedIds,
        selectedUsers: updatedData,
      })
    } else if (listType == DEFAULT) {
      updateState({
        selectedIds: [user.id],
        selectedUsers: [user],
      })
    }
  }, [])

  const _isSelected = (user) => {
    if (listType == SELECTION && state.selectedIds.includes(user.id)) {
      return true
    }
    return false
  }

  const setSearchText = (text) => {
    // searchText.current = text
    fetchUsers(false, { page: 1, keyword: text })
  }

  const _renderItem = useCallback(({ item, index }) => {
    return (
      <UserListCell
        user={item}
        listType={listType}
        disabled={disabled}
        isSelected={_isSelected(item)}
        onPress={onPress(item)}
        onFollow={follow(item, index)}
        onUnblock={confirmUnblock(item, index)}
        onRemoveFollower={removeFollower}
        onRemoveFollowing={removeFollowing}
        onConfirmFollowReq={confirmFollowReq}
        onCancelFollowReq={cancelFollowReq}
      />
    )
  }, [state.selectedIds])

  return (
    <View style={AppStyles.flex}>
      {!hideSearch &&
        <SearchBar
          onChangeText={setSearchText}
        />}
      <FlatListHandler
        data={state.users}
        renderItem={_renderItem}
        fetchRequest={fetchUsers}
        meta={state.meta}
        isFetching={state.isFetching}
      />
    </View>
  )
}

index.defaultProps = {
  listType: USER_LIST_TYPES.DEFAULT,
  selectedIds: [],
  selectedUsers: [],
  hideSearch: false
}
export default index
