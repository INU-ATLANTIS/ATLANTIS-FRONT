import styled from "styled-components";


export default function FloorInformation({ floorInfo }) {
    return (
        <>
            <IMG src={floorInfo.src} alt="floor image" />
        </>
    )
}

const IMG = styled.img`
width: 100%;
height: auto;
padding: 5px;
`