import {
	Box,
	Button,
	Center,
	FormControl,
	Input,
	KeyboardAvoidingView,
	NativeBaseProvider,
	ScrollView,
	Text,
	View,
	VStack,
} from "native-base";
import React from "react";
import ProfielTop from "../Components/ProfileTop";
import Colors from "../color";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

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

function ProfileScreen({navigation}) {
	const [fontsLoaded] = useFonts({
		"AmaticSC-Bold": require("../../assets/Fonts/AmaticSC-Bold.ttf"),
		"Bitter-Bold": require("../../assets/Fonts/Bitter-Bold.ttf"),
		"Bitter-Regular": require("../../assets/Fonts/Bitter-Regular.ttf"),
		"Caladea-Regular": require("../../assets/Fonts/Caladea-Regular.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}
	return (
		<NativeBaseProvider>
			<ProfielTop />
			<ScrollView
				backgroundColor={Colors.morandiGreen}
				contentContainerStyle={{ flexGrow: 1 }}
				paddingLeft={3}
			>
				<VStack space={10} mt={5} pb={10} marginLeft="2%" alignItems="center">
					{Inputs.map((i, index) => (
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
								/>
						</FormControl>
					))}
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
							marginBottom={3}
						>
							Confirm Changes
						</Button>
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
							onPress={() => navigation.navigate("Login")}
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
});
export default ProfileScreen;
