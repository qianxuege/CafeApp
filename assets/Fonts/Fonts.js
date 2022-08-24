import { useEffect, useCallback, Text } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AppLoading } from 'expo';

function Fonts() {
    const [fontsLoaded] = useFonts ({
        'Akronim-Regular': require('./Akronim-Regular.ttf'),
        'AmaticSC-Regular': require('./AmaticSC-Regular.ttf'),
        'AmaticSC-Bold': require('./AmaticSC-Bold.ttf'),
        'Bitter-Italic': require('./Bitter-Italic-VariableFont_wght.ttf'),
        'Bitter-Regular': require('./Bitter-VariableFont_wght.ttf'),
        'Caladea-Bold': require('./Caladea-Bold.ttf'),
        'Caladea-BoldItalic': require('./Caladea-BoldItalic.ttf'),
        'Caladea-Italic': require('./Caladea-Italic.ttf'),
        'Caladea-Regular': require('./Caladea-Regular.ttf'),
        'Caveat-Regular': require('./Caveat-VariableFont_wght.ttf'),
        
      });
      
      useEffect(() => {
        async function prepare() {
          await SplashScreen.preventAutoHideAsync();
        }
      
        prepare();
      }, [] );
      
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
      
      if (!fontsLoaded) {
        return <AppLoading />;
      }

    return (
       <Text>Hello</Text>
    )

}

export default Fonts;