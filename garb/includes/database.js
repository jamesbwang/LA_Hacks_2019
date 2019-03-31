import React from "react";
import uuid from "uuid/v1";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  AsyncStorage
} from "react-native";

//import Input from './components/Input';

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

export default class App extends React.Component {
  state = {
    isLoading: false,
    foodList: []
  };

  realCount = 0;
  expectedCount = 0;

  componentDidMount = () => {
    /* Add/remove foods here */
    // this.addNewFood("Banana");
    // this.addNewFood("Pineapple");
    // this.addNewFood("Rotisserie Chicken");
    //this.addNewFood("Cucumber");
    //this.addNewFood("Cup Noodle");
    // var appleObject = this.addNewFood("Apple");
    // this.addNewFood("Chick-fil-A sandwich");
    // this.removeFood(appleObject);
    /*this.addNewFood("Bibimbap");
		this.addNewFood("Peking duck");
		this.addNewFood("Passionfruit");
		this.addNewFood("Bok Choy");
		this.addNewFood("Fried Tofu");
		this.addNewFood("Iced Tea");
		*/
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
  render() {
    return this.state.isLoading ? (
      <Text>Loading...</Text>
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>Recent food</Text>
        <FlatList
          data={oneElemArrToElem(this.state.foodList.map(Object.values))}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30
  },
  listText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30
  }
});
