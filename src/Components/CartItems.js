import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack, Pressable, FlatList, Image } from 'native-base';
import products from '../data/Products';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../color';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];



const CartItems = () => {
    // const renderItems = ({item}) => {
    
    //     {/* <Box ml={6} mb={3}> */}
    //         <Text style={styles.words}>Hi</Text>
    //     {/* </Box> */}
    
    //     console.log(item.title);
    // };

    const [timesPressed, setTimesPressed] = useState(0);
    const renderItems = ({ item }) => (
        <Pressable bg={Colors.white} my={3}  w="40%">
            <Image 
                source={{uri: products.image}}
                alt={products.name}
                w="100%"
                h={32}
                resizeMethod="stretch"
            />
        <Box>
            <Text style={styles.words}>{item.name}</Text>
        </Box>
        </Pressable>
      );
        console.log(timesPressed);
  return (
    <Box>
        <Text>Testing</Text>
      <FlatList
        data={products}
        renderItem={renderItems}
        keyExtractor={item => item._id}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
    words: {
      color: Colors.black,
      
    }
  });

export default CartItems;