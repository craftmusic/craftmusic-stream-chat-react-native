import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

export const IconSquare = ({ icon, onPress, style }) => {
  if (onPress)
    return (
      <TouchableOpacity
        style={{
          padding: 5,
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: 5,
          ...style,
        }}
        onPress={onPress}
      >
        <Image source={icon} style={{ height: 15, width: 15 }} />
      </TouchableOpacity>
    );
  else
    return (
      <View
        style={{
          padding: 5,
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: 5,
          ...style,
        }}
      >
        <Image source={icon} style={{ height: 15, width: 15 }} />
      </View>
    );
};
