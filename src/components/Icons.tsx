import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const IconMap = {
    MaterialIcons: MaterialIcons,
    Entypo: Entypo,
    AntDesign: AntDesign,
    EvilIcons: EvilIcons,
    Feather: Feather,
    FontAwesome: FontAwesome,
    Fontisto: Fontisto,
    Foundation: Foundation,
    Ionicons: Ionicons,
    MaterialCommunityIcons: MaterialCommunityIcons,
    Octicons: Octicons,
    SimpleLineIcons: SimpleLineIcons,
    Zocial: Zocial,
    FontAwesome6: FontAwesome6,
    FontAwesome5: FontAwesome5
}

type TypeIcon =
    | 'MaterialIcons'
    | 'Entypo'
    | 'AntDesign'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'Fontisto'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial'
    | 'FontAwesome6'
    | 'FontAwesome5'

const Icons = ({ typeIcon, nameIcon, sizeIcon, colorIcon, className }: { typeIcon: TypeIcon, nameIcon: string, sizeIcon?: number, colorIcon?: string, className?: any }) => {
    var CustomIcon = IconMap[typeIcon] || Entypo
    return (
        <CustomIcon className={className} name={nameIcon} size={sizeIcon || 24} color={colorIcon || '#fff'} />
    )
}

export default Icons