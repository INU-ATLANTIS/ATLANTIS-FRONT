import React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

export const FULL_HEIGHT = '96vh'

function BottomSheet(props) {
  const {
    height,
    trigger,
    children,
    triggerAsChild = true,
    titleSize,
    title,
    upperText,
    lowerText,
    onOpenAutoFocus,
    ...rest
  } = props

  const bodyRef = useRef(null)
  const closeButtonRef = useRef(null)

  const [positionY, setPositionY] = useState(0)
  const [dragY, setDragY] = useState(0)

  const [backToPosition, setBackToPosition] = useState(false)
  const [closeDetected, setCloseDetected] = useState(false)

  useEffect(() => {
    if (closeDetected && bodyRef.current) {
      setPositionY(bodyRef.current.clientHeight + 48)

      setTimeout(() => {
        setCloseDetected(false)
        setPositionY(0)
      }, 100)

      setTimeout(() => {
        closeButtonRef.current?.click()
      }, 50)
    }
  }, [closeDetected, bodyRef.current])

  const handleTouchStart = (e, executeAtTop) => {
    setBackToPosition(false)

    const settingDragY = () => {
      const startDragY = e.changedTouches[0].clientY
      setDragY(startDragY)
    }

    const isTop = bodyRef.current?.scrollTop === 0

    if (executeAtTop) {
      if (isTop) settingDragY()
    } else {
      settingDragY()
    }
  }

  const handleTouchMove = (e, executeAtTop) => {
    const settingPositionY = () => {
      const positionY = e.changedTouches[0].clientY

      const newPositionY = positionY - dragY
      const isDragDown = newPositionY > 0

      if (isDragDown) setPositionY(newPositionY)
    }

    const isTop = bodyRef.current?.scrollTop === 0

    if (executeAtTop) {
      if (isTop) settingPositionY()
    } else {
      settingPositionY()
    }
  }

  const handleTouchEnd = (e, executeAtTop) => {
    const actionOnTouchEnd = () => {
      const endDragY = e.changedTouches[0].clientY

      if (endDragY - dragY > ((bodyRef.current?.clientHeight ?? 0) + 48) / 3) {
        setCloseDetected(true)
      } else {
        setBackToPosition(true)
        setPositionY(0)
      }
    }

    const isTop = bodyRef.current?.scrollTop === 0

    if (executeAtTop) {
      if (isTop) actionOnTouchEnd()
    } else {
      actionOnTouchEnd()
    }
  }

  return (
    <RadixDialog.Root {...rest}>
      <RadixDialog.Close style={{ display: 'none' }} ref={closeButtonRef} />

      {trigger && (
        <RadixDialog.Trigger asChild={triggerAsChild}>
          {trigger}
        </RadixDialog.Trigger>
      )}

      <RadixDialog.Portal>
        <Overlay />

        <Content
          {...rest}
          ref={undefined}
          height={height}
          close={closeDetected}
          transition={closeDetected || backToPosition}
          style={{
            transform: `translateY(${positionY}px)`,
          }}
          onOpenAutoFocus={e => {
            if (onOpenAutoFocus) {
              onOpenAutoFocus(e)
            } else {
              e.preventDefault()
            }
          }}
        >
          <Body
            height={height}
            ref={bodyRef}
            onTouchStart={e => handleTouchStart(e, true)}
            onTouchMove={e => handleTouchMove(e, true)}
            onTouchEnd={e => handleTouchEnd(e, true)}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              <HeaderBar />
            </div>

            {children}
          </Body>
        </Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

export { BottomSheet }

const animationDuration = '0.4s'
const animationTimingFunction = 'cubic-bezier(0.300, 1.055, 0.550, 0.965)'

const slideUp = keyframes`
  0% {
    transform: translateY(96vh);
  }
  100% {
    transform: translateY(0);
  }
`

const slideDown = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(96vh);
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0,
  }
`

const Overlay = styled(RadixDialog.Overlay)`
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} ${animationDuration} ${animationTimingFunction};
  position: fixed;
  z-index: 10000000;

  &[data-state='closed'] {
    animation: ${fadeOut} ${animationDuration} ${animationTimingFunction};
  }
`

const Body = styled.div`
  overflow-y: scroll;
  background-color: #fff;
  position: relative;

  ${({ height }) =>
    height === 'full'
      ? css`
          height: ${FULL_HEIGHT};
        `
      : height === 'fitContent'
      ? css`
          height: fit-content;
        `
      : ``}
`

const Content = styled(RadixDialog.Content)`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  overflow: hidden;
  left: 0px;
  bottom: -1px;
  width: '100%';
  z-index: 10000001;

  :focus {
    outline: none;
  }

  &[data-state='open'] {
    animation: ${slideUp} ${animationDuration} ${animationTimingFunction};
  }

  &[data-state='closed'] {
    animation: ${slideDown} ${animationDuration} ${animationTimingFunction};
  }

  ${({ height }) =>
    height === 'full'
      ? css`
          height: ${FULL_HEIGHT};
        `
      : height === 'fitContent'
      ? css`
          height: fit-content;
        `
      : ``}

  ${({ transition }) =>
    transition &&
    css`
      transition: transform ${animationDuration} ${animationTimingFunction};
    `}

  ${({ close }) =>
    close &&
    css`
      &[data-state='closed'] {
        animation: unset;
      }
    `}
`

const HeaderBar = styled.span`
  width: 60px;
  height: 5px;
  background: #f1f1f5;
  border-radius: 9999px;
`
