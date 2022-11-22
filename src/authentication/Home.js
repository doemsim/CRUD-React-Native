
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, TextInput, Modal } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [hideID, setID] = useState(null);


  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch("http://localhost:3000/todo_api/get_all_tasks.php");
    const tbl_todo = await resp.json();
    setData(tbl_todo.tbl_todo);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (item) => {
    const resp = await fetch("http://localhost:3000/todo_api/delete_task.php/",
      {
        method: 'DELETE',
        body: JSON.stringify({
          ID: item.ID
        })
      }).then(() => {
        const filter = data.filter((t) => t.ID !== item.ID)
        setData(filter)
      })
  }

  const handleVisibleModal = () => {
    setVisible(!visible)
    setID(null)
  }

  const onChangeTitle = (value) => {
    setTitle(value.nativeEvent.text)
  }

  const onChangeDescription = (value) => {
    setDescription(value.nativeEvent.text)
  }

  const handleSave = async () => {
    if (hideID == null) {
      var todo = {
        "title": title,
        "description": description
      }
      if(title == ""){
        alert("Field title can't empty!");
      }else if(description == ""){
        alert("Field description can't empty!");
      }else{
        await fetch("http://localhost:3000/todo_api/create_task.php/",
        {
          method: 'POST',
          body: JSON.stringify(
              todo
          )
        }).then(async (response) => {
          const resp = await fetch("http://localhost:3000/todo_api/get_all_tasks.php");
          const tbl_todo = await resp.json();
          setData(tbl_todo.tbl_todo);
          setVisible(false)
        })
      }
      
    } else {
      var todo = {
        "ID": hideID,
        "title": title,
        "description": description
      }
      await fetch("http://localhost:3000/todo_api/update_task.php/",
        {
          method: 'POST',
          body: JSON.stringify(
            todo
          )
        }).then(async (response) => {
          const resp = await fetch("http://localhost:3000/todo_api/get_all_tasks.php");
          const tbl_todo = await resp.json();
          setData(tbl_todo.tbl_todo);
          setVisible(false)
        })
    }
  }



  const handleEdit = (item) => {
    setVisible(true)
    setID(item.ID)
    setTitle(item.title)
    setDescription(item.description)
  }

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text style={styles.txt_main}>Todo List {data.length}</Text>
        <TouchableOpacity onPress={handleVisibleModal} style={styles.btnNewContainer}>
          <Text style={styles.textButton}>Add New</Text>
        </TouchableOpacity>
      </View>
      {hideID == null ?
        <Modal animationType="slide" visible={visible}>
          <SafeAreaView>
            <View style={styles.form}>

              <TouchableOpacity onPress={handleVisibleModal}>
                <Text style={styles.txtClose}>Close</Text>
              </TouchableOpacity>

              <TextInput
                //value={title}
                style={styles.text_input}
                placeholder="Title"
                onChange={onChangeTitle}
              />
              <TextInput
                //value={description}
                style={styles.text_input}
                placeholder="Description"
                onChange={onChangeDescription}
              />
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.textButton}>
                   Save
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

        </Modal>
        :
        <Modal animationType="slide" visible={visible}>
          <SafeAreaView>
            <View style={styles.form}>

              <TouchableOpacity onPress={handleVisibleModal}>
                <Text style={styles.txtClose}>Close</Text>
              </TouchableOpacity>

              <TextInput
                value={title}
                style={styles.text_input}
                placeholder="Title"
                onChange={onChangeTitle}
              />
              <TextInput
                value={description}
                style={styles.text_input}
                placeholder="Description"
                onChange={onChangeDescription}
              />
              <TouchableOpacity onPress={handleSave}>
                <Text  style={styles.textButton}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

        </Modal>}

      <ScrollView>
        {data.map((item, index) => {
          return (
            <View style={styles.item_course} key={index}>
              <View>
                <Text style={styles.txt_name}>{index + 1}. {item.title}</Text>
                <Text style={styles.txt_item}>{item.description}</Text>
                <Text style={styles.txt_item}>{item.date}</Text>
              </View>

              <View>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Text style={styles.txt_delete}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleEdit(item)} >
                  <Text style={styles.txt_delete}>Edit</Text>
                </TouchableOpacity>

              </View>
            </View>
          )
        })}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  header_container: {
    padding: 15,
    backgroundColor: "#eeeeee"
  },

  txt_main: {
    fontSize: 22,
    fontWeight: "bold"
  },

  item_course: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  txt_item: {
    fontSize: 14,
    marginTop: 5
  },

  txt_name: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: "bold"
  },

  txt_name: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: "bold"
  },

  txt_delete: {
    fontSize: 14,
    marginTop: 5,
    color: "red",
    fontWeight: "bold"
  },

  txt_edit: {
    fontSize: 14,
    marginTop: 5,
    color: "blue",
    fontWeight: "bold"
  },

  form: {
    padding: 15,
    // backgroundColor: "#e2e2e2",
    marginTop: 20
  },

  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 10
  },

  txtClose: {
    fontSize: 10,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "right"
  },

  textButton: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    backgroundColor: "#04AA6D",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
    //marginLeft: 300,
  },
})

export default App;