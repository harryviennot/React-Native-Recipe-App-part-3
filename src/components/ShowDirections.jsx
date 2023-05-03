import { View, Text, StyleSheet } from "react-native";

const ShowDirections = ({ directions }) => {
  console.log(directions);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <View style={styles.directionsContainer}>
      {directions.steps.map((step) => (
        <View key={step.number} style={styles.ingredient}>
          <View style={styles.bulletPoint} />
          <Text style={styles.ingredientText} numberOfLines={0}>
            {step.step}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ShowDirections;

const styles = StyleSheet.create({
  directionsContainer: {
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
