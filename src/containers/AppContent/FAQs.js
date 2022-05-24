import React, { useState, useEffect } from 'react';
import { Text, View, Image, ImageBackground, StatusBar, SafeAreaView } from 'react-native';
import styles from './styles';
import { FlatListHandler, ButtonView, ImageButton, Separator } from '../../reuseableComponents';
import { Images, Colors, Metrics } from '../../theme';
import { NavBackButton } from '../../components';
import utility from '../../utility';
import { faqs } from '../../data';

const index = (props) => {

  const { navigation } = props
  const [activeId, setActiveId] = useState(-1)

  const _onCellPress = (index) => {
    index == activeId ? setActiveId(-1) : setActiveId(index)
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.cellWrapper}>
        <ButtonView
          onPress={() => _onCellPress(index)}
          style={styles.btnQuestion}>

          <Text style={styles.question}>{item.question}</Text>
          <Image
            source={index == activeId ? Images.icDown : Images.icForward}
            style={styles.icon}
          />

        </ButtonView>
        {index == activeId &&
          <View style={styles.answerContainer}>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        }
        <Separator style={{ marginTop: Metrics.doubleBaseMargin }} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>

      <ImageBackground
        style={styles.bg}
        source={Images.bgFaq}>
        <Text style={styles.txtBg}>How can we help you?</Text>
      </ImageBackground>
      <FlatListHandler
        data={faqs}
        renderItem={_renderItem}
      />
    </SafeAreaView>
  )
}

export default index
