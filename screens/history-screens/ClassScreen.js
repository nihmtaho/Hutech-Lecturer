import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	AsyncStorage,
	ActivityIndicator,
	TouchableOpacity,
	SafeAreaView,
	RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Text, Title, Caption } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Constants from "expo-constants";

import { db } from "../../src/config/db";

const ClassScreen = ({ navigation, route }) => {
	const { subjectCode } = route.params;
	const [dataClass, setDataClass] = useState([]);
	const [isLoad, setIsLoad] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		_fetchClassObj();
	}, []);

	const wait = (timeout) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	};

	const _onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => _fetchClassObj());
	}, []);

	const _fetchClassObj = async () => {
		try {
			setIsLoad(true);
			db.ref("Subject/" + subjectCode + "/attendance/").once(
				"value",
				(Snapshot) => {
					if (Snapshot.exists()) {
						let array_temp = [];
						for (const key in Snapshot.val()) {
							array_temp.push({
								keyClass: key,
							});
						}
						setDataClass(array_temp);
						setRefreshing(false);
						setTimeout(() => {
							setIsLoad(false);
						}, 1000);
					} else {
						console.log("not found");
						setRefreshing(false);
						setTimeout(() => {
							setIsLoad(false);
						}, 1000);
					}
				}
			);
		} catch (error) {}
	};

	const _renderRow = ({ item, index }) => {
		return (
			<TouchableOpacity
				style={[
					styles.shadowColor,
					{ flex: 1, display: "flex", flexDirection: "column" },
				]}
				onPress={() =>
					navigation.push("StudentScreen", {
						classCode: item.keyClass,
						subjectCode: subjectCode,
					})
				}
			>
				<View
					style={{
						backgroundColor: "#96bb7c",
						marginVertical: 8,
						marginHorizontal: 8,
						paddingVertical: 12,
						borderRadius: 14,
					}}
				>
					<Title style={{ textAlign: "center", color: "#fff" }}>
						{item.keyClass}
					</Title>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentHeader}>
				<TouchableOpacity
					style={styles.customTouch}
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="md-arrow-round-back" size={26} color="#fff" />
				</TouchableOpacity>
				<Title style={{ color: "#fff", textAlign: "center" }}>
					CHỌN LỚP HỌC
				</Title>
				<Caption style={{ textAlign: "center", marginTop: -6 }}>
					Chọn một lớp để xem điểm danh của sinh viên
				</Caption>
			</View>
			<View style={styles.content}>
				{isLoad == true ? (
					<Animatable.View animation="bounceIn" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
						<ActivityIndicator color="#96bb7c" />
						<Caption>Đang tải danh sách các lớp</Caption>
					</Animatable.View>
				) : (
					<FlatList
						style={{ flex: 1 }}
						data={dataClass}
						renderItem={_renderRow}
						numColumns={2}
						keyExtractor={(item, index) => index.toString()}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
						}
					/>
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
	contentHeader: {
		backgroundColor: "#96bb7c",
		paddingTop: Constants.statusBarHeight + 8,
		height: 110,
		borderBottomStartRadius: 32,
		borderBottomEndRadius: 32,
		display: "flex",
		justifyContent: "flex-end",
		paddingBottom: 8,
		elevation: 4,
	},
	customTouch: {
		position: "absolute",
		top: Constants.statusBarHeight,
		left: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 999,
		zIndex: 999,
	},
	shadowColor: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
	},
});

export default ClassScreen;
