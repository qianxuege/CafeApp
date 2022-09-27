import { ScrollView, Box, Image, Text, View, HStack, Spacer, Pressable } from "native-base";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import Colors from "../color";
import Rating from "../Components/Rating";
import NumericInput from "react-native-numeric-input";
import { FontAwesome } from '@expo/vector-icons';


function SingleProductScreen() {
	const [value, setValue] = useState(0);
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"AmaticSC-Bold": require("../../assets/Fonts/AmaticSC-Bold.ttf"),
		"Bitter-Regular": require("../../assets/Fonts/Bitter-Regular.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Box flex={1} top={0}>
			<ScrollView
				top={0}
				margin="auto"
				width="100%"
				bg={Colors.white}
				showsVerticalScrollIndicator={false}
			>
				<Image
					source={require("../../assets/images/1.jpeg")}
					top={0}
					alt="Image"
					margin="auto"
					w="100%"
					h={400}
					resizeMode="cover"
                    marginBottom={2}
				/>
				<Box marginLeft={6}>
					<Text
						my={2}
						fontFamily="AmaticSC-Bold"
						fontSize={38}
						color={Colors.black}
					>
						Acai Bowl
					</Text>
					<HStack alignItems="baseline" space={2} w="full">
						<Text
							fontFamily="Bitter-Regular"
							fontSize={20}
							fontWeight="bold"
							color={Colors.deepestGray}
						>
							$11.00
						</Text>
                        <Spacer />
                        <Pressable right={10}>
                            <Rating value={4} />
                        </Pressable>
						
					</HStack>
					<HStack space={2} alignItems="center" my={5}>
						<NumericInput
							value={value}
							totalWidth={140}
							totalHeight={38}
                            iconSize={30}
							maxValue={5}
							minValue={0}
                            borderColor={Colors.deepGray}
                            rounded
                            textColor={Colors.black}
                            iconStyle={{color: Colors.white}}
                            rightButtonBackgroundColor={Colors.deepGold}
                            leftButtonBackgroundColor={Colors.lightGold}
						/>
                        <Spacer />
                        <Pressable right={20}>
                            <FontAwesome name="cart-plus" size={28} color="black" />
                        </Pressable>
                        
					</HStack>

					<Text
						fontFamily="Bitter-Regular"
						fontSize={20}
						fontWeight="bold"
						color={Colors.black}
						bg={Colors.white}
					>
						300 cal
					</Text>
				</Box>
			</ScrollView>
		</Box>
	);
}

export default SingleProductScreen;
