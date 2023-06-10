import {
	ScrollView,
	Flex,
	Pressable,
	Image,
	Text,
	View,
	Box,
	Center,
	HStack,
	Button,
	Input,
} from "native-base";
import { RefreshControl, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import Colors from "../color";
import products from "../data/Products.js";
//import Rating from "./Rating";
//import Heart from "./Heart";
import NavBarMenu from "../Components/NavBarMenu";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
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

function HomeScreen({route}) {
	const navigation = useNavigation();
    const organization = route.params.organization;
    console.log(organization);
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

	const [word, setWord] = useState("");
	const [docSnap, setDocSnap] = useState("");
    const [filterPressed, setFilterPressed] = useState(false);
	let arrayDocs = [];

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
        search();
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	}, []);

	useEffect(() => {
		search();
	}, [filterPressed]);

	useFocusEffect(
		React.useCallback(() => {
			onRefresh();
		}, [])
	);

	const resetFilter = () => {
		setWord("");
		arrayDocs = [];
        setFilterPressed(false);
        //search();
		//getFoodItems();
	};

	const search = async () => {
		//console.log(word);

		const foodRef = collection(db, organization, "Public", "foodItems");
		try {
			if (word == "") {
				const querySnapshot = await getDocs(foodRef);
				setDocSnap(querySnapshot.docs);
			} else {
				//console.log(word);
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

					let qTags = query(
						foodRef,
						where("tags", "array-contains", filter[i])
					);
					let querySnapshotT = await getDocs(qTags);

					let qLocation = query(
						foodRef,
						where("location", "array-contains", filter[i])
					);
					let querySnapshotL = await getDocs(qLocation);

					arrayDocs.push(...querySnapshotN.docs);
					arrayDocs.push(...querySnapshotI.docs);
					arrayDocs.push(...querySnapshotT.docs);
					arrayDocs.push(...querySnapshotL.docs);
				}

				const getUniqueList = () => {
					for (let i = 0; i < arrayDocs.length - 1; i++) {
						for (let j = i + 1; j < arrayDocs.length; j++) {
							if (arrayDocs[i].id === arrayDocs[j].id) {
								arrayDocs.splice(i, 1);
								getUniqueList();
								//console.log(arrayDocs.map((doc) => doc.data().name));
							}
						}
					}
				};

				getUniqueList();

				setDocSnap(arrayDocs);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Box flex={1} bg={Colors.white} w="100%">
				<NavBarMenu />
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
						onPress={() => setFilterPressed(true)}
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
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					<Flex
						flexWrap="wrap"
						direction="row"
						justifyContent="space-between"
						px={6}
					>
						{docSnap != ""
							? docSnap.map((doc) => (
									<Pressable
										onPress={() => {
											navigation.navigate("Single", doc.data());
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
										{/* <Pressable position="absolute" top="50%" right="3%">
							<Center rounded="full" backgroundColor={Colors.white} padding={2}>
								<FontAwesome name="heart-o" size={18} color={Colors.pink} />
								<FontAwesome name="heart-o" size={24} color={Colors.pink} />
							</Center>
						</Pressable> */}

										{/* <Pressable position="absolute" top="50%" right="3%" onPress={() => {
							product.saved==true? product.saved=false: product.saved=true;
							onRefresh();
						}}>
							<Heart param={product.saved} size={18} />
							
							
						</Pressable> */}

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
										{/* <Box marginX="auto" top={-8}>
							<Rating value={product.rating} />
						</Box> */}
									</Pressable>
							  ))
							: console.log("docSnap not loaded")}
					</Flex>
				</ScrollView>
			</Box>
		</>
	);
}

export default HomeScreen;
