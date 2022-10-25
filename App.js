import { useEffect, useCallback, useState, React } from "react";
import { Box, NativeBaseProvider, StatusBar, Text, Image } from "native-base";
import { useFonts } from "expo-font";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import NotVerifyScreen from "./src/Screens/NotVerifyScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SingleProductScreen from "./src/Screens/SingleProductScreen";
import NavBarMenu from "./src/Components/NavBarMenu";
import NavBarCart from "./src/Components/NavBarCart";
import CartScreen from "./src/Screens/CartScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNav from "./src/Navigations/BottomNav";
//import { firebase } from "./firebase";
//import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
require('firebase/compat/auth');
//import { auth } from "firebase/app";


const Stack = createNativeStackNavigator();

function App() {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("./assets/Fonts/Akronim-Regular.ttf"),
		"Bitter-Bold": require("./assets/Fonts/Bitter-Bold.ttf"),
		"Bitter-Regular": require("./assets/Fonts/Bitter-Regular.ttf"),
		"AmaticSC-Bold": require("./assets/Fonts/AmaticSC-Bold.ttf"),
		"Caveat-SemiBold": require("./assets/Fonts/Caveat-SemiBold.ttf"),
	});
	if (!fontsLoaded) {
		return null;
	}

	// const [initializing, setInitializing] = useState(true);
	// const [user, setUser] = useState();

	// //Handle user state changes
	// function onAuthStateChanged(user) {
	// 	setUser(user);
	// 	if (initializing) {
  //     setInitializing(false);
  //   } 
	// }

	// useEffect(() => {
	// 	const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
	// 	return subscriber;
	// }, []);

	// if (initializing) return null;

  // if (!user) {
  //   return (
      
  //   )
  // }

	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<StatusBar />
				<Stack.Navigator
					initialRouteName="Login"
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Saved" component={CartScreen} />
					<Stack.Screen name="Register" component={RegisterScreen} />
					<Stack.Screen name="Single" component={SingleProductScreen} />
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Bottom" component={BottomNav} />
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}

export default App;
