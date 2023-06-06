import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
	Box,
	Button,
	Center,
	Flex,
	HStack,
	Heading,
	Input,
	Pressable,
	ScrollView,
	Text,
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const AdminMenuScreen = () => {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"AmaticSC-Bold": require("../../assets/Fonts/AmaticSC-Bold.ttf"),
		"Bitter-Bold": require("../../assets/Fonts/Bitter-Bold.ttf"),
		"Caladea-Regular": require("../../assets/Fonts/Caladea-Regular.ttf"),
		"Caladea-Bold": require("../../assets/Fonts/Caladea-Bold.ttf"),
	});
	const navigation = useNavigation();

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};
	const [refreshing, setRefreshing] = React.useState(false); //to refresh the screen
	//const [filter, setFilter] = useState(false);

	const [docSnap, setDocSnap] = useState("");
	let arrayDocs = [];
	const [word, setWord] = useState("");
	const [imagesrc, setImagesrc] = useState(
		"https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
	);
	const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	//getFoodItems();
	// }, []);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	}, []);

	useEffect(() => {
		getFoodItems();
	}, [word]);

	useFocusEffect(
		React.useCallback(() => {
			onRefresh();
		}, [])
	);

	const resetFilter = () => {
		setWord("");
        arrayDocs = [];
		//getFoodItems();
	};

	const getFoodItems = async () => {
		const foodRef = collection(db, "GHS", "Public", "foodItems");
		try {
			//const q = query(foodRef, where("name", "==", newFoodName));
			//console.log(newFoodName);
			if (word == "") {
				const querySnapshot = await getDocs(foodRef);
				setDocSnap(querySnapshot.docs);
			} else {
				console.log(word);
				let filter = word.split(" ");
				for (let i = 0; i < filter.length; i++) {
					let qName = query(
						foodRef,
						where("lowercaseName", "array-contains", filter[i])
					);
					let querySnapshotN = await getDocs(qName);

					let qIngredients = query(
						foodRef,
						where("ingredients", "array-contains", filter[i])
					);
					let querySnapshotI = await getDocs(qIngredients);

					let qTags = query(foodRef, where("tags", "array-contains", filter[i]));
					let querySnapshotT = await getDocs(qTags);

					let qLocation = query(
						foodRef,
						where("location", "array-contains", filter[i])
					);
					let querySnapshotL = await getDocs(qLocation);

					// arrayDocs = [
					// 	...querySnapshotN.docs,
					// 	...querySnapshotI.docs,
					// 	...querySnapshotT.docs,
					// 	...querySnapshotL.docs,
					// ];

                    arrayDocs.push(...querySnapshotN.docs);
                    arrayDocs.push(...querySnapshotI.docs);
                    arrayDocs.push(...querySnapshotT.docs);
                    arrayDocs.push(...querySnapshotL.docs);
				}

				// const qName = query(foodRef, where("lowercaseName", "array-contains", word));
				// const querySnapshotN = await getDocs(qName);

				// const qIngredients = query(foodRef, where("ingredients", "array-contains", word));
				// const querySnapshotI = await getDocs(qIngredients);

				// const qTags = query(foodRef, where("tags", "array-contains", word));
				// const querySnapshotT = await getDocs(qTags);

				// const qLocation = query(foodRef, where("location", "array-contains", word));
				// const querySnapshotL = await getDocs(qLocation);

				// const arrayDocs = [...querySnapshotN.docs, ...querySnapshotI.docs, ...querySnapshotT.docs, ...querySnapshotL.docs];

				const getUniqueList = () => {
					for (let i = 0; i < arrayDocs.length - 1; i++) {
						for (let j = i + 1; j < arrayDocs.length; j++) {
							if (arrayDocs[i].id === arrayDocs[j].id) {
								//console.log(arrayDocs.map((doc) => doc.data().name));
								//console.log(arrayDocs[i].data());
								arrayDocs.splice(i, 1);
								getUniqueList();
								//console.log(arrayDocs.map((doc) => doc.data().name));
							}
						}
					}
				};

				getUniqueList();

				//console.log(arrayDocs.map((doc) => doc.data().name));

				setDocSnap(arrayDocs);
				//console.log(querySnapshot);
			}

			//console.log(querySnapshot);
		} catch (error) {
			console.log(error);
		}
	};

	// function getImage() {
	// 	const storage = getStorage();
	// 	getDownloadURL(ref(storage, "images/chicken_caesar_salad.jpg"))
	// 		.then((url) => {
	// 			setImagesrc(url);
	// 			console.log(imagesrc);
	// 		})
	// 		.catch((error) => {
	// 			// Handle any errors
	// 			console.log(error);
	// 		});
	// }

	return (
		<>
			<Box backgroundColor={Colors.white} width="100%" paddingBottom={1}>
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
							//setFilter(true);
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
			</Box>

			<ScrollView
				flex={1}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				backgroundColor={Colors.white}
			>
				<Flex
					flexWrap="wrap"
					direction="row"
					justifyContent="space-between"
					px={6}
				>
					{/* {"null is not an object --> need to fix docSnap"} */}
					{docSnap != ""
						? docSnap.map((doc) => (
								<Pressable
									onPress={() => {
										navigation.navigate("AdminSingle", doc.data());
									}}
									key={doc.id}
									w="47%"
									bg={Colors.lightGold}
									shadow={2}
									pt={3}
									my={3}
									pb={2}
									overflow="hidden"
								>
									<Image
										source={{ uri: doc.data().image }}
										alt={doc.data().name}
										w="100%"
										h={32}
										top={-12}
										resizeMode="stretch"
									/>
									<Box px={4} pt={1} marginX="auto" top={-10}>
										<Text
											fontFamily="AmaticSC-Bold"
											color={Colors.white}
											fontSize={20}
											isTruncated="true"
										>
											{doc.data().name}
										</Text>
									</Box>
									<Box marginX="auto" top={-11}>
										<Text fontFamily="Bitter-Bold" color={Colors.white}>
											{doc.data().calories} cal
										</Text>
									</Box>
									<Box marginX="auto" top={-11}>
										<Text fontFamily="Bitter-Bold" color={Colors.white}>
											${doc.data().price}
										</Text>
									</Box>
								</Pressable>
						  ))
						: console.log("docSnap not loaded")}
				</Flex>

				{/* <Image
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
			</Button> */}
			</ScrollView>
		</>
	);
};

export default AdminMenuScreen;
