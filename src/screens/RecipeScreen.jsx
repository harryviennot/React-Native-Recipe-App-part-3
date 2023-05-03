import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";

import InfoWidget from "../components/RecipeWidget";
import { getColorByScore } from "../utils/colorByScore";
import RecipeSwitcher from "../components/RecipeSwitcher";
import ShowIngredients from "../components/ShowIngredients";
import ShowDirections from "../components/ShowDirections";

const directions = {
  name: "",
  steps: [
    {
      number: 1,
      step: "Preheat the oven to 200 degrees F.",
    },
    {
      number: 2,
      step: "Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl.",
    },
    {
      number: 3,
      step: "Whisk together the eggs, buttermilk, butter and vanilla extract and vanilla bean in a small bowl.",
    },
    {
      number: 4,
      step: "Add the egg mixture to the dry mixture and gently mix to combine. Do not overmix.",
    },
    {
      number: 5,
      step: "Let the batter sit at room temperature for at least 15 minutes and up to 30 minutes before using.",
    },
    {
      number: 6,
      step: "Heat a cast iron or nonstick griddle pan over medium heat and brush with melted butter. Once the butter begins to sizzle, use 2 tablespoons of the batter for each pancake and cook until the bubbles appear on the surface and the bottom is golden brown, about 2 minutes, flip over and cook until the bottom is golden brown, 1 to 2 minutes longer.",
    },
    {
      number: 7,
      step: "Transfer the pancakes to a platter and keep warm in a 200 degree F oven.",
    },
    {
      number: 8,
      step: "Serve 6 pancakes per person, top each with some of the bourbon butter.",
    },
    {
      number: 9,
      step: "Drizzle with warm maple syrup and dust with confectioners' sugar.",
    },
    {
      number: 10,
      step: "Garnish with fresh mint sprigs and more toasted pecans, if desired.",
    },
  ],
};

export const RecipeScreen = ({ navigation, route }) => {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showIngredients, setShowIngredients] = useState(true);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <ImageBackground
          source={recipe.image}
          resizeMode="cover"
          style={{ width: "100%", height: 300 }}
        >
          <View style={styles.header}>
            <View style={styles.headerBar}>
              <Pressable
                style={styles.iconContainer}
                onPress={() => navigation.navigate("Home")}
              >
                <Image
                  source={require("../../assets/back-icon.png")}
                  style={styles.backIcon}
                />
              </Pressable>
              <Pressable
                style={styles.iconContainer}
                onPress={() => navigation.navigate("Home")}
              >
                <Image
                  source={require("../../assets/heart-icon.png")}
                  style={styles.heartIcon}
                />
              </Pressable>
            </View>
            <View style={styles.semiOval}>
              <View style={styles.scrollBar} />
            </View>
          </View>
        </ImageBackground>
        <View style={styles.recipeInfo}>
          <View style={styles.recipeTitleContainer}>
            <Text
              style={styles.recipeTitle}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {recipe.title}
            </Text>
            <View style={styles.recipeNoteContainer}>
              <Image
                source={require("../../assets/star-icon.png")}
                style={{ width: 17.5, height: 16.7 }}
              />
              <Text style={styles.recipeNote}>{(recipe.note * 5) / 100}</Text>
            </View>
          </View>
          <View style={styles.recipeWidgets}>
            <InfoWidget
              iconPath={require("../../assets/clock-icon.png")}
              color="#30C636"
              number={45}
              unit="mins"
            />
            <InfoWidget
              iconPath={require("../../assets/shield-icon.png")}
              color={getColorByScore(recipe.score)}
              number={recipe.score}
              unit="score"
            />
            <InfoWidget
              iconPath={require("../../assets/user-icon.png")}
              color="#30C636"
              number={recipe.servings}
              unit="servings"
            />
          </View>
          <RecipeSwitcher
            initial={0}
            options={[
              { label: "Ingredients", value: "Ingredients" },
              { label: "Directions", value: "Directions" },
            ]}
            onPress={(value) => setShowIngredients(value === "Ingredients")}
          />
          <View style={styles.recipeDetail}>
            {showIngredients ? (
              <ShowIngredients ingredients={recipe.extendedIngredients} />
            ) : (
              <ShowDirections directions={directions} />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  headerBar: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 55,
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 28,
    height: 24,
  },
  heartIcon: {
    width: 26,
    height: 26,
  },
  semiOval: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderTopLeftRadius: Dimensions.get("window").width / 2,
    borderTopRightRadius: Dimensions.get("window").width / 2,
    overflow: "hidden",
    alignItems: "center",
    paddingTop: 15,
  },
  scrollBar: {
    width: 50,
    height: 5,
    backgroundColor: "#D9D9D9",
    borderRadius: 50,
  },
  recipeInfo: {
    width: "100%",
    paddingHorizontal: 20,
  },
  recipeTitleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recipeNoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 90,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#30C636",
    paddingHorizontal: 10,
  },
  recipeNote: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  recipeTitle: {
    width: "70%",
    fontSize: 22,
    flexWrap: "wrap",
    fontWeight: "bold",
  },
  recipeWidgets: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  recipeDetail: {
    marginTop: 40,
    margin: 16,
    marginRight: 20,
  },
});
