import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import SettingScreen from "../../screens/SettingScreen";
import SubjectsListScreen from "../../screens/history-screens/SubjectsListScreen";
import HistoryScreen from "../../screens/history-screens/HistoryScreen";
import ClassScreen from "../../screens/history-screens/ClassScreen";
import StudentScreen from "../../screens/history-screens/StudentScreen";

const SettingStack = createStackNavigator();

const settingStack = ({ route, navigation }) => {
	return (
		<SettingStack.Navigator
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: "horizontal",
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<SettingStack.Screen
				name="Setting"
				component={SettingScreen}
				options={{ title: "Tài khoản", headerShown: false }}
			/>
			<SettingStack.Screen
				name="SubjectList"
				component={SubjectsListScreen}
				options={{
					title: "Môn học",
					headerShown: false,
					headerTitleAlign: "center",
				}}
			/>
			<SettingStack.Screen
				name="HistoryScreen"
				component={HistoryScreen}
				options={{
					headerShown: false,
					headerTitleAlign: "center",
				}}
			/>
			<SettingStack.Screen
				name="ClassScreen"
				component={ClassScreen}
				options={{
					headerShown: false,
					headerTitleAlign: "center",
				}}
			/>
			<SettingStack.Screen
				name="StudentScreen"
				component={StudentScreen}
				options={{
					headerShown: false,
					headerTitleAlign: "center",
					...TransitionPresets.ModalSlideFromBottomIOS
				}}
			/>
		</SettingStack.Navigator>
	);
};

export default settingStack;
