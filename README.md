# React Native Recipe App part 3

## Objectif

À la fin de ce Workshop, vous serez en mesure de :

- Implémenter l'API Spoonacular pour récupérer les données des recettes
- Afficher les recettes dans l'application
- Utiliser AsyncStorage pour sauvegarder les recettes favorites

## Introduction

### Présentation de l'API Spoonacular

L'API Spoonacular est un service web qui fournit des données liées aux recettes, aux ingrédients et à la nourriture en général. Pour l'utiliser, vous aurez besoin d'une clé API que vous pouvez obtenir en vous inscrivant gratuitement sur le site de [Spoonacular](https://spoonacular.com/food-api/).

### Présentation de AsyncStorage

AsyncStorage est une méthode simple de stockage de données non structurées. Elle fonctionne comme un système clé-valeur et permet de sauvegarder les données même lorsque l'application est fermée.

## Implémentation de l'API Spoonacular

### Obtention de la clé API

1. Inscrivez-vous sur le site [Spoonacular](https://spoonacular.com/food-api/)
2. Obtenez votre clé API à partir du tableau de bord de votre compte
3. Stockez la clé API dans un fichier `.env` pour sécuriser les informations sensibles

> ATTENTION ! Mettez bien votre fichier .env dans un .gitignore pour eviter de le partager publiquement et ainsi exposer vos clés API et autres informations sensibles.

### Installation des dépendances nécessaires

Pour utiliser l'API, nous aurons besoin d'Axios pour effectuer des requêtes HTTP :

```
npm install axios
```

Et installez également `react-native-dotenv` pour utiliser des variables d'environnement:

```
npm install react-native-dotenv
```

Modifiez le fichier babel.config.js pour qu'il ressemble à celui ci:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [["module:react-native-dotenv"]],
  };
};
```

### Configuration de l'API

Créez un fichier `api.js` dans le dossier `utils` de votre projet et configurez Axios pour interagir avec l'API Spoonacular :

```javascript
import axios from "axios";
import { API_KEY } from "@env";

const api = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  params: {
    apiKey: API_KEY,
  },
});

export default api;
```

### Utilisation de l'API pour récupérer les recettes

Implémentez l'API pour récupérer les données des recettes et les afficher dans l'application. Par exemple, vous pouvez récupérer une liste de recettes en fonction d'un mot-clé :

```javascript
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import api from "../utils/api";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await api.get("/complexSearch", {
        params: { query: "pasta" },
      });
      setRecipes(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <View>
      {recipes.map((recipe) => (
        <Text key={recipe.id}>{recipe.title}</Text>
      ))}
    </View>
  );
};

export default RecipeList;
```

> Regardez comment s'utilise le hook useEffect, vous en aurez besoin

### Implémentation de l'API dans le HomeScreen

Créez une state `recipes` que vous afficherez dans la `FlatList` au lieu de la data donnée en dur.

Nous utiliserons la route `/random` avec le paramètre `number: 20` par defaut quand aucune recherche n'a été lancée.

Quand la recherche est activée nous utiliserons la route `/complexsearch` avec le paramètre `query` en mettant tout les ingredients rentrés comme ceci `"tomato,garlic,spinach"`. les resultats de votre recherche updatera aussi la state `recipes`.

Faites passer l'id de la recette cliquée au RecipeScreen pour pouvoir recupérer la bonne donnée.

### Implémentation de l'api dans le RecipeScreen

Créez une state `recipe` qui stockera la donnée de la recette.

Utilisez la route `/{id}/information` et affichez les informations de la recette au lieu de la donnée en dur.

Utilisez la route `/{id}/analyzedInstructions` pour récupérer les étapes a suivre.

## Utilisation d'AsyncStorage pour sauvegarder les recettes favorites

Installez AsyncStorage en utilisant la commande suivante :

```
expo install @react-native-async-storage/async-storage
```

Vous pouvez utiliser AsyncStorage pour sauvegarder les recettes favorites de l'utilisateur. Par exemple, pour sauvegarder une recette en favoris, vous pouvez créer une fonction qui ajoute la recette à une liste de recettes favorites stockée dans AsyncStorage :

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveRecipe = async (recipe) => {
  try {
    const favorites = await AsyncStorage.getItem("favorites");

    let favoriteList = [];

    if (favorites !== null) {
      favoriteList = JSON.parse(favorites);
    }

    favoriteList.push(recipe);

    await AsyncStorage.setItem("favorites", JSON.stringify(favoriteList));
  } catch (error) {
    console.log(error);
  }
};
```

Pour récupérer la liste des recettes favorites de l'utilisateur, vous pouvez créer une fonction qui récupère les données stockées dans AsyncStorage :

```javascript
const fetchFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem("favorites");

    if (favorites !== null) {
      return JSON.parse(favorites);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
```

Vous pouvez ensuite utiliser ces fonctions pour sauvegarder et récupérer les recettes favorites dans vos composants, par exemple dans le composant `FavoritesScreen` :

```javascript
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchFavorites } from "../utils/asyncStorage";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites().then((favorites) => setFavorites(favorites));
  }, []);

  return (
    <View>
      {favorites.map((recipe) => (
        <Text key={recipe.id}>{recipe.title}</Text>
      ))}
    </View>
  );
};

export default FavoritesScreen;
```

## Bilan et prochaines étapes

Dans cette troisième partie, nous avons implémenté l'API Spoonacular pour récupérer les données des recettes et les afficher dans notre application. Nous avons également appris à utiliser AsyncStorage pour sauvegarder et récupérer les recettes favorites de l'utilisateur.

Vous pouvez maintenant continuer à améliorer votre application en ajoutant d'autres fonctionnalités, telles que la gestion des catégories de recettes, l'affichage des recettes en fonction des ingrédients disponibles, ou la possibilité de partager des recettes avec d'autres utilisateurs.
