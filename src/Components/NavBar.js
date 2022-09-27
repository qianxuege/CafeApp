import {
	HStack,
	Pressable,
	Image,
	Text,
} from "native-base";
import React from "react";
import { useFonts } from 'expo-font';
import Colors from "../color";

function NavBar() {
    const [fontsLoaded] = useFonts ({
        'Akronim-Regular': require('../../assets/Fonts/Akronim-Regular.ttf'),
      });

	if (!fontsLoaded) {
		return null;
	}
    return (
			<HStack
				space={3}
				bg={Colors.lightGold}
				height={160}
				w="full"
				px={4}
				py={4}
				borderBottomColor={Colors.lightBlack}
				safeAreaTop
			>
				<Pressable ml={1} top={0} left={2}>
					<Image
						source={require("../../assets/favicon.png")}
						size="md"
						alt="favicon"
					/>
				</Pressable>

				<Pressable ml={1} top={-5} left={2}>
					<Text fontFamily="Akronim-Regular" fontSize={60} color={Colors.white}>
						MENU
					</Text>
				</Pressable>
				<Pressable ml={1} top={4} left={2}>
					<Text fontFamily="Akronim-Regular" fontSize={48} color={Colors.white}>
						CART
					</Text>
				</Pressable>
			</HStack>
    );
}

export default NavBar;
