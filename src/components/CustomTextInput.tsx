import { StyleSheet, TextInput } from "react-native"

const CustomTextInput =
    ({ style, placeholder, placeholderTextColor, onChangeText, value, errorStyle, keyboardType, className }
        :
        { style?: any, className?: any, placeholder?: string, placeholderTextColor?: string, onChangeText?: any, value?: any, errorStyle?: any, keyboardType?: any }
    ) => {
        // console.log('errorStyle: ', errorStyle);
        return (
            <TextInput
                className={className}
                keyboardType={keyboardType ? keyboardType : "default"}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={[style, styles.fontDefault, errorStyle]}
            />
        );
    };

const styles = StyleSheet.create({
    fontDefault: {
        fontFamily: 'Inter-VariableFont_opsz,wght',
    },
});

export default CustomTextInput;