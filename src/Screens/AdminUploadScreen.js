import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Keyboard,
	ImagePickerIOS,
    Platform,
    ActivityIndicator,
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
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { firebase } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Colors from "../color";

function AdminUploadScreen({ route }) {
	const navigation = useNavigation();
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"Caladea-BoldItalic": require("../../assets/Fonts/Caladea-BoldItalic.ttf"),
	});
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

	if (!fontsLoaded) {
		return null;
	}

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 1200,
          height: 780,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
      };

    //   const uploadImage = async () => {
    //     if( image == null ) {
    //       return null;
    //     }
    //     const uploadUri = image;
    //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);


	return (
		<>
			<Box flex={1} top={0}>
				<ScrollView
					top={0}
					margin="auto"
					width="100%"
					bg={Colors.white}
					showsVerticalScrollIndicator={false}
				>
					<Center h={280} marginBottom={2}>
						<FontAwesome name="image" size={208} color={Colors.deepGray} onPress={choosePhotoFromLibrary}> </FontAwesome>
                        {image != null ? <Image source={{uri: image}} /> : null}
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

						<Center marginTop={10} right={5} paddingBottom={24}>
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

export default AdminUploadScreen;
