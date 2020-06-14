import React from 'react';
import {Image, SafeAreaView, ScrollView, ScrollViewComponent, StyleSheet, Text, View} from 'react-native';

// @ts-ignore
import crown from '../../assets/img/coroa.png';
// @ts-ignore
import rotas from '../../assets/img/rotas.png';
// @ts-ignore
import body from '../../assets/img/body_small.png';

import colors from '../../constants/colors';
import {Link} from 'react-router-native';
import Header from "../Components/Header";

class Menu extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Header backAllowed={false}/>
        <Link to="/location">
          <View style={styles.link}>
            <Image source={rotas} style={styles.img} />
            <Text style={styles.title}>Segue a rota</Text>
          </View>
        </Link>
        <Link to="/body">
          <View style={styles.link}>
            <Image source={body} style={styles.img} />
            <Text style={styles.title2}>Está com dor?</Text>
            <Text style={styles.title3}> Que tal alguns exercícios</Text>
          </View>
        </Link>
        <Link to="/ranking">
          <View style={styles.link}>
            <Image source={crown} style={styles.img} />
            <Text style={styles.title}>Ranking</Text>
          </View>
        </Link>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    backgroundColor: '#D3D3D3',
    width: 120,
    height: 120,
    borderWidth: 10,
    borderColor: colors.primary,
    marginTop: 20
  },
  title: {
    color: colors.primary,
    fontSize: 22,
    marginBottom: 22,
    fontWeight: "bold",
  },
  title2: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "bold",
  },
  title3: {
    color: colors.primary,
    fontSize: 22,
    marginBottom: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colors.primary,
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

export default Menu;
