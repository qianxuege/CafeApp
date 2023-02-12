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
import React, { useState } from "react";
import Colors from "../color";
import { useFonts } from "expo-font";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "../../firebase";
import { Auth } from "firebase/auth";
import StackNav from "../Navigations/StackNav";



function LoginScreen({ navigation }) {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
	});


	<firebase />
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function logIn() {
		const auth = getAuth();
		console.log("works");
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user.email);
				navigation.navigate("Bottom");
				// ...
			})
		
			.catch(function(error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				console.log("Check your login credentials or register a new account!");
			});
	}

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
				top="8"
				px="6"
				justifyContent="center"
			>
				<Heading
					style={{
						fontFamily: "Akronim-Regular",
						fontSize: 46,
						color: "#BD9E1E",
						paddingTop: 20,
						marginBottom: 10,
					}}
				>
					LOGIN
				</Heading>
				<VStack space={5} pt="6">
					{/* EMAIL */}
					<Input
						InputLeftElement={
							<MaterialIcons name="email" size={24} color="#4e954e" />
						}
						variant="underlined"
						placeholder="user@gmail.com"
						value={email}
						onChangeText={(text) => setEmail(text.toLocaleLowerCase())}
						
						w="85%"
						fontSize="16"
						color="#4e954e"
						placeholderTextColor="#4e954e"
						paddingLeft="3"
						borderBottomColor={Colors.gold}
						autoCapitalize="none"
					/>
					{/* PASSWORD */}
					<Input
						InputLeftElement={<Ionicons name="eye" size={24} color="#4e954e" />}
						variant="underlined"
						type="password"
						placeholder="*********"
						value={password}
						onChangeText={(text) => setPassword(text)}
						w="85%"
						fontSize="16"
						color="#4e954e"
						placeholderTextColor="#4e954e"
						paddingLeft="3"
						borderBottomColor={Colors.gold}
						secureTextEntry
						autoCapitalize="none"
					/>
				</VStack>
				<Box>
				<Button
					marginTop={10}
					marginBottom={10}
					_pressed={{
						bg: Colors.lightGreen,
					}}
					w="50%"
					rounded={50}
					bg={Colors.darkGreen}
					size="md"
					onPress= {() => logIn()}
				>
					LOGIN
				</Button>
				</Box>
				<Button
					_pressed={{
						bg: Colors.lightGold,
					}}
					marginBottom={10}
					w="50%"
					rounded={50}
					bg={Colors.gold}
					size="md"
					onPress={() => navigation.navigate("Register")}
				>
					REGISTER
				</Button>
				<Button
					_pressed={{
						bg: Colors.lightGold,
					}}
					w="50%"
					rounded={50}
					bg={Colors.gold}
					size="md"
					onPress={() => navigation.navigate("AdminUpload")}
				>
					ADMIN LOGIN
				</Button>
			</Box>
		</Box>
	);
}

export default LoginScreen;
