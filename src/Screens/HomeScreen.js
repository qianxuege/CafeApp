import { Text, View, Box } from 'native-base';
import { useFonts } from 'expo-font';
import React from 'react';
import Colors from '../color';
import HomeSearch from "../../src/Components/HomeSearch.js";
import HomeProducts from "../../src/Components/HomeProducts.js";

function HomeScreen() {
    
    return (
        <Box flex={1} bg={Colors.white} w="100%">
            <HomeSearch />
            <HomeProducts />
        </Box>
    );
};

export default HomeScreen;