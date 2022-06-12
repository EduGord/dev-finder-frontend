import React, {useContext, useState} from "react";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {Text, TextInput, View} from '../components/Themed';
import {RootTabScreenProps} from "../types";
import {AuthContext} from "../contexts/AuthContext";
import HomeScreen from "./HomeScreen";


export default function AuthScreen({navigation}: RootTabScreenProps<'Authenticate'>) {
    const authCtx = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function _onPress() {
        if (username === "" || password === "") {
            setError("Both email and password fields are required");
        } else {
            setError("");
            await authCtx.authenticate(username, password)
                .then(() => navigation.navigate('Home', {screen: 'Index'}))
                .catch((err) => {console.error(err)});
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/images/logo.png")}/>
            <View style={styles.signInFormContainer}>
                <View style={styles.inputContainer} lightColor="#FFC0CB" darkColor="rgba(255,255,255,0.1)">
                    <TextInput
                        style={styles.textInput}
                        textContentType="emailAddress"
                        placeholder="Email"
                        autoComplete="email"
                        onChangeText={(username) => {setUsername(username)}}
                    />
                </View>

                <View style={styles.inputContainer} lightColor="#FFC0CB" darkColor="rgba(255,255,255,0.1)">
                    <TextInput
                        textContentType={"password"}
                        style={styles.textInput}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(password) => {setPassword(password)}}/>
                </View>
            </View>

            <View>
                <Text>{error}</Text>
            </View>
            <TouchableOpacity style={styles.forgotButton}>

                <Text style={styles.forgotButtonText}
                      onPress={() => navigation.navigate('PasswordRecovery')}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={() => _onPress()}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 24,
        minWidth: 320,
        width: 540,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.22,
        shadowRadius: 16.00,
        elevation: 24,
    },

    logo: {
        minWidth: 32,
        minHeight: 32,
        maxWidth: 128,
        maxHeight: 128,
        width: "100%",
        height: "auto",
        marginBottom: 24,
        aspectRatio: 1,
        borderRadius: 128,
    },

    signInFormContainer: {
        width: '100%',
        marginBottom: 24,
    },

    inputContainer: {
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 30,
        width: '100%',
        height: 48,
        marginBottom: 24,
    },

    textInput: {
        height: 48,
        flex: 1,
        padding: 10,
        marginLeft: 24,
        outlineWidth: 0
    },

    forgotButton: {
        flex: 1,
        color: "#fff",
        backgroundColor: "#D41B5D",
        justifyContent: "center",
        alignItems: 'center',
        minHeight: 48,
        maxHeight: 64,
        paddingHorizontal: 24,
        marginBottom: 24,
        borderRadius: 48,
        minWidth: 128,
        aspectRatio: 4 / 1
    },

    forgotButtonText: {
        textTransform: "uppercase",
        fontWeight: "bold",
        // color: "#fff"
    },

    loginButton: {
        width: '100%',
        borderRadius: 24,
        minHeight: 48,
        maxHeight: 64,
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#48D4FF",
    },

    loginButtonText: {
        textTransform: "uppercase",
        fontWeight: "bold",
    },

});