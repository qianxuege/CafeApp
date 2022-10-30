import {
	Button,
	HStack,
	Input,
	Pressable,
	Image,
	Text,
    View
} from "native-base";
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from "react";
import Colors from "../color";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavBarMenu from "../Components/NavBarMenu";
import { SearchBar } from "react-native-screens";
import products from "../data/Products";
import CustomizedData from "../data/CustomizedData";
import { convertAbsoluteToRem } from "native-base/lib/typescript/theme/tools";

function HomeSearch() {
    const [fontsLoaded] = useFonts ({
        'Akronim-Regular': require('../../assets/Fonts/Akronim-Regular.ttf'),
		'Caladea-Regular': require('../../assets/Fonts/Caladea-Regular.ttf'),
		'Caladea-Bold': require('../../assets/Fonts/Caladea-Bold.ttf')
      });

	const [word, setWord] = useState('');
	const [uniqueFilteredId, setUniqeFilteredId] = useState([]);
	const [customizedData, setCustomizedData] = useState(CustomizedData);

	if (!fontsLoaded) {
		return null;
	}

	let filteredId = [];
	let singleFilteredId = [];
	let newArray;

	// useEffect(() => {
	// 	setCalculation(() => count * 2);
	//   }, [count]);

	const search = (word) => {
		console.log(word);
		
		const filteredName = products.filter(item => item.name.includes(word));
		const filteredTags = products.filter(item => item.tags.includes(word));
		const filteredIngredients = products.filter(item => item.ingredients.includes(word));
		filteredName.forEach(food => filteredId.push(food._id));
		filteredTags.forEach(food => filteredId.push(food._id));
		filteredIngredients.forEach(food => filteredId.push(food._id));
		
		//to filter out duplicates
		singleFilteredId = filteredId.filter((element, index) => {
			return filteredId.indexOf(element) === index;
		});

		console.log(singleFilteredId);
		
		//setUniqeFilteredId(singleFilteredId);

		//console.log(uniqueFilteredId)
		

		singleFilteredId.map((uniqueId)=> {
		 	newArray = products.filter(item => item._id == uniqueId);
			console.log(newArray)
			setCustomizedData(...newArray[1]);
			console.log(customizedData);
		 	// I want to add the filtered arrays onto the Customized Data.
		})
		
		//console.log(CustomizedData);

		// setCustomizedData(newArray);

		// console.log(CustomizedData);

		
		
		

		
		//console.log(products.filter(item => item._id == 1 ));
		
	};

	

	

	return (
		<>
			<NavBarMenu />
			<HStack w="full" px={2} py={4} alignItems="center">
				<Pressable left={9} zIndex={2}>
					<Ionicons name="search" size={24} color={Colors.deepestGray} />
				</Pressable>
				<Input
					placeholder="Type In A Filter "
					w="85%"
					bg={Colors.white}
					type="search"
					height={12}
					paddingLeft={12}
					borderWidth={1}
					borderColor={Colors.lightBlack}
					fontSize={14}
					color={Colors.deepestGray}
					variant="unstyled"
					_focus={{
						borderColor: Colors.pink,
						backgroundColor: Colors.white,
					}}
					value={word}
					onChangeText={(text) => setWord(text)}
					
				/>
			</HStack>
			<HStack w="full" marginBottom={2} space={4} px={6} py={0} alignItems="center">
				<Button
					h={10}
                    w={117}
					bg={Colors.morandiGreen}
                    paddingRight={6}
                    position="relative"
                    left="15%"
					_text={{
						color: Colors.black,
						fontFamily: "Caladea-Regular",
						
					}}
					_pressed={{ bg: Colors.darkGreen }}
					onPress={() => {search(word)}}
					
				>
					Filter
				</Button>
                <View left={0}><Ionicons name="filter" size={22} flex={2} color={Colors.deepestGray} /></View>
                <Button
					h={10}
                    w={124}
					bg={Colors.morandiGreen}
                    paddingRight={8}
                    left={7}
					_text={{
						color: Colors.black,
						fontFamily: "Caladea-Regular",
						
					}}
					_pressed={{ bg: Colors.darkGreen }}
				>
					Specials
				</Button>
                <View left={-26} top={-1}><MaterialIcons name="celebration" size={22} flex={2} color={Colors.deepestGray} /></View>
                
			</HStack>
		</>
	);
}

export default HomeSearch;
