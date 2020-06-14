import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../constants/colors';
import Header from "../Components/Header";
import UserService from "../services/user.service";
import RankingService from "../services/ranking.service";
import Rewards from "../Components/Rewards";

interface Props {
  match: {
    params: {
      location: string
    }
  }
}

interface Rank {
  userId: string
  total: number
  username: string
}

interface State {
  ranking: Rank[]
}

interface User {
  username: string
}

class Ranking extends React.Component<Props, State> {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.onInit().then()
  }

  onInit = async () => {
    const response = await RankingService.ranking();
    if (response) {
      await response.data.map(async (r: Rank, index: number) => {
        const user = await UserService.getUser(r.userId)
        const { ranking } = this.state
        // @ts-ignore
        ranking.push({username: user.data.username,...r})
        this.setState({ranking});
      });
    }
  };

  render() {
    const mapped = this.state.ranking.map((r: Rank, index: number) => {
      let color = {medal: styles.positionMedal, info: styles.positionMedalNumber};
      index++;
      switch (index) {
        case 1:
          color.medal = styles.positionMedalGold
          color.info = styles.positionMedalNumberGold
          break;
        case 2:
          color.medal = styles.positionMedalSilver
          color.info = styles.positionMedalNumberSilver
          break;
        case 3:
          color.medal = styles.positionMedalBronze
          color.info = styles.positionMedalNumberBronze
          break;
        default:
          color.medal = styles.positionMedal
          color.info = styles.positionMedalNumber
      }
      return (
        <View key={'Badge'+index} style={styles.position}>
          <View style={color.medal}>
            <Text style={color.info}>{index}</Text>
          </View>
          <Text style={styles.username}>{r.username}</Text>
          <Text style={styles.total}>{r.total*5} pontos</Text>
        </View>
      )
    });
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <Text style={styles.title}>Ranking</Text>
        <View style={styles.ranking}>{mapped}</View>
        <Rewards />
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
  title: {
    color: colors.primary,
    fontSize: 22,
    marginTop: 10,
    marginBottom: 32,
    fontWeight: "bold",
  },
  ranking: {
    display: "flex",
    flexDirection: "column",
    minWidth: '100%',
  },
  position: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    minHeight: 50,
    paddingLeft: 10
  },
  positionName: {

  },
  positionMedal: {
    backgroundColor: '#FCBD30',
    height: 45,
    width: 45,
    borderRadius: 10000,
    borderWidth: 3,
    borderColor: '#FFE06F',
    position: 'relative',
    textAlign: 'center',
    marginRight: 8,
  },
  positionMedalBronze: {
    backgroundColor: '#E59614',
    height: 45,
    width: 45,
    borderRadius: 10000,
    borderWidth: 3,
    borderColor: '#DE8A17',
    position: 'relative',
    textAlign: 'center',
    marginRight: 8,
  },
  positionMedalGold: {
    backgroundColor: '#FCBD30',
    height: 45,
    width: 45,
    borderRadius: 10000,
    borderWidth: 3,
    borderColor: '#FFE06F',
    position: 'relative',
    textAlign: 'center',
    marginRight: 8,
  },
  positionMedalSilver: {
    backgroundColor: '#c7c5c5',
    height: 45,
    width: 45,
    borderRadius: 10000,
    borderWidth: 3,
    borderColor: '#efeeee',
    position: 'relative',
    textAlign: 'center',
    marginRight: 8,
  },
  positionMedalNumberGold: {
    position: 'absolute',
    left: 13,
    right: 0,
    top: 4,
    color: '#FFE06F',
    fontSize: 22,
  },
  positionMedalNumberSilver: {
    position: 'absolute',
    left: 13,
    right: 0,
    top: 4,
    color: '#efeeee',
    fontSize: 22,
  },
  positionMedalNumberBronze: {
    position: 'absolute',
    left: 13,
    right: 0,
    top: 4,
    color: '#824e07',
    fontSize: 22,
  },
  positionMedalNumber: {
    position: 'absolute',
    left: 13,
    right: 0,
    top: 4,
    color: '#FFE06F',
    fontSize: 22,
  },
  username: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: "bold"
  },
  total: {
    marginLeft: 'auto',
    fontSize: 22,
    color: colors.primary,
    fontWeight: "bold",
    marginRight: 10,
  }
});

export default Ranking;
