import React, { useState, useEffect } from "react";
import {
	Image,
	View,
	Platform,
	Text,
	TextInput,
	StyleSheet,
	RefreshControl,
	TouchableOpacity,
	Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Input, ScrollView, Box } from "native-base";
import Colors from "../color";
import { useFonts } from "expo-font";
import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
	getMetadata,
} from "firebase/storage";
import uuid from "react-native-uuid";
import "firebase/storage";
import {
	doc,
	getDoc,
	setDoc,
	query,
	where,
	collection,
	getDocs,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import LocationPicker from "../Components/LocationPicker";
import { foodLocation } from "../Components/LocationPicker";
import AdminMenuScreen from "./AdminMenuScreen";
import AdminTop from "../Components/AdminTop";
//import { getAuth } from "firebase/auth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const AdminEditScreen = ({ route }) => {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"Caladea-BoldItalic": require("../../assets/Fonts/Caladea-BoldItalic.ttf"),
	});
	const [image, setImage] = useState(null);
	const [foodname, setFoodname] = useState("");
	const [tags, setTags] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [price, setPrice] = useState("");
	const [calories, setCalories] = useState("");
	const [imagesrc, setImagesrc] = useState("");
	const [uniqueId, setUniqueId] = useState("");
	//const [organization, setOrganization] = useState("");
	//let imagesrc = "";
	const navigation = useNavigation();
	const organization = route.params.organization;
	//console.log(organization);

	//for Location Picker
	const [open, setOpen] = useState(false);
	const [location, setLocation] = useState(null);
	const [items, setItems] = useState([
		{ label: "Grill station", value: "grill station" },
		{ label: "Sandwich station", value: "sandwich station" },
		{ label: "Hot meal", value: "hot meal" },
		{ label: "Salad station", value: "salad station" },
		{ label: "Snack Shack", value: "snack shack" },
		{ label: "N/A", value: "N/A" },
	]);

	//const [filename, setFilename] = useState("");
	const [btn, setBtn] = useState(false);
	const [refreshing, setRefreshing] = React.useState(false);
	const [uploading, setUploading] = useState(false);
	const [transferred, setTransferred] = useState(0);

	useEffect(() => {
		//console.log(imagesrc);
		//console.log(uniqueId);
		if (uniqueId != "" && imagesrc != "") {
			const updateImagesrc = updateDoc(
				doc(db, "Organizations", organization, "foodItems", uniqueId),
				{
					image: imagesrc,
				}
			);
		}
	}, [imagesrc]); // will upload imagesrc once uniqueId and imagesrc are loaded

	// Get a reference to the storage service, which is used to create references in the storage bucket
	const storage = getStorage();

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		//console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const reset = async () => {
		setFoodname("");
		setCalories("");
		setIngredients("");
		setTags("");
		setPrice("");
		setLocation("");
		setImagesrc("");
		setUniqueId("");
		setImage("https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png");
	};

	const checkDuplicates = async () => {
		if (
			foodname == "" ||
			image == null ||
			image ==
				"https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png" ||
			calories == "" ||
			ingredients == "" ||
			tags == "" ||
			price == "" ||
			location == ""
		) {
			alert(
				'Please fill out all required fields. Fill in "N/A" if not applicable.'
			);
			return;
		}

		let nameArr = foodname.split(" ");
		for (let i = 0; i < nameArr.length; i++) {
			nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1);
		}
		let newFoodName = nameArr.join(" "); //returns capitalized food name
		let uri = image;
		const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
		//let imageEnding = uploadUri.substring(uploadUri.lastIndexOf("."));
		let fname = foodname.toLocaleLowerCase().replace(/\s/g, "_"); // fname = foodname with no spaces
		let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1); //this is the filename for the image
		//let filename = fname.concat(imageEnding);

		const foodRef = collection(db, "Organizations", organization, "foodItems");

		try {
			const q = query(foodRef, where("name", "==", newFoodName));
			//console.log(newFoodName);
			const querySnapshot = await getDocs(q);
			//console.log(querySnapshot.docs.length);

			if (querySnapshot.docs.length != 0) {
				Alert.alert(
					"ERROR",
					"The entered food name exists in the database. Click 'ok' if wish to proceed.",
					[
						{
							text: "Cancel",
							onPress: () => {
								return;
							},
							style: "cancel",
						},
						{ text: "OK", onPress: () => uploadImage() },
					]
				);
			} else {
				uploadImage();
			}

			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
			});
		} catch (error) {
			console.log(error);
		}
	};

	const uploadImage = async () => {
		let nameArr = foodname.split(" ");
		for (let i = 0; i < nameArr.length; i++) {
			nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1);
		}
		let newFoodName = nameArr.join(" ");
		//console.log(newFoodName);
		//newFoodName = foodname but with first letter of each word capitalized
		let uri = image;
		const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
		//let imageEnding = uploadUri.substring(uploadUri.lastIndexOf("."));
		let fname = foodname.toLocaleLowerCase().replace(/\s/g, "_"); // fname = foodname with no spaces
		//let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
		//let filename = fname.concat(imageEnding);
		let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1); //this is the filename for the image
		let foodid = uuid.v4();
		setUniqueId(foodid);
		//console.log(uniqueId);
		//setUuid(uniqueId);

		//setFilename(fname.concat(imageEnding)); uncomment if want to make it global

		const metadata = {
			foodName: newFoodName,
		};

		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", uri, true);
			xhr.send(null);
		});

		const getImage = () => {
			getDownloadURL(ref(storage, "Organizations/" + organization + "/images/" + filename))
				.then((url) => {
					//imagesrc = url.toString();
					setImagesrc(url);
					//console.log(imagesrc);
				})
				.catch((error) => {
					// Handle any errors
					console.log(error);
				});
		};

		const uploadData = async () => {
			setUploading(true);

			try {
				const storageRef = ref(storage, "Organizations/" + organization + "/images/" + filename);
				const result = await uploadBytes(storageRef, blob, metadata);

				//console.log(metadata);

				// We're done with the blob, close and release it
				//console.log(blob);
				blob.close();

				getMetadata(storageRef)
					.then((Metadata) => {
						// Metadata now contains the metadata for 'images/forest.jpg'
						console.log(Metadata);
					})
					.catch((error) => {
						// Uh-oh, an error occurred!
						console.log(error);
					});

				//console.log(uuid);

				const docRef = doc(db, "Organizations", organization, "foodItems", foodid);

				// Add a new document in collection "cities"
				await setDoc(docRef, {
					name: newFoodName,
					price: price,
					tags: tags.toLowerCase().split(", "),
					ingredients: ingredients.toLowerCase().split(", "),
					calories: calories,
					location: location.split(" "),
					lowercaseName: newFoodName.toLowerCase().split(" "),
					imageFileName: filename,
				});

				getImage();
				//console.log(imagesrc);

				//console.log(imagesrc);

				// const updateImagesrc = await updateDoc(docRef, {
				// 	image: imagesrc,
				// })

				const updateTimestamp = await updateDoc(docRef, {
					timestamp: serverTimestamp(),
				});

				//const docRef = doc(db, "foodItems", uniqueId);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					console.log("Document data:", docSnap.data());
				} else {
					// docSnap.data() will be undefined in this case
					console.log("No such document!");
				}

				setUploading(false);

				Alert.alert(
					"Uploaded!",
					"This food item has been uploaded to the Firebase Cloud Storage successfully!"
				);

				return await reset();
			} catch (e) {
				console.log(e);
			}

			setImage(null);
		};
		await uploadData();
	};

	return (
		<>
			<AdminTop />
			<ScrollView
				top={0}
				margin="auto"
				width="100%"
				bg={Colors.white}
				contentContainerStyle={{ alignItems: "center", paddingBottom: 500 }}
				showsVerticalScrollIndicator={false}
			>
				<Spinner visible={uploading} />
				<TouchableOpacity onPress={pickImage}>
					{image != null ? (
						<Image
							source={{ uri: image }}
							style={{ width: 200, height: 200, margin: 15 }}
						/>
					) : (
						<Image
							source={{
								uri: "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png",
							}}
							style={{ width: 200, height: 200 }}
						/>
					)}
				</TouchableOpacity>
				<Input
					variant="filled"
					placeholder="Enter Food Name"
					value={foodname}
					onChangeText={(text) => setFoodname(text)}
					w="92%"
					fontSize="16"
					fontFamily="Bitter-Regular"
					color={Colors.darkPink}
					placeholderTextColor={Colors.gray}
					paddingLeft="3"
					marginY={2}
					borderColor={Colors.morandiPink}
					backgroundColor={Colors.morandiPink}
					_focus={{ bg: Colors.morandiPink }}
					autoCapitalize="none"
				/>
				<Input
					variant="filled"
					placeholder="Enter Price"
					value={price}
					onChangeText={(text) => setPrice(text)}
					w="92%"
					fontSize="16"
					fontFamily="Bitter-Regular"
					color={Colors.darkPink}
					placeholderTextColor={Colors.gray}
					paddingLeft="3"
					marginY={2}
					borderColor={Colors.morandiPink}
					backgroundColor={Colors.morandiPink}
					_focus={{ bg: Colors.morandiPink }}
					keyboardType="numeric"
				/>
				<Input
					variant="filled"
					placeholder="Enter Tags: breakfast, sweet, etc ..."
					value={tags}
					onChangeText={(text) => setTags(text)}
					w="92%"
					fontSize="16"
					fontFamily="Bitter-Regular"
					color={Colors.darkPink}
					placeholderTextColor={Colors.gray}
					paddingLeft="3"
					marginY={2}
					borderColor={Colors.morandiPink}
					backgroundColor={Colors.morandiPink}
					_focus={{ bg: Colors.morandiPink }}
					autoCapitalize="none"
				/>
				<Input
					variant="filled"
					placeholder="Enter Ingredients"
					value={ingredients}
					onChangeText={(text) => setIngredients(text)}
					w="92%"
					fontSize="16"
					fontFamily="Bitter-Regular"
					color={Colors.darkPink}
					placeholderTextColor={Colors.gray}
					paddingLeft="3"
					marginY={2}
					borderColor={Colors.morandiPink}
					backgroundColor={Colors.morandiPink}
					_focus={{ bg: Colors.morandiPink }}
					autoCapitalize="none"
				/>
				<Input
					variant="filled"
					placeholder="Enter Estimated Calories"
					value={calories}
					onChangeText={(text) => setCalories(text)}
					w="92%"
					fontSize="16"
					fontFamily="Bitter-Regular"
					color={Colors.darkPink}
					placeholderTextColor={Colors.gray}
					paddingLeft="3"
					marginY={2}
					borderColor={Colors.morandiPink}
					backgroundColor={Colors.morandiPink}
					_focus={{ bg: Colors.morandiPink }}
					keyboardType="numeric"
				/>
				<Box width="92%" margin={2}>
					<DropDownPicker
						open={open}
						value={location}
						items={items}
						setOpen={setOpen}
						setValue={setLocation}
						setItems={setItems}
						theme="LIGHT"
						multiple={false}
						listMode="SCROLLVIEW"
						mode="BADGE"
						badgeDotColors={[
							"#ffd700",
							"#90ee90",
							"#800000",
							"#006400",
							"#ffc0cb",
						]}
						maxHeight={200}
						dropDownDirection="TOP"
						style={{
							borderColor: Colors.morandiPink,
							backgroundColor: Colors.morandiPink,
						}}
						dropDownContainerStyle={{
							backgroundColor: Colors.morandiPink,
							borderColor: Colors.morandiPink,
						}}
						textStyle={{
							fontSize: 16,
							fontFamily: "Bitter-Regular",
							color: Colors.gray,
						}}
						labelStyle={{
							color: Colors.darkPink,
							backgroundColor: Colors.morandiPink,
						}}
						placeholder="Select a location"
					/>
				</Box>

				<Button
					_pressed={{
						bg: Colors.lightGreen,
					}}
					marginTop={10}
					w="80%"
					rounded={50}
					bg={Colors.morandiGreen}
					size="md"
					onPress={() => {
						checkDuplicates();
					}}
				>
					Add Food Item
				</Button>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});

export default AdminEditScreen;
