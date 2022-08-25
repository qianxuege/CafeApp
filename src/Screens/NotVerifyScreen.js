import { Box, Center, Image, VStack } from 'native-base';
import React from 'react';
import Colors from '../color';
import Buttons from '../Components/Buttons';

function NotVerifyScreen() {
    return (
        <Box flex={1} bg={Colors.lightGold} safeAreaTop>
            <Center w="full" h={250} mt={10}>
                <Image source={require("../../assets/favicon.png")} size="xl" alt="favicon" />
            </Center>
            <VStack space={6} px={5} alignItems="center" >
                <Buttons bg={Colors.darkestGreen} color={Colors.white} mt={10} bgp={Colors.darkGreen} >REGISTER</Buttons>
                <Buttons bg={Colors.white} color={Colors.gold} mt={2} bgp={Colors.deepGray}>LOGIN</Buttons>
            </VStack>
        </Box>
    );
};

export default NotVerifyScreen;