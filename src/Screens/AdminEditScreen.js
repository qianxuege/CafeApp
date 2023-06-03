import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Keyboard,
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
import AdminTop from "../Components/AdminTop";
import AdminUploadScreen from "./AdminUploadScreen";

const AdminEditScreen = ({ route }) => {
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
			<AdminTop />

			<AdminUploadScreen />
			
		</ >
	);
};

export default AdminEditScreen;
