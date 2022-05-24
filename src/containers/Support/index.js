import React, { useCallback, useRef } from 'react'
import { View, Text } from 'react-native'
import { AppStyles } from '../../theme'
import { FlatListHandler } from '../../reuseableComponents'
import { notification } from '../../data'
import { NotificationListCell } from '../../components'

const index = (props) => {

  const { } = props

  const _renderItem = useCallback(({ item, index }) => {
    return (
      <NotificationListCell
        item={item}
      />
    )
  }, [])

  return (
    <View style={[AppStyles.flex, AppStyles.hBaseMargin]}>
      <FlatListHandler
        data={notification}
        renderItem={_renderItem}
        style={{ paddingTop: 50 }}
      />
    </View>
  )
}

export default index
