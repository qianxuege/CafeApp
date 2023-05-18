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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Input } from "native-base";
import Colors from "../color";
import { useFonts } from "expo-font";
import { getStorage, ref } from "firebase/storage";

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

	// Get a reference to the storage service, which is used to create references in the storage bucket
	const storage = getStorage();

	// Create a storage reference from the storage service
	const storageRef = ref(storage);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.uri);
		}
	};

	const uploadImage = async () => {
		setBtn(true);
		const uploadUri = image;
		let imageEnding = uploadUri.substring(uploadUri.lastIndexOf("."));
		let fname = foodname.toLocaleLowerCase().replace(/\s/g, "_");
		let filename = fname.concat(imageEnding);
		//setFilename(fname.concat(imageEnding)); uncomment if want to make it global
		console.log(fname);
		console.log(filename);
	};

	// useEffect(() => {
	// 	setTimeout(() => {
	// 	  setFilename(() => foodname.toLocaleLowerCase().replace(/\s/g, "_"));
	// 	  //setBtn(false);
	// 	}, 1000);
	//   }, [filename]);

	// const onRefresh = React.useCallback(() => {
	// 	setRefreshing(true);
	// 	setTimeout(() => {
	// 	  setRefreshing(false);
	// 	}, 1000);
	//   }, []);

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
