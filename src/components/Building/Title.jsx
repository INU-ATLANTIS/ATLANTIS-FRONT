import styled from "styled-components";
import { Link } from "react-router-dom";
export default function Title({ name, buildingCode, buildingId, showDetail }) {

    return (
        <Div id="title">
            <TitleContainer>
                <StyledTitle>{name}</StyledTitle>
                {buildingId < 100 && buildingId !== 30 && <SubTitle>{buildingCode} 제{buildingId}호관</SubTitle>}
            </TitleContainer>
            {showDetail && <Link to={`/building/${buildingId}`}>
                <Button>자세히</Button>
            </Link>
            }
        </Div >
    );
}

const Div = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: flex-start;
padding: 20px 16px;
gap: 4px;
width: 100%;
height: 104px;
box-sizing: border-box;
`

const TitleContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 100%;
height: 64px;
`
const StyledTitle = styled.p`
font-weight: 600;
font-size: 24px;
margin: 0;
color: #111111;
`

const SubTitle = styled.p`
font-weight: 400;
font-size: 15px;
color: #505050;
margin: 0;
`

const Button = styled.button`
padding: 0px 12px;
border: none;
width: 62px;
min-width: 62px;
height: 36px;
background: #F7F7FB;
border-radius: 8px;
font-weight: 600;
font-size: 12px;
color: #505050;
`