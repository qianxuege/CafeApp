import { Box, Center, NativeBaseProvider, ScrollView, Text, View } from "native-base";
import React from "react";
import Colors from "../color";
import { useFonts } from 'expo-font';
import CartEmpty from "../Components/CartEmpty";
import CartItems from "../Components/CartItems";
import NavBarCart from "../Components/NavBarCart";




function CartScreen() {
	const [fontsLoaded] = useFonts ({
        'Bitter-Bold': require("../../assets/Fonts/Bitter-Bold.ttf"),
      });
	return (
		<NativeBaseProvider>
			<NavBarCart />
		<Box flex={1} safeAreaTop bg={Colors.morandiGreen}>
			<Center >
			
			</Center>
			{/* If Cart is Empty */}
			{/* <CartEmpty />  */}
			{/* <ScrollView showsVerticalScrollIndicator={false}> */}
			<CartItems /> 
			{/* </ScrollView> */}

		</Box>
		</NativeBaseProvider>
		
	);
}

export default CartScreen;