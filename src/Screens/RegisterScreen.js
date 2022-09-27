import {
	Box,
	Image,
	Heading,
	Text,
	VStack,
	Input,
	Button,
    Pressable,
} from "native-base";
import React from "react";
import Colors from "../color";
import { useFonts } from "expo-font";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";


function RegisterScreen() {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
	});
	return (
		<Box flex={1} bg={Colors.black}>
			<Image
				flex={1}
				alt="Logo"
				resizeMode="cover"
				size="lg"
				w="full"
				source={require("../../assets/cover.png")}
			/>
			<Box
				w="full"
				h="full"
				position="absolute"
				left="3"
				top="10"
				px="6"
				justifyContent="center"
			>
				<Heading
					style={{
						fontFamily: "Akronim-Regular",
						fontSize: 50,
						color: "#BD9E1E",
						paddingTop: 20,
						marginBottom: 10,
					}}
				>
					SIGN UP
				</Heading>
				<VStack space={5} pt="6" >
                    {/* USERNAME */}
                    <Input
						InputLeftElement={
							<Ionicons name="person-circle" size={28} color="#4e954e" />
						}
						variant="underlined"
						placeholder="John Doe"
						w="85%"
						fontSize="16"
						color="#4e954e"
						placeholderTextColor="#4e954e"
						paddingLeft="3"
						borderBottomColor={Colors.gold}
					/>


					{/* EMAIL */}
					<Input
						InputLeftElement={
							<MaterialIcons name="email" size={24} color="#4e954e" />
						}
						variant="underlined"
						placeholder="user@gmail.com"
						w="85%"
						fontSize="16"
						color="#4e954e"
						placeholderTextColor="#4e954e"
						paddingLeft="3"
						borderBottomColor={Colors.gold}
					/>
					{/* PASSWORD */}
					<Input
						InputLeftElement={<Ionicons name="eye" size={24} color="#4e954e" />}
						variant="underlined"
						type="password"
						placeholder="*********"
						w="85%"
						fontSize="16"
						color="#4e954e"
						placeholderTextColor="#4e954e"
						paddingLeft="3"
						borderBottomColor={Colors.gold}
					/>
				</VStack>
				<Button
					_pressed={{
						bg: Colors.lightGold,
					}}
					marginTop={10}
					marginBottom={10}
					w="50%"
					rounded={50}
					bg={Colors.gold}
					size="md"
				>
					SIGN UP
				</Button>
                <Button
					_pressed={{
						bg: Colors.lightGold,
					}}
					marginBottom={10}
					w="50%"
					rounded={50}
					bg={Colors.gold}
					size="md"
				>
					ADMIN SIGN UP
				</Button>
                
                <Button
					_pressed={{
						bg: Colors.lightGreen,
					}}
					
					w="50%"
					rounded={50}
					bg={Colors.darkGreen}
					size="md"
				>
					LOGIN
				</Button>
			</Box>
		</Box>
	);
}

export default RegisterScreen;
