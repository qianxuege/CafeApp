
import {
	Button,
	HStack,
	Input,
	Pressable,
	Image,
	Text,
	View,
} from "native-base";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavBarMenu from "../Components/NavBarMenu";
import { SearchBar } from "react-native-screens";
import products from "../data/Products";
import CustomizedData from "../data/CustomizedData";

function HomeSearch() {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"Caladea-Regular": require("../../assets/Fonts/Caladea-Regular.ttf"),
		"Caladea-Bold": require("../../assets/Fonts/Caladea-Bold.ttf"),
	});

	const [word, setWord] = useState("");
	

	if (!fontsLoaded) {
		return null;
	}

	return (
		
		<>
			<NavBarMenu />
			<HStack w="full" px={2} py={4} alignItems="center">
				<Pressable left={9} zIndex={2}>
					<Ionicons name="search" size={24} color={Colors.deepestGray} />
				</Pressable>
				<Input
					placeholder="Type In A Filter"
					w="85%"
					bg={Colors.white}
					type="search"
					height={12}
					paddingLeft={12}
					borderWidth={1}
					borderColor={Colors.lightBlack}
					fontSize={14}
					color={Colors.deepestGray}
					variant="unstyled"
					_focus={{
						borderColor: Colors.pink,
						backgroundColor: Colors.white,
					}}
					value={word}
					onChangeText={(text) => setWord(text)}
				/>
			</HStack>
			
		</>
	);
}

export const word = "chicken";

export default HomeSearch;