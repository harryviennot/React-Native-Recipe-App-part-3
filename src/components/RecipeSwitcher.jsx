import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";

// const styles = {
//   button: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#000000",
//   },
//   animated: {
//     position: "absolute",
//   },
// };

const RecipeSwitcher = ({ initial, options, onPress }) => {
  const [selected, setSelected] = useState(initial);
  const [parentWidth, setParentWidth] = useState(0);
  const animatedValue = useRef(
    new Animated.Value(initial ? initial / options.length : 0)
  ).current;

  useEffect(() => {
    animate();
  }, [selected]);

  const animate = () => {
    Animated.timing(animatedValue, {
      toValue: selected / options.length,
      duration: 270,
      useNativeDriver: true,
    }).start();
  };

  const toggleItem = (index) => {
    setSelected(index);
    onPress(options[index].value);
  };

  const optionsMap = options.map((element, index) => {
    const isSelected = selected === index;

    return (
      <TouchableOpacity
        key={index}
        style={styles.button}
        onPress={() => toggleItem(index)}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            textAlign: "center",
            color: isSelected ? "#fff" : "#000",
          }}
        >
          {element.label}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={[
              {
                height: "110%",
                backgroundColor: "#30C636",
                width: "50%",
                borderRadius: 50,
                transform: [
                  {
                    translateX: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, parentWidth],
                    }),
                  },
                ],
              },
              styles.animated,
            ]}
          />
          {optionsMap}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    borderWidth: 3,
    borderColor: "#30C636",
    borderRadius: 50,
  },
  button: {
    flex: 1,
    height: 35,
    borderRadius: 50,
    // backgroundColor: "#30C636",
    justifyContent: "center",
    alignItems: "center",
  },
  animated: {
    position: "absolute",
  },
});

export default RecipeSwitcher;
