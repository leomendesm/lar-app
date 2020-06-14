import React from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../constants/colors';
import PlaceService from "../services/place.service";
// @ts-ignore
import {MAPS} from 'react-native-dotenv'
import {Button, Input} from "react-native-elements";
import {Redirect} from "react-router-native";
import Header from "../Components/Header";

interface Props {
  match: {
    params: {
      id: number
    }
  }
}

interface State {
  place: PlaceInterface;
  av1: string
  av2: string
  av3: string
  av4: string
  redirect: boolean
  id: string
}

interface PlaceInterface {
  image: string
  name: string
}

class Place extends React.Component<Props, State> {
  state = {
    place: {
      image: '',
      name: ''
    },
    av1: '',
    av2: '',
    av3: '',
    av4: '',
    redirect: false,
    id: ''
  };

  componentDidMount() {
    const id = '3'
    //const {id} = this.props.match.
    this.setState({id})
    this.onInit(id).then()
  }

  onInit = async (id: string) => {
    const response = await PlaceService.getPlace(id);
    if (response) {
      this.setState({place: response.data});
    }
  };

  handleSubmit = async () => {
    const {av1, av2, av3, av4, id} = this.state
    const average = Math.floor((parseInt(av1) + parseInt(av2) + parseInt(av3) + parseInt(av4) / 4));
    const response = await PlaceService.ratePlace(id, average);
    if (response) {
      this.setState({redirect: true});
    }
  };

  render() {
    const { place } = this.state;
    if (this.state.redirect) {
      return <Redirect to={'/ranking/'} />;
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <ImageBackground
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${place.image}&key=${MAPS}`
          }}
          style={styles.image}
        >
          <View style={styles.imageCover}>
            <Text style={styles.imageTitle}>{place.name}</Text>
          </View>
        </ImageBackground>
        <Text style={styles.title}>Avaliação</Text>
        <Text style={styles.title2}>Avalie de 0 a 5:</Text>
        <View style={styles.form}>
          <Input
            leftIcon={{type: 'font-awesome-5', name: 'wifi', color: colors.primary}}
            keyboardType={'numeric'}
            label={"Wifi"}
            onChangeText={(text) => this.setState({av1:text})}
          />
        </View>
        <View style={styles.form}>
          <Input
            leftIcon={{ type: 'font-awesome-5', name: 'shield-alt', solid: true, color: colors.primary }}
            keyboardType={'numeric'}
            label={"Segurança"}
            onChangeText={(text) => this.setState({av2:text})}

          />
        </View>
        <View style={styles.form}>
          <Input
            leftIcon={{ type: 'font-awesome-5', name: 'utensils', solid: true, color: colors.primary }}
            keyboardType={'numeric'}
            label={"Restaurante"}
            onChangeText={(text) => this.setState({av3:text})}
          />
        </View>
        <View style={styles.form}>
          <Input
            leftIcon={{ type: 'font-awesome-5', name: 'bed', color: colors.primary }}
            keyboardType={'numeric'}
            label={"Ponto de parada"}
            onChangeText={(text) => this.setState({av4:text})}
          />
        </View>
        <Button
          title="Salvar"
          buttonStyle={styles.button}
          onPress={e => this.handleSubmit()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  box: {
    height: 80,
    width: '100%',
    backgroundColor: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
  },
  title: {
    color: colors.primary,
    fontSize: 22,
    marginBottom: 12,
    fontWeight: "bold",
  },
  title2: {
  color: colors.primary,
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "bold",
},
  image: {
    display: "flex",
    flex: 1,
    maxHeight: 120,
    minHeight: 120,
    minWidth: '100%',
    resizeMode: "cover",
    backgroundColor: '#111111',
    marginBottom: 10
  },
  imageTitle: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 10
  },
  imageRating: {
    fontSize: 28,
    textAlign: 'right',
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10
  },
  imageCover: {
    backgroundColor: 'rgba(19,19,19,0.45)',
    minWidth: '100%',
    height: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  form: {
    display: "flex",
    flexDirection: "row",
    width: '70%'
  },
  formField: {
    width: '70%'
  }
});

export default Place;
