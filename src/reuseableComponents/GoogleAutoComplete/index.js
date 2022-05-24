import React, { useEffect, useRef } from 'react';
import { Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AppStyles, Colors, Images } from '../../theme';
import styles from './styles';
import constants from '../../constants'

const index = (props) => {

  const { onSelect, address } = props
  const ref = useRef()
  useEffect(() => {
    if (address) {
      ref.current.setAddressText(address)
    }
  }, [])

  const generateAddress = (data, details = null) => {
    onSelect?.(details.name)
    // const address = details.address_components;
    // const requiredTypes = ['locality', 'administrative_area_level_1', 'country'];
    // let newAdd = {}
    // for (let i = 0; i < address.length; i++) {
    //   const found = requiredTypes.some(type => address[i].types.includes(type));
    //   global.log({ [found]: address[i].long_name });
    //   // for (let typ of address[i].types) {
    //   //   switch (typ) {
    //   //     case "locality":
    //   //       newAdd.city = address[i].long_name
    //   //       break;
    //   //     case "administrative_area_level_1":
    //   //       newAdd.state = address[i].short_name
    //   //       break;
    //   //     case "country":
    //   //       newAdd.country = address[i].long_name
    //   //       break;
    //   //     default:
    //   //       break;
    //   //   }
    //   // }
    // }

  }

  const _renderLeftButton = () => {
    return (
      <Image
        source={Images.icSearch}
        style={AppStyles.leftMargin10}
      />
    )
  }

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder='Search'
      renderLeftButton={_renderLeftButton}
      fetchDetails={true}
      renderDescription={row => row.description}

      onPress={generateAddress}
      query={{
        key: constants.GOOGLE_API_KEY,
        language: 'en',
        types: ['address'],
      }}
      textInputProps={{
        placeholderTextColor: Colors.white
      }}
      enablePoweredByContainer={false}
      styles={styles}
    />
  )
}

export default index
