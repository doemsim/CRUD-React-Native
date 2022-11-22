import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet
} from "react-native";

import { AuthContext } from '../context/AuthContext';

const Register = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [visible, setVisible] = useState(false);

    const onChangeUsername = (value) => {
        setUsername(value);
    }

    const onChangePassword = (value) => {
        setPassword(value);
    }

    const onChangeEmail = (value) => {
        setEmail(value);
    }

    const register = async () => {
        var user = {
            "username": username,
            "password": password,
            "email": email
        }
        console.log(user, 'new user');
        if (username == "") {
            alert("Field title can't empty!");
        } else if (password == "") {
            alert("Field password can't empty!");
        }else if(email == ""){
            alert("Field email can't empty!");
        }else {
            await fetch("http:///localhost:3000/todo_api/signup.php/",
                {
                    method: 'POST',
                    body: JSON.stringify(
                        user
                    )
                }).then(async (response) => {       
                    navigation.navigate('Login')
                })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={username}
                    placeholder="Enter Username"
                    onChangeText={onChangeUsername}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Enter Password"
                    onChangeText={onChangePassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Enter Email"
                    onChangeText={onChangeEmail}
                />

                <Button
                    title="Register"
                    onPress={register}
                />

            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text> Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Login</Text>
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

export default Register;