import React from "react";
import {View, Text, StyleSheet} from "react-native";
import colors from "../../constants/colors";

const Rewards = () => {
  return (
  <View style={styles.display}>
    <Text style={styles.title}>Recompensas</Text>
    <Text>Espaço para recompensas</Text>
  </View>
)};

const styles = StyleSheet.create({
  display: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center'
  },
  title: {
    color: colors.primary,
    fontSize: 22,
    marginTop: 100,
    marginBottom: 32,
    fontWeight: "bold",
  },
})
export default Rewards
