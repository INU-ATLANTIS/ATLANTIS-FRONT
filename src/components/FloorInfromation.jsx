import styled from "styled-components";

import FloorIMG from "../assets/06/06_정보기술대학3.png";

export default function FloorInformation({ floorInfo }) {
    return (
        <>
            <IMG src={FloorIMG} alt="floor image" />
        </>
    )
}

const IMG = styled.img`
width: 100%;
height: auto;
`