import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
	Box,
	Button,
	Flex,
	HStack,
	Input,
	Pressable,
	ScrollView,
	View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Image } from "native-base";
import { Ionicons, Feather } from "@expo/vector-icons";
import Colors from "../color";
import AdminTop from "../Components/AdminTop";
import { useFonts } from "expo-font";
import { RefreshControl, TouchableOpacity } from "react-native";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { db } from "../../firebase";

const AdminMenuScreen = () => {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"AmaticSC-Bold": require("../../assets/Fonts/AmaticSC-Bold.ttf"),
		"Bitter-Bold": require("../../assets/Fonts/Bitter-Bold.ttf"),
		"Caladea-Regular": require("../../assets/Fonts/Caladea-Regular.ttf"),
		"Caladea-Bold": require("../../assets/Fonts/Caladea-Bold.ttf"),
	});

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};
	const [refreshing, setRefreshing] = React.useState(false); //to refresh the screen

	const [docSnap, setDocSnap] = useState(null);
	const [word, setWord] = useState("");
	const [imagesrc, setImagesrc] = useState(
		"https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getFoodItems();
	}, []);

	const resetFilter = () => {
		setWord("");
	};

	const getFoodItems = async () => {
		const foodRef = collection(db, "foodItems");
		try {
			//const q = query(foodRef, where("name", "==", newFoodName));
			//console.log(newFoodName);
			const querySnapshot = await getDocs(foodRef);
			//console.log(querySnapshot.docs.length);
			setDocSnap(querySnapshot);
			console.log(docSnap);

			if (docSnap != null) {
				docSnap.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, " => ", doc.data().name);
				});
			} else {
				// docSnap.data() will be undefined in this case
				console.log("No such document!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	function getImage() {
		const storage = getStorage();
		getDownloadURL(ref(storage, "images/chicken_caesar_salad.jpg"))
			.then((url) => {
				setImagesrc(url);
				console.log(imagesrc);
			})
			.catch((error) => {
				// Handle any errors
				console.log(error);
			});
	}

	return (
		<Box backgroundColor={Colors.white} width="100%">
			<AdminTop />
			<HStack w="full" px={2} py={4} alignItems="center">
				<Pressable left={9} zIndex={2}>
					<Ionicons name="search" size={24} color={Colors.deepestGray} />
				</Pressable>
				<Input
					placeholder="Type In A Filter"
					autoCapitalize="none"
					w="85%"
					bg={Colors.white}
					type="search"
					height={12}
					paddingLeft={12}
					borderWidth={1}
					borderColor={Colors.lightBlack}
					fontSize={14}
					color={Colors.deepestGray}
					variant="unstyled"
					_focus={{
						borderColor: Colors.pink,
						backgroundColor: Colors.white,
					}}
					value={word}
					onChangeText={(text) => setWord(text.toLocaleLowerCase())}
					clearTextOnFocus
				/>
				<Box right={10}>
					<TouchableOpacity onPress={() => setWord("")}>
						<Feather name="x" size={24} color={Colors.deepestGray} />
					</TouchableOpacity>
				</Box>
			</HStack>

			<HStack
				w="full"
				marginBottom={2}
				space={4}
				px={6}
				py={0}
				alignItems="center"
			>
				<Button
					h={10}
					w={117}
					bg={Colors.morandiGreen}
					paddingRight={6}
					position="relative"
					left="15%"
					_text={{
						color: Colors.black,
						fontFamily: "Caladea-Regular",
					}}
					_pressed={{ bg: Colors.darkGreen }}
					onPress={() => {
						getFoodItems();
					}}
				>
					Filter
				</Button>
				<View left={0}>
					<Ionicons
						name="filter"
						size={22}
						flex={2}
						color={Colors.deepestGray}
					/>
				</View>
				<Button
					h={10}
					w={124}
					bg={Colors.morandiGreen}
					paddingRight={4}
					left={7}
					_text={{
						color: Colors.black,
						fontFamily: "Caladea-Regular",
					}}
					_pressed={{ bg: Colors.darkGreen }}
					onPress={() => {
						resetFilter();
					}}
				>
					Reset Filter
				</Button>
			</HStack>

			<ScrollView
				mt={1}
				flex={1}
				// refreshControl={
				// 	<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				// }
			>
				<Flex
					flexWrap="wrap"
					direction="row"
					justifyContent="space-between"
					px={6}
				>
                    {"null is not an object --> need to fix docSnap"}
					{docSnap.map((product) => (
                        <Image
                        source={{ uri: product.image }}
                        alt={product.name}
                        w="100%"
                        h={32}
                        top={-12}
                        resizeMode="stretch"
                    />
                    ))}
				</Flex>
			</ScrollView>

			<Image
				source={{ uri: imagesrc }}
				alt="chosen image"
				style={{ width: 400, height: 300 }}
				resizeMode="cover"
			/>
			<Button
				onPress={() => {
					getImage();
				}}
			>
				{" "}
			</Button>
		</Box>
	);
};

export default AdminMenuScreen;
