import React from 'react'
import { Text, FlatList, ImageBackground } from 'react-native'
import styles from './styles'
import { ButtonView } from '../../reuseableComponents'
import { navigate } from '../../services/NavigationService'
import { useSelector } from 'react-redux'

const index = (props) => {

  const { } = props
  const artistTypes = useSelector(({ artistTypes }) => artistTypes.data)

  const _renderItem = ({ item }) => {

    return (
      <ButtonView
        borderless={true}
        onPress={() => navigate('Login')}>
        <ImageBackground
          source={{ uri: item.image }}
          resizeMode='cover'
          style={styles.bgImage}>
          <Text style={styles.title}>
            {(item.title).toUpperCase()}
          </Text>
        </ImageBackground>
      </ButtonView>
    )
  }

  return (
    <FlatList
      data={artistTypes}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id + ''}
    />
  )
}

export default index
