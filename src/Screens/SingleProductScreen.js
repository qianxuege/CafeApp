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
import Heart from "../Components/Heart";
import Rating from "../Components/Rating";
import NumericInput from "react-native-numeric-input";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Review from "../Components/Review";
import NavBarMenu from "../Components/NavBarMenu";
import { useNavigation } from "@react-navigation/native";
import products from "../data/Products";

function SingleProductScreen({ route }) {
	const navigation = useNavigation();
	const product = route.params;
	// const [value, setValue] = useState(0);
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

	// const RenderTags = () => {
	// 	console.log(product.tags.length);

	// 	for (let i = 0; i < product.tags.length; i++) {
	// 		console.log(i);
	// 		return (
	// 			<View style={styles.tagsView}>
	// 				<Text style={styles.tags}>{product.tags[i]}</Text>
	// 			</View>
	// 		)
	// 	}
	// };

	return (
		<Box flex={1} top={0}>
			<NavBarMenu />
			<ScrollView
				top={0}
				margin="auto"
				width="100%"
				bg={Colors.white}
				showsVerticalScrollIndicator={false}
			>
				<Image
					source={{ uri: product.image }}
					top={0}
					alt="Image"
					margin="auto"
					w="100%"
					h={400}
					resizeMode="cover"
					marginBottom={2}
				/>

				{/* <Pressable position="absolute" top={370} right="2%">
					<Center rounded="full" backgroundColor={Colors.white} padding={2}>
						<FontAwesome name="heart" size={24} color={Colors.pink} />
					</Center>
				</Pressable> */}
				<Pressable position="absolute" top={370} right="2%">
					<Heart param={product.saved} size={24} />
				</Pressable>
				<Box marginLeft={6}>
					<Text
						my={2}
						fontFamily="AmaticSC-Bold"
						fontSize={52}
						color={Colors.black}
					>
						{product.name}
					</Text>
					<HStack space={2} overflow="scroll">
						{product.tags.map((tag) => {
							return (
								<View style={styles.tagsView} key={Math.random() * 20}>
									<Text style={styles.tags}>{tag}</Text>
								</View>
							);
						})}

						{/* <View style={styles.tagsView}>
							<Text style={styles.tags}>vegeterian</Text>
						</View> */}
					</HStack>
					<HStack alignItems="baseline" space={2} w="full">
						<Text
							fontFamily="Bitter-Regular"
							fontSize={20}
							fontWeight="bold"
							color={Colors.deepestGray}
						>
							${product.price}
						</Text>
						<Spacer />
						<Pressable right={10}>
							<Rating value={product.rating} />
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
						<Text style={styles.heading2}>Location</Text>
						<Text style={styles.paragraph}>{product.location}</Text>
					</Box>

					<Box mt={6}>
						<Text style={styles.heading2}>Calories</Text>
						<Text style={styles.paragraph}>{product.calories} cal</Text>
					</Box>
					<Box mt={6}>
						<Text style={styles.heading2}>Ingredients</Text>
						<Text style={styles.paragraph}>{product.ingredients}</Text>
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
