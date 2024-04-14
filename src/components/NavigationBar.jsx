import styled from "styled-components";

import arrowBack from "../assets/arrow_back_ios_new.png"
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ children }) => {
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate(-1);
    }
    return (
        <NavBar id="navBar">
            <LeftContainer id="left-container">
                <img src={arrowBack} alt="back arrow" onClick={clickHandler} style={{ marginRight: "8px" }} />
                {children}
            </LeftContainer>
            <RightContainer id="right-container" />
        </NavBar>
    )
}

export default NavigationBar;

const NavBar = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width:100%;
height: 56px;
background-color: #fff;
position:sticky;
top:0;
`
const LeftContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
box-sizing: border-box;
padding: 0px 0px 0px 16px;
width:50%;
height: 100%;
align-self: stretch;
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #505050;
`
const RightContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
box-sizing: border-box;
width:50%;
height: 100%;
align-self: stretch;
`
