import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const CurrentPosMarker = ({ position, onClick }) => {
  return (
    <CustomOverlayMap position={position}>
      <Marker onClick={onClick}></Marker>
    </CustomOverlayMap>
  );
};

const Marker = styled.div`
  height: 1rem;
  width: 1rem;
  background-color: rgb(66, 132, 243);
  opacity: 0.9;
  border-radius: 50%;
  border: white solid 3px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
`;

export default CurrentPosMarker;
