const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

// Thêm alias thủ công vào resolver
defaultConfig.resolver.extraNodeModules = {
    ...(defaultConfig.resolver.extraNodeModules || {}),
    'react-native/Libraries/Components/View/ViewPropTypes': path.resolve(
        __dirname,
        'node_modules/deprecated-react-native-prop-types/propTypes/ViewPropTypes.js'
    ),
};

const config = mergeConfig(defaultConfig, {
    // thêm config nếu cần
});

module.exports = withNativeWind(config, { input: "./global.css" });