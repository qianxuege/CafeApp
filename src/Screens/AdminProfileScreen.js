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
	Circle,
} from "native-base";
import React, { useEffect, useState } from "react";
import ProfielTop from "../Components/ProfileTop";
import Colors from "../color";
import { Alert, RefreshControl, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { sendPasswordResetEmail, signOut, updatePassword } from "firebase/auth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import DropDownPicker from "react-native-dropdown-picker";
import {
	EmailAuthProvider,
	deleteUser,
	reauthenticateWithCredential,
} from "firebase/auth/react-native";

function AdminProfileScreen({ navigation, route }) {
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
	const organization = route.params.organization;
	//const navigation = useNavigation();

	//for the Dropdown Picker
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);
	const [newOrganization, setNewOrganization] = useState("");
	let organizationsArr = [];

	const [userProvidedPassword, setUserProvidedPassword] = useState("");

	<firebase />;

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setUserProvidedPassword("");
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

	const deleteAlert = () => {
		Alert.alert(
			"ALERT",
			"Deleted accounts cannot be recovered. Click 'OK' to reauthenticate and start delete.",
			[
				{
					text: "Cancel",
					onPress: () => {
						return;
					},
					style: "cancel",
				},
				{ text: "OK", onPress: () => setShowModal(true) },
			]
		);
	};

	const reauthenticate = async () => {
		const user = auth.currentUser;

		const credential = EmailAuthProvider.credential(
			auth.currentUser.email,
			userProvidedPassword
		);

		reauthenticateWithCredential(user, credential)
			.then(() => {
				// User re-authenticated.
				deleteAccount();
			})
			.catch((error) => {
				// An error ocurred
				console.log(error);
			});
	};

	const deleteAccount = async () => {
		const user = auth.currentUser;
		const docRef = doc(db, "Users", user.uid);
		const orgRef = doc(db, "Organizations", organization);
		await deleteDoc(docRef);
		console.log("delete1")
		await updateDoc(orgRef, {
			adminEmail: "",
		});
		console.log("delete2")
		deleteUser(user)
			.then(() => {
				// User deleted.
				console.log("delete3");
				setUserProvidedPassword("");
				alert("user deleted");
				navigation.navigate("Login");
			})
			.catch((error) => {
				// An error ocurred
				console.log(error);
			});
	};

	const getOrganizations = async () => {
		if (auth != null) {
			const userRef = doc(db, "Users", auth.currentUser.uid);
			const docSnap = await getDoc(userRef);
			const userOrg = docSnap.data().organization;
			setUserOrganization(userOrg.join(", ")); //this is the organization(s) that the user's account currently link to

			const orgRef = collection(db, "Organizations");
			const querySnapshot = await getDocs(orgRef);
			organizationsArr = querySnapshot.docs.map((doc) => doc.data().dropDown);
			setItems(organizationsArr); //returns an array of all available organizations for the user to choose from
			//console.log(organizationsArr);
		}
	};

	// const addOrganizations = async () => {
	// 	const userRef = doc(db, "Users", auth.currentUser.uid);
	// 	await updateDoc(userRef, {
	// 		organization: arrayUnion(newOrganization),
	// 	});
	// 	alert("updated organization");
	// 	setShowModal(false);
	// };

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
			{auth.currentUser == undefined? 
			(<Text>User deleted</Text> ): (
				<>
				<Box
				space={3}
				bg={Colors.lightGold}
				height={210}
				w="full"
				px={4}
				py={2}
				borderBottomColor={Colors.lightBlack}
				safeAreaTop
			>
				<Center>
					<Circle size="86px" bg={Colors.darkPink}>
						<Ionicons name="ios-person" size={36} color={Colors.white} />
					</Circle>
				</Center>

				<Center marginTop={0}>
					<Text fontFamily="Akronim-Regular" fontSize={36} color={Colors.white}>
						{auth.currentUser.displayName}
					</Text>
				</Center>
			</Box>
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
						<Modal.Header>Reauthenticate</Modal.Header>
						<Modal.Body height="200px">
							Enter your password to delete your account.
							<FormControl mt="3">
								<FormControl.Label>Password</FormControl.Label>
								<Input
									_focus={{
										backgroundColor: Colors.white,
										color: Colors.darkGreen,
										borderColor: Colors.gold,
									}}
									value={userProvidedPassword}
									onChangeText={(text) => setUserProvidedPassword(text)}
								/>
							</FormControl>
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
										setShowModal(false);
										reauthenticate();
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
							onPress={() => deleteAlert()}
						>
							Delete Account
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
			</>
			
			)
		}
			
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
export default AdminProfileScreen;
