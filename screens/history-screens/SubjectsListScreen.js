import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	AsyncStorage,
	ActivityIndicator,
	SafeAreaView,
	RefreshControl,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import { Caption } from "react-native-paper";
import ListSubject from "../../components/listSubject";
import HeaderComponent from "../../components/Header";

import { db } from "../../src/config/db";

const SubjectsListScreen = ({ navigation }) => {
	const [valueData, setValueData] = useState([]);
	const [isLoad, setIsLoad] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		_fetchSubjectCode();
	}, []);

	const _fetchSubjectCode = async () => {
		try {
			setIsLoad(true);
			let username = await AsyncStorage.getItem("username");
			db.ref("Teachers/" + username + "/schedule/").on("value", (Snapshot) => {
				if (Snapshot.exists()) {
					let unique_array = [];
					let value_snapshot = Snapshot.val();
					for (let index = 0; index < value_snapshot.length; index++) {
						let element_first = Object.values(value_snapshot[index])[1];
						for (let y = 0; y < element_first.length; y++) {
							let element_second = Object.values(element_first[y])[2];
							unique_array.push(element_second);
						}
					}
					unique_array = [...new Set(unique_array)];
					let arrayInfoSubject = [];

					for (let i = 0; i < unique_array.length; i++) {
						let value_of_array = unique_array[i];
						db.ref("Subject/" + value_of_array + "/").on(
							"value",
							(Snapshot) => {
								if (Snapshot.exists()) {
									let value_subjectCode = Object.values(Snapshot.val())[2];
									let value_subjectName = Object.values(Snapshot.val())[3];
									arrayInfoSubject.push({
										subjectCode: value_subjectCode,
										subjectName: value_subjectName,
									});
								}
							}
						);
					}
					setValueData(arrayInfoSubject);
					setRefreshing(false);
					setTimeout(() => {
						setIsLoad(false);
					}, 1200);
				}
			});
		} catch (error) {}
	};

	const wait = (timeout) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	};

	const _onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => _fetchSubjectCode());
	}, []);

	const _renderRow = ({ item }) => {
		return (
			<ListSubject
				dataProps={item}
				onPress={() =>
					navigation.navigate("ClassScreen", {
						subjectCode: item.subjectCode,
					})
				}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent
				title="CHỌN MÔN HỌC"
				subTitle="Chọn một môn học để xem nhật kí điểm danh"
				onPress={() => navigation.goBack()}
			/>
			<View style={styles.content}>
				{isLoad ? (
					<Animatable.View animation="bounceIn" style={styles.centerScreen}>
						<ActivityIndicator color="#f08a5d" />
						<Caption>Đang tải danh sách</Caption>
					</Animatable.View>
				) : (
					<Animatable.View
						animation="slideInDown"
						style={{height: "100%"}}
					>
						<FlatList
							style={{flex: 1}}
							data={valueData}
							renderItem={_renderRow}
							keyExtractor={(i, k) => k.toString()}
							refreshControl={
								<RefreshControl
									refreshing={refreshing}
									onRefresh={_onRefresh}
								/>
							}
						/>
					</Animatable.View>
				)}
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
		padding: 4,
	},
	centerScreen: {
		flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default SubjectsListScreen;
