import React, { useState, useEffect } from "react";
import {
	Image,
	View,
	Platform,
	Text,
	TextInput,
	StyleSheet,
	RefreshControl,
	TouchableOpacity,
	Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Input, ScrollView } from "native-base";
import Colors from "../color";
import { useFonts } from "expo-font";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import LocationPicker from "../Components/LocationPicker";
import { foodLocation } from "../Components/LocationPicker";

const AdminUploadScreen = () => {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"Caladea-BoldItalic": require("../../assets/Fonts/Caladea-BoldItalic.ttf"),
	});
	const [image, setImage] = useState(null);
	const [foodname, setFoodname] = useState("");
	const [tags, setTags] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [price, setPrice] = useState("");
	const [calories, setCalories] = useState("");
	const [location, setLocation] = useState("");

	//const [filename, setFilename] = useState("");
	const [btn, setBtn] = useState(false);
	const [refreshing, setRefreshing] = React.useState(false);
	const [uploading, setUploading] = useState(false);
	const [transferred, setTransferred] = useState(0);

	// Get a reference to the storage service, which is used to create references in the storage bucket
	const storage = getStorage();

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const uploadImage = async () => {
		let uri = image;
		const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
		let imageEnding = uploadUri.substring(uploadUri.lastIndexOf("."));
		let fname = foodname.toLocaleLowerCase().replace(/\s/g, "_");
		//let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
		let filename = fname.concat(imageEnding);
		//setFilename(fname.concat(imageEnding)); uncomment if want to make it global

		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", uri, true);
			xhr.send(null);
		});

		setUploading(true);
		try {
			const storageRef = ref(storage, "images/" + filename);
			const result = await uploadBytes(storageRef, blob);

			// We're done with the blob, close and release it
			//console.log(blob);
			blob.close();

			setUploading(false);

			// Add a new document in collection "cities"
			await setDoc(doc(db, "foodItems", foodname), {
				name: foodname,
				price: price,
				tags: tags,
				ingredients: ingredients,
				calories: calories,
				location: location,
			});

			

			Alert.alert(
				"Image uploaded!",
				"Your image has been uploaded to the Firebase Cloud Storage successfully!"
			);

			return await getDownloadURL(storageRef);
			//console.log(storageRef);
			
		} catch (e) {
			console.log(e);
		}

		setImage(null);
	};

	return (
		<ScrollView
			top={0}
			margin="auto"
			width="100%"
			bg={Colors.white}
			contentContainerStyle={{ alignItems: "center", paddingBottom: 500 }}
			showsVerticalScrollIndicator={false}
		>
			<TouchableOpacity onPress={pickImage}>
				{image != null ? (
					<Image
						source={{ uri: image }}
						style={{ width: 200, height: 200, margin: 15 }}
					/>
				) : (
					<Image
						source={{
							uri: "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png",
						}}
						style={{ width: 200, height: 200 }}
					/>
				)}
			</TouchableOpacity>
			<Input
				variant="filled"
				placeholder="Enter Food Name"
				value={foodname}
				onChangeText={(text) => setFoodname(text)}
				w="92%"
				fontSize="16"
				fontFamily="Bitter-Regular"
				color={Colors.darkPink}
				placeholderTextColor={Colors.gray}
				paddingLeft="3"
				marginY={2}
				borderColor={Colors.morandiPink}
				backgroundColor={Colors.morandiPink}
				_focus={{ bg: Colors.morandiPink }}
				autoCapitalize="none"
			/>
			<Input
				variant="filled"
				placeholder="Enter Price"
				value={price}
				onChangeText={(text) => setPrice(text)}
				w="92%"
				fontSize="16"
				fontFamily="Bitter-Regular"
				color={Colors.darkPink}
				placeholderTextColor={Colors.gray}
				paddingLeft="3"
				marginY={2}
				borderColor={Colors.morandiPink}
				backgroundColor={Colors.morandiPink}
				_focus={{ bg: Colors.morandiPink }}
				keyboardType="numeric"
			/>
			<Input
				variant="filled"
				placeholder="Enter Tags: breakfast, sweet, etc ..."
				value={tags}
				onChangeText={(text) => setTags(text)}
				w="92%"
				fontSize="16"
				fontFamily="Bitter-Regular"
				color={Colors.darkPink}
				placeholderTextColor={Colors.gray}
				paddingLeft="3"
				marginY={2}
				borderColor={Colors.morandiPink}
				backgroundColor={Colors.morandiPink}
				_focus={{ bg: Colors.morandiPink }}
				autoCapitalize="none"
			/>
			<Input
				variant="filled"
				placeholder="Enter Ingredients"
				value={ingredients}
				onChangeText={(text) => setIngredients(text)}
				w="92%"
				fontSize="16"
				fontFamily="Bitter-Regular"
				color={Colors.darkPink}
				placeholderTextColor={Colors.gray}
				paddingLeft="3"
				marginY={2}
				borderColor={Colors.morandiPink}
				backgroundColor={Colors.morandiPink}
				_focus={{ bg: Colors.morandiPink }}
				autoCapitalize="none"
			/>
			<Input
				variant="filled"
				placeholder="Enter Estimated Calories"
				value={calories}
				onChangeText={(text) => setCalories(text)}
				w="92%"
				fontSize="16"
				fontFamily="Bitter-Regular"
				color={Colors.darkPink}
				placeholderTextColor={Colors.gray}
				paddingLeft="3"
				marginY={2}
				borderColor={Colors.morandiPink}
				backgroundColor={Colors.morandiPink}
				_focus={{ bg: Colors.morandiPink }}
				keyboardType="numeric"
			/>
			<LocationPicker />
			<Button onPress={() => {
				console.log(foodLocation)
			}}>

			</Button>
			<Button
				_pressed={{
					bg: Colors.lightGreen,
				}}
				marginTop={10}
				w="80%"
				rounded={50}
				bg={Colors.morandiGreen}
				size="md"
				onPress={() => {
					uploadImage();
				}}
			>
				Add Food Item
			</Button>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});

export default AdminUploadScreen;
