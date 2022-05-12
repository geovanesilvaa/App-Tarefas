import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  StyleSheet,
} from "react-native";

import Tasklist from "./src/components/TaskList/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  async function addTask() {
    if (newTask === "") {
      return;
    }

    const search = tasks.filter((tasks) => tasks === newTask);

    if (search.length !== 0) {
      Alert.alert("Houston temos um problema.", "Tarefa já adicionada");
      return;
    }

    setTasks([...tasks, newTask]);
    setNewTask("");

    Keyboard.dismiss();
  }

  async function deleteTask(item) {
    Alert.alert(
      "A tarefa será deletada!",
      "TEM CERTEZA DISSO?",
      [
        {
          text: "Cancelar!",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Ok!",
          onPress: () => setTasks(tasks.filter((tasks) => tasks !== item)),
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function loadData() {
      const tasks = await AsyncStorage.getItem("tasks");

      if (tasks) {
        setTasks(JSON.parse(tasks));
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    async function saveData() {
      AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    }
    saveData();
  }, [tasks]);

  return (
    <View style={styles.container}>
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={() => addTask()}>
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Tasklist item={item} deleteTask={deleteTask} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingHorizontal: 10,
    backgroundColor: "#D5D5D5",
  },
  containerTask: {
    flexDirection: "row",
    marginTop: 15,
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#141414",
    height: 45,
  },
  buttonAdd: {
    backgroundColor: "#141414",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
  },
});
