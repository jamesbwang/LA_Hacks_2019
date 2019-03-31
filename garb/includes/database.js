import React from "react";
import uuid from "uuid/v1";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Font } from "expo";

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function oneElemArrToElem(arr) {
  var newArr = [];
  var i;
  for (i = 0; i < arr.length; i++) {
    newArr.push(arr[i][0]);
  }
  return newArr;
}

var tempCheckValues = [];

export default class DatabaseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textstring: this.props.navigation.state.params.text // Desantizied output from Google Vision API via reader.js
    };
  }

  state = {
    isLoading: false,
    foodList: [],
    fontLoaded: false,
    checkBoxChecked: []
  };

  realCount = 0;
  expectedCount = 0;

  // For future mass delete feature?
  checkBoxChanged(id, value) {
    this.setState({
      checkBoxChecked: tempCheckValues
    });
    var tempCheckBoxChecked = this.state.checkBoxChecked;
    tempCheckBoxChecked[id] = !value;
    this.setState({
      checkBoxChecked: tempCheckBoxChecked
    });
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      "Merriweather-Bold": require("./assets/fonts/Merriweather-Bold.ttf")
    });
    this.setState({ fontLoaded: true });
    /* Add/remove foods here */
    this.addNewFood("Banana");
    this.addNewFood("Pineapple");
    this.addNewFood("Rotisserie Chicken");
    this.addNewFood("Cucumber");
    this.addNewFood("Cup Noodle");
    var appleObject = this.addNewFood("Apple");
    this.addNewFood("Chick-fil-A sandwich");
    this.removeFood(this.appleObject);
    this.addNewFood("Bibimbap");
    this.addNewFood("Peking duck");
    this.addNewFood("Passionfruit");
    this.addNewFood("Bok Choy");
    this.addNewFood("Fried Tofu");
    this.addNewFood("Iced Tea");
  };

  loadingFoods = async () => {
    try {
      const allFoods = await AsyncStorage.getItem("foodList");
      if (allFoods !== null) {
        this.setState({
          isLoading: true,
          foodList: JSON.parse(allFoods)
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  removeFood = foodObject => {
    try {
      this.expectedCount += 1;
      this.setState(prevState => {
        prevState.foodList.splice(prevState.foodList.indexOf(foodObject), 1);
        const newFoodList = prevState.foodList;
        const newState = {
          ...prevState,
          foodList: newFoodList
        };
        this.recordFoodList(newState.foodList);
        //return { ...newState };
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  addNewFood = foodName => {
    try {
      this.expectedCount += 1;
      const id = uuid();
      const newFood = {
        [id]: {
          id,
          name: foodName,
          datePurchased: Date.now(),
          dateExpire: Date.now(),
          percentWaste: 0,
          isGone: false
        }
      };
      this.setState(prevState => {
        prevState.foodList.push(newFood);
        const newFoodList = prevState.foodList;
        const newState = {
          ...prevState,
          foodList: newFoodList
        };
        this.recordFoodList(newState.foodList);
        //return { ...newState };
      });
      return newFood;
    } catch (error) {
      console.log(error.message);
    }
  };

  recordFoodList = async newFoodList => {
    try {
      const saveResult = await AsyncStorage.setItem(
        "foodList",
        JSON.stringify(newFoodList)
      );
      if (saveResult !== null) {
        this.setState({
          isLoading: true,
          foodList: JSON.parse(allFoods)
        });
      }
      this.realCount += 1;
      if (this.realCount == this.expectedCount) {
        this.setState({
          isLoading: false,
          foodList: this.state.foodList
        });
        this.render();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  deletefoodList = async () => {
    try {
      await AsyncStorage.removeItem("foodList");
      this.setState({
        isLoading: true,
        foodList: []
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleCheck = foodObject => {
    Alert.alert(
      "Finish Food Confirmation",
      "Confirm finishing off of " + foodObject.name + "?",
      [
        { text: "Nope", onPress: () => console.log("No") },
        { text: "Confirmed", onPress: () => console.log("Yes") }
      ],
      { cancelable: false }
    );
    this.removeFood(foodObject);
  };

  sanitize(input) {
    api_url = "http://35.243.135.194";

    params = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: FormData({
        ocrtext: this.state.textstring
      })
    };

    return fetch(api_uri, params)
      .then(response => {
        this.state.array = {};
        console.log("[LOG] Response generated from Python server.");
        console.log(response);
        this.state.sanitized = response;
        return response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return this.state.isLoading ? (
      <Text>Loading...</Text>
    ) : (
      <View style={styles.container}>
        <View style={styles.foodListTitle}>
          {this.state.fontLoaded ? (
            <Text style={styles.titleText}>Recent food</Text>
          ) : null}
        </View>
        <FlatList
          data={oneElemArrToElem(this.state.foodList.map(Object.values))}
          renderItem={
            ({ item }) => (
              <View style={styles.listItems}>
                <Text style={styles.foodText}>{item.name}</Text>
                <CheckBox
                  title="Finished?"
                  iconRight
                  iconType="material"
                  checkedIcon="check-box"
                  uncheckedIcon="check-box-outline-blank"
                  onPress={() => this.handleCheck(item)}
                />
              </View>
            )
            /*<Button style={styles.finButton}
							title='Finished?'
							onPress={() => this.handleCheck(item)}
						/>*/
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  foodListTitle: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: 20,
    paddingBottom: 5
  },
  finButton: {
    margin: 5
  },
  titleText: {
    color: "black",
    fontFamily: "serif",
    textAlign: "right",
    alignSelf: "stretch",
    fontWeight: "bold",
    fontSize: 40
  },
  listItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  foodText: {
    color: "black",
    fontFamily: "serif",
    fontSize: 18
  }
});
