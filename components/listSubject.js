import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function listSubject(props) {
	const data = props.dataProps;

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={props.onPress}
			style={[styles.container, styles.shadowColor]}
		>
			<View style={styles.divContent}>
				<Text style={(styles.titleStyle, styles.fontSize)}>
					{data.subjectName}
				</Text>
			</View>
			<View style={styles.mountContent}>
				<View style={styles.mountLeft}>
					<Text style={styles.titleStyle}>Mã môn: {data.subjectCode} </Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f08a5d",
		padding: 12,
		marginVertical: 6,
		marginHorizontal: 10,
		borderRadius: 14,
	},
	divContent: {
		display: "flex",
		flexDirection: "row",
		marginVertical: 2,
	},
	rightContent: {
		flex: 1,
		marginTop: 8,
	},
	mountContent: {
		display: "flex",
		flexDirection: "row",
		borderTopWidth: 0.5,
		borderTopColor: "#fff",
		paddingTop: 4,
		marginTop: 4,
	},
	mountLeft: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	titleStyle: {
		fontSize: 14,
		// fontWeight: "bold",
		color: "#fff",
	},
	fontSize: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#fff",
	},
	shadowColor: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
});

export default listSubject;
