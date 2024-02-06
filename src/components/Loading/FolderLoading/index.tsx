import { FolderCardWrap, ImgWrap, RootWrap } from "./style";

import blueFolder from "@/assets/icon/blueFolder.svg";
import iconLoading from "@/assets/icon/loading_gray.svg";

export interface FolderLoadingProps {
  cardWidth: number;
  cardHeight: number;
}

export const FolderLoading: React.FC<FolderLoadingProps> = function ({
  cardWidth,
  cardHeight,
}: FolderLoadingProps) {
  return (
    <FolderCardWrap cardWidth={cardWidth} cardHeight={cardHeight}>
      <ImgWrap src={blueFolder} cardSize={cardWidth} />
      <RootWrap>
        <img src={iconLoading} />
        Loading...
      </RootWrap>
    </FolderCardWrap>
  );
};
