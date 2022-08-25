import {
	Box,
	Center,
	HStack,
	Input,
	Pressable,
	Image,
	Text,
} from "native-base";
import React from "react";
import Colors from "../color";
import { Ionicons } from "@expo/vector-icons";

function HomeSearch() {
	return (
		<>
			<HStack space={3} bg={Colors.lightGold}  height={160} w="full" px={4} py={4}  borderBottomColor={Colors.lightBlack} safeAreaTop>
				<Pressable ml={1} top={2}>
					<Image
						source={require("../../assets/favicon.png")}
						size="md"
						alt="favicon"
					/>
				</Pressable>

				<Pressable ml={4} top={-5} >
					<Text
						fontFamily="Akronim-Regular"
						fontSize={60}
						color={Colors.white}
					>
						MENU
					</Text>
				</Pressable>
				<Pressable ml={3} top={4} >
					<Text
						fontFamily="Akronim-Regular"
						fontSize={48}
						color={Colors.white}
					>
						CART
					</Text>
				</Pressable>
			</HStack>
			<HStack
				w="full"
				px={2}
				py={4}
				alignItems="center"
			>
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
					variant="unstyled"
                    _focus={{
                        borderColor: Colors.lightBlack,
                    }}
                    
				/>
			</HStack>
		</>
	);
}

export default HomeSearch;
