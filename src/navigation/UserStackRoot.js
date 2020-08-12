import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import ProfileScreen from "../../screens/ProfileScreen";
import BugScreen from "../../screens/bug-a-help-screens/BugScreen";

import MainTab from "./TabStackMain";

const UserStack = createStackNavigator();

const UserStackRoot = () => {
	return (
		<UserStack.Navigator
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: "horizontal",
				...TransitionPresets.SlideFromRightIOS,
			}}
		>
			<UserStack.Screen
				name="MainTab"
				component={MainTab}
				options={{ headerShown: false }}
			/>
			<UserStack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					headerShown: false,
					...TransitionPresets.FadeFromBottomAndroid,
				}}
			/>
			<UserStack.Screen
				name="BugScreen"
				component={BugScreen}
				options={{
					title: "Báo lỗi",
					headerShown: false,
					headerTitleAlign: "center",
				}}
			/>
		</UserStack.Navigator>
	);
};

export default UserStackRoot;
