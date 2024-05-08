import { useEffect, useRef, useState } from 'react'
import { BottomNavigation } from '../components/BottomNavigation'
import { PostFAB } from '../components/Home/PostFAB'
import client from '../lib/client'
import { BottomSheet } from '../components/BottomSheet'
import styled from 'styled-components'

export default function Home() {
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const postIdRef = useRef()

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

      response.data.topList.forEach(({ x, y, postId }) => {
        addMarker(new window.kakao.maps.LatLng(x, y), postId)
      })
    }

    setMarkers()

    function addMarker(position, postId) {
      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        position: position,
      })

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map)

      window.kakao.maps.event.addListener(marker, 'click', function () {
        setOpenBottomSheet(true)
        postIdRef.current = postId
      })
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

      <BottomSheet
        open={openBottomSheet}
        onOpenChange={setOpenBottomSheet}
        height="fitContent"
      >
        <BottomSheetContent postId={postIdRef.current}></BottomSheetContent>
      </BottomSheet>

      <BottomNavigation />
    </>
  )
}

function BottomSheetContent({ postId }) {
  const [post, setPost] = useState()

  useEffect(() => {
    const setPostAsync = async () => {
      const response = await client.get(`/post/${postId}`)

      setPost(response.data)
    }

    setPostAsync()
  }, [postId])

  if (post === undefined) return null

  return (
    <StyledBottomSheetContent>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
    </StyledBottomSheetContent>
  )
}

const StyledBottomSheetContent = styled.div`
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
