import { TextInput, KeyboardType, SafeAreaView, TouchableOpacity, Text, Animated, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './styles'
import { useEffect, useState, useRef } from 'react';

import FontAwesomeList  from 'react-native-vector-icons/glyphmaps/FontAwesome.json'
import MaterialIconsList  from 'react-native-vector-icons/glyphmaps/MaterialIcons.json'
import MaterialCommunityIconsList from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json'

const FontAwesomeKeys = Object.keys(FontAwesomeList) as (keyof typeof FontAwesomeList)[];
const MaterialIconsKeys = Object.keys(MaterialIconsList) as (keyof typeof MaterialIconsList)[];
const MaterialCommunityIconsKeys = Object.keys(MaterialCommunityIconsList) as (keyof typeof MaterialCommunityIconsList)[];

type props = {
    type: string;
    placeholder: string;
    keyboardType?: KeyboardType ;
    onTextChange: (text: string) => void;
    icon: IconProps['iconName'];
    error: string;
}

interface IconProps {
    iconName: 
    | typeof FontAwesomeKeys[number]
    | typeof MaterialIconsKeys[number] 
    | typeof MaterialCommunityIconsKeys[number] 
    | '?';
}

const validFontAwesomeIcons = ['user', ]
const validMaterialIcons = ['email' ]
const validMaterialCommunityIcons = ['eye', 'eye-off' ]

const Icon = ({ iconName }: IconProps) => {
    const icons =[]
    if(validFontAwesomeIcons.includes(iconName)){
            icons.push(<FontAwesome key="fa" name={iconName} size={25} style={styles.icon} />);
    }
    if(validMaterialIcons.includes(iconName)){
            icons.push(<MaterialIcons key="mi" name={iconName} size={25} style={styles.icon} />);
    }
    if(validMaterialCommunityIcons.includes(iconName)){
            icons.push(<MaterialCommunityIcons key="mci" name={iconName} size={25} style={styles.icon} />);
    }
    return <View >{icons}</View>;

}

export const Input = ({ type, placeholder, keyboardType, onTextChange, icon, error }: props) => {
    const [isPassword, setPasswordTextEntry] = useState<boolean>(false);
    const [iconName, setIcon] = useState<typeof icon>(icon);
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
        setIcon(icon ?? '?')
        if (error) {
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
    }, [translateAnimation, error]);

    return (
        <SafeAreaView
            style={icon ? styles.container : styles.containerWithoutIcon}
        >
            {icon &&
                <TouchableOpacity onPress={handlePasswordTextEntry}>
                    <Icon iconName={iconName} />
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
            {error &&
                <Animated.View
                    style={[styles.textViewError, {
                        opacity: translateAnimation.interpolate({
                            inputRange: [0, 10],
                            outputRange: [0, 1],
                        }),
                        transform: [{ translateY: translateAnimation }],
                    }]}
                >
                    <MaterialIcons name='error' size={15} style={styles.errorIcon} />
                    <Text style={styles.textError}  >{ error }</Text>
                </Animated.View>}
        </SafeAreaView>
    )
}