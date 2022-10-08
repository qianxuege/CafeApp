import { Box, Text, VStack, FormControl, Select, CheckIcon } from "native-base";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import Colors from "../color";
import Rating from "../Components/Rating";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import Buttons from "./Buttons";

export default function Review() {
	const [ratings, setRatings] = useState("");
	return (
		<Box mt={6} mb={10}>
			<Text style={styles.heading2}>Share Your Thoughts</Text>
			<VStack space={6} style={styles.paragraph}>
				<FormControl>
					<FormControl.Label
						_text={{
							fontSize: "18px",
							fontFamily: "AmaticSC-Bold"
						}}
					>
						Rating
					</FormControl.Label>
					<Select
						bg={Colors.subGreen}
						borderWidth={0}
						width={360}
						rounded={5}
						py={3}
						placeholder="Choose Rate"
						fontFamily="Bitter-Regular"
                        fontSize={12}
						_selectedItem={{
							bg: Colors.morandiGreen,
							endIcon: <CheckIcon size={6} />,
						}}
						selectedValue={ratings}
						onValueChange={(e) => setRatings(e)}
					>
						<Select.Item label="1 - Extremely Bad" value="1" />
						<Select.Item label="2 - Bad" value="2" />
						<Select.Item label="3 - OK" value="3" />
						<Select.Item label="4 - Good" value="4" />
						<Select.Item label="5 - Delicious" value="5" />
					</Select>
				</FormControl>
                <Buttons bg={Colors.deepGold} color={Colors.white} bgp={Colors.lightGold} w="90%">SUBMIT</Buttons>
			</VStack>
		</Box>
	);
}

const styles = StyleSheet.create({
	heading2: {
		fontFamily: "Bitter-Regular",
		fontSize: 20,
	},
	paragraph: {
		left: 10,
		fontFamily: "Bitter-Regular",
		fontSize: 14,
	},
});
