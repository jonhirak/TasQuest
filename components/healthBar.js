import React, { useState } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';

const HealthBar = ({ currentHealth, health, height, healthPercent }) => {
  const healthColor = (healthPercent) => {
    let result;
    if (healthPercent > 50) {
      result = 'rgba(80, 200, 60, 0.9)'
    } else if (healthPercent >20) {
      result = 'rgba(245, 183, 39, 0.8)';
    } else {
      result = 'rgba(228, 18, 18, 0.8)';
    }
    return result;
  }

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
          backgroundColor: healthColor(healthPercent),
          position: 'absolute',
          left: 0,
          top: 0,
        }}/>
      </View>
      <Text
        style={{
          fontFamily: 'Menlo',
          fontSize: 12,
          fontWeight: '900',
          marginTop: 2,
          alignSelf: 'center'
        }}>
          {currentHealth}/{health}
      </Text>
    </>
  )
};

export default HealthBar;