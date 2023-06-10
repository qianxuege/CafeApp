import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
	Flex,
} from "native-base";
import AdminTop from "../Components/AdminTop";
import Colors from "../color";
import { Alert, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { deleteObject, getStorage, ref } from "firebase/storage";
import { db } from "../../firebase";
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";

function AdminSingleProductScreen({ route }) {
	const navigation = useNavigation();
	const item = route.params.doc;
	const itemID = route.params.docID;
	const organization = route.params.organization;
	//console.log(organization);

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

	useFocusEffect(
		React.useCallback(() => {
			onRefresh();
		}, [])
	);

	if (!fontsLoaded) {
		return null;
	};

	const deleteAlert = () => {
		Alert.alert(
			"ALERT",
			"Deleted items cannot be recovered. Click 'OK' to start delete.",
			[
				{
					text: "Cancel",
					onPress: () => {
						return;
					},
					style: "cancel",
				},
				{ text: "OK", onPress: () => deleteFoodItem() },
			]
		);
		console.log(itemID);
	};

	const deleteFoodItem = async () => {
		const storage = getStorage();
		//console.log("delete0");
		const docRef = doc(db, organization, "Public", "foodItems", itemID);
		//console.log("delete1");
		const imageSnap = await getDoc(docRef);
		const imageFileName = imageSnap.data().imageFileName;
		//console.log("delete2");
		console.log(organization);
		const imageFile = organization + "/images/" + imageFileName;
		console.log(imageFile);
		const fileRef = ref(storage, imageFile);
		console.log("delete3");
		try {
			deleteObject(fileRef).then(() => {
				// File deleted successfully
			  }).catch((error) => {
				// Uh-oh, an error occurred!
				console.log(error);
			  });
			await deleteDoc(docRef);
			
			alert("Item deleted!");
			onRefresh();
			navigation.navigate("AdminMenu");
		} catch (error) {
			alert(error);
		}
		
	};

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
					source={{ uri: item.image }}
					top={0}
					alt="Image"
					margin="auto"
					w="100%"
					h={400}
					resizeMode="cover"
					marginBottom={2}
				/>
				<Pressable position="absolute" top={370} right="2%" onPress={() => {
					deleteAlert();
				}}>
					<Center rounded="full" backgroundColor={Colors.white} padding={2}>
						<MaterialIcons name="delete-outline" size={24} color="black" />
					</Center>
				</Pressable>
				<Box marginLeft={6} paddingBottom={100}>
					<Text
						my={2}
						fontFamily="AmaticSC-Bold"
						fontSize={52}
						color={Colors.black}
					>
						{item.name}
					</Text>
					<Flex
						flexWrap="wrap"
						direction="row"
						justifyContent="space-between"
						width="90%"
					>
						{item.tags.map((tag) => {
							return (
								<View style={styles.tagsView} key={Math.random() * 20}>
									<Text style={styles.tags}>{tag}</Text>
								</View>
							);
						})}
					</Flex>
					<HStack alignItems="baseline" space={2} w="full">
						<Text
							fontFamily="Bitter-Regular"
							fontSize={20}
							fontWeight="bold"
							color={Colors.deepestGray}
						>
							${item.price}
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
						<Text style={styles.paragraph}>{item.location.join(" ")}</Text>
					</Box>
					<Box mt={6}>
						<Text style={styles.heading2}>Calories</Text>
						<Text style={styles.paragraph}>{item.calories} cal</Text>
					</Box>
					<Box mt={6}>
						<Text style={styles.heading2}>Ingredients</Text>
						<Text style={styles.paragraph}>{item.ingredients.join(", ")}</Text>
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
