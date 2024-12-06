import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image, Alert} from 'react-native';
import { datasource } from "./Data";

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#201d2b',
    },

    choreListStyle: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#353047',
        borderRadius:20,
        margin:15,
        paddingBottom:50,
    },

    header: {
        justifyContent: 'center',
        flex: 1,
    },

    webTitle: {
        fontSize: 40,
        textAlign: 'center',
        color: '#ca97a8',
        margin: 50,
    },

    images: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'flex-end',
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
    },
    opacityStyle: {
        justifyContent:"space-between",
        alignItems:'center',
        borderStyle:'dashed',
        borderWidth:2,
        borderColor:'#ca97a8',
        flex:1,
        flexDirection: 'row',
        padding: 20,
        borderRadius: 15,
    },
});



const Home = ({ navigation }) => {
    const renderItem = ({ item,index, section }) => {
        return(
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    navigation.navigate("Edit", {index: index, title: section.title, key: item.key, status: item.status });
                }}
            >
                <Text style={styles.textStyle}>{item.key}</Text>
                <Text style={styles.textStyle}>{item.status}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.viewStyle}>
            <View styles={styles.header}>
                <Text style={styles.webTitle}>Enni's Task List</Text>
                <Button title="Add Task" style={{margin: 10}}
                        onPress={() => navigation.navigate('Add')}/>
                <Button title="Overall Status"
                        onPress={() => {
                            // Chores section
                            const allChores = datasource.find(section => section.title === 'Chores').data;
                            const noOfChores = allChores.length;
                            const choresPacked = allChores.filter(item => item.status === 'Complete').length;
                            const percentageOfChores = noOfChores > 0 ? Math.round((choresPacked / noOfChores) * 100) : 0;

                            // Homework section
                            const allHomework = datasource.find(section => section.title === 'Homework').data;
                            const noOfHomework = allHomework.length;
                            const homeworkPacked = allHomework.filter(item => item.status === 'Complete').length;
                            const percentageOfHomework = noOfHomework > 0 ? Math.round((homeworkPacked / noOfHomework) * 100) : 0;

                            // Shopping section
                            const allShopping = datasource.find(section => section.title === 'Shopping List').data;
                            const noOfShopping = allShopping.length;
                            const shoppingPacked = allShopping.filter(item => item.status === 'Complete').length;
                            const percentageOfShopping = noOfShopping > 0 ? Math.round((shoppingPacked / noOfShopping) * 100) : 0;

                            // Overall summary
                            const noOfItems = noOfChores + noOfHomework + noOfShopping;
                            const itemsPacked = choresPacked + homeworkPacked + shoppingPacked;
                            const overallPercentage = noOfItems > 0 ? Math.round((itemsPacked / noOfItems) * 100) : 0;

                            Alert.alert(
                                overallPercentage === 100
                                    ? "You got everything!"
                                    : `You have ${noOfItems} items in the list.\nYou already completed ${itemsPacked} (${overallPercentage}%).`,
                                `Chores: ${percentageOfChores}% complete\nHomework: ${percentageOfHomework}% complete\nShopping: ${percentageOfShopping}% complete`,
                                [{ text: 'Close' }]
                            );
                        }}
                />
            </View>

            <View style={styles.choreListStyle}>
                <StatusBar hidden={true}></StatusBar>
                <SectionList
                    sections={datasource}
                    renderItem={renderItem} // Now properly using the navigation prop
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.headerText}>{title}</Text>
                    )}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </View>
        </View>
    );
};

export default Home;
