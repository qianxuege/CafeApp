import { Text, View, Box } from 'native-base';
import React from 'react';
import Colors from '../color';
import HomeProducts from '../Components/HomeProducts';
import HomeSearch from '../Components/HomeSearch';

function HomeScreen() {
    return (
        <Box flex={1} bg={Colors.white}>
            <HomeSearch />
            <HomeProducts />
        </Box>
    );
};

export default HomeScreen;