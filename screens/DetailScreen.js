import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Paragraph, Button } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import * as Location from "expo-location";

import { db } from "../src/config/db";

// const fetchLocation = () => {};

const DetailScreen = () => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	let text = "Waiting..";
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location);
		console.log(location);
	}

	const writeData = (location) => {
		db.ref("Teachers/phamtuan_mc/")
			.update({ location })
			.then((data) => {
				console.log("data", data);
			})
			.catch((error) => {
				console.log("error", error);
			});
	};

	return (
		<View style={styles.container}>
			{/* Top Screen */}
			<View style={styles.topScreen}>
				<Paragraph>Chi tiết môn học đang giảng dạy</Paragraph>
				<Paragraph>{text}</Paragraph>
			</View>
			{/* Bottom Screen */}
			<View style={styles.bottomScreen}>
				<Button
					contentStyle={{ height: 54 }}
					mode="contained"
					color="#1E88E5"
					onPress={() => writeData(location)}
				>
					Mở điểm danh
				</Button>
			</View>
			<StatusBar style="light" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
	topScreen: {
		flex: 0.6,
	},
	bottomScreen: {
		flex: 0.4,
	},
});

export default DetailScreen;
