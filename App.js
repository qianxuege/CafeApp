import { useEffect, useCallback } from 'react';
import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider, Text } from "native-base";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AppLoading } from 'expo';
import Fonts from './assets/Fonts/Fonts';
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import NotVerifyScreen from "./src/Screens/NotVerifyScreen";


function App() {
  

	return (
		<NativeBaseProvider>
			<RegisterScreen />
		</NativeBaseProvider>
	);
}

export default App;
