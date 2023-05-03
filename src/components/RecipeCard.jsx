import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const RecipeCard = ({ recipe }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.recipeCard}
      onPress={() => navigation.navigate("Recipe", { recipe })}
    >
      <Image source={recipe.image} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTime}>{recipe.readyInMinutes} min</Text>
        <Text style={styles.recipeTitle} numberOfLines={2} ellipsizeMode="tail">
          {recipe.title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    width: 165,
    height: 202,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  recipeImage: {
    width: "100%",
    height: 127,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  recipeInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  recipeTime: {
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.6,
  },
  recipeTitle: {
    fontSize: 15,
    fontWeight: "bold",
    flexWrap: "wrap",
    overflow: "hidden",
  },
});
