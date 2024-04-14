import { useState, useEffect } from "react";

import { fetchBuilding } from "../http.js";
import { BottomSheet } from "../components/BottomSheet.jsx";
import Title from "../components/Title.jsx";
import ShortCut from "../components/ShortCut.jsx";

const { kakao } = window;

export default function Buildings() {
    const [buildingList, setBuildingList] = useState([]);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [open, setOpen] = useState(false); //bottomsheet 

    useEffect(() => {
        setIsFetching(true);
        const fetchBuildingList = async () => {
            try {
                const buildingList = await fetchBuilding();
                setBuildingList(buildingList);
                setIsFetching(false);
            } catch (err) {
                setError(err);
                setIsFetching(false);
            }
        };
        fetchBuildingList();
    }, []);


    useEffect(() => {
        if (!open) {
            setSelectedMarker(null);
        }
        const mapContainer = document.getElementById('map'); // 지도를 표시할 div  
        const mapOption = {
            center: new kakao.maps.LatLng(37.375, 126.631944), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        map.setMaxLevel(4);

        const markers = [];

        !isFetching &&
            !error &&
            buildingList.forEach((building, index) => {
                const latlng = new kakao.maps.LatLng(building.y, building.x);
                const marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: latlng, // 마커를 표시할 위치
                    title: building.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                });
                markers.push(marker);

                kakao.maps.event.addListener(marker, 'click', () => {
                    if (selectedMarker === null || selectedMarker !== index) {
                        setOpen(true);
                        setSelectedMarker(index);
                    }
                });
            });
    }, [buildingList])
    return (
        <div className="h-full bg-gray-100 rounded-lg shadow-inner">
            <div id="map" style={{
                width: '100%',
                height: '100vh'
            }}>

                <BottomSheet open={open} onOpenChange={setOpen} height="fitContent">
                    <div style={{ width: '100vw' }}>
                        {open && !isFetching && !error && selectedMarker !== null && (
                            <>
                                <Title
                                    name={buildingList[selectedMarker].name}
                                    buildingCode={buildingList[selectedMarker].buildingCode}
                                    buildingId={buildingList[selectedMarker].buildingId}
                                    showDetail={true}
                                />
                                <ShortCut
                                    phone={buildingList[selectedMarker].phone}
                                    homepage={buildingList[selectedMarker].url}
                                    floor={buildingList[selectedMarker].buildingId}
                                />
                            </>
                        )}
                    </div>
                </BottomSheet>
            </div>
        </div>
    )

}