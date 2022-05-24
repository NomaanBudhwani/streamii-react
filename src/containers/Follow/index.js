import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { getUsers } from '../../CommonApis'
import { UserList } from '../../components'
import { LoginContext } from '../../contexts'
import { TextButton } from '../../reuseableComponents'
import { Headline } from '../../reuseableComponents/Typography'
import { hideSplash } from '../../reuseableFunctions'
import { AppStyles, Colors } from '../../theme'
import { USER_LIST_TYPES } from '../../theme/String'

const index = (props) => {

  const { navigation } = props
  const { setLogin } = useContext(LoginContext)

  useEffect(() => {
    hideSplash()
    navigation.setOptions({ headerRight: renderHeaderRight })
  }, [])

  const onDone = () => {
    setLogin(true)
  }

  const renderHeaderRight = () => {
    return (
      <TextButton
        title={'Done'}
        style={AppStyles.headerMargin}
        onPress={onDone}
        textColor={Colors.theme}
      />
    )
  }

  const getAllUsers = (isConcat, params, cbOnSuccess, cbOnFailure) => {
    let _params = { user_type: 'artist', ...params }
    getUsers(
      isConcat,
      _params,
      cbOnSuccess,
      cbOnFailure
    )
  }

  return (
    <View style={[AppStyles.flex, AppStyles.hBasePadding]}>
      <Headline style={[AppStyles.txtCenter, AppStyles.vBaseMargin]}>
        {"Follow your favourite \nartists to get updated"}
      </Headline>
      <UserList
        listType={USER_LIST_TYPES.FOLLOW}
        fetchRequest={getAllUsers}
      />
    </View>
  )
}

export default index
