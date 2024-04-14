import styled from "styled-components";
import CALL_IMG from "../assets/call.png";
import HOME_IMG from "../assets/other_houses.png";
import LOCATION_IMG from "../assets/location_on.png";
import { Link, useParams } from "react-router-dom";

export default function OfficeInformation({ buildingInfo }) {
    const buildingId = useParams().buildingId;
    return (
        <Container>
            {buildingInfo.url.length !== 0 && <StyledP><IMG src={HOME_IMG} alt="homepage icon" /><LinkTo to={buildingInfo.url} target="_blank">{buildingInfo.name} 홈페이지</LinkTo></StyledP>}
            <StyledP><IMG src={CALL_IMG} alt="call icon" /><LinkTo to={`tel:${buildingInfo.phone}`}>{buildingInfo.phone}</LinkTo></StyledP>
            <StyledP><IMG src={LOCATION_IMG} alt="location icon" />제{buildingId}호관 {buildingInfo.office}</StyledP>
        </Container>
    );
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
box-sizing: border-box;
padding: 32px 16px;
width: 100%;
height: auto;
gap: 8px;
`
const IMG = styled.img`
width: 20px;
height: 20px;
margin-right: 8px;
`
const StyledP = styled.p`
margin:0;
font-family: 'Pretendard';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
color: #505050;
align-items: center;
display: flex;
Link {
    text-decoration: none;
    color: #505050;
}
`
const LinkTo = styled(Link)`
text-decoration: none;
color: #3366BB;
`