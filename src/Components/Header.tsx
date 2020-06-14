import React from "react";
import {Image, StyleSheet, View} from "react-native";
import colors from "../../constants/colors";
// @ts-ignore
import logo from '../../assets/img/logob.png';
import {Icon} from "react-native-elements";
import {Link} from "react-router-native";

const Header = ({backAllowed = true}) => {
  return backAllowed ?
    (<View style={styles.box}>
      <Link to={'/menu'}>
        <Icon
          name='arrow-left'
          type='font-awesome-5'
          color='#FFF'
        />
      </Link>

      <Image source={logo} style={styles.logo}/>
      <View/>
    </View>)
    :
    (<View style={styles.box2}>
      <View/>
    </View>)
}
const styles = StyleSheet.create({
  box: {
    height: 80,
    width: '100%',
    backgroundColor: colors.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    paddingLeft: 10
  },
  logo: {
    width: 70,
    height: 70,
    marginLeft: -35
  },
  box2: {
    height: 80,
    width: '100%',
    backgroundColor: colors.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logo2: {
    width: 70,
    height: 70,
  }
})

export default Header
