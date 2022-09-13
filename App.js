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



/*function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
} */


  function cacheImages(images) {
    return images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }
  
  function cacheFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
  }
  
  function App() {
    const [appIsReady, setAppIsReady] = useState(false);
  
    // Load any resources or data that you need prior to rendering the app
    useEffect(() => {
      async function loadResourcesAndDataAsync() {
        try {
          SplashScreen.preventAutoHideAsync();
  
          const imageAssets = cacheImages([
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
            require("./assets/images/AcaiBowl.jpeg"),
          ]);
  
          const fontAssets = cacheFonts([FontAwesome.font]);
  
          await Promise.all([...imageAssets, ...fontAssets]);
        } catch (e) {
          // You might want to provide this error information to an error reporting service
          console.warn(e);
        } finally {
          setAppIsReady(true);
          SplashScreen.hideAsync();
        }
      }
  
      loadResourcesAndDataAsync();
    }, []);
  
    if (!appIsReady) {
      return null;
    }
  
  


	return (
		<NativeBaseProvider>
			<HomeScreen />
		</NativeBaseProvider>
	);
}

export default App;