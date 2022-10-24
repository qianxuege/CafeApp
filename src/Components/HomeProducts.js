import {
	ScrollView,
	Flex,
	Pressable,
	Image,
	Text,
	View,
	Box,
	Center,
} from "native-base";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import Colors from "../color";
import products from "../data/Products.js";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";

function HomeProducts() {
	const navigation = useNavigation()
	const [fontsLoaded] = useFonts({
		"AmaticSC-Bold": require("../../assets/Fonts/AmaticSC-Bold.ttf"),
		"Bitter-Bold": require("../../assets/Fonts/Bitter-Bold.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<ScrollView mt={1} flex={1}>
			<Flex
				flexWrap="wrap"
				direction="row"
				justifyContent="space-between"
				px={6}
			>
				{products.map((product) => (
					<Pressable
						onPress={() => {navigation.navigate("Single", product)}}
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
						<Pressable position="absolute" top="50%" right="3%">
							<Center rounded="full" backgroundColor={Colors.white} padding={2}>
								<FontAwesome name="heart-o" size={18} color={Colors.pink} />
								{/* <FontAwesome name="heart-o" size={24} color={Colors.pink} /> */}
							</Center>
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
	);
}

export default HomeProducts;
