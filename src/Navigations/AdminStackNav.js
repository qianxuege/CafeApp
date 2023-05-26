import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AdminHomeScreen from "../Screens/AdminHomeScreen";
import AdminMenuScreen from "../Screens/AdminMenuScreen";
//import CartScreen from "../Screens/CartScreen";
//import HomeScreen from "../Screens/HomeScreen";
//import SingleProductScreen from "../Screens/SingleProductScreen";


const AdminStackNav = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
        initialRouteName="AdminHome"
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="AdminHome" component={AdminHomeScreen}/>
            {/* <Stack.Screen name="Single" component={SingleProductScreen}/>
            <Stack.Screen name="Cart" component={CartScreen}/> */}

            <Stack.Screen name="AdminMenu" component={AdminMenuScreen}/>
        </Stack.Navigator>
    );
};

export default AdminStackNav;