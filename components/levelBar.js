import React from 'react';
import { View } from 'react-native';

const LevelBar = ({ height, healthPercent }) => {

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
    </>
  )
};

export default LevelBar;