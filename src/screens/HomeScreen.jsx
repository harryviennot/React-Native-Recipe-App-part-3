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
    title: "Crepes with Orange and Honey",
    image: require("../../assets/recipe-1.png"),
    imageType: "jpg",
    readyInMinutes: 45,
    score: 22.0,
    note: 83.0,
    servings: 4,
    extendedIngredients: [
      {
        aisle: "Milk, Eggs, Other Dairy",
        amount: 1.0,
        consitency: "solid",
        id: 1001,
        image: "butter-sliced.jpg",
        measures: {
          metric: {
            amount: 1.0,
            unitLong: "Tbsp",
            unitShort: "Tbsp",
          },
          us: {
            amount: 1.0,
            unitLong: "Tbsp",
            unitShort: "Tbsp",
          },
        },
        meta: [],
        name: "butter",
        original: "1 tbsp butter",
        originalName: "butter",
        unit: "tbsp",
      },
      {
        aisle: "Produce",
        amount: 2.0,
        consitency: "solid",
        id: 10011135,
        image: "cauliflower.jpg",
        measures: {
          metric: {
            amount: 473.176,
            unitLong: "milliliters",
            unitShort: "ml",
          },
          us: {
            amount: 2.0,
            unitLong: "cups",
            unitShort: "cups",
          },
        },
        meta: ["frozen", "thawed", "cut into bite-sized pieces"],
        name: "cauliflower florets",
        original:
          "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
        originalName:
          "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
        unit: "cups",
      },
      {
        aisle: "Cheese",
        amount: 2.0,
        consitency: "solid",
        id: 1041009,
        image: "cheddar-cheese.png",
        measures: {
          metric: {
            amount: 2.0,
            unitLong: "Tbsps",
            unitShort: "Tbsps",
          },
          us: {
            amount: 2.0,
            unitLong: "Tbsps",
            unitShort: "Tbsps",
          },
        },
        meta: ["grated", "(I used romano)"],
        name: "cheese",
        original: "2 tbsp grated cheese (I used romano)",
        originalName: "grated cheese (I used romano)",
        unit: "tbsp",
      },
      {
        aisle: "Oil, Vinegar, Salad Dressing",
        amount: 1.0,
        consitency: "liquid",
        id: 1034053,
        image: "olive-oil.jpg",
        measures: {
          metric: {
            amount: 1.0,
            unitLong: "Tbsp",
            unitShort: "Tbsp",
          },
          us: {
            amount: 1.0,
            unitLong: "Tbsp",
            unitShort: "Tbsp",
          },
        },
        meta: [],
        name: "extra virgin olive oil",
        original: "1-2 tbsp extra virgin olive oil",
        originalName: "extra virgin olive oil",
        unit: "tbsp",
      },
      {
        aisle: "Produce",
        amount: 5.0,
        consitency: "solid",
        id: 11215,
        image: "garlic.jpg",
        measures: {
          metric: {
            amount: 5.0,
            unitLong: "cloves",
            unitShort: "cloves",
          },
          us: {
            amount: 5.0,
            unitLong: "cloves",
            unitShort: "cloves",
          },
        },
        meta: [],
        name: "garlic",
        original: "5-6 cloves garlic",
        originalName: "garlic",
        unit: "cloves",
      },
      {
        aisle: "Pasta and Rice",
        amount: 6.0,
        consitency: "solid",
        id: 20420,
        image: "fusilli.jpg",
        measures: {
          metric: {
            amount: 170.097,
            unitLong: "grams",
            unitShort: "g",
          },
          us: {
            amount: 6.0,
            unitLong: "ounces",
            unitShort: "oz",
          },
        },
        meta: ["(I used linguine)"],
        name: "pasta",
        original: "6-8 ounces pasta (I used linguine)",
        originalName: "pasta (I used linguine)",
        unit: "ounces",
      },
      {
        aisle: "Spices and Seasonings",
        amount: 2.0,
        consitency: "solid",
        id: 1032009,
        image: "red-pepper-flakes.jpg",
        measures: {
          metric: {
            amount: 2.0,
            unitLong: "pinches",
            unitShort: "pinches",
          },
          us: {
            amount: 2.0,
            unitLong: "pinches",
            unitShort: "pinches",
          },
        },
        meta: ["red"],
        name: "red pepper flakes",
        original: "couple of pinches red pepper flakes, optional",
        originalName: "couple of red pepper flakes, optional",
        unit: "pinches",
      },
      {
        aisle: "Spices and Seasonings",
        amount: 2.0,
        consitency: "solid",
        id: 1102047,
        image: "salt-and-pepper.jpg",
        measures: {
          metric: {
            amount: 2.0,
            unitLong: "servings",
            unitShort: "servings",
          },
          us: {
            amount: 2.0,
            unitLong: "servings",
            unitShort: "servings",
          },
        },
        meta: ["to taste"],
        name: "salt and pepper",
        original: "salt and pepper, to taste",
        originalName: "salt and pepper, to taste",
        unit: "servings",
      },
      {
        aisle: "Produce",
        amount: 3.0,
        consitency: "solid",
        id: 11291,
        image: "spring-onions.jpg",
        measures: {
          metric: {
            amount: 3.0,
            unitLong: "",
            unitShort: "",
          },
          us: {
            amount: 3.0,
            unitLong: "",
            unitShort: "",
          },
        },
        meta: ["white", "green", "separated", "chopped"],
        name: "scallions",
        original: "3 scallions, chopped, white and green parts separated",
        originalName: "scallions, chopped, white and green parts separated",
        unit: "",
      },
      {
        aisle: "Alcoholic Beverages",
        amount: 2.0,
        consitency: "liquid",
        id: 14106,
        image: "white-wine.jpg",
        measures: {
          metric: {
            amount: 2.0,
            unitLong: "Tbsps",
            unitShort: "Tbsps",
          },
          us: {
            amount: 2.0,
            unitLong: "Tbsps",
            unitShort: "Tbsps",
          },
        },
        meta: ["white"],
        name: "white wine",
        original: "2-3 tbsp white wine",
        originalName: "white wine",
        unit: "tbsp",
      },
      {
        aisle: "Pasta and Rice",
        amount: 0.25,
        consitency: "solid",
        id: 99025,
        image: "breadcrumbs.jpg",
        measures: {
          metric: {
            amount: 59.147,
            unitLong: "milliliters",
            unitShort: "ml",
          },
          us: {
            amount: 0.25,
            unitLong: "cups",
            unitShort: "cups",
          },
        },
        meta: ["whole wheat", "(I used panko)"],
        name: "whole wheat bread crumbs",
        original: "1/4 cup whole wheat bread crumbs (I used panko)",
        originalName: "whole wheat bread crumbs (I used panko)",
        unit: "cup",
      },
    ],
    summary:
      'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire. One portion of this dish contains approximately <b>19g of protein </b>,  <b>20g of fat </b>, and a total of  <b>584 calories </b>. For  <b>$1.63 per serving </b>, this recipe  <b>covers 23% </b> of your daily requirements of vitamins and minerals. This recipe serves 2. It is brought to you by fullbellysisters.blogspot.com. 209 people were glad they tried this recipe. A mixture of scallions, salt and pepper, white wine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. From preparation to the plate, this recipe takes approximately  <b>45 minutes </b>. All things considered, we decided this recipe  <b>deserves a spoonacular score of 83% </b>. This score is awesome. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/cauliflower-gratin-with-garlic-breadcrumbs-318375">Cauliflower Gratin with Garlic Breadcrumbs</a>, < href="https://spoonacular.com/recipes/pasta-with-cauliflower-sausage-breadcrumbs-30437">Pasta With Cauliflower, Sausage, & Breadcrumbs</a>, and <a href="https://spoonacular.com/recipes/pasta-with-roasted-cauliflower-parsley-and-breadcrumbs-30738">Pasta With Roasted Cauliflower, Parsley, And Breadcrumbs</a>.',
    winePairing: {
      pairedWines: ["chardonnay", "gruener veltliner", "sauvignon blanc"],
      pairingText:
        "Chardonnay, Gruener Veltliner, and Sauvignon Blanc are great choices for Pasta. Sauvignon Blanc and Gruner Veltliner both have herby notes that complement salads with enough acid to match tart vinaigrettes, while a Chardonnay can be a good pick for creamy salad dressings. The Buddha Kat Winery Chardonnay with a 4 out of 5 star rating seems like a good match. It costs about 25 dollars per bottle.",
      productMatches: [
        {
          id: 469199,
          title: "Buddha Kat Winery Chardonnay",
          description:
            "We barrel ferment our Chardonnay and age it in a mix of Oak and Stainless. Giving this light bodied wine modest oak character, a delicate floral aroma, and a warming finish.",
          price: "$25.0",
          imageUrl: "https://spoonacular.com/productImages/469199-312x231.jpg",
          averageRating: 0.8,
          ratingCount: 1.0,
          score: 0.55,
          link: "https://www.amazon.com/2015-Buddha-Kat-Winery-Chardonnay/dp/B00OSAVVM4?tag=spoonacular-20",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    image: require("../../assets/recipe-2.png"),
    imageType: "jpg",
    readyInMinutes: 30,
    note: 90.0,
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
  {
    id: 6,
    title: "Veggie Stir Fry",
    image: require("../../assets/recipe-4.png"),
    imageType: "jpg",
    readyInMinutes: 25,
  },
  {
    id: 7,
    title: "Veggie Stir Fry",
    image: require("../../assets/recipe-4.png"),
    imageType: "jpg",
    readyInMinutes: 25,
  },
  {
    id: 8,
    title: "Veggie Stir Fry",
    image: require("../../assets/recipe-4.png"),
    imageType: "jpg",
    readyInMinutes: 25,
  },
  {
    id: 9,
    title: "Veggie Stir Fry",
    image: require("../../assets/recipe-4.png"),
    imageType: "jpg",
    readyInMinutes: 25,
  },
  {
    id: 10,
    title: "Veggie Stir Fry",
    image: require("../../assets/recipe-4.png"),
    imageType: "jpg",
    readyInMinutes: 25,
  },
];

export const HomeScreen = () => {
  const [ingredients, setIngredients] = useState([]);

  const renderItem = ({ item }) => <RecipeCard recipe={item} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <SearchBar
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
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
});
