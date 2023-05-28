import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Box, Button } from "native-base";
import { useState } from "react";
import { Image } from "native-base";
import Colors from "../color";
import AdminTop from "../Components/AdminTop";

const AdminMenuScreen = () => {
    const [imagesrc, setImagesrc] = useState("https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png");
    const [loading, setLoading] = useState(true);


	function getImage() {
		const storage = getStorage();
		getDownloadURL(ref(storage, "images/acai_bowl.jpg"))
			.then((url) => {
				setImagesrc(url);
                //console.log(imagesrc);
			})
			.catch((error) => {
				// Handle any errors
				console.log(error);
			});
	}
	
    return(
        
        <Box backgroundColor={Colors.darkGreen} width="100%">
            <AdminTop />
            <Image source={{uri: imagesrc}} alt="chosen image" style={{ width: 400, height: 300}} resizeMode="cover"/>
            <Button onPress={() => {getImage()}}> </Button>
        </Box>
        
    )
};

export default AdminMenuScreen;
