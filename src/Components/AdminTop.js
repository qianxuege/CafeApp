import {
	HStack,
	Pressable,
	Image,
	Text,
	Center,
	Box,
	Icon,
	Circle,
} from "native-base";
import React from "react";
import { useFonts } from "expo-font";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

function AdminTop() {
    const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"Caladea-BoldItalic": require("../../assets/Fonts/Caladea-BoldItalic.ttf"),
	});

    if (!fontsLoaded) {
		return null;
	}
	return (
        
			<Box
				space={3}
				bg={Colors.lightGold}
				height={210}
				w="full"
				px={4}
				py={2}
				borderBottomColor={Colors.lightBlack}
				safeAreaTop
			>
				<Center>
					<Circle bg={Colors.darkPink} size="86px">
						<Ionicons name="ios-person" size={36} color={Colors.white} />
					</Circle>
				</Center>

				<Center marginTop={0}>
					<Text fontFamily="Akronim-Regular" fontSize={36} color={Colors.white} left={-5}>
					ADMIN
					</Text>
				</Center>
			</Box>
        
    );
}

export default AdminTop;