import React from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import ButtonDay from '../../components/ButtonDay'
export default class RollCall extends React.Component{
    state = {
        class: this.props.route.params.class,
    }


    render(){
        return(
            <View style={styles.container}>
                <FlatList    
                    data={this.state.class[1].info.timeline}
                    renderItem={({ item }) => 
                    <ButtonDay
                        data={item}
                        onPress={() => this.props.navigation.navigate('ListRollCall', {list: this.state.class[2].students, id: this.state.class[1].info.timeline.indexOf(item)})}
                    />}
                    keyExtractor={item => item.id}
                />    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: 'center'
    },
    modalBlock:{
        backgroundColor: '#fff',
        flex: 0.8,
        borderRadius: 15
    },
    titleBlock:{
        backgroundColor: '#67e2d9',
        borderTopRightRadius: 15,
    },
    backTitle:{
        fontWeight: '500',
        fontSize: 16,
        alignSelf: 'center',
        
        paddingVertical: 7
    },
    title:{
        fontWeight: '700',
        fontSize: 25,
        alignSelf: 'center',
        paddingBottom: 20,
        paddingBottom: 20,
    },
    tag:{
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: -20,
        marginHorizontal: 15
    },
    tagItem: {
        fontSize: 16,
        color: 'grey'
    },
})