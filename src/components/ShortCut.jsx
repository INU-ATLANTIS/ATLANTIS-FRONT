import styled from "styled-components";
import CALL_IMG from "../assets/call.png";
import FLOOR_IMG from "../assets/floor.png";
import HOUSE_IMG from "../assets/other_houses.png";
import { Link } from "react-router-dom";


export default function ShortCut({ phone, homepage, floor }) {

    return (<>
        <ButtonContainer>
            <Linkto to={`tel:${phone}`}>
                <Button><img src={CALL_IMG} alt="call button"></img>
                    전화번호
                </Button>
            </Linkto>
            <Linkto to={homepage} target="_blank">
                <Button>
                    <img src={HOUSE_IMG} alt="Homepage button"></img>
                    홈페이지
                </Button>
            </Linkto>
            <Linkto to={`/building/${floor}`} state={"floor"} >
                <Button>
                    <img src={FLOOR_IMG} alt="floor button"></img>
                    층별 안내
                </Button>
            </Linkto>
        </ButtonContainer >
        <Blank></Blank>
    </>
    );
}

const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 32px 16px;
gap: 8px;
width: 100%;
height: 144px;
box-sizing: border-box;
`

const Linkto = styled(Link)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
width: 100%;
height: 100%;
gap: 8px;
text-decoration: none;
`
const Button = styled.button`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
width: 100%;
height: 100%;
background: #F7F7FB;
border-radius: 12px;
border: none;
`
const Blank = styled.div`
width: 100%;
height: 34px;
`