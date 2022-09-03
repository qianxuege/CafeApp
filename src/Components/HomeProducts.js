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

const Item = ( {name} ) => (
	<View margin={2} backgroundColor={Colors.lightGold} overflow="visible">
	  <Text>{name}</Text>
	  <Image  w={40} h={40} marginX={2} resizeMode="contain" alt={name} source={require("../../assets/images/2.jpeg")} />
	</View>
  );

function HomeProducts() {
	products.map((product) => (
		console.log({uri: product.image})
	))

	const renderItem = ({ item }) => (
		<Item name={item.name} />
	  );

	

	return (
		<View flex={1}>
			<Flex
				flexWrap="wrap"
				direction="row"
				justifyContent="space-betwen"
				px={6}
				marginLeft={-2}
			>
				<FlatList 
					data={products}
					renderItem={renderItem}
					keyExtractor={item => item._id}
					horizontal={false}
					
					numColumns={2}
					
					pagingEnabled={true}
				/>
				{/*<Image source={require('../../assets/images/AcaiBowl.jpeg')} /> */}
			</Flex>
		</View>
	);
}

export default HomeProducts;
