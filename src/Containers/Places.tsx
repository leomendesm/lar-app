import React from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../constants/colors';
import PlaceService from "../services/place.service";
// @ts-ignore
import {MAPS} from 'react-native-dotenv'
import {Link, Redirect} from "react-router-native";
import Header from "../Components/Header";

interface Props {
  match: {
    params: {
      location: string
    }
  }
}

interface Place {
  image: string
  name: string
  rating: Rating[]
  id: number
}

interface Rating {
  userId: string
  rating: number
}

class Places extends React.Component<Props> {
  state = {
    places: [],
    selected: ''
  };

  componentDidMount() {
    const {location} = this.props.match.params
    this.onInit(location).then()
  }

  onInit = async (location: string) => {
    const response = await PlaceService.search(location);
    if (response) {
      this.setState({places: response.data});
    }
  };

  render() {
    const mapped = this.state.places.map((d: Place, index: number) => {
      const average = Math.floor(d.rating.reduce(function (avg: number, value: Rating, _: any, {length}: any) {
        return avg + value.rating / length;
      }, 0));
      return (
        <TouchableOpacity onPress={() => this.setState({selected: d.id})}>
        <ImageBackground
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${d.image}&key=${MAPS}`
          }}
          key={`Text-${index}`}
          style={styles.image}
        >
          <View style={styles.imageCover}>
            <Text style={styles.imageTitle}>{d.name}</Text>
            <Text style={styles.imageRating}>Nota:{average}/5</Text>
          </View>
        </ImageBackground>
        </TouchableOpacity>
      )
    });
    if (this.state.selected) {
      return <Redirect to={`/places/detail/${this.state.selected}`} />;
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <Text style={styles.title}>Pontos de parada</Text>
        <View>{mapped}</View>
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
  title: {
    color: colors.primary,
    fontSize: 22,
    marginBottom: 32,
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
  imageS: {
    width: '100%',
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
    width: '100%',
    height: '100%',
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  }
});

export default Places;
