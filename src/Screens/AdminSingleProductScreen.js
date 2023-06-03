import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
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
import AdminTop from "../Components/AdminTop";
import Colors from "../color";
import { StyleSheet } from "react-native";
import React from "react";

function AdminSingleProductScreen({ route }) {
	const navigation = useNavigation();
	const doc = route.params;
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"AmaticSC-Bold": require("../../assets/Fonts/AmaticSC-Bold.ttf"),
		"Bitter-Regular": require("../../assets/Fonts/Bitter-Regular.ttf"),
		"Caveat-SemiBold": require("../../assets/Fonts/Caveat-SemiBold.ttf"),
	});

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	}, []);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Box flex={1} top={0}>
			<AdminTop />
			<ScrollView
				top={0}
				margin="auto"
				width="100%"
				bg={Colors.white}
				showsVerticalScrollIndicator={false}
			>
				<Image
					source={{ uri: doc.image }}
					top={0}
					alt="Image"
					margin="auto"
					w="100%"
					h={400}
					resizeMode="cover"
					marginBottom={2}
				/>
				<Box marginLeft={6} paddingBottom={100}>
					<Text
						my={2}
						fontFamily="AmaticSC-Bold"
						fontSize={52}
						color={Colors.black}
					>
						{doc.name}
					</Text>
                    <HStack alignItems="baseline" space={2} w="full">
						<Text
							fontFamily="Bitter-Regular"
							fontSize={20}
							fontWeight="bold"
							color={Colors.deepestGray}
						>
							${doc.price}
						</Text>
					</HStack>
                    <Pressable>
						<Center mt={6} left={-6}>
							<Text style={styles.heading2} color={Colors.deepGold} isTruncated>
								----------- Additional Info -----------
							</Text>
						</Center>
					</Pressable>
                    <Box mt={6}>
						<Text style={styles.heading2}>Location</Text>
						<Text style={styles.paragraph}>{doc.location}</Text>
					</Box>
                    <Box mt={6}>
						<Text style={styles.heading2}>Calories</Text>
						<Text style={styles.paragraph}>{doc.calories} cal</Text>
					</Box>
                    <Box mt={6}>
						<Text style={styles.heading2}>Ingredients</Text>
						<Text style={styles.paragraph}>{doc.ingredients.join(", ")}</Text>
					</Box>
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

export default AdminSingleProductScreen;
