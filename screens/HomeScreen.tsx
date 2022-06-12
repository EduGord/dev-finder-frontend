import {HomeTabScreenProps} from "../types";
import {StyleSheet} from "react-native";
import * as React from "react";
import {useContext} from "react";
import {Text, View} from "../components/Themed";
import {AuthContext} from "../contexts/AuthContext";


export default function HomeScreen({navigation}: HomeTabScreenProps<'Index'>) {
    const {user} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Text>Welcome {JSON.stringify(user.username)}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
