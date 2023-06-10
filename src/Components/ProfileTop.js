import {
	HStack,
	Pressable,
	Image,
	Text,
	Center,
	Box,
	Icon,
	Circle,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

function ProfileTop() {
	const navigation = useNavigation();
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"Caladea-BoldItalic": require("../../assets/Fonts/Caladea-BoldItalic.ttf"),
	});

	const [isAdmin, setIsAdmin] = useState(false);

	if (!fontsLoaded) {
		return null;
	}

	const auth = getAuth();
	const user = auth.currentUser;

	const checkAdminStatus = async () => {
		const userRef = doc(db, "Users", user.uid);
		const docSnap = await getDoc(userRef);
		const bool = docSnap.data().isAdmin;
		//console.log(bool);
		setIsAdmin(bool);
		console.log(isAdmin);
	};

	checkAdminStatus();

	return (
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
				<Circle size="86px" bg={Colors.pink}>
					<Ionicons name="ios-person" size={36} color={Colors.white} />
				</Circle>
			</Center>

			<Center marginTop={0}>
				<Text fontFamily="Akronim-Regular" fontSize={36} color={Colors.white}>
					{auth.currentUser.displayName}
				</Text>
			</Center>
		</Box>
	);
}

export default ProfileTop;
