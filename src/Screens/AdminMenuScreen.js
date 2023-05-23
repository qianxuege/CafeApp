import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Box, Button } from "native-base";
import { useState } from "react";
import { Image } from "native-base";
import Colors from "../color";

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
        <Box backgroundColor={Colors.darkGreen} margin={10} height={300} width="90%">
            <Image source={{uri: "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"}} alt="chosen image" style={{ height: 200}}/>
            <Button> </Button>
        </Box>
        
    )
};

export default AdminMenuScreen;
