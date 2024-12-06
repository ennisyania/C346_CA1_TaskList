import React, {useState} from 'react'
import {datasource} from "./Data";
import {TextInput, View, Text, Button, Alert, StyleSheet} from "react-native";
import RNPickerSelect from "react-native-picker-select";

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

const Edit = ({navigation, route}) => {
    const [task, setTask] = useState(route.params.key);
    const [status, setStatus] = useState(route.params.status);

    return (
        <View style={styles.viewStyle}>
            <View style={styles.editStyle}>
            <View>
                <Text style={styles.headerText}>Task description:</Text>
                <TextInput value={task} maxLength={100} style={styles.textStyle}
                           onChangeText= {(text)=> setTask(text)}/>
                <Text style={styles.headerText}>Task Status:</Text>
                <RNPickerSelect
                    value={status}
                    onValueChange={(value) => setStatus(value)}
                    items={[
                        { label: 'Incomplete', value: 'Incomplete' },
                        { label: 'Complete', value: 'Complete' },
                    ]}
                />

            </View>

            <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex:1, margin: 10}}>
                    <Button title="SAVE"
                            onPress={()=> {
                                let item = { task: task, status:status };
                                let indexnum = 0
                                if (route.params.title=="Homework") {
                                    indexnum = 1;
                                } else if (route.params.title=="ShoppingList") {
                                    indexnum = 2;
                                }
                                datasource[indexnum].data[route.params.index].key=task;
                                datasource[indexnum].data[route.params.index].status=status;
                                navigation.navigate("Home");
                            }
                            }
                    />
                </View>
                <View style={{flex:1, margin: 10}}>
                    <Button title="DELETE"
                            onPress={()=> {
                                let indexnum = 0
                                if (route.params.title=="Homework") {
                                    indexnum = 1;
                                } else if (route.params.title=="ShoppingList") {
                                    indexnum = 2;
                                }
                                Alert.alert("Are you sure?", '',
                                    [{text: 'Yes', onPress:()=>{
                                            datasource[indexnum].data.splice(route.params.index, 1);
                                            navigation.navigate("Home");
                                        }},
                                        {text: 'No'}])
                            }
                            }
                    />
                </View>
            </View>
        </View>
        </View>
    );
};

export default Edit;
