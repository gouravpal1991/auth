import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase'; 
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {

    state= {
        loggedIn: null 
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyA3BFY1UD4OBA2g4qUmAJOCDi_a4aJ4JGE',
            authDomain: 'authenticaiton-ee2c3.firebaseapp.com',
            databaseURL: 'https://authenticaiton-ee2c3.firebaseio.com',
            projectId: 'authenticaiton-ee2c3',
            storageBucket: 'authenticaiton-ee2c3.appspot.com',
            messagingSenderId: '387897106654'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
          case true:  
          return (
                <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>
                    Log Out
                </Button>
                </CardSection>
          );
         case false:
            return <LoginForm />;
         default:
            return <CardSection><Spinner /></CardSection>;
        } 
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
               {this.renderContent()}
            </View>
        );
    }
} 

export default App;
