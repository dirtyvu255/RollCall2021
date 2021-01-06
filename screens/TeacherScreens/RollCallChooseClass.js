import React from 'react'
import {View,StyleSheet, FlatList, Text} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../../components/ChooseClassButton'
import FixList from '../TeacherScreens/FixList'
import AddList from '../TeacherScreens/AddList'
import Header from '../../components/Header'

export default class RollCallChooseClass extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listsDone: [],
            listsUnDone: [],
            isShowEdit: false,
            isShowCreate: false,
            item: ''
        }
        this.toggleAddList = this.toggleAddList.bind(this)
        this.toggleFixList = this.toggleFixList.bind(this)
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        const userID = this.props.route.params.userID
        firestore().collection(`users/${userID}/lists`).onSnapshot(snap => {
            let tempList = []
            let tempList1 = []
            snap.forEach(doc => {
                if(doc.data().done){
                    tempList.push({...doc.data(), id: doc.id})
                }
                else{
                    tempList1.push({...doc.data(), id: doc.id})
                }   
            this.setState({listsDone: tempList})
            this.setState({listsUnDone: tempList1})
            });
        })
      }
    toggleFixList(item){
        this.setState({item: item, isShowEdit: !this.state.isShowEdit})
    }
    toggleAddList(){
        this.setState({isShowCreate: !this.state.isShowCreate})
    }
    logOut = async() =>{
        try{
            await AsyncStorage.removeItem('userID')
            await AsyncStorage.removeItem('role')
            await this.props.navigation.navigate('Login')
          } catch (e){
            console.log(e)
          }
    }

    render(){
        const userID = this.props.route.params.userID
        return(
            <View style={styles.container}>
                <Header 
                name='Danh sách lớp' 
                button={() => this.toggleAddList()} 
                icon='AddList' 
                buttonExit={() => this.logOut()} 
                iconExit='Exit'
                ></Header>
                <Text style={[styles.textBlock, {marginTop: 15}]}>Các lớp chưa hoàn thành</Text>
                {this.state.listsUnDone.length !== 0 ? (
                    <FlatList   
                    showsVerticalScrollIndicator={false}
                    style={{height: 250}} 
                    data={this.state.listsUnDone}
                    renderItem={({ item }) => 
                    <Button
                        item={item}
                        done={item.done}
                        onPress={() => this.props.navigation.navigate("RollCallChooseDay", {classID: item.id, userID: userID, name: item.class})}
                        onLongPress= {() => this.toggleFixList(item)}
                    > 
                    </Button>
                }
                    keyExtractor={item => item.id}
                />
                ): null}
                <Text style={styles.textBlock}>Các lớp đã hoàn thành</Text>
                {this.state.listsDone.length !== 0 ? (
                    <FlatList    
                    showsVerticalScrollIndicator={false}
                    data={this.state.listsDone}
                    renderItem={({ item }) => 
                    <Button
                        item={item}
                        done={item.done}
                        onPress={() => this.props.navigation.navigate("RollCallChooseDay", {classID: item.id, userID: userID, name: item.class})}
                    />}
                    keyExtractor={item => item.id}
                />
                ) : null}
                {this.state.isShowEdit ? (
                    <FixList 
                    isShowEdit={this.state.isShowEdit} 
                    item={this.state.item} 
                    classID={this.state.item.id} 
                    userID={userID} 
                    toggleFixList={this.toggleFixList} />
                ): null}
                {this.state.isShowCreate ? (
                    <AddList 
                    isShowCreate={this.state.isShowCreate} 
                    userID={userID} 
                    toggleAddList={this.toggleAddList} />
                ): null}
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