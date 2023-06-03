import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AdminMenuScreen from "../Screens/AdminMenuScreen";
import AdminSingleProductScreen from "../Screens/AdminSingleProductScreen";
import AdminEditScreen from "../Screens/AdminEditScreen";
//import CartScreen from "../Screens/CartScreen";
//import HomeScreen from "../Screens/HomeScreen";
//import SingleProductScreen from "../Screens/SingleProductScreen";


const AdminStackNav = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
        initialRouteName="AdminMenu"
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="AdminEdit" component={AdminEditScreen}/>
            {/* <Stack.Screen name="Single" component={SingleProductScreen}/>
            <Stack.Screen name="Cart" component={CartScreen}/> */}
            <Stack.Screen name="AdminSingle" component={AdminSingleProductScreen}/>
            <Stack.Screen name="AdminMenu" component={AdminMenuScreen}/>
        </Stack.Navigator>
    );
};

export default AdminStackNav;