import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TextInput, View} from '../components/Themed';
import {RootTabScreenProps} from "../types";


export default function PasswordRecoveryScreen({ navigation }: RootTabScreenProps<'PasswordRecovery'>) {
    const [email, setEmail] = useState("");

    function _onPress() {
        console.debug('An email was submitted: ' + email);
        navigation.navigate('Root', {screen: 'Authenticate'});
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/images/logo.png")}/>
            <View style={styles.passwordRecoveryFormContainer}>
                <View style={styles.inputContainer} lightColor="#FFC0CB" darkColor="rgba(255,255,255,0.1)">
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={() => _onPress() }>
                <Text style={styles.submitButtonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
}

const screenOptions = {
    headerTintColor: 'black',
    headerStyle: {backgroundColor: '#f1f1f1'},
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    passwordRecoveryFormContainer: {
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
        outlineWidth: 0,
    },

    submitButton: {
        width: '100%',
        borderRadius: 24,
        minHeight: 48,
        maxHeight: 64,
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#48D4FF",
    },

    submitButtonText: {
        textTransform: "uppercase",
        fontWeight: "bold",
    },

});
