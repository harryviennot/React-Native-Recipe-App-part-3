import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  Image,
} from "react-native";

import { SearchBar } from "../components/SearchBar";
import { RecipeCard } from "../components/RecipeCard";

const recipes = [
  {
    id: 1,
    title: "Pasta with Garlic",
    image: require("../../assets/recipe-1.png"),
    imageType: "jpg",
    readyInMinutes: 45,
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    image: require("../../assets/recipe-2.png"),
    imageType: "jpg",
    readyInMinutes: 30,
  },
  {
    id: 3,
    title: "Tomato and Basil Soup",
    image: require("../../assets/recipe-3.png"),
    imageType: "jpg",
    readyInMinutes: 40,
  },
  {
    id: 4,
    title: "Veggie Stir Fry",
    image: require("../../assets/recipe-4.png"),
    imageType: "jpg",
    readyInMinutes: 25,
  },
  {
    id: 5,
    title: "Veggie Stir Fry",
    image: require("../../assets/recipe-4.png"),
    imageType: "jpg",
    readyInMinutes: 25,
  },
];

export const FavoritesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => <RecipeCard recipe={item} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Pressable
              style={styles.backIconContainer}
              onPress={() => navigation.navigate("Home")}
            >
              <Image
                source={require("../../assets/back-icon.png")}
                style={styles.backIcon}
              />
            </Pressable>
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>Favorites</Text>
          </View>
          <FlatList
            data={recipes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{
              width: "100%",
              justifyContent: "space-evenly",
            }}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 0,
    padding: 10,
    paddingRight: 30,
    justifyContent: "space-between",
    alignContent: "center",
  },
  backIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
  },
  backIcon: {
    width: 28,
    height: 24,
  },
});
