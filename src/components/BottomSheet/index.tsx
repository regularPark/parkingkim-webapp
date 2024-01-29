import { MouseEvent, PropsWithChildren, TouchEvent } from 'react';
import styled from 'styled-components';
import useDraggable from './hook/useDraggable';

interface BottomSheetProps extends PropsWithChildren {}

const BottomSheet = ({ children }: BottomSheetProps) => {
  const initialHeight = window.innerHeight * 0.6;
  const { height, handleDragStart, handleDragMove, handleDragEnd, toggleHeight } =
    useDraggable(initialHeight);

  const handleEvent =
    (handler: (clientY: number) => void) =>
    (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      handler(clientY);
    };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <BottomSheetContainer height={height}>
      <DragHandle
        onMouseDown={handleEvent(handleDragStart)}
        onTouchStart={handleEvent(handleDragStart)}
        onTouchMove={handleEvent(handleDragMove)}
        onTouchEnd={handleTouchEnd}
        onClick={toggleHeight}
      />
      {children}
    </BottomSheetContainer>
  );
};

const BottomSheetContainer = styled.div<{ height: number }>`
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  max-width: 500px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px -1px 5px -1px rgba(0, 0, 0, 0.25);
  height: ${({ height }) => height}px;
  transition: height 0.3s ease;
  touch-action: none;
`;

const DragHandle = styled.div`
  position: absolute;
  width: 100%;
  height: 30px;
  text-align: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

export default BottomSheet;
