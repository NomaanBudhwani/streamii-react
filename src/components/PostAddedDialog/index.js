import React, { useCallback, useRef } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Paragraph, Title } from '../../reuseableComponents/Typography';
import { Colors, Metrics, Fonts, AppStyles, Images } from "../../theme";

const index = (props) => {

  const { } = props

  return (
    <View style={styles.container}>
      <Image source={Images.icUploadFinish} />
      <View style={AppStyles.leftMargin10}>
        <Title>
          Your post is added successfully
        </Title>
        <Paragraph>
          You can edit or remove post
        </Paragraph>
      </View>
    </View>
  )
}

export default index


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.baseMargin
  },
})