'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactNative = require('react-native');
var craftmusicStreamChatReactNativeCore = require('craftmusic-stream-chat-react-native-core');
var NetInfo = _interopDefault(require('@react-native-community/netinfo'));
var ImagePicker = _interopDefault(require('react-native-image-picker'));
var DocumentPicker = _interopDefault(require('react-native-document-picker'));

craftmusicStreamChatReactNativeCore.registerNativeHandlers({
  NetInfo,
  pickImage: () => new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(null, response => {
      if (response.error) {
        reject(Error(response.error));
      }

      let {
        uri
      } = response;

      if (reactNative.Platform.OS === 'android') {
        uri = 'file://' + response.path;
      }

      resolve({
        cancelled: response.didCancel,
        uri
      });
    });
  }),
  pickDocument: async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });
      let {
        uri
      } = res;

      if (reactNative.Platform.OS === 'android') {
        uri = 'file://' + res.path;
      }

      return {
        cancelled: false,
        uri,
        name: res.name
      };
    } catch (err) {
      return {
        cancelled: true
      };
    }
  }
});

if (reactNative.Platform.OS === 'android') {
  if (typeof Symbol === 'undefined') {
    require('es6-symbol/implement');

    if (Array.prototype[Symbol.iterator] === undefined) {
      Array.prototype[Symbol.iterator] = function () {
        let i = 0;
        return {
          next: () => ({
            done: i >= this.length,
            value: this[i++]
          })
        };
      };
    }
  }
}

Object.keys(craftmusicStreamChatReactNativeCore).forEach(function (key) { exports[key] = craftmusicStreamChatReactNativeCore[key]; });
//# sourceMappingURL=index.js.map
