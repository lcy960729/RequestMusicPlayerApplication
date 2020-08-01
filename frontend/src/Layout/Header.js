import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        const { logged, onLogout } = this.props;

        return (
            <Container>
                <Element>
                    {logged ? 
                    <ShortCut><Link to="/" onClick={onLogout}>로그아웃</Link></ShortCut> : 
                    <ShortCut><Link to="/login"></Link></ShortCut>}
                    <Logo>
                    </Logo>
                    <Search>
                        <Link to="/" style={{textDecoration: 'none', color:'#274046'}}>
                            <h1>신청곡 서비스</h1>
                        </Link>
                    </Search>
                </Element>
            </Container>
        );
    }
}
  
export default Header;


const Container = styled.div`
    width: 100%;
    border-bottom: 1px solid #FFFFFF;
`

const Element = styled.div`
    margin: 0 auto;
    width: 1080px;
    height: 100px;
    display: flex;
    flex-flow: row wrap;
`

const ShortCut = styled.div`
    order: 1;
    width: 100%;
    height: 20px;
    text-align: right;
    background-color: #FFFFFF;
`

const Logo = styled.div`
    order: 2;
    width: 200px;
    height: 80px;
`

const Search = styled.div`
    order: 3;
    width: 880px;
    background-color: #FFFFFF;
    text-align: center;
`
