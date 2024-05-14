import { useEffect, useRef, useState } from 'react'
import { BottomNavigation } from '../components/BottomNavigation'
import { PostFAB } from '../components/PostFAB'
import client from '../lib/client'
import { BottomSheet } from '../components/BottomSheet'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import EventImg from "../assets/markers/favourite.png"
import ConstructionImg from "../assets/markers/car-repair.png"
import BasicImg from "../assets/markers/placeholder.png"

const { kakao } = window

export default function Home() {
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const [activeMarker, setActiveMarker] = useState('weekly')
  const postIdRef = useRef()
  const markerIdRef = useRef()

  const [resetting, setResetting] = useState(true)

  const typeList = [
    { type: null, name: "기본", imgSrc: BasicImg },
    { type: "event", name: "행사", imgSrc: EventImg },
    { type: "construction", name: "공사중", imgSrc: ConstructionImg }
  ]

  useEffect(() => {
    // if (resetting === false) return

    const mapContainer = document.getElementById('map')
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.375, 126.631944),
      level: 3,
    }

    const map = new window.kakao.maps.Map(mapContainer, mapOption)
    map.setMaxLevel(4)

    var markers = []

    const setMarkers = async () => {
      const token = localStorage.getItem('token')

      client.interceptors.request.use(config => {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }

        return config
      })

      const response = await client.get(
        activeMarker === 'weekly' ? '/marker/top' : '/marker/my'
      )
      if (activeMarker === 'weekly') {
        response.data.topList.forEach(({ x, y, postId, markerId, type }) => {
          addMarker(new window.kakao.maps.LatLng(x, y), postId, markerId, type)
        })
      } else {
        response.data.userMarkerList.forEach(({ x, y, postId, markerId, type }) => {
          addMarker(new window.kakao.maps.LatLng(x, y), postId, markerId, type)
        })
      }
    }

    setMarkers()

    if (resetting) setResetting(false)

    function addMarker(position, postId, markerId, type) {
      let imageSrc = typeList[typeList.findIndex(list => list.type === type)].imgSrc, // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(35, 35) // 마커이미지의 크기입니다

      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize
      );

      var marker
      marker = new window.kakao.maps.Marker({
        position: position,
        image: markerImage
      })

      // // 마커를 생성합니다
      // var marker = new window.kakao.maps.Marker({
      //   position: position,
      // })

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map)

      window.kakao.maps.event.addListener(marker, 'click', function () {
        setOpenBottomSheet(true)
        postIdRef.current = postId
        markerIdRef.current = markerId
      })
      // 생성된 마커를 배열에 추가합니다
      markers.push(marker)
    }
  }, [activeMarker, resetting])

  return (
    <>
      <div
        id="map"
        style={{
          width: '100vw',
          height: 'calc(100vh - 48px)',
        }}
      ></div>

      <FilterContainer>
        <FilterButton
          filterOn={activeMarker === 'weekly'}
          onClick={() => setActiveMarker('weekly')}
        >
          주간 상위
        </FilterButton>

        <FilterButton
          filterOn={activeMarker === 'my'}
          onClick={() => setActiveMarker('my')}
        >
          내가 등록한
        </FilterButton>
      </FilterContainer>

      <PostFAB postMode="marker" />

      <BottomSheet
        open={openBottomSheet}
        onOpenChange={setOpenBottomSheet}
        height="fitContent"
      >
        <BottomSheetContent
          postId={postIdRef.current}
          markerId={markerIdRef.current}
          isMine={activeMarker === 'my'}
          onClose={() => setOpenBottomSheet(false)}
          onDelete={() => {
            setResetting(true)
            setOpenBottomSheet(false)
          }}
        ></BottomSheetContent>
      </BottomSheet>

      <BottomNavigation />
    </>
  )
}

function BottomSheetContent({ postId, isMine, onClose, markerId, onDelete }) {
  const [post, setPost] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const setPostAsync = async () => {
      const response = await client.get(`/post/${postId}`)

      setPost(response.data)
    }

    setPostAsync()
  }, [postId])

  const handleDelete = async () => {
    await client.delete(`/marker/${markerId}`)

    alert('마커가 삭제되었습니다')

    onDelete()
  }

  if (post === undefined) return null

  return (
    <StyledBottomSheetContent >
      <StyledDiv onClick={() => {
        navigate(`/post/${postId}`)
      }}>
        <PostTitle>{post.title}</PostTitle>
        <PostContent>{post.content}</PostContent>
      </StyledDiv>
      <BottomContainer>
        {isMine ? (
          <>
            <Button onClick={handleDelete}>삭제</Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/posting/${postId}`)}
            >
              수정
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={onClose}>
            확인
          </Button>
        )}
      </BottomContainer>
    </StyledBottomSheetContent>
  )
}

const StyledBottomSheetContent = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`
const StyledDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`
const PostTitle = styled.span`
  font-size: 20px;
  line-height: 28px;
  color: #111111;
  font-weight: 600;
  padding: 16px 16px 24px;
  word-break: keep-all;
`

const PostContent = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #505050;
  margin: 0;
  padding: 0px 16px 16px;
  word-break: keep-all;
  display: inline-block;
  white-space: pre-wrap;
`

const FilterContainer = styled.div`
  margin: 16px;
  margin-bottom: 0px;
  display: flex;
  gap: 16px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: calc(100vw - 32px);
`

const FilterButton = styled.button`
  background-color: ${({ filterOn }) => (filterOn ? '#185aff' : '#f7f7fb')};
  border-radius: 8px;
  padding: 0px 12px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 16px;
  color: ${({ filterOn }) => (filterOn ? 'white' : '#505050')};
  font-weight: 500;
`

const Button = styled.button`
  border: none;
  border-radius: 12px;
  height: 52px;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  width: 100%;
  background-color: ${({ variant, theme }) =>
    variant === 'primary' ? theme.primaryColor : '#E15241'};
  color: #ffffff;
`

const BottomContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 84px;
  padding: 16px;
  gap: 8px;
`
