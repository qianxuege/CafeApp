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
	Input
} from "native-base";
import { RefreshControl, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import Colors from "../color";
import products from "../data/Products.js";
import Rating from "./Rating";
import Heart from "./Heart";
import NavBarMenu from "../Components/NavBarMenu";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";


function HomeProducts() {
	const navigation = useNavigation();
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

	const [word, setWord] = useState('');
	const [uniqueFilteredId, setUniqeFilteredId] = useState([]);
	//const [customizedData, setCustomizedData] = useState(CustomizedData);
	const [finalData, setFinalData] = useState(products);
	


	let filteredId = [];
	let singleFilteredId = [];
	let newArray = [];

	

	const search = (word) => {
		console.log(word);

		const filteredName = products.filter((item) => item.name.toLocaleLowerCase().includes(word));
		const filteredTags = products.filter((item) => item.tags.includes(word));
		const filteredIngredients = products.filter((item) =>
			item.ingredients.includes(word)
		);
		filteredName.forEach((food) => filteredId.push(food._id));
		filteredTags.forEach((food) => filteredId.push(food._id));
		filteredIngredients.forEach((food) => filteredId.push(food._id));
		//filteredId is an array that consists of products that contain the word (may have duplicates)

		//to filter out duplicates
		singleFilteredId = filteredId.filter((element, index) => {
			return filteredId.indexOf(element) === index;
		});

		//singleFilteredId consists of id of products with the word, without duplicates

		setUniqeFilteredId(singleFilteredId);  //now uniqueFilteredId == singleFilteredId

		singleFilteredId.map((uniqueId) => {
		 	newArray.push( products.filter((item) => item._id == uniqueId));
			 
			//setCustomizedData((oldArray) => [...oldArray, newArray]);
			
		 	

		 });

		setFinalData(newArray.flat());
		
	};

	const resetFilter = () => {
		newArray = [];
		setFinalData(products);
		setWord("");
	}

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
		  setRefreshing(false);
		}, 1000);
	  }, []);

	useEffect(() => {
		setFinalData(products);
	}, []);

	//Will refresh once the screen is in focus: 
	//(when it first renders and when user returns to this screen from another screen)
	useFocusEffect(
		React.useCallback(() => {
		 onRefresh();
		}, [])
	  );

	if (!fontsLoaded) {
		return null;
	}

	

	return (
		<>
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
				<TouchableOpacity  onPress={() => setWord("")}>
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
						search(word)
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
						resetFilter()
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
				{finalData.map((product) => (
					<Pressable
						onPress={() => {
							navigation.navigate("Single", product);
						}}
						key={product._id}
						w="47%"
						bg={Colors.lightGold}
						shadow={2}
						pt={3}
						my={3}
						pb={2}
						overflow="hidden"
					>
						<Image
							source={{ uri: product.image }}
							alt={product.name}
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

						<Pressable position="absolute" top="50%" right="3%" onPress={() => {
							product.saved==true? product.saved=false: product.saved=true;
							onRefresh();
						}}>
							<Heart param={product.saved} size={18} />
							
							
						</Pressable>

						<Box px={4} pt={1} marginX="auto" top={-10}>
							<Text
								fontFamily="AmaticSC-Bold"
								color={Colors.white}
								fontSize={20}
								isTruncated="true"
							>
								{product.name}
							</Text>
						</Box>
						<Box marginX="auto" top={-11}>
							<Text fontFamily="Bitter-Bold" color={Colors.white}>
								{product.calories} cal
							</Text>
						</Box>
						<Box marginX="auto" top={-11}>
							<Text fontFamily="Bitter-Bold" color={Colors.white}>
								${product.price}
							</Text>
						</Box>
						<Box marginX="auto" top={-8}>
							<Rating value={product.rating} />
						</Box>
					</Pressable>
				))}
			</Flex>
		</ScrollView>
	</>
	);
}

export default HomeProducts;
