import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Layout/Header';
import Router from './Routes/Router';
import Store from './Store/store';
import Login from './Components/Login';
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        logged: false,
        onLogin: this.onLogin,
        onLogout: this.onLogout,
        isAdmin: false
    }
  }

  // Login Func
  onLogin = (admin) => {
    this.setState({
        logged: true,
        isAdmin: admin
    });
  }

  // Logout Func
  onLogout = () => {
    this.setState({
        logged: false
    });

    const provider = window.sessionStorage.getItem('provider');    
    // Kakao AccessToken Remove
    if(provider === 'kakao'){
      window.Kakao.Auth.logout(function() {
        console.log("Kakao logout");
      });
    }
    //SessionStorage Clear
    window.sessionStorage.clear();
  }

  componentDidMount() {
    const id = window.sessionStorage.getItem('id');
    const isAdmin = window.sessionStorage.getItem('isAdmin');

    if(id) {
      this.onLogin(isAdmin);
    }
    else {
      this.onLogout();
    }
  }

  render() {
    const { isAdmin, logged, onLogout } = this.state;

    return (
      <Store.Provider value={this.state}>
        <Layout>
            {this.state.logged ?
                <>
                    <Header isAdmin={isAdmin} logged={logged} onLogout={onLogout}/>
                    <Content>
                        <Router/>
                    </Content>
                </>
                :
                <Login onLogin={this.state.onLogin}/>
            }
        </Layout>
      </Store.Provider>
    );
  }
}

const Layout = styled.div`
  margin: 0 auto;
  display: block;
  width: 100%;
  height: 100%;
  //background-color: #ffffff;
  // background-image: url("./images/background.jpg");
  // background-size: cover;
  // background-position: center;
  // background-repeat: no-repeat;
`
const Content = styled.div`
  margin: 0 auto;
  height: 85%;
  width: 100%;
`

export default App;
