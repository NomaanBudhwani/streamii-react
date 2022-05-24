import React, { useContext, useEffect } from 'react'
import { LayoutAnimation, UIManager, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { HOME_POSTS, NORMALIZE_POSTS, USER_REPORT_OPTIONS } from '../../actions/ActionTypes'
import { success, request } from '../../actions/ServiceAction'
import constant from '../../constants'
import { getPosts } from '../../CommonApis'
import { PostAddedDialog, PostList } from '../../components'
import { useMergeState } from '../../hooks'
import { hideSplash, pauseAudio, pauseVideo } from '../../reuseableFunctions'
import { AppStyles } from '../../theme'
import { LoginContext } from '../../contexts'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const animate = () => LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
const name = "homePosts"

const index = (props) => {

  const { navigation, route: { params } } = props
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user.data)
  const { setLogin } = useContext(LoginContext)

  const [state, setState] = useMergeState({
    visible: false,
    newPost: null
  })

  useEffect(() => {

    dispatch(
      request(
        constant.reportOptions,
        constant.serviceTypes.GET,
        null,
        USER_REPORT_OPTIONS,
        false,
        false,
      )
    )

    hideSplash()
    const unsubBlur = navigation.addListener('blur', () => {
      pauseVideo(name)
      pauseAudio(name)
    });

    return unsubBlur

  }, [])

  useEffect(() => {
    if (!user) {
      setLogin(false);
    }
  }, [user])

  useEffect(() => {
    if (params?.post) {
      animate()
      setState({ visible: true, newPost: params.post }) // post list requires ids only

      setTimeout(() => {
        animate()
        setState({ visible: false })
      }, 3000)
    }
  }, [params?.post])

  const getAllPosts = (isConcat, params, cbOnSuccess, cbOnFailure) => {
    getPosts(
      isConcat,
      params,
      cbOnSuccess,
      cbOnFailure,
    )
  }

  return (
    <View style={AppStyles.flex}>
      {state.visible && <PostAddedDialog />}
      <PostList
        fetchRequest={getAllPosts}
        name={name}
        newPost={state.newPost}
      />
    </View>
  );
};

export default index;
