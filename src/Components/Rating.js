import { HStack, Text } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../color";

function Rating(value) {
	const size = 14;
	const color = Colors.pink;
    function checkValue() {
        if (value >= 6) {
            return true;
        }
    }
    console.log(value);
	return (
		<HStack space={0.4} alignItems="center">
			<FontAwesome
				name={checkValue ? "star" : "star-half-o"}
				size={size}
				color={color}
			/>
			<FontAwesome
				name={value >= 2 ? "star" : value >= 1.5 ? "star-half-o" : "star-o"}
				size={size}
				color={color}
			/>
            <FontAwesome
				name={value >= 3 ? "star" : value >= 2.5 ? "star-half-o" : "star-o"}
				size={size}
				color={color}
			/>
            <FontAwesome
				name={value >= 4 ? "star" : value >= 3.5 ? "star-half-o" : "star-o"}
				size={size}
				color={color}
			/>
            <FontAwesome
				name={value >= 5 ? "star" : value >= 4.5 ? "star-half-o" : "star-o"}
				size={size}
				color={color}
			/>

            


		</HStack>
	);
}

export default Rating;
