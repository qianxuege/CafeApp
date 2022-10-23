import {
	ScrollView,
	Box,
	Image,
	Text,
	View,
	HStack,
	Spacer,
	Pressable,
	Button,
	Center,
	VStack,
	FormControl,
	Select,
	CheckIcon,
} from "native-base";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import Colors from "../color";
import Rating from "../Components/Rating";
import NumericInput from "react-native-numeric-input";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Review from "../Components/Review";

function SingleProductScreen() {
	const [value, setValue] = useState(0);
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"AmaticSC-Bold": require("../../assets/Fonts/AmaticSC-Bold.ttf"),
		"Bitter-Regular": require("../../assets/Fonts/Bitter-Regular.ttf"),
		"Caveat-SemiBold": require("../../assets/Fonts/Caveat-SemiBold.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	//use FlatList for tags and ingredients, see react native documentation for ex

	return (
		<Box flex={1} top={0}>
			<ScrollView
				top={0}
				margin="auto"
				width="100%"
				bg={Colors.white}
				showsVerticalScrollIndicator={false}
			>
				<Image
					source={require("../../assets/images/1.jpeg")}
					top={0}
					alt="Image"
					margin="auto"
					w="100%"
					h={400}
					resizeMode="cover"
					marginBottom={2}
				/>
				<Center
					position="absolute"
					top={370}
					right="2%"
					rounded="full"
					backgroundColor={Colors.white}
					padding={2}
				>
					<MaterialIcons
						name="bookmark-outline"
						size={30}
						color={Colors.gold}
					/>
				</Center>
				<Box marginLeft={6}>
					<Text
						my={2}
						fontFamily="AmaticSC-Bold"
						fontSize={52}
						color={Colors.black}
					>
						Acai Bowl
					</Text>
					<HStack space={2} overflow="scroll">
						<View style={styles.tagsView}>
							<Text style={styles.tags}>dairy-free</Text>
						</View>
						<View style={styles.tagsView}>
							<Text style={styles.tags}>vegeterian</Text>
						</View>
					</HStack>
					<HStack alignItems="baseline" space={2} w="full">
						<Text
							fontFamily="Bitter-Regular"
							fontSize={20}
							fontWeight="bold"
							color={Colors.deepestGray}
						>
							$11.00
						</Text>
						<Spacer />
						<Pressable right={10}>
							<Rating value={4} />
						</Pressable>
					</HStack>
					<Pressable>
						<Center mt={6} left={-6}>
							<Text style={styles.heading2} color={Colors.deepGold} isTruncated>
								----------- Additional Info -----------
							</Text>
						</Center>
					</Pressable>
					{/* <HStack space={2} alignItems="center" my={3}>
						<NumericInput
							value={value.value}
							onChange={(value) => setValue({ value })}
							totalWidth={140}
							totalHeight={38}
							iconSize={30}
							maxValue={5}
							minValue={0}
							borderColor={Colors.deepGray}
							rounded
							textColor={Colors.black}
							iconStyle={{ color: Colors.white }}
							rightButtonBackgroundColor={Colors.deepGold}
							leftButtonBackgroundColor={Colors.lightGold}
						/>
						<Spacer />
                        add _pressed for the add to cart 
						<Pressable right={10}>
							<HStack space={2} alignItems="center">
                            <MaterialIcons name="bookmark-outline" size={24} color="black" />
                            <Text>ADD TO SAVED</Text>
                            </HStack>
						</Pressable>
					</HStack> */}

					<Box mt={6}>
						<Text style={styles.heading2}>Calories</Text>
						<Text style={styles.paragraph}>300 cal</Text>
					</Box>
					<Box mt={6}>
						<Text style={styles.heading2}>Ingredients</Text>
						<Text style={styles.paragraph}>
							Acai berries, coconut flakes, Banana, ........., .............,
							...
						</Text>
					</Box>
					{/* rating */}
					<Review />
				</Box>
			</ScrollView>
		</Box>
	);
}

const styles = StyleSheet.create({
	tagsView: {
		width: 80,
		alignItems: "center",
		borderRadius: 2,
		borderWidth: 1,
		borderColor: Colors.morandiPink,
		padding: 2,
		marginBottom: 5,
		backgroundColor: Colors.morandiPink,
	},
	tags: {
		fontFamily: "Caveat-SemiBold",
		fontSize: 16,
		color: Colors.darkPink,
	},
	heading2: {
		fontFamily: "Bitter-Regular",
		fontSize: 20,
	},
	paragraph: {
		left: 10,
		fontFamily: "AmaticSC-Bold",
		fontSize: 18,
	},
});

export default SingleProductScreen;
