import React, { Component} from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm'


class App extends Component {
    state = { loggedIn: null } // State to see if the user is logged in. 

    // Configuring firebase server
    componentWillMount(){
        firebase.initializeApp( {
            apiKey: 'AIzaSyA_jcaH8xjW6oDWesw2soG9Gfx9twlDPJw',
            authDomain: 'auth-53efc.firebaseapp.com',
            databaseURL: 'https://auth-53efc.firebaseio.com',
            projectId: 'auth-53efc',
            storageBucket: 'auth-53efc.appspot.com',
            messagingSenderId: '135561793021'
          });
        
          //Eventhandler that accept a function
          // If the user is logged in the state changes to true, else it changes to false
          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                  this.setState({loggedIn: true});
              } else {
                  this.setState({loggedIn: false});
              }
          });
        }
        

        
    
    
        renderContent() {
            switch (this.state.loggedIn) {
              case true:
                return (
                  <Button onPress={() => firebase.auth().signOut()}>
                    Log Out
                  </Button>
                );
              case false:
                return <LoginForm />;
              default:
                return <Spinner size="large" />;
            }
          }

    
    render(){
        return(
        <View>
            <Header headerText='Authentication'/>
            {this.renderContent()}
        </View>
        );
    }
}





export default App;