import { StyleSheet } from "react-native";
import React from "react";
import { Box, Button, Center, Text } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../color";
import { useFonts } from "expo-font";

const CartEmpty = () => {
	const [fontsLoaded] = useFonts({
		"Bitter-Bold": require("../../assets/Fonts/Bitter-Bold.ttf"),
	});
	return (
		<Box flex={1}>
			<Center h="75%" my={20}>
				<Center w={200} h={200} bg={Colors.white} rounded="full">
					<MaterialIcons
						name="bookmark-outline"
						size={60}
						color={Colors.deepGold}
					/>
				</Center>
				<Text
					color={Colors.white}
					mt={10}
					fontFamily="Bitter-Bold"
					fontSize={18}
				>
					YOUR SAVED IS EMPTY
				</Text>
			</Center>
			<Center my={20}>
				<Button
					width="80%"
					height={55}
					rounded="full"
					bg={Colors.deepGold}
					_text={{
						color: Colors.white,
						fontWeight: "bold",
						fontSize: 16,
					}}
					_pressed={{ bg: Colors.lightGold }}
				>
					View Menu
				</Button>
			</Center>
		</Box>
	);
};

export default CartEmpty;
