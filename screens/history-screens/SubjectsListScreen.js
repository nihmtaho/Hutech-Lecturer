import React, { useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	AsyncStorage,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ListSubject from "../../components/listSubject";
import HeaderComponent from "../../components/Header";

const renderRow = ({ item, index }) => {
	return <ListSubject />;
};

const SubjectsListScreen = ({ navigation }) => {
	//    const

	return (
		<View>
			<HeaderComponent
				title="CHỌN MÔN HỌC"
				subTitle="Chọn một môn học để xem nhật kí điểm danh"
				onPress={() => navigation.goBack()}
			/>
			<StatusBar style="auto" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default SubjectsListScreen;
