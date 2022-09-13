import {
	ScrollView,
	Flex,
	Pressable,
	Image,
	Text,
	View,
	Box,
} from "native-base";
import { useFonts } from "expo-font";
import { FontAwesome } from '@expo/vector-icons';
import React from "react";
import Colors from "../color";
import products from "../data/Products.js";
import Rating from "./Rating";

function HomeProducts() {
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
							<Text fontFamily="Bitter-Bold" color={Colors.white}>{product.calories} cal</Text>
						</Box>
						<Box marginX="auto" top={-11}>
							<Text fontFamily="Bitter-Bold" color={Colors.white}>
								${product.price}
							</Text>
						</Box>
						<Box marginX="auto" top={-8}>
							<Rating value={4} />
						</Box>
					</Pressable>
				))}
			</Flex>
		</ScrollView>
	);
}

export default HomeProducts;
