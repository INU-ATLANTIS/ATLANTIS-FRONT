import { useState, useEffect } from "react";
import styled from "styled-components";
import Toggle from "./Toggle";
import { fetchFloorImgs } from "../../http";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom'


export default function Floor({ title }) {
    const location = useLocation();
    const [FloorList, setFloorList] = useState(null);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const buildingId = useParams().buildingId;
    let floorId
    if (location.state !== null) {
        floorId = Math.floor(location.state.floor / 100);
    }


    useEffect(() => {
        setIsFetching(true);
        const fetchFloorList = async () => {
            try {
                const list = await fetchFloorImgs(buildingId);
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

    return (
        <>
            {title && (<Title>
                <h2>층별 안내도</h2>
            </Title>)}
            {!isFetching && FloorList !== null && FloorList.length > 0 && FloorList.map((floors, index) =>
                <Toggle key={floors.floorid} type="floor" prop={floors} open={(index === floorId)}>{floors.floor === 0 ? "B1" : floors.floor}F</Toggle>
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