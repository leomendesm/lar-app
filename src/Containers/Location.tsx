import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import logo from '../../assets/img/logo.png';
import colors from '../../constants/colors';
import {Button, Input} from 'react-native-elements';
import UserService from '../services/user.service';
import {Link, Redirect} from 'react-router-native';
import Header from "../Components/Header";

class Location extends React.Component {
  state = {
    road: '',
    open: false
  };
  handleSubmit = async () => {
    this.setState({
      open: true
    })
  };

  render() {
    if (this.state.open) {
      return <Redirect to={'/places/'+this.state.road} />;
    }
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>Digite o nome da estrada que irá percorrer:</Text>
        <Input
          placeholder="estrada"
          onChangeText={(value) => this.setState({road: value})}
        />
        <Button
          title="Avançar"
          buttonStyle={styles.button}
          onPress={this.handleSubmit}
        />
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
  box: {
    height: 80,
    width: '100%',
    backgroundColor: colors.primary,
  },
  img: {
    backgroundColor: '#D3D3D3',
    borderRadius: 12,
    width: 120,
    height: 120,
    marginTop: -30,
  },
  title: {
    color: colors.primary,
    fontSize: 22,
    marginTop: 10,
    marginBottom: 22,
    padding: 10
  },
  button: {
    backgroundColor: colors.primary,
  },
  redirect: {
    color: colors.primary,
    fontSize: 18,
    marginTop: 128,
  },
});

export default Location;
