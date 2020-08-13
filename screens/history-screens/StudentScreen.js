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
import {
	Text,
	Title,
	Caption,
	Divider,
	Subheading,
	Headline,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Constants from "expo-constants";

import { db } from "../../src/config/db";

const StudentScreen = ({ navigation, route }) => {
	const { classCode } = route.params;
	const { subjectCode } = route.params;
	const [dataStudent, setDataStudent] = useState([]);
	const [isLoad, setIsLoad] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		_fetchStudentObj();
		return;
	}, []);

	const _fetchStudentObj = () => {
		setIsLoad(true);
		db.ref("Subject/" + subjectCode + "/attendance/" + classCode + "/").on(
			"value",
			(Snapshot) => {
				if (Snapshot.exists()) {
					if (Snapshot.child("2020/").exists()) {
						let array_studentCode = [];
						let array_temp = [];
						let array_unique = [];
						let obj_value = Snapshot.child("2020/").val();
						for (const key in obj_value) {
							if (obj_value.hasOwnProperty(key)) {
								let obj_element = obj_value[key];
								for (const key in obj_element) {
									if (obj_element.hasOwnProperty(key)) {
										let obj_student = obj_element[key];
										for (const key in obj_student) {
											if (obj_student.hasOwnProperty(key)) {
												array_unique.push(key);
											}
										}
									}
								}
							}
						}
						array_temp = [...new Set(array_unique)];
						array_temp.forEach((element) => {
							db.ref("Students/" + element + "/").once("value", (Snapshot) => {
								if (Snapshot.exists()) {
									if (Snapshot.child("fullname").val()) {
                                        let fullname = Snapshot.child("fullname").val();
                                        array_studentCode.push({
                                            studentCode: element,
                                            fullname: fullname
                                        });
									} else {
										setRefreshing(false);
										setTimeout(() => {
											setIsLoad(false);
										}, 1000);
									}
								} else {
									setRefreshing(false);
									setTimeout(() => {
										setIsLoad(false);
									}, 1000);
								}
							});
							
						});
						setDataStudent(array_studentCode);
						setRefreshing(false);
						setTimeout(() => {
							setIsLoad(false);
						}, 1000);
					} else {
						console.log("--> not found object");
						setRefreshing(false);
						setTimeout(() => {
							setIsLoad(false);
						}, 1000);
					}
				} else {
					console.log("not found");
					setRefreshing(false);
					setTimeout(() => {
						setIsLoad(false);
					}, 1000);
				}
			}
		);
	};

	const _renderRow = ({ item, index }) => {
		return (
			<TouchableOpacity
				style={[
					styles.shadowColor,
					{ flex: 1, display: "flex", flexDirection: "column" },
				]}
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
					<Subheading style={{ textAlign: "center", color: "#fff" }}>
						{item.studentCode}
					</Subheading>
					<Text style={{ color: "#ffffff", textAlign: "center", fontWeight: "bold" }}>{item.fullname}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const wait = (timeout) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	};

	const _onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(1000).then(() => _fetchStudentObj());
	}, []);

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
					CHỌN SINH VIÊN
				</Title>
				<Caption style={{ textAlign: "center", marginTop: -6 }}>
					{/* Chọn một lớp để xem điểm danh của sinh viên */}
				</Caption>
			</View>
			<View style={styles.content}>
				{isLoad ? (
					<Animatable.View
						animation="bounceIn"
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<ActivityIndicator color="#96bb7c" />
						<Caption>Đang tải danh sách sinh viên</Caption>
					</Animatable.View>
				) : (
					<FlatList
						style={{ flex: 1 }}
						data={dataStudent}
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
});

export default StudentScreen;
