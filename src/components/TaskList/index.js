import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function TaskList({ item, deleteTask }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => deleteTask(item)}
      >
        <Feather name="trash" color="#FFF" size={20} />
      </TouchableOpacity>

      <View style={{ paddingRight: 10 }}>
        <TouchableWithoutFeedback>
          <Text style={{ color: "#FFF", paddingRight: 10 }}>{item}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#121212",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
  },
});
