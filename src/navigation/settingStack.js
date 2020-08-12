import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import SettingScreen from "../../screens/SettingScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SubjectsListScreen from "../../screens/history-screens/SubjectsListScreen";
import BugScreen from "../../screens/bug-a-help-screens/BugScreen";
import HistoryScreen from '../../screens/history-screens/HistoryScreen';

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
		</SettingStack.Navigator>
	);
};

export default settingStack;
