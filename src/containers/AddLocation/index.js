import React from 'react';
import { View } from 'react-native';
import { GoogleAutoComplete } from '../../reuseableComponents';
import { navigate } from '../../services/NavigationService';
import { AppStyles } from '../../theme';

const index = props => {
  const { route: { params } } = props
  const onSelectLocation = (address) => {
    navigate('CreatePost', { address })
  }

  return (
    <View style={[AppStyles.flex, AppStyles.hBasePadding]}>
      <GoogleAutoComplete
        address={params.location ?? null}
        onSelect={onSelectLocation}
      />
    </View>
  );
};

export default index;
