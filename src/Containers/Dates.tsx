import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import logo from '../../assets/img/logo.png';
import colors from '../../constants/colors';
import {Button, Input} from 'react-native-elements';
import UserService from '../services/user.service';
import {Link, Redirect} from 'react-router-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateType from "../types/DateType";
import Header from "../Components/Header";

interface Props {
}

interface State {
  dates: DateType[]
  date: Date
  who: string
  registered: boolean
  show: boolean
}
class Dates extends React.Component<Props, State> {
  state = {
    dates: [],
    date: new Date(),
    who: '',
    registered: false,
    show: false
  };
  handleSubmit = async () => {
    const response = await UserService.saveDates(this.state.dates);
    if (response) {
      this.setState({registered: true});
    }
  };
  toggleShow = () => {
    const {show} = this.state
    this.setState({show: !show});
  }
  // @ts-ignore
  handleDate = (e) => {
    if(e.type === 'set'){
      this.setState({
        show: false,
        date: new Date(e.nativeEvent.timestamp),
      })
    }
  }
  addDates = () => {
    const { date, who, dates }  = this.state
    // @ts-ignore
    dates.push({who, date})
    this.setState({
      date: new Date(),
      who: '',
      dates
    })
  }
  render() {
    if (this.state.registered) {
      return <Redirect to={'/login'}/>;
    }
    const saved = this.state.dates.map((d: DateType, index) => <Text key={`Text-${index}`}>{d.who},&nbsp;</Text>);
    return (
      <View style={styles.container}>
        <Header backAllowed={false} />
        <Image source={logo} style={styles.img}/>
        <Text style={styles.title}>Cadastre suas datas importantes</Text>
        <Input
          placeholder="Quem"
          onChangeText={(value) => this.setState({who: value})}
          value={this.state.who}
        />
        {this.state.show && ( <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          is24Hour={true}
          display="default"
          onChange={this.handleDate}
        /> )}
        <Button
          title="Escolher data"
          buttonStyle={styles.buttonAdd}
          onPress={this.toggleShow}
        />
        <Button
          title="Adicionar"
          buttonStyle={styles.buttonAdd}
          onPress={this.addDates}
        />
        <View style={styles.savedContainer}>
          <Text style={styles.saved}>Datas Salvas: {saved}</Text>
        </View>
        <Button
          title="Finalizar"
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
  buttonAdd: {
    backgroundColor: colors.primary,
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
  saved: {
    color: colors.primary,
  },
  savedContainer: {
    display: "flex",
    width: '100%',
    padding: 18,
  },
});

export default Dates;
