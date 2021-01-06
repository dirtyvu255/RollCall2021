import React from 'react'
import {View,StyleSheet, FlatList, Text} from 'react-native'
import Button from '../../components/ChooseClassButton'

export default class CreateList extends React.Component{
    state={
        lists : this.props.route.params.lists,
        userID : this.props.route.params.userID,
        listsDone: [],
        listsUnDone: [],
        }
    componentDidMount(){
        const lists = this.props.route.params.lists
        let temp1 = []
        let temp2 = []

        for(let i = 0; i<lists.length; i++){
            if (lists[i][1].info.done) {
                temp1.push(lists[i])
            }
            else {
                temp2.push(lists[i])
            }
        }
        this.setState({listsDone: temp1})
        this.setState({listsUnDone: temp2})
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={[styles.textBlock, {marginTop: 15}]}>Các lớp chưa hoàn thành</Text>
                <FlatList    
                    data={this.state.listsUnDone}
                    renderItem={({ item }) => 
                    <Button
                        data={item[1].info}
                        done={item[1].info.done}
                        onPress={() => this.props.navigation.navigate("AddStudentOptions", {class: item, userID: this.state.userID} )}
                    />}
                    keyExtractor={item => item.id}
                />
                <Text style={styles.textBlock}>Các lớp đã hoàn thành</Text>
                <FlatList    
                    data={this.state.listsDone}
                    renderItem={({ item }) => 
                    <Button
                        data={item[1].info}
                        done={item[1].info.done}
                        onPress={() => this.props.navigation.navigate("AddStudentOptions", {class: item, userID: this.state.userID} )}
                    />}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'#fff',
        alignItems: 'center',
    },
    textBlock: {
        fontWeight: 'bold',
        fontSize: 18,
    }
})


