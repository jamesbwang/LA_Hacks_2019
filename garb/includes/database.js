import React from 'react';
import uuid from 'uuid/v1';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function oneElemArrToElem(arr) {
	var newArr = [];
	var i;
	for (i = 0; i < arr.length; i++)
	{
		newArr.push(arr[i][0])
	}
	return newArr;
}

export default class App extends React.Component {
	state = {
		isLoading: false,
		foodList: []
	};
	
	componentDidMount = () => {
		this.loadingFoods();
	};
	
	loadingFoods = async () => {
		try {
			const allFoods = await AsyncStorage.getItem('foodList') || 'none';
			this.setState({
				isLoading: true, //when does this turn false again?
				foodList: JSON.parse(allFoods) || []
			});
		} catch (error) {
			console.log(error.message);
		}
	};
	
	addNewFood = (foodName) => {
		try {
			this.setState(prevState => {
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
				prevState.foodList.push(newFood);
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
	}
	recordFoodList = (newFoodList) => {
		const saveResult = AsyncStorage.setItem('foodList', JSON.stringify(newFoodList))
	}
	deletefoodList = async () => {
		try {
			await AsyncStorage.removeItem('foodList');
			this.setState({ foodList: {} });
		} catch (error) {
			console.log(error.message);
		}
	}	
	render() {
		console.log(this.state.isLoading);
		console.log(this.state.foodList);
		return (
			this.state.isLoading ? (
				<View style={styles.container}>
				<Text style={styles.title}>Recent food</Text>
				<FlatList
					data={oneElemArrToElem(this.state.foodList.map(Object.values))}
					renderItem={
						({item}) => <Text>{item.name}</Text>
					}
					keyExtractor={(item, index) => index.toString()}
				/>
				</View>
			) : ( <Text>Loading...</Text> )
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 30
	},
	listText: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 30
	}
});