import React, {Component} from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner} from './common';
class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress () {
        //Destrucuring
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
        // Resets the error message when Log In is pressed and renders the spinner
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this)) // If the log in succeeds, run onLoginSuccess
        .catch( ()=> { //If the request fails, try to create new account
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this)) //User created an acount, run onLoginSuccess
            .catch(this.onLoginFailed.bind(this));//Failed to create acount, run on
        });
    }
        //Sends request to firebase 
        //catch cases recieves a promise. 
        //.then() only gets called if the user successfully logs in or register
        // and then calls onLoginSuccess()
    onLoginFailed(){
        this.setState({ error: 'Athentication Failed', loading: false})
        }
    
    onLoginSuccess(){
        this.setState({
        email: '', 
        password: '',
        loading: false, 
        error: ''
    });
    }
   

    //
    renderButton(){
        //if loading is true show spinner
        if(this.state.loading){
            return <Spinner />;
        }
        //else show the button
        return(
        <Button
        onpress={this.onButtonPress.bind(this)}>
        Log in
        </Button>
        );
    }


    render(){
        return(
           <Card>
               
               <CardSection>
                   <Input 
                   placeholder="user@gmail.com"
                   label= "Email"
                   value = {this.state.email}
                   onChangeText= {email => this.setState({email})}
                   style={{ height : 20, width: 100}}/>
               </CardSection>
               
               <CardSection>
                   <Input
                   secureTextEntry
                   //secureTextEntry is 'true' by default 
                   placeholder= "password"
                   label= "password"
                   value= {this.state.password}
                   onChangeText={password => this.setState({password})}

                   />
               </CardSection>
               
               <Text style={styles.errorTextStyle}>
                   {this.state.error}
               </Text>
               
               <CardSection>
                {this.renderButton()}
               </CardSection>
          
           </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;