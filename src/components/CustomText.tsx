/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, Text } from 'react-native';

const CustomText = ({ children, style, className }: { children: any, style?: any, className?: string }) => {
    return (
        <Text style={[style, styles.fontDefault]} className={className}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    fontDefault: {
        fontFamily: 'Inter-VariableFont_opsz,wght',
    },
});

export default CustomText;