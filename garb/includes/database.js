import React from 'react';
import uuid from 'uuid/v1';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export default class DatabaseScreen extends React.Component {
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
				isLoading: true,
				foodList: JSON.parse(allFoods) || {}
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
				console.log(this.state.foodList);
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
		const { isLoading, foodList } = this.state;
		if (isLoading == false)
		{
			this.addNewFood("Banana");
			this.addNewFood("Pineapple");
			this.addNewFood("Rotisserie Chicken");
			this.addNewFood("Cucumber");
			this.addNewFood("Cup Noodle");
			console.log(this.state.foodList.length);
		}
		return (
			isLoading ? (
				<View style={styles.container}>
				<Text style={styles.title}>Recent food</Text>
				<FlatList
					data={foodList}
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