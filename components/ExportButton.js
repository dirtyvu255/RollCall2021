import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet,Alert} from 'react-native'
import XLSX from 'xlsx'
import { writeFile, readFile, DocumentDirectoryPath } from 'react-native-fs'
const DDP = DocumentDirectoryPath + "/";
export default class Button extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    
    configData = async() =>{
        const {info,students} = this.props
        let temp = []
        let tempTimeline = ["MSSV","Tên"]
        let day = new Date(info.dayStart.toDate())
        temp.push(['Môn', info.class],['Lớp', info.group],['Ngày bắt đầu', `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`])
        for(let i = 0; i < info.timeline.length; i++){
            let days = new Date(info.timeline[i].toDate())
            tempTimeline.push(`${days.getDate()}/${days.getMonth() + 1}/${days.getFullYear()}`)
        }
        temp.push(tempTimeline)
        for(let i=0; i<students.length; i++){
            let info = students[i][1].infoStudent
            let tempStudent = []
            tempStudent.push(info.idStudent, info.name)
            for(let j = 0; j<info.dayChecked.length; j++){
                if(info.dayChecked[j]){
                    tempStudent.push('Có')
                }
                else {
                    tempStudent.push('Vắng')
                }
            }
            temp.push(tempStudent)
        }
        this.setState({data: temp})
    }

    createFile = async() =>{
        await this.configData()
        var wb = XLSX.utils.book_new()
        var ws = XLSX.utils.aoa_to_sheet(this.state.data);
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
        const file = DDP + `baocao.xlsx`;
        writeFile(file, wbout, 'ascii').then((res) =>{
                // Alert.alert("Xuất thành công", "Địa chỉ:" + file);
                Alert.alert("Xuất thành công");
        }).catch((err) => { Alert.alert("exportFile Error", "Error " + err.message); });
    }
    render(){
        const {info} = this.props
        console.log(DDP + "baocao.xlsx")
        console.log(this.state.data)
        const day = new Date(info.dayStart.toDate())
        return(
            <TouchableOpacity style={styles.containerDone} onPress={this.createFile} >
                <View style={{paddingVertical: 20}}>
                    <Text style={[styles.name, {marginBottom: 5}]}>{info.class}</Text>
                    <Text style={[styles.name, {marginBottom: 5}]}>{info.group}</Text>
                    <Text style={styles.name}>{day.getDate()}/{day.getMonth() + 1}/{day.getFullYear()}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerDone:{
        backgroundColor: '#ad343e',
        borderRadius: 30,
        width: 300,
        marginTop: 25
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center'
    }
})