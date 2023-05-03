import { View, Text, StyleSheet } from "react-native";

const ShowIngredients = ({ ingredients }) => {
  console.log(ingredients);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <View style={styles.ingredientsContainer}>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredient}>
          <View style={styles.bulletPoint} />
          <Text style={styles.ingredientText} numberOfLines={0}>
            {capitalizeFirstLetter(ingredient.original)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ShowIngredients;

const styles = StyleSheet.create({
  ingredientsContainer: {
    flex: 1,
  },
  ingredient: {
    flexDirection: "row",
    // alignItems: "center",
    marginBottom: 15,
  },
  ingredientText: {
    fontSize: 18,
    fontWeight: "300",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  bulletPoint: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#30C636",
    marginTop: 3.5,
    marginRight: 8,
  },
});
