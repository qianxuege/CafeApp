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
import { Alert, RefreshControl } from "react-native";

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
	const auth = getAuth();

	//for the Dropdown Picker
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);
	const [organization, setOrganization] = useState("");
	let dropDownArr = []; //map of items
	let organizationsArr = []; //the value of items
	let count = 0;

	//refresh
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		reset();
		getOrganizations();
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	}, []);

	 useEffect(() => {
		// getOrganizations();
		if (isAdmin == true) {
			handleSignUp();
		}
	 }, [isAdmin]);

	useFocusEffect(
		React.useCallback(() => {
			setOrganization("");
			setIsAdmin(false);
		}, [])
	);

	<firebase />;

	const reset = () => {
		setEmail("");
		setPassword("");
		setFirstName("");
		setLastName("");
		setIsAdmin(false);
		setErrorText("");
		setValue("");
		setItems([]);
		count = 0;
	};

	const getOrganizations = async () => {
		const orgRef = collection(db, "Organizations");
		const querySnapshot = await getDocs(orgRef);
		// for (let i=0; i<querySnapshot.size; i++) {
		// 	organizations.push(querySnapshot.docs[i].id)
		// }
		//returns an array of all available organizations for the user to choose from
		dropDownArr = querySnapshot.docs.map((doc) => doc.data().dropDown);
		setItems(dropDownArr);
		console.log(dropDownArr);
	};

	const checkOrganizations = async (org) => {

		console.log(count);
		console.log(dropDownArr);

		if (items != []) {
			for (let i = 0; i < dropDownArr.length; i++) {
				if (dropDownArr[i].value == org) {
					count += 1;
				}
			}

			console.log(count);
			console.log(isAdmin);
			//console.log(organizationsArr);
			if (count == 0) {
				//if this organization is new
				if (isAdmin == true) {
					//if it is a new organization and isAdmin is true, update organizations collection
					console.log(org);
					//Proceed with creating the user
					createUser();
					const orgRef = doc(db, "Organizations", org);
					await setDoc(orgRef, {
						dropDown: { label: org, value: org },
						adminEmail: email.split(" "), //transforms string to an array and sets this email as the first admin email
					});
					count = 0;
					console.log("organization updated");
					onRefresh();
					
					
				} else {
					// if isAdmin is false but wants to create a new organization
					alert(
						"You can only create a new organization if you register as an admin"
					);
					//will not create a new user
				}
			} else {
				//if this is an existing organization
				if (isAdmin == true) {
					// you cannot register as admin if there is already an admin
					alert(
						"This organization already exists, there can only be one admin at this time. Please ask the current admin for access."
					);
					count = 0;
				} else {
					//if isAdmin is false
					//proceed to creating the user as a regular user
					createUser();
					count = 0;
					onRefresh();
				}
			}
		}
	};

	const createUser = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user.uid);
				//if create a new organization, will add it to the Organizations collection
				uploadUserProfile(user);
				sendEmailVerification(user).then(() => {
					updateProfile(user, {
						displayName: firstName + " " + lastName,
					}).catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(errorMessage);
					});
					Alert.alert("User Registered", "Please verify your email address!");
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

	const handleSignUp = () => {
		console.log("signup");

		if (
			organization == "" ||
			firstName == "" ||
			lastName == "" ||
			email == "" ||
			password == ""
		) {
			alert("Please fill out all required fields!");
			return;
		}

		if (organization != "") {
			checkOrganizations(organization);
			//console.log(organization); // if organization is checked, will proceed with creating the user
		} else {
			alert("need to choose an organization");
		}
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
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
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
							paddingBottom: 20,
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
							//console.log(value);
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
					onPress={() => {
						setIsAdmin(true);
					}}
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
