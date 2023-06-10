import {
	Box,
	Image,
	Heading,
	Text,
	VStack,
	Input,
	Button,
	Alert,
	ScrollView,
} from "native-base";
import React, { useState, useEffect } from "react";
import { RefreshControl, TouchableOpacity, Pressable } from "react-native";
import Colors from "../color";
import { useFonts } from "expo-font";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import {
	AuthErrorCodes,
	getAuth,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";
import firebase, { db } from "../../firebase";
import { Auth } from "firebase/auth";
import StackNav from "../Navigations/StackNav";
import { useFocusEffect } from "@react-navigation/native";
import { UserInfo } from "firebase-admin/lib/auth/user-record";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";

function LoginScreen({ navigation }) {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
	});

	<firebase />;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorText, setErrorText] = useState("");
	const [refreshing, setRefreshing] = React.useState(false);

	//dropdownpicker
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);
	const [organization, setOrganization] = useState("");
	let organizationsArr = [];

	const auth = getAuth();

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		reset();
		getOrganizations();
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	}, []);

	useEffect(() => {
		getOrganizations();
	}, [organization]);

	const getOrganizations = async () => {
		const orgRef = collection(db, "Organizations");
		const querySnapshot = await getDocs(orgRef);
		// for (let i=0; i<querySnapshot.size; i++) {
		// 	organizations.push(querySnapshot.docs[i].id)
		// }
		organizationsArr = querySnapshot.docs.map((doc) => doc.data().dropDown);
		setItems(organizationsArr);
		console.log(organizationsArr);
	};

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 	 onRefresh();
	// 	}, [])
	//   );

	const reset = () => {
		setEmail("");
		setPassword("");
		setErrorText("");
		setValue(null);
	};

	const checkUserOrg = async (user) => {
		const userRef = doc(db, "Users", user.uid);
		const docSnap = await getDoc(userRef);
		const userOrg = docSnap.data().organization;
		const isAdmin = docSnap.data().isAdmin;

		//update emailVerified
		await updateDoc(userRef, {
			emailVerified: true,
		});

		//console.log(userOrg);

		for (let i = 0; i < userOrg.length; i++) {
			if (userOrg[i] == organization) {
				reset();
				console.log("account is linked with organization");
				if (isAdmin == true) {
					navigation.navigate("AdminBottom", { organization: organization });
				} else {
					navigation.navigate("Bottom", {
						screen: "Main",
						params: {
							screen: "Home",
							params: { organization: organization },
						},
					});
				}
				return;
			}
		}

		//this should not run if the user is able to log in
		alert(
			"Your account is not linked with this organization. Add this organization on your profile screen."
		);
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
				setErrorText(errorMessage);
				//console.log(errorMessage);
				// ..
			});
	};

	function logIn() {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;

				if (user.emailVerified == true) {
					//console.log(user.displayName);
					checkUserOrg(user);
				} else {
					sendEmailVerification(user)
						//.then(() => {})
						.catch((error) => {
							const errorMessage = `Error: ${error.code}`;
							setErrorText(errorMessage);
						});
					alert(
						"Email not verified. Please check your email for verification link!"
					);
				}

				// ...
			})
			.catch(function (error) {
				const errorMessage = `Error: ${error.code}`;
				setErrorText(errorMessage);
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
			<ScrollView
				w="full"
				h="full"
				position="absolute"
				left="3"
				top="180"
				px="6"
				contentContainerStyle={{
					justifyContent: "center",
					paddingBottom: 300,
				}}
				flex={1}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<Heading
					style={{
						fontFamily: "Akronim-Regular",
						fontSize: 46,
						color: "#BD9E1E",
						paddingTop: 100,
						marginBottom: 10,
					}}
				>
					LOGIN
				</Heading>
				<VStack space={5} pt="6">
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
						itemKey="label"
						//addCustomItem={true}
						searchPlaceholder="Search for an organization"
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
						placeholder="*********"
						value={password}
						onChangeText={(text) => setPassword(text)}
						w="85%"
						fontSize="16"
						color="#4e954e"
						placeholderTextColor={Colors.lightGreen}
						paddingLeft="3"
						borderBottomColor={Colors.gold}
						secureTextEntry
						autoCapitalize="none"
					/>
					<Pressable
						backgroundColor={Colors.darkGreen}
						style={({ pressed }) => [
							{
								width: "90%",
								backgroundColor: pressed ? Colors.lightBlack : Colors.white,
							},
						]}
						onPress={() => {
							resetPassword();
						}}
					>
						<Text color={Colors.deepGray} padding={2}>
							Forget password?
						</Text>
					</Pressable>
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
						onPress={() => logIn()}
					>
						LOGIN
					</Button>
					<Text width="100%" color={Colors.red} top="-20">
						{errorText}
					</Text>
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
			</ScrollView>
		</Box>
	);
}

export default LoginScreen;
