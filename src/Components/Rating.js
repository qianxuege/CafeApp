import { HStack, Text } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../color";

function Rating(value) {
	const size = 14;
	const color = Colors.pink;
    console.log(value)
    value = value.value;
    console.log(value)
    value = Number(value);
    
    function checkValue(i) {
        console.log(typeof value)
        console.log(value)
        if (value >= i) {
           return "star";
        } else if (value >= i-0.5) {
			return "star-half-o";
		} else {
			return "star-o";
		}   
        
    }
    
	return (
		<HStack space={0.4} alignItems="center">
			<FontAwesome
				name={checkValue(1)}
				size={size}
				color={color}
			/>
			<FontAwesome
				name={checkValue(2)}
				size={size}
				color={color}
			/> 
            <FontAwesome
				name={checkValue(3)}
				size={size}
				color={color}
			/>
            <FontAwesome
				name={checkValue(4)}
				size={size}
				color={color}
			/>
            <FontAwesome
				name={checkValue(5)}
				size={size}
				color={color}
    />

            


		</HStack>
	);
}

export default Rating;
