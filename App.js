import { useEffect, useCallback, useState, React } from 'react';
import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider, Text, Image } from "native-base";
import { useFonts } from 'expo-font';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import { AppLoading } from 'expo';
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import NotVerifyScreen from "./src/Screens/NotVerifyScreen";
import HomeScreen from './src/Screens/HomeScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SingleProductScreen from './src/Screens/SingleProductScreen';
import NavBar from './src/Components/NavBar';




function App() {
  const [fontsLoaded] = useFonts ({
    'Akronim-Regular': require('./assets/Fonts/Akronim-Regular.ttf'),
    'Bitter-Bold': require("./assets/Fonts/Bitter-Bold.ttf"),
    'Bitter-Regular': require("./assets/Fonts/Bitter-Regular.ttf"),
    'AmaticSC-Bold': require("./assets/Fonts/AmaticSC-Bold.ttf"),
    "Caveat-SemiBold": require("./assets/Fonts/Caveat-SemiBold.ttf")
  });
    
  
  
	return (
		<NativeBaseProvider>
      <NavBar />
			<SingleProductScreen />
		</NativeBaseProvider>
	);
}

export default App;