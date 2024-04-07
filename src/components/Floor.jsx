import styled from "styled-components";
import Toggle from "./Toggle";

const floorList = [
    {
        floorid: 1,
        floor: 1,
        src: "06_정보기술대학3.png",
        buildingId: 7
    },
    {
        floorid: 2,
        floor: 2,
        src: "06_정보기술대학7.png",
        buildingId: 7
    },
    {
        floorid: 3,
        floor: 3,
        src: "06_정보기술대학11.png",
        buildingId: 7
    },
    {
        floorid: 4,
        floor: 4,
        src: "06_정보기술대학15.png",
        buildingId: 7
    },
    {
        floorid: 5,
        floor: 5,
        src: "../assets/06_정보기술대학/06_정보기술대학19.png",
        buildingId: 7
    }
]


export default function Floor({ title }) {
    return (
        <>
            {title && (<Title>
                <h2>층별 안내도</h2>
            </Title>)}
            {floorList.map((floors, index) =>
                <Toggle key={floors.floorid} type="floor" prop={floors} open={(index === 0)}>{floors.floor}F</Toggle>
            )}
        </>
    );
}


const Title = styled.div`
padding: 24px 16px 40px 16px;
h2 {
    font-weight: 600;
    font-size: 18px;
    margin: 0;
}
`