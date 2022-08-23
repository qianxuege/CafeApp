import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider, Text } from "native-base";
import HomeScreen from "./src/Screens/HomeScreen";

export default function App() {
	return (
		<NativeBaseProvider>
			<HomeScreen />
		</NativeBaseProvider>
	);
}
