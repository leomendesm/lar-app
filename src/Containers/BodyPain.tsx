import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import video from '../../assets/video/alongar.mp4';
// @ts-ignore
import body from '../../assets/img/body.png';
import colors from '../../constants/colors';
import {Link, Redirect} from 'react-router-native';
import Header from "../Components/Header";

class BodyPain extends React.Component {
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
      return <Redirect to={'/exercise'} />;
    }
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>Clique onde está a Dor:</Text>
        <TouchableOpacity onPress={() => this.setState({open: true})}>
          <Image source={body} />
        </TouchableOpacity>
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
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold'
  },
});

export default BodyPain;
