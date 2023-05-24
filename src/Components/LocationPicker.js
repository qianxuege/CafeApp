import { Box, Text } from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../color";
import { useState } from "react";
import { useFonts } from "expo-font";
import "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const LocationPicker = (param) => {
	const [fontsLoaded] = useFonts({
		"Akronim-Regular": require("../../assets/Fonts/Akronim-Regular.ttf"),
		"Caladea-BoldItalic": require("../../assets/Fonts/Caladea-BoldItalic.ttf"),
	});
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Grill station", value: "grill station" },
		{ label: "Sandwich station", value: "sandwich station" },
		{ label: "Hot meal", value: "hot meal" },
		{ label: "Salad station", value: "salad station" },
		{ label: "Snack Shack", value: "snack shack" },
	]);
    const foodname = param.param;
    //console.log(foodname);

	const foodLocation = value;

    const getLocation = async () => {
        await setDoc(doc(db, "foodItems", foodname), {
            location: value,
        });
        console.log(value);
    }

    

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Box width="92%">
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				theme="LIGHT"
				multiple={false}
				listMode="SCROLLVIEW"
				mode="BADGE"
				badgeDotColors={["#ffd700", "#90ee90", "#800000", "#006400", "#ffc0cb"]}
				style={{
					borderColor: Colors.morandiPink,
					backgroundColor: Colors.morandiPink,
				}}
				dropDownContainerStyle={{
					backgroundColor: Colors.morandiPink,
					borderColor: Colors.lightBlack,
				}}
				textStyle={{
					fontSize: 16,
					fontFamily: "Bitter-Regular",
					color: Colors.gray,
				}}
				labelStyle={{
					color: Colors.darkPink,
					backgroundColor: Colors.morandiPink,
				}}
				onChangeValue={() => {
					getLocation()
					//console.log(foodLocation);
				}}
			/>
		</Box>
	);
};

//export const foodLocation = "hot meal";

// export const foodLocation = (param) => {
//     let location = param;
//     //console.log(param)
//     return "hot meal"

// }

export default LocationPicker;
