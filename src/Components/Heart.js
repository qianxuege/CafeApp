import { View, Text } from 'react-native'
import React from 'react'
import { Center } from 'native-base';
import { FontAwesome } from "@expo/vector-icons";
import Colors from '../color';

const heart = (param) => {
    const value = param.param;
    const size = param.size;
    let name;

    function checkValue() {
        if (value==true) {
            return "heart";
        } else {
            return "heart-o";
        }
    }
  return (
    <Center rounded="full" backgroundColor={Colors.white} padding={2}>
		<FontAwesome name={checkValue()} size={size} color={Colors.pink} />
	  </Center>
  )
}

export default heart;