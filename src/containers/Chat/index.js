import React, { useCallback } from 'react';
import { View } from 'react-native';
import { FlatListHandler } from '../../reuseableComponents';
import { ChatCell } from '../../components';
import { chats } from '../../data';


const index = props => {
  const { } = props;

  const _renderItem = useCallback(({ item, index }) => {
    return <ChatCell chat={item} />;
  }, []);

  return (
    <View>
      <FlatListHandler
        data={chats}
        extraData={chats}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index + ''}
      />
    </View>
  );
};

export default index;
