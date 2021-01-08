import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/MainScreens/LoginScreen'
import MenuTeacher from './screens//TeacherScreens/MenuScreenTeacher'
import SignUp from './screens/FacultyScreens/SignUpScreen'
import RollCallChooseClass from './screens/TeacherScreens/RollCallChooseClass'
import AddStudentChoose from './screens/TeacherScreens/AddStudentChoose'
import AddList from './screens/TeacherScreens/AddList'
import FixList from './screens/TeacherScreens/FixList'
import RollCallChooseDay from './screens/TeacherScreens/RollCallChooseDay'
import MenuFaculty from './screens/FacultyScreens/MenuScreenFaculty'
import MenuStudent from './screens/StudentScreens/MenuScreenStudent'
import ListRollCall from './screens/TeacherScreens/ListRollCall'
import AddStudent from './screens/TeacherScreens/AddStudent'
import ExportFile from './screens/TeacherScreens/ExportFile'
import SignUpStudent from './screens/StudentScreens/SignUpStudent'
import AddStudentOptions from './screens/TeacherScreens/AddStudentOptions'
import AddStudentQR from './screens/TeacherScreens/AddStudentQR'
import Role from './screens/MainScreens/RolesScreen'
import JoinClass from './screens/StudentScreens/JoinClass'
import CheckIn from './screens/StudentScreens/CheckIn'


const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      // <AppContainer />
      <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="Role" component={Role} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MenuTeacher" component={MenuTeacher} />
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="RollCallChooseClass" component={RollCallChooseClass} />
        {/* <Stack.Screen name="FixList" component={FixList}/> */}
        <Stack.Screen name="AddStudentChoose" component={AddStudentChoose}/>
        <Stack.Screen name="AddList" component={AddList}/>
        <Stack.Screen name="RollCallChooseDay" component={RollCallChooseDay}/>
        <Stack.Screen name="MenuFaculty" component={MenuFaculty}/>
        <Stack.Screen name="ListRollCall" component={ListRollCall}/>
        <Stack.Screen name="AddStudent" component={AddStudent}/>
        <Stack.Screen name="ExportFile" component={ExportFile}/>
        <Stack.Screen name="MenuStudent" component={MenuStudent}/>
        <Stack.Screen name="SignUpStudent" component={SignUpStudent}/>
        <Stack.Screen name="AddStudentOptions" component={AddStudentOptions}/>
        <Stack.Screen name="AddStudentQR" component={AddStudentQR}/>
        <Stack.Screen name="JoinClass" component={JoinClass}/>
        <Stack.Screen name="CheckIn" component={CheckIn}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
  }
}




