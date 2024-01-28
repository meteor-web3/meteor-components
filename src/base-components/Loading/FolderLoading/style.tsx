import styled from "@emotion/styled";

export const RootWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #969799;
  text-align: center;

  img {
    width: 20px;
    margin-right: 6px;
  }
`;

export const ImgWrap = styled.img<{ cardSize: number }>`
  width: ${props => props.cardSize}px;
  height: ${props => props.cardSize}px;
  object-fit: contain;
  object-position: 50% 50%;
  cursor: pointer;
`;

export const FolderCardWrap = styled.div<{
  cardWidth: number;
  cardHeight: number;
}>`
  display: block;
  position: relative;
  width: ${props => props.cardWidth}px;
  height: ${props => props.cardHeight}px;
  margin-bottom: 33.06px;
  border-radius: 12px;
  background: #ffffff;
  overflow: visible;
  transition: all 0.3s;
`;
