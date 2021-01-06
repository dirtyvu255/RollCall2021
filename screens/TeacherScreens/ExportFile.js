import React from 'react'
import {View,StyleSheet, FlatList, Text} from 'react-native'
import Button from '../../components/ExportButton'

export default class ExportChoose extends React.Component{
    state={
        lists : this.props.route.params.lists,
        userID: this.props.route.params.userID,
        listsDone: [],
        aoa:[],
        }
    componentDidMount(){
        const lists = this.props.route.params.lists
        let temp = []

        for(let i = 0; i<lists.length; i++){
            if (lists[i][1].info.done){
                temp.push(lists[i])
            }
        }
        this.setState({listsDone: temp})
    }
    
    render(){
        return(
            <View style={styles.container}>
                <FlatList    
                    data={this.state.listsDone}
                    renderItem={({ item }) => 
                    <Button
                        info={item[1].info}
                        students={item[2].students}
                        done={item[1].info.done}
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