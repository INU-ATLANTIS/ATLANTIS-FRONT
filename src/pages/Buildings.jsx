import { useState, useEffect } from 'react'

import { fetchBuilding, searchBuilding } from '../http.js'
import { BottomSheet } from '../components/BottomSheet.jsx'
import Title from '../components/Building/Title.jsx'
import ShortCut from '../components/Building/ShortCut.jsx'
import { SearchInput } from "../components/Building/SearchInput.jsx"
import { BottomNavigation } from '../components/BottomNavigation.jsx'
import styled, { css } from "styled-components";

import BUILDING from "../assets/markers/building.png"
import CAFE from "../assets/markers/coffee-shop1.png"
import RESTAURANT from "../assets/markers/restaurant1.png"
import STORE from "../assets/markers/shop1.png"
import ETC from "../assets/markers/favourite.png"

const { kakao } = window

export default function Buildings() {
  const [map, setMap] = useState()
  const [buildingList, setBuildingList] = useState([])
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [open, setOpen] = useState(false) //bottomsheet
  const [searchInput, setSearchInput] = useState('');
  const [selectedInfo, setSelectedInfo] = useState('building')
  //building-00, cafe-100, 식당(restaurant)-200, 편의점(conven)-300,기타(etc)-400
  const [searchIndex, setSearchIndex] = useState()

  const btnArray = [
    {
      state: "building",
      name: "강의실"
    },
    {
      state: "cafe",
      name: "카페"
    },
    {
      state: "restaurant",
      name: "식당"
    }, {
      state: "conven",
      name: "편의점"
    },
    {
      state: "etc",
      name: "기타"
    }]

  useEffect(() => {
    setIsFetching(true)
    const fetchBuildingList = async () => {
      try {
        const buildingList = await fetchBuilding()
        console.log(buildingList)
        setBuildingList(buildingList)
        setIsFetching(false)
      } catch (err) {
        setError(err)
        setIsFetching(false)
      }
    }
    fetchBuildingList()
  }, [])

  useEffect(() => {
    if (!open) {
      setSelectedMarker(null)
    }
    const mapContainer = document.getElementById('map') // 지도를 표시할 div
    let mapOption = {
      center: new kakao.maps.LatLng(37.375, 126.631944), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    }

    const map = new kakao.maps.Map(mapContainer, mapOption) // 지도를 생성합니다
    setMap(map)
    map.setMaxLevel(4)

    if (buildingList !== null) {
      const markers = []
      if (selectedInfo === "building") {
        let imageSrc = BUILDING, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(35, 35) // 마커이미지의 크기입니다

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );
        !isFetching &&
          !error &&
          buildingList.filter(building => building.buildingId < 100).forEach((building, index) => {
            const latlng = new kakao.maps.LatLng(building.y, building.x)
            const marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: latlng, // 마커를 표시할 위치
              title: building.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage
            })
            markers.push(marker)

            kakao.maps.event.addListener(marker, 'click', () => {
              if (selectedMarker === null || selectedMarker !== buildingList.findIndex((b) => b.buildingId === building.buildingId)) {
                setOpen(true)
                const markerIndex = buildingList.findIndex((b) => b.buildingId === building.buildingId)
                setSelectedMarker(markerIndex)
              }
            })
          })
      } else if (selectedInfo === "cafe") {
        let imageSrc = CAFE, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(35, 35) // 마커이미지의 크기입니다

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );
        !isFetching &&
          !error &&
          buildingList.filter(building => (building.buildingId >= 100 && building.buildingId < 200)).forEach((building, index) => {
            const latlng = new kakao.maps.LatLng(building.y, building.x)
            const marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: latlng, // 마커를 표시할 위치
              title: building.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage
            })
            markers.push(marker)

            kakao.maps.event.addListener(marker, 'click', () => {
              if (selectedMarker === null || selectedMarker !== buildingList.findIndex((b) => b.buildingId === building.buildingId)) {
                setOpen(true)
                const markerIndex = buildingList.findIndex((b) => b.buildingId === building.buildingId)
                setSelectedMarker(markerIndex)
              }
            })
          })
      } else if (selectedInfo === "restaurant") {
        let imageSrc = RESTAURANT, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(35, 35) // 마커이미지의 크기입니다

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );
        !isFetching &&
          !error &&
          buildingList.filter(building => (building.buildingId >= 200 && building.buildingId < 300)).forEach((building, index) => {
            const latlng = new kakao.maps.LatLng(building.y, building.x)
            const marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: latlng, // 마커를 표시할 위치
              title: building.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage
            })
            markers.push(marker)

            kakao.maps.event.addListener(marker, 'click', () => {
              if (selectedMarker === null || selectedMarker !== buildingList.findIndex((b) => b.buildingId === building.buildingId)) {
                setOpen(true)
                const markerIndex = buildingList.findIndex((b) => b.buildingId === building.buildingId)
                setSelectedMarker(markerIndex)
              }
            })
          })
      } else if (selectedInfo === "conven") {
        let imageSrc = STORE, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(35, 35) // 마커이미지의 크기입니다

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );

        !isFetching &&
          !error &&
          buildingList.filter(building => (building.buildingId >= 300 && building.buildingId < 400)).forEach((building, index) => {
            const latlng = new kakao.maps.LatLng(building.y, building.x)
            const marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: latlng, // 마커를 표시할 위치
              title: building.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage
            })
            markers.push(marker)

            kakao.maps.event.addListener(marker, 'click', () => {
              if (selectedMarker === null || selectedMarker !== buildingList.findIndex((b) => b.buildingId === building.buildingId)) {
                setOpen(true)
                const markerIndex = buildingList.findIndex((b) => b.buildingId === building.buildingId)
                setSelectedMarker(markerIndex)
              }
            })
          })
      } else if (selectedInfo === "etc") {
        let imageSrc = ETC, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(35, 35) // 마커이미지의 크기입니다


        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );

        !isFetching &&
          !error &&
          buildingList.filter(building => (building.buildingId >= 400 && building.buildingId < 500)).forEach((building, index) => {
            const latlng = new kakao.maps.LatLng(building.y, building.x)
            const marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: latlng, // 마커를 표시할 위치
              title: building.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage
            })
            markers.push(marker)

            kakao.maps.event.addListener(marker, 'click', () => {
              if (selectedMarker === null || selectedMarker !== buildingList.findIndex((b) => b.buildingId === building.buildingId)) {
                setOpen(true)
                const markerIndex = buildingList.findIndex((b) => b.buildingId === building.buildingId)
                setSelectedMarker(markerIndex)
              }
            })
          })
      } else if (selectedInfo === "search") {
        let imageSrc = BUILDING, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(35, 35) // 마커이미지의 크기입니다

        let markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );
        console.log(searchIndex)
        const latlng = new kakao.maps.LatLng(buildingList[searchIndex].y, buildingList[searchIndex].x)
        const marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: latlng, // 마커를 표시할 위치
          title: buildingList[searchIndex].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage
        })
        markers.push(marker)

        kakao.maps.event.addListener(marker, 'click', () => {
          if (selectedMarker === null || selectedMarker !== buildingList.findIndex((b) => b.buildingId === buildingList[searchIndex].buildingId)) {
            setOpen(true)
            setSelectedMarker(searchIndex)
          }
        })

        const moveLatLon = new kakao.maps.LatLng(buildingList[searchIndex].y, buildingList[searchIndex].x)
        map.panTo(moveLatLon)

        setSelectedMarker(searchIndex)
        setOpen(true)
      }
    }
  }, [buildingList, selectedInfo, searchIndex])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
  }

  const onSubmit = async () => {
    try {
      if (searchInput === "") {
        alert("검색어를 입력해주세요.")
        return
      }

      const res = await searchBuilding(searchInput)

      if (res.code === "SU") {
        const index = buildingList.findIndex(building => building.buildingId === res.buildingId)

        setSearchIndex(index)
        setSelectedInfo("search")

      } else {
        alert("건물 정보가 없습니다.")
        return
      }

    } catch (err) {
      console.log(err)
    }
  }

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  const handleClick = (s) => {
    setSelectedInfo(s)
    console.log(selectedInfo)
  }

  return (
    <div>
      <SearchInput searchItems={searchItems} activeEnter={activeEnter} />
      <ButtonContainer id="button-container">
        <Button onClick={() => handleClick(btnArray[0].state)} active={selectedInfo === btnArray[0].state}>{btnArray[0].name}</Button>
        <Button onClick={() => handleClick(btnArray[1].state)} active={selectedInfo === btnArray[1].state}>{btnArray[1].name}</Button>
        <Button onClick={() => handleClick(btnArray[2].state)} active={selectedInfo === btnArray[2].state}>{btnArray[2].name}</Button>
        <Button onClick={() => handleClick(btnArray[3].state)} active={selectedInfo === btnArray[3].state}>{btnArray[3].name}</Button>
        <Button onClick={() => handleClick(btnArray[4].state)} active={selectedInfo === btnArray[4].state}>{btnArray[4].name}</Button>
      </ButtonContainer>
      <div
        id="map"
        style={{
          width: '100%',
          height: 'calc(100vh - 48px)',
        }}
      >
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
      <BottomNavigation />
    </div>
  )
}

const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 16px;
gap: 8px;
position: absolute;
top: 80px;
width: 100%;
height: 32px;
z-index: 11;
`
const Button = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 8px;
gap: 4px;

width: auto;
height: 32px;
font-weight: 400;
font-size: 12px;
line-height: 16px;
background: #FFFFFF;
border-radius: 12px;
${({ active }) =>
    active
      ? css`
  background: #F1F1F1;
  color: #111111;
    `
      : css`
  background: #FFFFFF;
  color: #585858;
    `}
`
