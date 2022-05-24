module.exports = {
  dependencies: {
    'react-native-fast-video': {
      platforms: {
        android: {
          sourceDir:
            '../node_modules/react-native-fast-video/android-exoplayer',
        },
      },
    },
  },
  project: {
    android: {}
  },
  assets: [
    './src/assets/fonts/'
  ],
};