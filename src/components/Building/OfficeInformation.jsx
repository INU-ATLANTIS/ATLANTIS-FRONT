import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as HOME } from "../../assets/icons/other_houses.svg"
import { ReactComponent as CALL } from "../../assets/icons/call.svg"
import { ReactComponent as LOCATION } from "../../assets/icons/location_on.svg"
export default function OfficeInformation({ buildingInfo, children }) {
    const buildingId = useParams().buildingId;
    return (
        <Container>
            {buildingInfo.url && buildingInfo.url.length !== 0 && <>
                <StyledP>
                    <HOME style={{ "width": "20", "height": "20", "margin-right": "8px" }} />
                    {/* <IMG src={HOME_IMG} alt="homepage icon" /> */}
                    <LinkTo to={buildingInfo.url} target="_blank">
                        {buildingInfo.name} 홈페이지
                    </LinkTo>
                </StyledP>
                <Spacing></Spacing>
            </>

            }
            <StyledP>{children}</StyledP>

            {buildingInfo.phone !== null && <StyledP><CALL style={{ "margin-right": "8px" }} /><LinkTo to={`tel:${buildingInfo.phone}`}>{buildingInfo.phone}</LinkTo></StyledP>}
            {buildingId !== "30" && buildingId < 100 && (<StyledP><LOCATION style={{ "margin-right": "8px" }} />제{buildingId}호관 {buildingInfo.office}</StyledP>)}
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

const Spacing = styled.div`
height: 8px;
`