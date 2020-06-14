import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import logo from '../../assets/img/logo.png';
import colors from '../../constants/colors';
import {Button, Input} from 'react-native-elements';
import UserService from '../services/user.service';
import {Link, Redirect} from 'react-router-native';
import Header from "../Components/Header";

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    loggedIn: '',
  };
  handleSubmit = async () => {
    const response = await UserService.login(this.state.username, this.state.password);
    if (response) {
      this.setState({loggedIn: true});
    }
  };
  componentDidMount = async () => {
    const user = await UserService.checkUserLocal()
    if(user) {
      this.setState({loggedIn: true})
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={'/menu'} />;
    }
    return (
      <View style={styles.container}>
        <Header backAllowed={false}/>
        <Image source={logo} style={styles.img} />
        <Text style={styles.title}>Seja bem vindo(a)!!</Text>
        <Input
          placeholder="Apelido"
          onChangeText={(value) => this.setState({username: value})}
        />
        <Input
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(value) => this.setState({password: value})}
        />
        <Button
          title="Entrar"
          buttonStyle={styles.button}
          onPress={this.handleSubmit}
        />
        <Link to="/Register">
          <Text style={styles.redirect}>
            Ainda não possui uma conta? crie aqui!
          </Text>
        </Link>
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
    marginTop: 20,
    marginBottom: 32,
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

export default Login;
