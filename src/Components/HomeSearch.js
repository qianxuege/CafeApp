import {
	Button,
	HStack,
	Input,
	Pressable,
	Image,
	Text,
    View
} from "native-base";
import { useFonts } from 'expo-font';
import React from "react";
import Colors from "../color";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

function HomeSearch() {
    const [fontsLoaded] = useFonts ({
        'Akronim-Regular': require('../../assets/Fonts/Akronim-Regular.ttf'),
		'Caladea-Regular': require('../../assets/Fonts/Caladea-Regular.ttf'),
		'Caladea-Bold': require('../../assets/Fonts/Caladea-Bold.ttf')
      });

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
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
			<HStack w="full" px={2} py={4} alignItems="center">
				<Pressable left={9} zIndex={2}>
					<Ionicons name="search" size={24} color={Colors.deepestGray} />
				</Pressable>
				<Input
					placeholder="Search For A Specific Food "
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
						borderColor: Colors.lightBlack,
						backgroundColor: Colors.white,
					}}
				/>
			</HStack>
			<HStack w="full" marginBottom={2} space={4} px={6} py={0} alignItems="center">
				<Button
					h={10}
                    w={117}
					bg={Colors.darkGreen}
                    paddingRight={6}
                    position="relative"
                    left="11%"
					_text={{
						color: Colors.white,
						fontFamily: "Caladea-Bold",
						
					}}
					_pressed={{ bg: Colors.darkestGreen }}
				>
					Filter
				</Button>
                <View left={-6}><Ionicons name="filter" size={24} flex={2} color="black" /></View>
                <Button
					h={10}
                    w={124}
					bg={Colors.darkGreen}
                    paddingRight={8}
                    left={3}
					_text={{
						color: Colors.white,
						fontFamily: "Caladea-Bold",
						
					}}
					_pressed={{ bg: Colors.darkestGreen }}
				>
					Specials
				</Button>
                <View left={-34}><MaterialIcons name="celebration" size={24} flex={2} color="black" /></View>
                
			</HStack>
		</>
	);
}

export default HomeSearch;
