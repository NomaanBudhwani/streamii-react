import React, { useMemo } from 'react'
import { FlatList, SafeAreaView, Switch, View } from 'react-native'
import { AppButton, Separator } from '../../reuseableComponents'
import { Paragraph } from '../../reuseableComponents/Typography'
import { getLoggedInUser, isFan } from '../../reuseableFunctions'
import { pop } from '../../services/NavigationService'
import { Colors, Metrics } from '../../theme'
import { artistOptions, fanOptions } from './options'
import styles from './styles'

const index = (props) => {

  const { } = props
  const loggedInUser = getLoggedInUser()

  const form = useMemo(() => {
    if (isFan()) {
      return fanOptions
    }
    return artistOptions
  }, [loggedInUser.user_type])

  const onSubmit = () => {
    pop()
  };

  const _renderItem = ({ item, index }) => {
    return (
      <>
        <View
          style={styles.switchCellMainView}>
          <View style={styles.switchCellSubView}>
            <Paragraph size={14} color={Colors.white}>
              {item.title}
            </Paragraph>
          </View>
          <Switch
            trackColor={{
              true: Colors.theme,
              false: Colors.inactive,
            }}
            thumbColor={Colors.white}
            // onValueChange={setPrivateValue}
            value={item.isSwitch}
          />
        </View>
        <Separator />
      </>
    )
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={form}
        renderItem={_renderItem}
        scrollEnabled={false}
        keyExtractor={(item, index) => index + ''}
        ListFooterComponent={() => <AppButton title="Save" onPress={onSubmit} />}
        ListFooterComponentStyle={{ marginTop: Metrics.xDoubleBaseMargin }}
      />

    </SafeAreaView>
  )
}

export default index
