import { TextInput, KeyboardTypeOptions, SafeAreaView, TouchableOpacity, Text, Animated } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'
import { useEffect, useState, useRef } from 'react';
import { fontAwesomeNames, materialCommunityIconsNames, materialIconsNames } from './vector-icons'

type props = {
    type: string;
    placeholder: string;
    keyboardType: KeyboardTypeOptions | undefined;
    onTextChange: (text: string) => void;
    icon: IconProps['iconName'];
    errors?: { [text: string]: string; };
}

interface IconProps {
    iconName:
    | (typeof fontAwesomeNames)[number]
    | (typeof materialIconsNames)[number]
    | (typeof materialCommunityIconsNames)[number]
    | '?';
}

const Icon = ({ iconName }: IconProps) => {
    if (fontAwesomeNames.includes(iconName as (typeof fontAwesomeNames)[number])) {
        return <FontAwesome6 name={iconName} size={25} style={styles.icon} />;
    }
    if (materialIconsNames.includes(iconName as (typeof materialIconsNames)[number])) {
        return <MaterialIcon name={iconName} size={25} style={styles.icon} />;
    }
    if (
        materialCommunityIconsNames.includes(iconName as (typeof materialCommunityIconsNames)[number])
    ) {
        return <MaterialCommunityIcons name={iconName} size={25} style={styles.icon} />;
    }
    return null
}

export const Input = ({ type, placeholder, keyboardType, onTextChange, icon, errors }: props) => {
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