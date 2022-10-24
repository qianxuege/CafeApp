import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CartScreen from "../Screens/CartScreen";
import HomeScreen from "../Screens/HomeScreen";
import SingleProductScreen from "../Screens/SingleProductScreen";


const StackNav = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Single" component={SingleProductScreen}/>
            <Stack.Screen name="Cart" component={CartScreen}/>
        </Stack.Navigator>
    );
};

export default StackNav;