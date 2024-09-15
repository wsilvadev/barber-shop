import { TextInput, KeyboardTypeOptions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'
import styles from './styles'

type props  = {
    type: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions | undefined;
}


export const Input = ({ type, placeholder, keyboardType }: props) =>  {
    const inputStyle = type === 'password'? styles.numericInput : styles.input;


    return (
        <SafeAreaView
        style={styles.container}
        >
        <Icon name={'eye'} size={25} style={styles.icon} />
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor='#757575'
            keyboardType={keyboardType}
            
        />
        </SafeAreaView>

    )
}