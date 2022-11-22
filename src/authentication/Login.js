import React, { useContext, useState } from 'react';
import {
    Button, 
    Text, 
    TextInput,
    TouchableOpacity,
    View, 
    StyleSheet,
    text
} from "react-native";
import { AuthContext } from '../context/AuthContext';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    const onChangeUsername = (value) => {
        setUsername(value);
    }

    const onChangePassword = (value) => {
        setPassword(value);
    }

    const onChangeEmail = (value) => {
        setEmail(value);
    }

    const login = async () => {
        var user = {
            "password": password,
            "email": email
        }
        console.log(user, 'new user');
        if (email =="") {
            alert("Field email can't empty!");
        } else if (password == "") {
            alert("Field password can't empty!");
        } else {
            await fetch("http:///localhost:3000/todo_api/login.php/",
                {
                    method: 'POST',
                    body: JSON.stringify(
                        user
                    )
                }).then(async (response) => {       
                    navigation.navigate('Home')
                })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    onChangeText={onChangePassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    onChangeText={onChangeEmail}
                />
                <Button
                    title="Login"
                    onPress={login}
                />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text> Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    link: {
        color: 'blue',
    },
});

export default Login;