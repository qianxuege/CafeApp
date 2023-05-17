import { Box, Image, Text } from "native-base";
import React, { useState, useEffect } from 'react';

import { Touchable, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const AdminUploadScreen = () => {
	
	

	return (
		<Box>
			<Text>hello world</Text>
			<TouchableOpacity>
				<Image size={150} resizeMode="cover" source={{
      uri: "https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=170667a&w=0&k=20&c=3Jh8trvArKiGdBCGPfe6Y0sUMsfh2PrKA0uHOK4_0IM="
    }} alt="image icon" />
			</TouchableOpacity>
		</Box>
	);
};

export default AdminUploadScreen;
