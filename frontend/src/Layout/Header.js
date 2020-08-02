import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        const { onLogout, isAdmin } = this.props;
        return (
            <Container>
                <Element>
                    <ShortCut>
                        {isAdmin ? <Link style={{marginRight : '10px'}} to='/admin'>관리자</Link> : <></>}
                        <Link to="/" onClick={onLogout}>로그아웃</Link>
                    </ShortCut>
                    <Logo>
                        <Link to="/" style={{textDecoration: 'none', color:'#274046'}}>
                            <h1>신청곡 서비스</h1>
                        </Link>
                    </Logo>
                </Element>
            </Container>
        );
    }
}
  
export default Header;


const Container = styled.div`
    width: 100%;
    height: 15%;
    border-bottom: 1px solid #000000;
    position: sticky;
`

const Element = styled.div`
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
`

const ShortCut = styled.div`
    order: 1;
    width: 100%;
    text-align: right;
    background-color: #FFFFFF;
`

const Logo = styled.div`
    order: 2;
    width: 100%;
    text-align: center;
`
