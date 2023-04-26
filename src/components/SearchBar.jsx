import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  Pressable,
} from "react-native";

export const SearchBar = ({ ingredients, setIngredients }) => {
  const [search, setSearch] = useState("");
  return (
    <View style={styles.searchComp}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search for ingredients"
          value={search}
          onChangeText={(text) => setSearch(text)}
          onSubmitEditing={() => {
            search.length > 0 && setIngredients([...ingredients, search]);
            setSearch("");
          }}
          blurOnSubmit={false}
          style={{
            flex: 1,
          }}
        />
        <Image
          source={require("../../assets/search-icon.png")}
          style={styles.searchIcon}
        />
      </View>
      <View style={styles.ingredientsList}>
        {ingredients.length > 0 &&
          ingredients.map((item, index) => (
            <Pressable
              key={index}
              style={styles.ingredient}
              onPress={() => {
                const updatedIngredients = ingredients.filter(
                  (ingredient, currentIndex) => currentIndex !== index
                );
                setIngredients(updatedIngredients);
              }}
            >
              <Text style={styles.ingredientText}>{item}</Text>
              <Image
                source={require("../../assets/delete-icon.png")}
                style={styles.deleteIcon}
              />
            </Pressable>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchComp: {
    width: "100%",
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    marginHorizontal: 10,
    height: 50,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
  },
  searchIcon: {
    width: 22,
    height: 22,
    marginRight: 15,
    opacity: 0.5,
  },
  ingredientsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginLeft: 10,
  },
  ingredient: {
    flexDirection: "row",
    backgroundColor: "#30C636",
    borderRadius: 7,
    height: 32,
    paddingHorizontal: 8,
    marginRight: 12,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ingredientText: {
    fontSize: 15,
    color: "#FFF",
  },
  deleteIcon: {
    width: 12,
    height: 12,
    marginLeft: 8,
    tintColor: "#FFF",
  },
});
