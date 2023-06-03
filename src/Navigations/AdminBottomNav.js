import { View, Text, ToastAndroid, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminHomeScreen from "../Screens/AdminEditScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import Colors from "../color";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Center } from "native-base";
//import CartScreen from "../Screens/CartScreen";
import AdminStackNav from "./AdminStackNav";
import AdminMenuScreen from "../Screens/AdminMenuScreen";
import AdminEditScreen from "../Screens/AdminEditScreen";

const Tab = createBottomTabNavigator();
// const CustomTab = ({ children, onPress }) => <Text>hh</Text>;
const AdminBottomNav = () => {
	
	return (
		<Tab.Navigator
			backBehavior="Main"
			initialRouteName="Main"
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: { ...styles.tabs },
				headerShown: false,
				tabBarHideOnKeyBoard: true,
			}}
		>
			

            {/* Profile */}
            <Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Center top={1}>
							{focused ? (
								<FontAwesome name="user-circle" size={24} color={Colors.black} />
							) : (
								<FontAwesome name="user-circle" size={24} color={Colors.deepestGray} />
							)}
						</Center>
					),
				}}
			/>

            {/* HomeScreen */}
            <Tab.Screen
				name="Main"
				component={AdminStackNav}
				options={{
					tabBarIcon: ({ focused }) => (
						<Center>
							{focused ? (
								<Entypo name="home" size={28} color={Colors.black} />
							) : (
								<Entypo name="home" size={28} color={Colors.deepestGray} />
							)}
						</Center>
					),
				}}
			/>

            {/* Saved */}
            <Tab.Screen
				name="AdminEdit"
				component={AdminEditScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<Center>
							{focused ? (
								<Ionicons name="menu" size={28} color={Colors.black} />
							) : (
								<Ionicons name="menu" size={28} color={Colors.deepestGray} />
							)}
						</Center>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	tabs: {
		elevation: 0,
		backgroundColor: Colors.white,
		height: 64,
        paddingTop: 8,
	},
});

export default AdminBottomNav;
