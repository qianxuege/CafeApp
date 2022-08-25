import { useEffect, useCallback, useState, React } from 'react';
import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider, Text } from "native-base";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AppLoading } from 'expo';
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import NotVerifyScreen from "./src/Screens/NotVerifyScreen";


function App() {
  const [fontsLoaded] = useFonts ({
    'Akronim-Regular': require('./assets/Fonts/Akronim-Regular.ttf'),
    'AmaticSC-Regular': require('./assets/Fonts/AmaticSC-Regular.ttf'),
    'AmaticSC-Bold': require('./assets/Fonts/AmaticSC-Bold.ttf'),
    'Bitter-Italic': require('./assets/Fonts/Bitter-Italic-VariableFont_wght.ttf'),
    'Bitter-Regular': require('./assets/Fonts/Bitter-VariableFont_wght.ttf'),
    'Caladea-Bold': require('./assets/Fonts/Caladea-Bold.ttf'),
    'Caladea-BoldItalic': require('./assets/Fonts/Caladea-BoldItalic.ttf'),
    'Caladea-Italic': require('./assets/Fonts/Caladea-Italic.ttf'),
    'Caladea-Regular': require('./assets/Fonts/Caladea-Regular.ttf'),
    'Caveat-Regular': require('./assets/Fonts/Caveat-VariableFont_wght.ttf'),
    
  });
  


	return (
		<NativeBaseProvider>
			<RegisterScreen />
		</NativeBaseProvider>
	);
}

export default App;
