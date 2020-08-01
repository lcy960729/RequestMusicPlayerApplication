import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
      return (
        <Nav>
            <NavList>
                <NavItem><Link to='/requestMusic'>음악 신청하기</Link></NavItem>
                <NavItem><Link to='/admin'>관리자</Link></NavItem>
            </NavList>
        </Nav>
      );
    }
  }

  export default Navigation;

  
const Nav = styled.div`
width: 100%;
height: 30px;
border-bottom: 1px solid #d1d8e4;
`

const NavList = styled.ul`
width: 1080px;
display: flex;
margin: 0 auto;
`

const NavItem = styled.li`
width: 120px;
margin-left: 18px;
margin-top: 5px;
display: flex;
`