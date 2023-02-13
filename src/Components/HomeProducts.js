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
	Button
} from "native-base";
import { RefreshControl } from "react-native";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import Colors from "../color";
import products from "../data/Products.js";
import Rating from "./Rating";
import Heart from "./Heart";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CustomizedData from "../data/CustomizedData";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
//import { word } from "./HomeSearch";


function HomeProducts() {
	const navigation = useNavigation();
	const [fontsLoaded] = useFonts({
		"AmaticSC-Bold": require("../../assets/Fonts/AmaticSC-Bold.ttf"),
		"Bitter-Bold": require("../../assets/Fonts/Bitter-Bold.ttf"),
	});

	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};
	const [refreshing, setRefreshing] = React.useState(false);

	const [word, setWord] = useState('');
	const [uniqueFilteredId, setUniqeFilteredId] = useState([]);
	const [customizedData, setCustomizedData] = useState(CustomizedData);
	const [finalData, setFinalData] = useState(products);
	const [isPressed, setIsPressed] = useState(false);
	const [isFullHeart, setIsFullHeart] = useState();

	

	let filteredId = [];
	let singleFilteredId = [];
	let newArray = [];

	

	const search = (word) => {
		console.log(word);

		const filteredName = products.filter((item) => item.name.includes(word));
		const filteredTags = products.filter((item) => item.tags.includes(word));
		const filteredIngredients = products.filter((item) =>
			item.ingredients.includes(word)
		);
		filteredName.forEach((food) => filteredId.push(food._id));
		filteredTags.forEach((food) => filteredId.push(food._id));
		filteredIngredients.forEach((food) => filteredId.push(food._id));

		//to filter out duplicates
		singleFilteredId = filteredId.filter((element, index) => {
			return filteredId.indexOf(element) === index;
		});

		//console.log(singleFilteredId);

		setUniqeFilteredId(singleFilteredId);

		console.log(uniqueFilteredId)

		singleFilteredId.map((uniqueId) => {
		 	newArray.push( products.filter((item) => item._id == uniqueId));
		 	console.log(newArray);
			//setWord('chicken')
			 
			//setCustomizedData((oldArray) => [...oldArray, newArray]);
			
		 	
		 	//console.log(customizedData);
		// 	// I want to add the filtered arrays onto the Customized Data.
		 });

		console.log(newArray);
		setFinalData(newArray.flat());
		
			
		//}));
		//console.log(customizedData);

		// setCustomizedData(newArray);

		//console.log(CustomizedData);

		//console.log(products.filter(item => item._id == 1 ));
	};

	//useEffect(() => {
	//	setCustomizedData(uniqueFilteredId);
	//}, [uniqueFilteredId]);

	//console.log(customizedData);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => setRefreshing(false));
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

	// const changeHeart = (heart) => {
	// 	heart==true? heart = false: heart = true;
	// 	onRefresh();
	// 	return heart;
	// }


	

	return (
		<>
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
						setWord('chicken');
						search(word);
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
					paddingRight={8}
					left={7}
					_text={{
						color: Colors.black,
						fontFamily: "Caladea-Regular",
					}}
					_pressed={{ bg: Colors.darkGreen }}
				>
					Specials
				</Button>
				<View left={-26} top={-1}>
					<MaterialIcons
						name="celebration"
						size={22}
						flex={2}
						color={Colors.deepestGray}
					/>
				</View>
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
