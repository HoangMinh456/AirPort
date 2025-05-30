import { StyleSheet, TextInput } from "react-native"

const CustomTextInput =
    ({ style, placeholder, placeholderTextColor, onChangeText, value, errorStyle, keyboardType, className, defaultValue, editable }
        :
        { style?: any, className?: any, placeholder?: string, placeholderTextColor?: string, onChangeText?: any, value?: any, errorStyle?: any, keyboardType?: any, defaultValue?: string, editable?: boolean }
    ) => {
        // console.log('errorStyle: ', errorStyle);
        return (
            <TextInput
                className={className}
                keyboardType={keyboardType ? keyboardType : "default"}
                onChangeText={onChangeText}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={[styles.fontDefault, style, errorStyle]}
                editable={editable}
            />
        );
    };

const styles = StyleSheet.create({
    fontDefault: {
        fontFamily: 'Inter-VariableFont_opsz,wght',
        color: '#000000'
    },
});

export default CustomTextInput;