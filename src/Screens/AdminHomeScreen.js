import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Keyboard,
    ImagePickerIOS
} from "react-native";
import React, { useState } from "react";
import {
	Pressable,
	Image,
	Text,
	Center,
	Box,
	Circle,
	ScrollView,
	Button,
	Input,
} from "native-base";
import { firebase } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Colors from "../color";


const AdminHomeScreen = ({ route }) => {
	const navigation = useNavigation();
	const product = route.params;
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"Caladea-BoldItalic": require("../../assets/Fonts/Caladea-BoldItalic.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}
	return (
		<>
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
					<Circle bg={Colors.darkRed} size="86px">
						<Ionicons name="ios-person" size={36} color={Colors.white} />
					</Circle>
				</Center>

				<Center marginTop={0}>
					<Text fontFamily="Akronim-Regular" fontSize={36} color={Colors.white}>
						admin@gmail.com
					</Text>
				</Center>
			</Box>

			{/* Upload */}
			<Box flex={1} top={0} >
				<ScrollView
					top={0}
					margin="auto"
					width="100%"
					bg={Colors.white}
					showsVerticalScrollIndicator={false}
				>
					<Center h={280} marginBottom={2}>
						<FontAwesome name="image" size={208} color={Colors.deepGray} />
					</Center>


					{/* <Image
						source={{ uri: product.image }}
						top={0}
						alt="Image"
						margin="auto"
						w="100%"
						h={400}
						resizeMode="cover"
						marginBottom={2}
					/> */}

					<Box marginLeft={6}>
						<Box top={-16}>
							<Input
								variant="underlined"
								placeholder="Food Item Name"
								// value={name}
								// onChangeText={(text) => setName(text)}
								w="85%"
								fontSize="52"
								fontFamily="AmaticSC-Bold"
								color={Colors.darkGreen}
								placeholderTextColor={Colors.darkGreen}
								paddingLeft="3"
								borderBottomColor={Colors.darkGreen}
							/>
						</Box>
						<Box marginBottom={6}>
							<Input
								variant="filled"
								placeholder="Enter Tags"
								// value={tags}
								// onChangeText={(text) => setTags(text)}
								w="92%"
								fontSize="16"
								fontFamily="Bitter-Regular"
								color={Colors.darkPink}
								placeholderTextColor={Colors.darkPink}
								paddingLeft="3"
								borderColor={Colors.morandiPink}
								backgroundColor={Colors.morandiPink}
								_focus={{ bg: Colors.morandiPink }}
							/>
						</Box>
                        <Box marginBottom={6}>
							<Input
								variant="filled"
								placeholder="Enter Price"
								// value={price}
								// onChangeText={(text) => setPrice(text)}
								w="92%"
								fontSize="16"
								fontFamily="Bitter-Regular"
								color={Colors.darkPink}
								placeholderTextColor={Colors.darkPink}
								paddingLeft="3"
								borderColor={Colors.morandiPink}
								backgroundColor={Colors.morandiPink}
								_focus={{ bg: Colors.morandiPink }}
							/>
						</Box>
                        <Box marginBottom={6}>
							<Input
								variant="filled"
								placeholder="Enter Calorie"
								// value={calorie}
								// onChangeText={(text) => setCalorie(text)}
								w="92%"
								fontSize="16"
								fontFamily="Bitter-Regular"
								color={Colors.darkPink}
								placeholderTextColor={Colors.darkPink}
								paddingLeft="3"
								borderColor={Colors.morandiPink}
								backgroundColor={Colors.morandiPink}
								_focus={{ bg: Colors.morandiPink }}
							/>
						</Box>
                        <Box marginBottom={6}>
							<Input
								variant="filled"
								placeholder="Enter Ingredients"
								// value={ingredients}
								// onChangeText={(text) => setIngredients(text)}
								w="92%"
								fontSize="16"
								fontFamily="Bitter-Regular"
								color={Colors.darkPink}
								placeholderTextColor={Colors.darkPink}
								paddingLeft="3"
								borderColor={Colors.morandiPink}
								backgroundColor={Colors.morandiPink}
								_focus={{ bg: Colors.morandiPink }}
							/>
						</Box>
						
						
						<Center marginTop={10} left={-6} paddingBottom={24}>
							<Button
								_pressed={{
									bg: Colors.lightGold,
								}}
								marginBottom={10}
								w="80%"
								rounded={50}
								bg={Colors.gold}
								size="md"
								onPress={() => navigation.navigate("Bottom")}
							>
								Add Food Item
							</Button>
							<Button
								_pressed={{
									bg: Colors.lightGreen,
								}}
								marginBottom={20}
								w="80%"
								rounded={50}
								bg={Colors.darkGreen}
								size="md"
								onPress={() => navigation.navigate("Login")}
							>
								LOG OUT
							</Button>
						</Center>
					</Box>
				</ScrollView>
			</Box>
		</>
	);
};

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

export default AdminHomeScreen;
