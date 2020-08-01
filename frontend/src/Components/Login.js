import React, { Component } from 'react';
import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            provider: '',
        }
    }
    // Kakao Login
    responseKakao = (res) => {
        this.setState({
            id: res.profile.id,
            name: res.profile.properties.nickname,
            provider: 'kakao'
        });
        console.log(this.state);
        this.doSignUp();
    }

    // Login Fail
    responseFail = (err) => {
        console.error(err);
    }
    
    doSignUp = () => {
            const { id, name, provider } = this.state;

            window.sessionStorage.setItem('id', id);
            window.sessionStorage.setItem('name', name);
            window.sessionStorage.setItem('provider', provider);
            this.props.onLogin();
            this.props.history.push('/');
    }

    render() {
        return (
            <Container>
                <KakaoButton
                    jsKey={'6294828c7b0c332679aea0c2171b627b'}
                    buttonText="Kakao"
                    onSuccess={this.responseKakao}
                    onFailure={this.responseFail}
                    getProfile="true"
                />
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
`

const KakaoButton = styled(KakaoLogin)`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`

export default withRouter(Login);