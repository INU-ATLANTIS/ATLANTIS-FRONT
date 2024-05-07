import styled, { css } from "styled-components";
import CALL_IMG from "../../assets/call.png";
import { Link } from "react-router-dom";

export default function ConvenInfo({ index, children, prop }) {
    return (<>
        <Div active={(index !== 0)}>{children}</Div>
        {prop.phone !== null && prop.phone.length > 0 && <StyledP><IMG src={CALL_IMG} alt="call icon" /><LinkTo to={`tel:${prop.phone}`}>{prop.phone}</LinkTo></StyledP>}
    </>
    )
}

const Div = styled.div`
box-sizing: border-box;
display: flex;
align-items: center;
padding: 16px 16px;
width: 100%;
height: 44px;
color: #111111;
${({ active }) =>
        active
        && css`
      border-top: 1px solid #F1F1F5;
    `
    }
`
const IMG = styled.img`
width: 20px;
height: 20px;
margin - right: 8px;
`
const StyledP = styled.p`
margin: 0;
padding: 0 16px 16px;
font - family: 'Pretendard';
font - style: normal;
font - weight: 500;
font - size: 16px;
line - height: 24px;
color: #505050;
align - items: center;
display: flex;
Link {
    text - decoration: none;
    color: #505050;
}
`
const LinkTo = styled(Link)`
text - decoration: none;
color: #3366BB;
`