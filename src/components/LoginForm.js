import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common/';


class LoginForm extends Component {

    state= {
        email: '',
        password: '',
        onLoginErrorMsg: '',
        loading: false
    };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ onLoginErrorMsg: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            onLoginErrorMsg: '',
            loading: false
        });
    }

    onLoginFail() {
        this.setState({ 
            onLoginErrorMsg: 'Authentication Failed!',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
             <Button onPress={this.onButtonPress.bind(this)}>
                            Login
                    </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection >
                    <Input
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email} 
                        onChangeText={mail => this.setState({ email: mail })}
                    />
                </CardSection>
                <CardSection >
                    <Input 
                       secureTextEntry
                        placeholder="password" 
                        label="Password" 
                        value={this.state.password} 
                        onChangeText={pass => this.setState({ password: pass })}
                    />
                </CardSection>

                <Text style={styles.errorMsgStyle}>
                    {this.state.onLoginErrorMsg}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorMsgStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;

