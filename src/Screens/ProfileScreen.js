import {
	Box,
	Button,
	Center,
	FormControl,
	Input,
	KeyboardAvoidingView,
	Modal,
	NativeBaseProvider,
	ScrollView,
	Text,
	View,
	VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import ProfielTop from "../Components/ProfileTop";
import Colors from "../color";
import { RefreshControl, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import {
	sendPasswordResetEmail,
	signOut,
	updatePassword,
} from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db, auth} from "../../firebase";
import DropDownPicker from "react-native-dropdown-picker";

const Inputs = [
	{
		label: "USERNAME",
		type: "text",
	},
	{
		label: "EMAIL",
		type: "text",
	},
	{
		label: "NEW PASSWORD",
		type: "password",
	},
	{
		label: "CONFIRM PASSWORD",
		type: "password",
	},
];

function ProfileScreen({ navigation }) {
	const [fontsLoaded] = useFonts({
		"AmaticSC-Bold": require("../../assets/Fonts/AmaticSC-Bold.ttf"),
		"Bitter-Bold": require("../../assets/Fonts/Bitter-Bold.ttf"),
		"Bitter-Regular": require("../../assets/Fonts/Bitter-Regular.ttf"),
		"Caladea-Regular": require("../../assets/Fonts/Caladea-Regular.ttf"),
	});

	const [refreshing, setRefreshing] = React.useState(false);
	const [showModal, setShowModal] = useState(false);

	const [newPassword, setNewPassword] = useState("");
	const [message, setMessage] = useState("");
	const [userOrganization, setUserOrganization] = useState();

	//for the Dropdown Picker
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);
	const [newOrganization, setNewOrganization] = useState("");
	let organizationsArr = [];

	<firebase />;

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		getOrganizations();
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	}, []);

	useEffect(() => {
		getOrganizations();
	}, [userOrganization]);

	useFocusEffect(
		React.useCallback(() => {
			onRefresh();
			// setNewPassword("");
			// setMessage("");
		}, [])
	);

	//const auth = getAuth();

	// function changePassword() {
	// 	const user = auth.currentUser;
	// 	console.log(newPassword);
	// 	updatePassword(user, newPassword)
	// 		.then(() => {
	// 			// Update successful.
	// 			setMessage(`Update successful. New password is ${newPassword}`);
	// 			//console.log(message);
	// 		})
	// 		.catch((error) => {
	// 			// An error ocurred
	// 			//need to check if the two passwords are the same
	// 			setMessage(`You have an error: ${error.code}`);
	// 			//console.log(message);
	// 		});
	// }

	const resetPassword = () => {
		sendPasswordResetEmail(auth, auth.currentUser.email)
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

	const getOrganizations = async () => {
		const userRef = doc(db, "Users", auth.currentUser.uid);
		const docSnap = await getDoc(userRef);
		const userOrg = docSnap.data().organization;
		setUserOrganization(userOrg.join(", ")); //this is the organization(s) that the user's account currently link to

		const orgRef = collection(db, "Organizations");
		const querySnapshot = await getDocs(orgRef);
		organizationsArr = querySnapshot.docs.map((doc) => doc.data().dropDown);
		setItems(organizationsArr); //returns an array of all available organizations for the user to choose from
		console.log(organizationsArr);
	};

	const addOrganizations = async () => {
		const userRef = doc(db, "Users", auth.currentUser.uid);
		await updateDoc(userRef, {
			organization: arrayUnion(newOrganization),
		});
		alert("updated organization");
		setShowModal(false);
	};

	function logOut() {
		//console.log("logout");

		//console.log(auth.currentUser);
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				navigation.navigate("Login");
			})
			.catch((error) => {
				// An error happened.
				console.log(error.code);
			});
	}

	if (!fontsLoaded) {
		return null;
	}
	return (
		<NativeBaseProvider>
			<ProfielTop />
			<ScrollView
				backgroundColor={Colors.morandiGreen}
				contentContainerStyle={{ flexGrow: 1 }}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
					<Modal.Content maxWidth="400px" maxHeight="400px">
						<Modal.CloseButton />
						<Modal.Header>Add Organization</Modal.Header>
						<Modal.Body height="400px">

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
								addCustomItem={false}
								searchPlaceholder="Search for an organization"
								placeholder="Add an organization"
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
									setNewOrganization(value);
									//console.log(value);
								}}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button.Group space={2}>
								<Button
									variant="ghost"
									colorScheme="blueGray"
									onPress={() => {
										setShowModal(false);
									}}
								>
									Cancel
								</Button>
								<Button
									onPress={() => {
										addOrganizations();
									}}
								>
									Confirm
								</Button>
							</Button.Group>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
				<VStack space={6} mt={5} pb={10} marginLeft="1%" alignItems="center">
					<Box width="90%">
						<Text style={styles.label}>USERNAME</Text>
						<Text style={styles.userInfo}>{auth.currentUser.displayName}</Text>
					</Box>
					<Box width="90%">
						<Text style={styles.label}>EMAIL</Text>
						<Text style={styles.userInfo}>{auth.currentUser.email}</Text>
					</Box>
					<Box width="90%">
						<Text style={styles.label}>ORGANIZATIONS</Text>
						<Text style={styles.userInfo}>{userOrganization}</Text>
					</Box>

					<Box height="10"></Box>

					{/* {Inputs.map((i, index) => (
						<FormControl key={index}>
							<FormControl.Label
								_text={{
									fontSize: "16px",
									fontWeight: "bold",
									fontFamily: "Bitter-Bold",
									color: Colors.deepestGray,
								}}
							>
								{i.label}
							</FormControl.Label>
								<Input
									style={styles.input}
									type={i.type}
									width="95%"
									_focus={{
										borderBottomColor: Colors.darkestGreen,
										borderWidth: 1,
									}}
									autoCapitalize="none"
									onChangeText={(text) => {
										i.type=="password"? setNewPassword(text) : null
									}}
								/>
						</FormControl>
					))} */}

					<Box alignItems="center" width="80" left={-2}>
						<Button
							width="100%"
							height={55}
							rounded="full"
							bg={Colors.lightGold}
							_text={{
								color: Colors.white,
								fontWeight: "bold",
								fontSize: 16,
								fontFamily: "Bitter-Regular",
							}}
							_pressed={{ bg: Colors.deepGold }}
							marginBottom={6}
							onPress={()=> setShowModal(true)}
						>
							Add Organization
						</Button>
						<Button
							width="100%"
							height={55}
							rounded="full"
							bg={Colors.lightGold}
							_text={{
								color: Colors.white,
								fontWeight: "bold",
								fontSize: 16,
								fontFamily: "Bitter-Regular",
							}}
							_pressed={{ bg: Colors.deepGold }}
							marginBottom={3}
							onPress={() => resetPassword()}
						>
							Reset Password
						</Button>
						<Text>{message}</Text>
						<Text style={styles.or} marginBottom={3}>
							OR
						</Text>
						<Button
							width="100%"
							height={55}
							rounded="full"
							bg={Colors.darkGreen}
							_text={{
								color: Colors.white,
								fontWeight: "bold",
								fontSize: 16,
								fontFamily: "Bitter-Regular",
							}}
							_pressed={{ bg: Colors.lightGreen }}
							marginBottom={20}
							onPress={() => logOut()}
						>
							LOG OUT
						</Button>
					</Box>
				</VStack>
			</ScrollView>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: "100%",
		paddingHorizontal: 10,
		paddingBottom: 100,
		backgroundColor: Colors.morandiGreen,
	},
	or: {
		fontFamily: "Bitter-Regular",
		fontSize: 16,
		color: Colors.white,
	},
	input: {
		borderWidth: 0,
		backgroundColor: Colors.gray,
		paddingVertical: 4,
		color: Colors.gold,
		fontSize: 20,
		fontFamily: "Caladea-Regular",
	},
	label: {
		fontSize: "16px",
		fontWeight: "bold",
		fontFamily: "Bitter-Bold",
		color: Colors.deepestGray,
		marginBottom: 3,
	},
	userInfo: {
		backgroundColor: Colors.gray,
		padding: 10,
		backgroundColor: Colors.gray,
		color: Colors.darkGreen,
		fontSize: 20,
		fontFamily: "Caladea-Regular",
	},
});
export default ProfileScreen;
