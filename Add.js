import {datasource} from "./Data";
import React, {useState} from "react";
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from "@react-navigation/native";
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#201d2b',
    },

    editStyle: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#353047',
        borderRadius:20,
        margin:15,
        paddingTop:10,
        paddingBottom:50,
    },

    textStyle: {
        fontSize: 15,
        margin: 10,
        fontWeight: 'bold',
        color:'#ca97a8'
    },
    headerText: {
        fontSize: 30,
        marginTop:30,
        padding:10,
        borderWidth:2,
        borderColor:'#930638',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 15,
        color:'#930638'
    }
});
import {StatusBar} from "expo-status-bar";

const Add =() => {
    const navigation = useNavigation();

    // States for the letter and type
    const [task, setTask] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('incomplete');

    return (
        <View style={styles.viewStyle}>
            <View style={styles.editStyle}>
            <StatusBar />
            <Text style={styles.headerText}>Task:</Text>
            <TextInput
                maxLength={50}
                style={styles.textStyle}
                onChangeText={setTask}
                value={task}
            />
            <Text style={styles.headerText}>Task Type:</Text>
            <RNPickerSelect style={styles.textStyle}
                value={type}
                onValueChange={(value) => setType(value)}
                items={[
                    { label: 'Chores', value: 'Chores' },
                    { label: 'Homework', value: 'Homework' },
                    { label: 'Shopping List', value: 'ShoppingList' },
                ]}
            />
            <Button
                title="Submit"
                onPress={() => {
                    let item = {key: task, status: status};
                    let indexnum = 0
                    if (type=="Homework") {
                        indexnum = 1;
                    } else if (type=="ShoppingList") {
                        indexnum = 2;
                    }
                    datasource[indexnum].data.push(item);
                    navigation.navigate("Home")
                }}
            />
            </View>
        </View>
    );
};

export default Add;

