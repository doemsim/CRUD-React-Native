import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import App from "../authentication/Home";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name="Register"
                    component={Register}
                    options={{headerShown: false}} 
                />
                <Stack.Screen 
                    name="Home" 
                    component={App}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;