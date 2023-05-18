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
import { Button, Input } from "native-base";
import Colors from "../color";
import { useFonts } from "expo-font";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import "firebase/storage";
//import firebase from "firebase/app";
import firebase from "firebase/compat";

const AdminUploadScreen = () => {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"Caladea-BoldItalic": require("../../assets/Fonts/Caladea-BoldItalic.ttf"),
	});
	const [image, setImage] = useState(null);
	const [foodname, setFoodname] = useState("");
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
			// await firebase
			// 	.storage()
			// 	.ref(storage, "images/" + filename)
			// 	.putFile(uploadUri);
			const storageRef = ref(storage, "images/" + filename);
			const result = await uploadBytes(storageRef, blob);

			// We're done with the blob, close and release it
			blob.close();

			setUploading(false);

			Alert.alert(
				"Image uploaded!",
				"Your image has been uploaded to the Firebase Cloud Storage successfully!"
			);

			return await getDownloadURL(storageRef);

			
		} catch (e) {
			console.log(e);
		}

		

		// try {
		// 	// Create a storage reference from the storage service
		// 	// Upload file and metadata to the object 'images/mountains.jpg'
		// 	const storageRef = ref(storage, "images/" + filename);
		// 	const uploadTask = uploadBytesResumable(storageRef);

		// 	setUploading(false);
		// 	await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
		// 		console.log("File available at", downloadURL);
		// 	});
		// 	Alert.alert(
		// 		"Image uploaded!",
		// 		"Your image has been uploaded to the Firebase Cloud Storage successfully!"
		// 	);
		// } catch (e) {
		// 	console.log(e);
		// }

		setImage(null);
	};

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<TouchableOpacity onPress={pickImage}>
				{image != null ? (
					<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
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
				borderColor={Colors.morandiPink}
				backgroundColor={Colors.morandiPink}
				_focus={{ bg: Colors.morandiPink }}
			/>
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
		</View>
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
