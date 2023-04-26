import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.nameContainer}>
      <Text style={styles.name}>Recipe App</Text>
      <Pressable
        style={styles.heartIconContainer}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Image
          source={require("../../assets/heart-icon.png")}
          style={styles.heartIcon}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 10,
  },
  heartIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 25,
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
});

export default HomeScreenHeader;
