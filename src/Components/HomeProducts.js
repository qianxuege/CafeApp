import {
	ScrollView,
	Flex,
	Pressable,
	Image,
	Text,
	View,
	Box,
	FlatList,
} from "native-base";

import React from "react";
import Colors from "../color";
import products from "../data/Products.js";

const Item = ({ name, image }) => (
	<Pressable
		margin={1}
		backgroundColor={Colors.lightGold}
		overflow="visible"
		width={190}
	>
		<Text>{name}</Text>
		<Text>{image}</Text>
		<Image
			w={40}
			h={40}
			marginX={2}
			resizeMode="contain"
			alt={name}
			source={{image}}
		/>
	</Pressable>
);

function HomeProducts() {


	const renderItem = ({ item }) => <Item name={item.name} image={item.image} />;

	return (
		<FlatList
			marginLeft={2}	

			data={products}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			horizontal={false}
			numColumns={2}
			scrollEnabled={true}
			pagingEnabled={true}
		/>
	);
}

export default HomeProducts;
