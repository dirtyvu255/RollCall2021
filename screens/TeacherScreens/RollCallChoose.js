import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import Button from '../../components/ChooseButton'

export default class RollCall extends React.Component{
    state={
        lists : this.props.route.params.lists,
    }
    render(){
        return(
            
            <View style={styles.container}>
                <FlatList    
                    data={this.state.lists}
                    renderItem={({ item }) => 
                    <Button
                        data={item[1].info}
                        onPress={() => this.props.navigation.navigate("RollCall", {class: item} )}
                        // , students: Object.values(this.state.studentLists)
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
})