import { useState, useEffect } from "react";
import styled from "styled-components";
import CALL_IMG from "../../assets/call.png";
import FLOOR_IMG from "../../assets/floor.png";
import HOUSE_IMG from "../../assets/other_houses.png";
import { Link } from "react-router-dom";
import { fetchFloorImgs } from "../../http.js";

export default function ShortCut({ phone, homepage, floor }) {
    const [FloorList, setFloorList] = useState(null);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        const fetchFloorList = async () => {
            try {
                const list = await fetchFloorImgs(floor);
                if (list.code === "SU") {
                    setFloorList(list.srcList);
                    setIsFetching(false);
                } else {
                    setError(list.message);
                    setIsFetching(false);
                }
            } catch (err) {
                setError(err);
                setIsFetching(false);
            }
        };

        fetchFloorList();
    }, []);

    return (<>
        <ButtonContainer>
            <Linkto to={`tel:${phone}`}>
                <Button><img src={CALL_IMG} alt="call button"></img>
                    전화번호
                </Button>
            </Linkto>
            {homepage !== null && homepage.length !== 0 && <Linkto to={homepage} target="_blank">
                <Button>
                    <img src={HOUSE_IMG} alt="Homepage button"></img>
                    홈페이지
                </Button>
            </Linkto>}
            {!isFetching && FloorList !== null && FloorList.length > 0 && <Linkto to={`/building/${floor}`} state={{ tab: "floor" }} >
                <Button>
                    <img src={FLOOR_IMG} alt="floor button"></img>
                    층별 안내
                </Button>
            </Linkto>}
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
color: #505050;
gap: 5px;
`
const Blank = styled.div`
width: 100%;
height: 34px;
`