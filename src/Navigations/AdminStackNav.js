import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AdminMenuScreen from "../Screens/AdminMenuScreen";
import AdminSingleProductScreen from "../Screens/AdminSingleProductScreen";
import AdminEditScreen from "../Screens/AdminEditScreen";
//import CartScreen from "../Screens/CartScreen";
//import HomeScreen from "../Screens/HomeScreen";
//import SingleProductScreen from "../Screens/SingleProductScreen";


const AdminStackNav = ({route}) => {
    const Stack = createNativeStackNavigator();
    const organization = route.params.organization;
    return (
        <Stack.Navigator
        initialRouteName="AdminMenu"
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="AdminEdit" component={AdminEditScreen} initialParams={{organization: organization}} />
            {/* <Stack.Screen name="Single" component={SingleProductScreen}/>
            <Stack.Screen name="Cart" component={CartScreen}/> */}
            <Stack.Screen name="AdminSingle" component={AdminSingleProductScreen}/>
            <Stack.Screen name="AdminMenu" component={AdminMenuScreen} initialParams={{organization: organization}} />
        </Stack.Navigator>
    );
};

export default AdminStackNav;