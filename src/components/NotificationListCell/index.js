import React, { useCallback, memo } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from '../../reuseableComponents'
import { Paragraph, Title } from '../../reuseableComponents/Typography'
import { AppStyles, Colors, Metrics } from '../../theme'
import styles from './styles'

const index = (props) => {

  const { item } = props

  return (
    <View style={styles.notiCellMainview}>
      <View style={styles.notiCellSubview1}>
        <Avatar source={{ uri: item.user.image }} size={40} />
        <Title
          size={14}
          color={Colors.white}
          style={AppStyles.hBaseMargin}>
          {item.user.name + ' '}
          <Paragraph
            size={14}
            color={Colors.inactive}>
            {item.message}
          </Paragraph>
        </Title>
      </View>
      <View>
        <Paragraph size={14} color={Colors.inactive}>
          {item.time}
        </Paragraph>
      </View>
    </View>
  )
}

export default memo(index)
