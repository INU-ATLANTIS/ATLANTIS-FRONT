import { useEffect } from 'react'
import { BottomNavigation } from '../components/BottomNavigation'
import { PostFAB } from '../components/Home/PostFAB'
import client from '../lib/client'

export default function Home() {
  useEffect(() => {
    const mapContainer = document.getElementById('map')
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.375, 126.631944),
      level: 3,
    }

    const map = new window.kakao.maps.Map(mapContainer, mapOption)
    map.setMaxLevel(4)

    var markers = []

    const setMarkers = async () => {
      const response = await client.get('/marker/top')

      response.data.topList.forEach(({ x, y }) => {
        addMarker(new window.kakao.maps.LatLng(x, y))
      })
    }

    setMarkers()

    function addMarker(position) {
      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        position: position,
      })

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map)

      // 생성된 마커를 배열에 추가합니다
      markers.push(marker)
    }
  }, [])

  return (
    <>
      <div
        id="map"
        style={{
          width: '100vw',
          height: 'calc(100vh - 48px)',
        }}
      ></div>

      <PostFAB />

      <BottomNavigation />
    </>
  )
}
