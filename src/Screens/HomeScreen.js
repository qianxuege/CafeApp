import { Text, View, Box } from 'native-base';
import { useFonts } from 'expo-font';
import React from 'react';
import Colors from '../color';
import HomeProducts from '../Components/HomeProducts';
import HomeSearch from '../Components/HomeSearch';

function HomeScreen() {
    const [fontsLoaded] = useFonts ({
        'Akronim-Regular': require('../../assets/Fonts/Akronim-Regular.ttf'),
        
      });
    return (
        <Box flex={1} bg={Colors.white} w="100%">
            <HomeSearch />
            <HomeProducts />
        </Box>
    );
};

export default HomeScreen;