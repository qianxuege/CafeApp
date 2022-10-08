import React from "react";
import { Button } from 'native-base';

function Buttons({ mt, bg, bgp, color, children, onPress, w }) {
	return (
		<Button
			width={w}
			h={55}
			mt={mt}
			rounded="full"
			bg={bg}
			_text={{
				color: color,
				fontWeight: "bold",
			}}
			_pressed={{ bg: bgp }}
			onPress={onPress}
		>
			{children}
		</Button>
	);
}

export default Buttons;
