import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import gif from '../../assets/img/ex.gif';
import colors from '../../constants/colors';
import Header from "../Components/Header";
class Exercise extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Image source={gif} style={styles.gif} />
        <Text style={styles.title}>Repita este exercício por 30 segundos!</Text>
        <Text style={styles.subTitle}>
          *Esses execícios não removem a importancia de ir ao médico.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: colors.primary,
    fontSize: 22,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'center'
  },
  subTitle: {
  color: colors.primary,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 30,
    width: '70%',
    textAlign: 'center'
},
  gif: {
    width: '80%',
    marginTop: 20,
  },
});

export default Exercise;
