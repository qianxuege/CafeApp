import { View, Text, StyleSheet, RefreshControl } from "react-native";
import React, { useState } from "react";
import {
	Box,
	HStack,
	Pressable,
	FlatList,
	Image,
	Center,
	VStack,
	Button,
	ScrollView,
} from "native-base";
import products from "../data/Products";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../color";
import { SwipeListView } from "react-native-swipe-list-view";

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};
const saved = products.filter((food) => food.saved);


function deleteSaved(i) {
	//i = index of the current food item in saved
	saved[i].saved = false; //Will delete the item from the saved list
	let iProducts = saved[i]._id - 1; //because the id starts from 1, need to -1 to get to index
	products[iProducts].saved = false;
	console.log(products[iProducts].saved);

	//console.log(saved[i].saved);
	//console.log(products[2].saved);
}

// Cart Item
const renderItems = (data) => (
	<Pressable>
		<Box ml={6} mb={3}>
			<HStack
				alignItems="center"
				bg={Colors.white}
				shadow={1}
				rounded={10}
				overflow="hidden"
			>
				<Center w="25%">
					<Image
						source={{ uri: data.item.image }}
						alt={data.item.name}
						w="full"
						height="20"
					/>
				</Center>
				<HStack alignItems="baseline" w="60%" px={6}>
					<Text style={styles.title} isTruncated>
						{data.item.name}
					</Text>
					<Text style={styles.price}>${data.item.price}</Text>
				</HStack>
			</HStack>
		</Box>
	</Pressable>
);

// Hidden
const hiddenItems = (data) => (
	<Pressable
		roundedTopRight={10}
		roundedBottomRight={10}
		height="20"
		width={64}
		marginLeft="auto"
		justifyContent="center"
		backgroundColor={Colors.red}
		onPress={() => {
			deleteSaved(data.index);
		}}
	>
		<Box space={2} marginLeft="84%">
			<FontAwesome name="trash" size={24} color={Colors.white} />
		</Box>
	</Pressable>
);

const CartItems = () => {
	const [fontsLoaded] = useFonts({
		"AmaticSC-Bold": require("../../assets/Fonts/AmaticSC-Bold.ttf"),
		"Bitter-Bold": require("../../assets/Fonts/Bitter-Bold.ttf"),
		"Bitter-Regular": require("../../assets/Fonts/Bitter-Regular.ttf"),
	});
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);
	return (
		<Box>
			<SwipeListView
				rightOpenValue={-50}
				data={saved}
				renderItem={renderItems}
				renderHiddenItem={hiddenItems}
				width="95%"
				height="78%"
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>

			<Center my={10}>
				<Button
					width="80%"
					height={55}
					rounded="full"
					bg={Colors.deepGold}
					_text={{
						color: Colors.white,
						fontWeight: "bold",
						fontSize: 16,
					}}
					_pressed={{ bg: Colors.lightGold }}
				>
					View Menu
				</Button>
			</Center>
		</Box>
	);
};

const styles = StyleSheet.create({
	title: {
		color: Colors.black,
		fontFamily: "Bitter-Regular",
		fontSize: 16,
		width: 200,
	},
	price: {
		color: Colors.black,
		fontFamily: "AmaticSC-Bold",
		fontSize: 32,
	},
});

export default CartItems;
