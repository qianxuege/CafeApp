import {
	Box,
	Image,
	Heading,
	Text,
	VStack,
	Input,
	Button,
	Pressable,
	ScrollView,
} from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../color";
import { useFonts } from "expo-font";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
	sendPasswordResetEmail,
} from "firebase/auth";
import firebase, { db } from "../../firebase";
import { Auth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import DropDownPicker from "react-native-dropdown-picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";

function RegisterScreen({ navigation }) {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
	});

	//const provider = new GoogleAuthProvider();
	//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	//const [displayName, setDisplayName] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [errorText, setErrorText] = useState("");

	//for the Dropdown Picker
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);
	const [organization, setOrganization] = useState("");

	useEffect(() => {
		getOrganizations();
	}, [isAdmin]);

	useFocusEffect(
		React.useCallback(() => {
			setOrganization("");
			setIsAdmin(false);
		}, [])
	);

	<firebase />;

	let organizationsArr = [];

	const getOrganizations = async () => {
		const orgRef = collection(db, "Organizations");
		const querySnapshot = await getDocs(orgRef);
		// for (let i=0; i<querySnapshot.size; i++) {
		// 	organizations.push(querySnapshot.docs[i].id)
		// }
		//returns an array of all available organizations for the user to choose from
		organizationsArr = querySnapshot.docs.map((doc) => doc.data().dropDown);
		setItems(organizationsArr);
		console.log(organizationsArr);
	};

	const updateOrganizations = async (value) => {
		let count = 0;
		for (let i = 0; i < organizationsArr.length; i++) {
			if (organizationsArr[i].value == value) {
				count += 1;
			}
		}
		console.log(count);
		if (count != 0) {
			const orgRef = doc(db, "Organizations", value);
			await setDoc(orgRef, {
				dropDown: [{ label: value, value: value }],
			});
			count = 0;
		};
	};

	const handleSignUp = () => {
		console.log("signup");
		const auth = getAuth();
		if (organization != "") {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					console.log(user.uid);
					uploadUserProfile(user);
					updateOrganizations(organization);
					sendEmailVerification(user).then(() => {
						updateProfile(user, {
							displayName: firstName + " " + lastName,
						}).catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							console.log(errorMessage);
						});
						Alert.alert(
							"User Registered",
							"Please verify your emai address!"
						);
					});

					// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorMessage);
					setErrorText(errorMessage);
					if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
						Alert.alert(
							"ERROR",
							"This email is already in use. Click 'ok' if wish to reset password.",
							[
								{
									text: "Cancel",
									onPress: () => {
										return;
									},
									style: "cancel",
								},
								{ text: "OK", onPress: () => resetPassword() },
							]
						);
					}

					// ..
				});
		} else {
			alert("need to choose an organization");
		}

		const uploadUserProfile = async (user) => {
			console.log(user.uid);
			const userRef = doc(db, "Users", user.uid);
			await setDoc(userRef, {
				firstName: firstName,
				lastName: lastName,
				email: email,
				isAdmin: isAdmin,
				uid: user.uid,
				emailVerified: user.emailVerified,
				organization: organization.split(" "),
			});
		};

		const resetPassword = () => {
			sendPasswordResetEmail(auth, email)
				.then(() => {
					// Password reset email sent!
					alert("Password reset email sent!");
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorMessage);
					// ..
				});
		};
	};

	return (
		<Box flex={1}>
			<Image
				flex={1}
				alt="Logo"
				resizeMode="cover"
				size="lg"
				w="full"
				source={require("../../assets/cover.png")}
			/>
			<ScrollView
				w="full"
				h="full"
				position="absolute"
				left="3"
				top="250"
				px="6"
				flex={1}
				contentContainerStyle={{
					justifyContent: "center",
					paddingBottom: 500,
				}}
			>
				<Heading
					style={{
						fontFamily: "Akronim-Regular",
						fontSize: 50,
						color: "#BD9E1E",
						paddingTop: 20,
						marginBottom: 5,
					}}
				>
					REGISTER
				</Heading>
				<VStack space={5} pt="6">
					{/* choose organization */}
					<DropDownPicker
						open={open}
						value={value}
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						searchable={true}
						multiple={false}
						listMode="SCROLLVIEW"
						maxHeight={200}
						searchTextInputProps={{
							maxLength: 25,
						}}
						addCustomItem={true}
						searchPlaceholder="Search or create a new organization"
						placeholder="Select an organization"
						searchContainerStyle={{
							borderBottomColor: Colors.gold,
						}}
						searchPlaceholderTextColor={Colors.lightGreen}
						searchTextInputStyle={{
							borderColor: Colors.white,
							fontSize: 14,
							color: Colors.lightGreen,
						}}
						placeholderStyle={{
							color: Colors.lightGreen,
						}}
						style={{
							borderColor: Colors.gold,
						}}
						containerStyle={{
							width: "85%",
							borderColor: Colors.gold,
						}}
						dropDownContainerStyle={{
							borderColor: Colors.gold,
						}}
						labelStyle={{
							color: "#4e954e",
							fontSize: "16",
						}}
						textStyle={{
							color: "#4e954e",
						}}
						onChangeValue={(value) => {
							setOrganization(value);
							console.log(value);
						}}
					/>

					{/* USERNAME */}
					<Input
						InputLeftElement={
							<Ionicons name="person-circle" size={28} color="#4e954e" />
						}
						variant="underlined"
						placeholder="First Name"
						w="85%"
						fontSize="16"
						color="#4e954e"
						placeholderTextColor={Colors.lightGreen}
						paddingLeft="3"
						borderBottomColor={Colors.gold}
						autoCapitalize="none"
						value={firstName}
						onChangeText={(text) => setFirstName(text)}
					/>
					<Input
						InputLeftElement={
							<Ionicons name="person-circle" size={28} color="#4e954e" />
						}
						variant="underlined"
						placeholder="Last Name"
						w="85%"
						fontSize="16"
						color="#4e954e"
						placeholderTextColor={Colors.lightGreen}
						paddingLeft="3"
						borderBottomColor={Colors.gold}
						autoCapitalize="none"
						value={lastName}
						onChangeText={(text) => setLastName(text)}
					/>

					{/* EMAIL */}
					<Input
						InputLeftElement={
							<MaterialIcons name="email" size={24} color="#4e954e" />
						}
						variant="underlined"
						placeholder="email"
						value={email}
						onChangeText={(text) => setEmail(text.toLocaleLowerCase())}
						w="85%"
						fontSize="16"
						color="#4e954e"
						placeholderTextColor={Colors.lightGreen}
						paddingLeft="3"
						borderBottomColor={Colors.gold}
						autoCapitalize="none"
					/>
					{/* PASSWORD */}
					<Input
						InputLeftElement={<Ionicons name="eye" size={24} color="#4e954e" />}
						variant="underlined"
						type="password"
						placeholder="password (at least 6 digits)"
						value={password}
						onChangeText={(text) => setPassword(text)}
						w="85%"
						fontSize="16"
						color="#4e954e"
						placeholderTextColor={Colors.lightGreen}
						paddingLeft="3"
						borderBottomColor={Colors.gold}
						autoCapitalize="none"
					/>
					<Text width="100%" color={Colors.red} top="-20">
						{errorText}
					</Text>
				</VStack>
				<Button
					_pressed={{
						bg: Colors.lightGold,
					}}
					marginTop={2}
					marginBottom={10}
					w="50%"
					rounded={50}
					bg={Colors.gold}
					size="md"
					onPress={() => handleSignUp()}
				>
					REGISTER AS USER
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
					onPress={() => setIsAdmin(true)}
				>
					REGISTER AS ADMIN
				</Button>

				<Button
					_pressed={{
						bg: Colors.lightGreen,
					}}
					w="50%"
					rounded={50}
					bg={Colors.darkGreen}
					size="md"
					onPress={() => navigation.navigate("Login")}
				>
					LOGIN
				</Button>
			</ScrollView>
		</Box>
	);
}

export default RegisterScreen;
