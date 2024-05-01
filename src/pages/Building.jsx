import { useState, useEffect } from "react";

import styled from "styled-components";
import NavigationBar from "../components/NavigationBar.jsx";
import Title from "../components/Title.jsx";
import { fetchOffice } from "../http.js";
import Divider from "../components/Divider.jsx";
import { useParams } from "react-router-dom";
import Tabs from "../components/Tabs.jsx";

export default function Building() {
    const [buildingInfo, setBuildingInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const buildingId = useParams().buildingId;

    useEffect(() => {
        setIsFetching(true);
        const fetchBuildingInfo = async () => {
            try {
                const info = await fetchOffice(buildingId);
                if (info.code === "SU") {
                    setBuildingInfo(info);
                    setIsFetching(false);
                } else {
                    setError(info.message);
                    setIsFetching(false);
                }
            } catch (err) {
                setError(err);
                setIsFetching(false);
            }
        };

        fetchBuildingInfo();
    }, [buildingId]);


    // 스크롤이 50px 이상 내려올경우 true값을 넣어줄 useState
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
    }, []);

    const handleScroll = () => {
        // 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
        if (window.scrollY >= 50) {
            setScroll(true);
        } else {
            // 스크롤이 50px 미만일경우 false를 넣어줌
            setScroll(false);
        }
    };

    if (error !== null) {
        return <div>{error}</div>
    }

    return (
        <Container id="container">
            <NavigationBar>{scroll && buildingInfo.name}</NavigationBar>
            {isFetching && <p>Loading...</p>}
            {!isFetching && buildingInfo !== null && (<>
                <Title name={buildingInfo.name} buildingCode={buildingInfo.buildingCode} buildingId={buildingId} />
                <Divider />
                <Tabs buildingInfo={buildingInfo} />
            </>
            )}
        </Container >
    );
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 100vw;
box-sizing: border-box;

`