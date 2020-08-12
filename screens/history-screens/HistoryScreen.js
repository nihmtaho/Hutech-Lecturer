import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	AsyncStorage,
	ActivityIndicator,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import { StatusBar } from "expo-status-bar";
import HeaderComponent from "../../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { Text, Title, Caption } from "react-native-paper";
import Constants from "expo-constants";

import { db } from "../../src/config/db";

const HistoryScreen = ({ navigation }) => {
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
			<StatusBar style="auto" />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	},
	content: {
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

export default HistoryScreen;
