import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import logo from '../../assets/img/logo.png';
import colors from '../../constants/colors';
import {Button, Input} from 'react-native-elements';
import UserService from '../services/user.service';
import {Link, Redirect} from 'react-router-native';
import Header from "../Components/Header";

class Register extends React.Component {
  state = {
    username: '',
    cellphone: '',
    cpf: '',
    password: '',
    registered: false,
  };
  handleSubmit = async () => {
    const response = await UserService.register(
      this.state.username,
      this.state.password,
      this.state.cpf,
      this.state.cellphone,
    );
    if (response) {
      this.setState({registered: true});
    }
  };

  render() {
    if (this.state.registered) {
      return <Redirect to={'/login'} />;
    }
    return (
      <View style={styles.container}>
        <Header backAllowed={false} />
        <Image source={logo} style={styles.img} />
        <Text style={styles.title}>Cadastro</Text>
        <Input
          placeholder="Apelido"
          onChangeText={(value) => this.setState({username: value})}
        />
        <Input
          placeholder="Celular"
          onChangeText={(value) => this.setState({cellphone: value})}
        />
        <Input
          placeholder="Cpf"
          onChangeText={(value) => this.setState({cpf: value})}
        />
        <Input
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(value) => this.setState({password: value})}
        />
        <Button
          title="Cadastrar"
          buttonStyle={styles.button}
          onPress={this.handleSubmit}
        />
        <Link to="/login">
          <Text style={styles.redirect}>
            Já possui uma conta? entre por aqui!
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
    marginTop: 32,
  },
});

export default Register;
