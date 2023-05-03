import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const InfoWidget = ({ iconPath, color, number, unit }) => (
  <View style={[styles.infoWidget, { backgroundColor: color }]}>
    <View style={styles.infoWidgetIconContainer}>
      <Image source={iconPath} style={{ width: 35, height: 35 }} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.infoWidgetText}>{number}</Text>
      <Text style={styles.infoWidgetSubText}>{unit}</Text>
    </View>
  </View>
);

export default InfoWidget;

const styles = StyleSheet.create({
  infoWidget: {
    alignItems: "center",
    width: 70,
    height: 115,
    borderRadius: 50,
  },
  infoWidgetIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginTop: 5,
  },
  textContainer: {
    marginTop: 3,
    alignItems: "center",
  },
  infoWidgetText: {
    fontWeight: "600",
    fontSize: 17,
    color: "#fff",
  },
  infoWidgetSubText: {
    fontSize: 12,
    color: "#fff",
  },
});
