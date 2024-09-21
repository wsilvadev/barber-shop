
import {TouchableOpacity, Text} from 'react-native'
import { styles } from './style'

type props = {
    text: string,
    onPress: () => void,
    colorBackground?: string
}


export const Button = ({text, onPress, colorBackground}: props) => {
return (<TouchableOpacity style={[styles.button, {backgroundColor: colorBackground ?? '#BD89FF'}]} onPress={onPress}>
        <Text style={styles.textButton} >{text}</Text>  
        </TouchableOpacity>
     )
}