import { TextInput, KeyboardTypeOptions, SafeAreaView, TouchableOpacity, Text, Animated } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'
import { useEffect, useState, useRef } from 'react';

type props = {
    type: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions | undefined;
    onTextChange: (text: string) => void;
    icon?: string;
    errors?: { [text: string]: string; };
}

type icon = {
    type: string;
    iconName: string;
}

const Icon = ({ type, iconName }: icon) => {
    switch (type) {
        case 'name':
            return (
                <FontAwesome6 name={iconName} size={25} style={styles.icon} />
            )
        case 'email':
            return (
                <MaterialIcon name={iconName} size={25} style={styles.icon} />
            )
        case 'password':
            return (
                <MaterialCommunityIcons name={iconName} size={25} style={styles.icon} />
            )
    }
}

export const Input = ({ type, placeholder, keyboardType, onTextChange, icon, errors }: props) => {
    const [isPassword, setPasswordTextEntry] = useState<boolean>(false);
    const [iconName, setIcon] = useState<string>('');
    const translateAnimation = useRef(new Animated.Value(-10)).current;

    const handleChangeText = (text: string) => {
        onTextChange(text);
    }
    const handlePasswordTextEntry = () => {
        if (type === 'password') {
            setPasswordTextEntry(!isPassword);
            setIcon(!isPassword ? 'eye' : 'eye-off')
        }
    }

    useEffect(() => {
        setPasswordTextEntry(type === 'password');
        setIcon(icon ?? '')
        if (errors?.text) {
            Animated.timing(translateAnimation, {
                toValue: 10,
                duration: 200,
                useNativeDriver: true,
            }
            ).start()
        }
        else {
            Animated.timing(translateAnimation, {
                toValue: -10,
                duration: 200,
                useNativeDriver: true,
            }).start()
        }
    }, [translateAnimation, errors]);

    return (
        <SafeAreaView
            style={icon ? styles.container : styles.containerWithoutIcon}
        >
            {icon &&
                <TouchableOpacity onPress={handlePasswordTextEntry}>
                    <Icon iconName={iconName} type={type} />
                </TouchableOpacity>
            }

            <TextInput
                style={icon ? styles.input : styles.inputWithoutIcon}
                placeholder={placeholder}
                placeholderTextColor='#757575'
                keyboardType={keyboardType}
                onChangeText={text => handleChangeText(text)}
                secureTextEntry={isPassword}
            />
            {errors?.text &&
                <Animated.View
                    style={[styles.textViewError, {
                        opacity: translateAnimation.interpolate({
                            inputRange: [0, 10],
                            outputRange: [0, 1],
                        }),
                        transform: [{ translateY: translateAnimation }],
                    }]}
                >
                    <MaterialIcon name='error' size={15} style={styles.errorIcon} />
                    <Text style={styles.textError}  >{errors.text}</Text>
                </Animated.View>}
        </SafeAreaView>


    )
}