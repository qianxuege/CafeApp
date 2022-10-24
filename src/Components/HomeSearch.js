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
import { useNavigation } from "@react-navigation/native";
import NavBarMenu from "../Components/NavBarMenu";

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
			<NavBarMenu />
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
					bg={Colors.morandiGreen}
                    paddingRight={6}
                    position="relative"
                    left="15%"
					_text={{
						color: Colors.black,
						fontFamily: "Caladea-Regular",
						
					}}
					_pressed={{ bg: Colors.darkGreen }}
				>
					Filter
				</Button>
                <View left={0}><Ionicons name="filter" size={22} flex={2} color={Colors.deepestGray} /></View>
                <Button
					h={10}
                    w={124}
					bg={Colors.morandiGreen}
                    paddingRight={8}
                    left={7}
					_text={{
						color: Colors.black,
						fontFamily: "Caladea-Regular",
						
					}}
					_pressed={{ bg: Colors.darkGreen }}
				>
					Specials
				</Button>
                <View left={-26} top={-1}><MaterialIcons name="celebration" size={22} flex={2} color={Colors.deepestGray} /></View>
                
			</HStack>
		</>
	);
}

export default HomeSearch;
