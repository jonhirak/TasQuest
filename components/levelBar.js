import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';

const LevelBar = ({ currentHealth, health, height, healthPercent }) => {

  return (
    <>
      <View
        style = {{
          height,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: height,
          overflow: 'hidden',
          borderWidth: 1,
        }}>
        <View style = {{
          height,
          width: `${healthPercent} + %`,
          borderRadius: height,
          backgroundColor: 'rgba(54, 168, 208, 0.8)',
          position: 'absolute',
          left: 0,
          top: 0,
        }}/>
      </View>
      {/* <Text
        style={{
          fontFamily: 'Menlo',
          fontSize: 12,
          fontWeight: '900',
          marginTop: 2,
          alignSelf: 'center'
        }}>
          {currentHealth}/{health}
      </Text> */}
    </>
  )
};

export default LevelBar;