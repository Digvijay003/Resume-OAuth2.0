import { extendTheme } from '@chakra-ui/react';


const mytheme=extendTheme({
    config:{
        initialColorMode:'light',
        useSystemColorMode:false
    }
})

export default mytheme