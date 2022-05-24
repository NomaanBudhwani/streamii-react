import React, { useCallback, useRef } from 'react'
import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { hideSplash } from './src/reuseableFunctions'

const StickyFlatlist = (props) => {

  const { } = props

  useEffect(() => {
    hideSplash()
  }, [])

  return (
    <View style={{ flex: 1 }}>
    </View>
  )
}

export default StickyFlatlist
