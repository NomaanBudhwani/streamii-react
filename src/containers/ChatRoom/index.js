import React, { useState, useEffect } from 'react';
import { View, Image, TextInput } from 'react-native';
import { DATA } from './mock_data';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import moment from 'moment';
import styles from './styles';
import { Colors, Metrics, Images } from '../../theme';
import { Paragraph } from '../../reuseableComponents/Typography';
import { ImageButton, Separator } from '../../reuseableComponents';
import utility from '../../utility';
import KeyboardManager from 'react-native-keyboard-manager';
import { useKeyboard } from '../../hooks';

const Index = props => {
  const userId = 2;
  const [message, setMessage] = useState('');
  const { visible, height } = useKeyboard();
  const {
    navigation: { setParams },
    route: { params },
  } = props;

  useEffect(() => {
    global.log({ user: params.user.name });
    setParams({ title: params?.user?.name ?? '' });
    if (utility.isPlatformIOS()) {
      KeyboardManager.setEnable(false);
      KeyboardManager.setEnableAutoToolbar(false);
    }
    return () => {
      if (utility.isPlatformIOS()) {
        KeyboardManager.setEnable(true);
        KeyboardManager.setEnableAutoToolbar(true);
      }
    };
  }, []);

  const renderSendInputField = () => {
    return (
      <View style={styles.inputContainer}>
        <Separator />
        <View style={styles.inputSecContainer}>
          <ImageButton
            style={styles.imageButton}
            source={Images.icAttachment}
          />
          <TextInput
            value={message}
            placeholder="Write your message..."
            placeholderTextColor={Colors.white}
            style={styles.inputField}
            onChangeText={setMessage}
          />
          <ImageButton
            style={{ paddingHorizontal: 15 }}
            onPress={() => null}
            source={Images.icSendMessage}
          />
        </View>
      </View>
    );
  };

  const renderBubbleMessage = ({ currentMessage }) => {
    const { text, sender_id, createdAt } = currentMessage;
    return (
      <View>
        <View
          style={[
            sender_id == userId ? styles.userMsg : styles.senderMsg,
            styles.messageWrapper,
          ]}>
          <Paragraph
            size={14}
            style={
              sender_id == userId
                ? styles.messageText
                : styles.messageTextSender
            }
            color={Colors.white}>
            {text}
          </Paragraph>
        </View>
        <Paragraph
          size={12}
          style={[
            styles.time,
            sender_id == userId ? styles.timeRight : styles.timeLeft,
          ]}>
          {moment(createdAt, 'M/DD/YYYY h:mm:ss a').format('MMM DD, h:mm')}
        </Paragraph>
      </View>
    );
  };

  const renderSendButton = props => {
    return (
      <Send {...props}>
        <View style={styles.sendCon}>
          <Image source={Images.icSendMessage} resizeMode={'center'} />
        </View>
      </Send>
    );
  };
  return (
    <View
      style={[
        styles.containerInput,
        {
          paddingVertical: Metrics.heightRatio(8),
          paddingBottom:
            !utility.isPlatformAndroid() && visible ? height + 20 : 0,
        },
      ]}>
      <GiftedChat
        messages={DATA}
        renderTime={() => null}
        renderDay={() => null}
        alwaysShowSend={true}
        renderAvatar={() => null}
        renderInputToolbar={renderSendInputField}
        renderBubble={renderBubbleMessage}
        isKeyboardInternallyHandled={false}
        renderSend={renderSendButton}
        user={{
          _id: userId,
        }}
        renderTicks={messageReceived =>
          global.log(' renderTicks message', messageReceived)
        }
        minInputToolbarHeight={Metrics.heightRatio(50)}
      />
    </View>
  );
};

export default Index;
