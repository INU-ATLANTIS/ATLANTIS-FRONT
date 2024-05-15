import styled, { css } from 'styled-components'
import { TopNavigation } from '../components/TopNavigation'
import client from '../lib/client'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EventImg from '../assets/markers/favourite.png'
import ConstructionImg from '../assets/markers/car-repair.png'
import BasicImg from '../assets/markers/placeholder.png'

import { HXAP } from '../bridge'
const { kakao } = window

export default function MarkerAlarmPosting() {
  const navigate = useNavigate()
  const [step, setStep] = useState('text')

  const titleRef = useRef(null)

  const handlePost = async () => {
    const token = await HXAP.loadData('token')

    client.interceptors.request.use(config => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }

      return config
    })

    setStep('location')
  }

  return (
    <Container>
      <TopNavigation
        onBack={() => {
          if (step === 'text') {
            navigate(-1)
          } else {
            setStep('text')
          }
        }}
      />

      {step === 'text' ? (
        <>
          <TitleContainer size="large">
            <span>알림 메시지 작성</span>
          </TitleContainer>

          <InputContainer>
            <Label>알림 메시지</Label>
            <Input type="text" autoFocus ref={titleRef} />
            <InputBottomLine />
          </InputContainer>

          <BottomContainer>
            <div style={{ height: 84 }}></div>

            <Button variant="primary" onClick={handlePost}>
              다음
            </Button>
          </BottomContainer>
        </>
      ) : (
        <>
          <Location alarmMessage={titleRef.current.value} />
        </>
      )}
    </Container>
  )
}

const typeList = [
  { type: null, name: '기본', imgSrc: BasicImg },
  { type: 'event', name: '행사', imgSrc: EventImg },
  { type: 'construction', name: '공사중', imgSrc: ConstructionImg },
]
function Location({ alarmMessage }) {
  const latLng = useRef({
    Ma: 37.375,
    La: 126.631944,
  })
  const navigate = useNavigate()

  useEffect(() => {
    const mapContainer = document.getElementById('map')

    const mapOption = {
      center: new window.kakao.maps.LatLng(37.375, 126.631944),
      level: 3,
    }

    const map = new window.kakao.maps.Map(mapContainer, mapOption)
    map.setMaxLevel(4)

    let imageSrc = typeList[0].imgSrc, // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(35, 35) // 마커이미지의 크기입니다

    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
    var marker
    marker = new window.kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
      image: markerImage,
    })

    marker.setMap(map)

    window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      latLng.current = mouseEvent.latLng

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latLng.current)

      console.log(latLng.current)
    })
  }, [])

  const handlePost = async () => {
    if (latLng) {
      const myPost = await client.get('/post/my')

      await client.post('/marker', {
        name: '',
        x: latLng.current.Ma,
        y: latLng.current.La,
        postId: myPost.data.myPosts[0].postId,
        type: typeList[0].type,
      })

      const response = await client.get('/marker/my')

      const markerList = response.data.userMarkerList.filter(
        ({ postId }) => postId === myPost.data.myPosts[0].postId
      )

      const sortedMarkerList = markerList.sort(function (a, b) {
        if (a.markerId > b.markerId) {
          return 1
        }
        if (a.markerId < b.markerId) {
          return -1
        }

        return 0
      })

      await client.post('/noti', {
        message: alarmMessage,
        dateTime: '2024-05-15T00:00:00',
        radius: 200,
        markerId: sortedMarkerList[sortedMarkerList.length - 1].markerId,
      })

      alert('마커 알람이 성공적으로 등록되었어요')

      navigate(-1)
    }
  }
  return (
    <>
      <TitleContainer size="small">
        <span>어떤 위치에 알림을 설정할까요?</span>
      </TitleContainer>

      <div
        id="map"
        style={{
          width: '100vw',
          height: 322,
        }}
      ></div>

      <BottomContainer>
        <div style={{ height: 84 }}></div>

        <Button variant="primary" onClick={handlePost}>
          등록 완료
        </Button>
      </BottomContainer>
    </>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const TitleContainer = styled.div`
  display: flex;
  height: 58px;
  align-items: flex-end;
  padding-left: 16px;
  margin-bottom: 16px;

  span {
    color: #111111;
    font-weight: 600;

    ${({ size }) =>
      size === 'large'
        ? css`
            font-size: 28px;
            line-height: 38px;
          `
        : css`
            font-size: 24px;
            line-height: 34px;
          `}
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0px 16px;
`

const Label = styled.label`
  font-size: 12px;
  line-height: 18px;
  color: #505050;
`

const Input = styled.input`
  border: none;
  font-size: 24px;
  line-height: 34px;
  color: #111111;
  margin: 0;

  &::placeholder {
    color: #999999;
  }
`

const InputBottomLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #f1f1f5;
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
  background-color: ${({ theme }) => theme.primaryColor};
  color: #ffffff;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 84px;
  padding: 16px;
  position: fixed;
  bottom: 0px;
  left: 0px;
`

const ContentTextarea = styled.textarea`
  width: calc(100vw - 32px);
  margin: 0px auto;
  height: 300px;
  margin-top: 32px;
  background-color: #f7f7fb;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  line-height: 24px;
  resize: none;
`

const SmallButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 20px 24px;
  position: fixed;
  bottom: 98px;
  right: 20px;
  z-index: 100;
  border: none;
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  border-radius: 9999px;
  font-size: 18px;
  line-height: 24px;
`
