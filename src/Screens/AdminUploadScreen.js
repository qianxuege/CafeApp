import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

const AdminUploadScreen = () => {
	const [image, setImage] = useState(null);

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
			setImage(result.assets[0].uri);
		}
	};

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>hello world</Text>
			<TouchableOpacity onPress={pickImage}>
				<Image style={{height: 150, width: 200}} source={{
          uri: 'https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=170667a&w=0&k=20&c=3Jh8trvArKiGdBCGPfe6Y0sUMsfh2PrKA0uHOK4_0IM=',
        }} alt="pick an inage from camera roll"/>
			</TouchableOpacity>
			
			{image && (
				<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
			)}
		</View>
	);
};

export default AdminUploadScreen;
