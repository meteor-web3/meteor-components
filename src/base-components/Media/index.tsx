import "@google/model-viewer";

import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { css, SerializedStyles } from "@emotion/react";

import iconDownload from "@/assets/icon/download.png";
import musicCard from "@/assets/icon/music_card.png";
import mysteryBox from "@/assets/icon/mysteryBox.jpg";
import iconSpinner from "@/assets/icon/spinner_black.svg";
import { SmallButton } from "@/index";
import { colors, ellipsisCSS } from "@/styles";
import compress from "@/utils/compress";
import {
  jsonProxy,
  jsonProxy2,
  revokeJsonProxy,
  revokeJsonProxy2,
} from "@/utils/constants";
import { getPlatformType } from "@/utils/getPlatform";

const iconStyle =
  "position: absolute;top: 0;right: 0;bottom: 0;left: 0;max-height: 100%;margin: auto;";
const baseStyle = "border-radius: 12px;";
const backgroundStyle = `background:${colors.nftbg};`;
let contentStyle = `${baseStyle}${backgroundStyle}`;

const Text = function ({
  media,
  mediaVisible,
  isDetail,
}: {
  media: string;
  mediaVisible: boolean;
  isDetail?: boolean;
}) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch(media)
      .then(r => r.text())
      .then(r => setContent(r));
  }, [media]);

  return (
    <>
      <Loading
        cssStyle={css`
          display: ${isDetail && content && "none"};
        `}
        isDetail={isDetail}
      />
      <div
        css={css`
          ${contentStyle}
          ${isDetail || iconStyle}
          padding: ${mediaVisible ? "10px" : "10px 15px"};
          overflow: ${mediaVisible ? "auto" : "hidden"};
          font-size: ${mediaVisible ? "20px" : "16px"};
          color: ${!isDetail && "white"};
          text-align: left;
          word-break: break-word;
          white-space: pre-wrap;
        `}
        className='hideScrollbar'
      >
        {content}
      </div>
    </>
  );
};

const Html = function ({
  media,
  mediaVisible,
  isDetail,
}: {
  media: string;
  mediaVisible: boolean;
  isDetail?: boolean;
}) {
  const contentElement = useRef<any>(null);
  const [url, setUrl] = useState<string>(media);
  const [iframeVisible, setIframeVisible] = useState<boolean>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const a = media.lastIndexOf("http");
    if (a === -1) return;
    const b = media.slice(a);
    try {
      const c = decodeURIComponent(decodeURIComponent(b));
      if (c.includes("</svg>")) {
        setIframeVisible(false);
        setUrl(
          `data:image/svg+xml;base64,${window.btoa(
            unescape(encodeURIComponent(media)),
          )}`,
        );
        return;
      }
      setIframeVisible(true);
      setUrl(c);
    } catch {
      try {
        if (media.includes("</svg>")) {
          setIframeVisible(false);
          setUrl(
            `data:image/svg+xml;base64,${window.btoa(
              unescape(encodeURIComponent(media)),
            )}`,
          );
        } else {
        }
      } catch {}
    }
  }, [media]);

  return (
    <div
      ref={contentElement}
      css={css`
        ${contentStyle}
        ${isDetail || iconStyle}
        overflow: ${mediaVisible ? "auto" : "hidden"};
        font-size: 20px;
        color: white;
        text-align: left;
        word-break: break-all;
        white-space: pre-line;
      `}
      className='hideScrollbar'
    >
      <Loading
        cssStyle={css`
          display: ${isDetail && isLoaded && "none"};
          z-index: ${!isDetail && isLoaded ? "-1" : "1"};
          background: ${isDetail && "white"};
        `}
        isDetail={isDetail}
      />

      {iframeVisible ? (
        <iframe
          title='iframe'
          src={url}
          allowFullScreen
          name='mapFrame'
          scrolling='no'
          frameBorder='0'
          width='100%'
          height='100%'
          onLoad={() => setIsLoaded(true)}
          css={css`
            display: block;
            /* position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0; */
          `}
        />
      ) : (
        <img
          css={css`
            ${contentStyle}
            ${isDetail || iconStyle}
            width: 100%;
            object-fit: contain;
            /* position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0; */
          `}
          src={url}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

const Model = function ({
  media,
  mediaVisible,
  isDetail,
}: {
  media: string;
  mediaVisible: boolean;
  isDetail?: boolean;
}) {
  const contentElement = useRef<HTMLElement>();

  useLayoutEffect(() => {
    if (isDetail) return;
    const mv = contentElement.current;
    if (!mv) return;
    const shadowRoot = mv.shadowRoot;
    if (!shadowRoot) return;
    const button = shadowRoot.querySelectorAll(
      "#default-poster",
    )[0] as HTMLElement;
    button.style.background = "none";

    const el = mv.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement;
    mv.style.opacity = "0";
    mv.style.width = `${el?.offsetWidth}px`;
    mv.style.height = `${el?.offsetHeight}px`;
    setTimeout(
      () => {
        mv.style.opacity = "1";
      },
      mediaVisible ? 800 : 1300,
    );
  }, [isDetail, mediaVisible]);

  return (
    <div
      css={css`
        ${contentStyle}
        ${isDetail || iconStyle}
        background:${isDetail && "white"};
      `}
      // eslint-disable-next-line react/no-unknown-property
      onLoad={(el: any) => {
        if (!isDetail) return;
        const mv = contentElement.current;
        if (!mv) return;
        const shadowRoot = mv.shadowRoot;
        if (!shadowRoot) return;
        const el2 = el?.target.parentNode?.parentNode
          ?.parentNode as HTMLElement;
        mv.style.width = `${el2?.offsetWidth}px`;
        mv.style.height = `${el2?.offsetWidth}px`;
      }}
    >
      <Loading
        cssStyle={css`
          display: none;
        `}
        isDetail={isDetail}
      />
      <model-viewer
        ref={contentElement}
        src={jsonProxy2(revokeJsonProxy(media))}
        ar
        ar-modes='webxr scene-viewer quick-look'
        environment-image='neutral'
        auto-rotate
        camera-controls
        onClick={(e: Event) => {
          e.stopPropagation();
        }}
        onError={(e: any) => {}}
        onClose={(e: any) => {}}
        model-visibility={(e: any) => {}}
      />
    </div>
  );
};

const Binary = function ({
  media,
  mediaVisible,
  mediaMimeType,
  autoPlay,
  getMedia,
  isDetail,
  imgCssStyle,
}: {
  media: string;
  mediaVisible: boolean;
  mediaMimeType: string;
  autoPlay: boolean;
  getMedia(media: any): void;
  isDetail?: boolean;
  imgCssStyle?: SerializedStyles;
}) {
  let format;
  media = revokeJsonProxy(media);
  if (media.includes("?")) {
    const base = media.split("?")[0];
    format = base.slice(base.lastIndexOf(".") + 1);
  } else {
    format = media.slice(media.lastIndexOf(".") + 1);
  }
  if (getPlatformType(media) === "IPFS") {
    media = jsonProxy(media);
  }
  switch (format) {
    case "jpg":
    case "png":
    case "jpeg":
    case "bmp":
    case "ico":
    case "webp":
    case "svg":
    case "avif":
      return (
        <Image
          image={media}
          mediaVisible={mediaVisible}
          isDetail={isDetail}
          imgCssStyle={imgCssStyle}
        />
      );
    case "gif":
      return (
        <Image
          image={media}
          mediaVisible={mediaVisible}
          mediaMimeType='image/gif'
          isDetail={isDetail}
          imgCssStyle={imgCssStyle}
        />
      );

    case "mp4":
    case "mov":
    case "ogv":
    case "Ogg":
    case "ogg":
    case "mkv":
    case "webm":
    case "f4v":
      return (
        <Video
          media={media}
          autoPlay={autoPlay}
          getMedia={getMedia}
          mediaVisible={mediaVisible}
        />
      );

    case "mp3":
    case "flac":
    case "wav":
    case "aac":
    case "m4r":
    case "m4a":
      return mediaVisible ? (
        <Audio media={media} autoPlay={autoPlay} getMedia={getMedia} />
      ) : (
        <MusicCard />
      );

    case "glb":
    case "gltf":
      return (
        <Model media={media} mediaVisible={mediaVisible} isDetail={isDetail} />
      );

    default:
      return (
        <Download
          media={media}
          mediaVisible={mediaVisible}
          mediaMimeType={mediaMimeType}
        />
      );
  }
};

const Audio = function ({
  media,
  autoPlay,
  getMedia,
}: {
  media: string;
  autoPlay: boolean;
  getMedia: (media: any) => void;
}) {
  const [hasChangedProxy, setHasChangedProxy] = useState(false);
  const [hasRemovedProxy, setHasRemovedProxy] = useState(false);
  const audio: any = useRef();
  useEffect(() => {
    getMedia(audio.current);
  }, [getMedia]);
  return (
    <div
      css={css`
        ${contentStyle}
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <audio
        css={css`
          width: 50%;
        `}
        ref={audio}
        controls
        loop
        src={media}
        autoPlay={autoPlay}
        onError={el => {
          if (!hasRemovedProxy) {
            el.currentTarget.src = revokeJsonProxy(el.currentTarget.src);
            const el2 = el.currentTarget;
            const pNode = el.currentTarget.parentNode;
            el.currentTarget.remove();
            pNode?.append(el2);
            setHasRemovedProxy(true);
          } else if (!hasChangedProxy) {
            el.currentTarget.src = jsonProxy2(el.currentTarget.src);
            const el2 = el.currentTarget;
            const pNode = el.currentTarget.parentNode;
            el.currentTarget.remove();
            pNode?.append(el2);
            setHasChangedProxy(true);
          }
        }}
      />
    </div>
  );
};

const MusicCard = function () {
  return (
    <div
      css={css`
        ${contentStyle}
        background: rgb(0,1,0);
      `}
    >
      <Image
        image={musicCard}
        cssStyle={css`
          object-fit: contain !important;
          width: 70% !important;
          background: rgb(0, 1, 0) !important;
        `}
        mediaVisible
      />
    </div>
  );
};

const Ffmpeg = function ({
  media,
  autoPlay,
  getMedia,
  setLoadError,
}: {
  media: string;
  autoPlay: boolean;
  getMedia: (media: any) => void;
  setLoadError: (arg: boolean) => void;
}) {
  const audio: any = useRef();
  const handleSetLoadError = useCallback(setLoadError, [setLoadError]);
  useEffect(() => {
    getMedia(audio.current);
  }, [getMedia]);
  return (
    <audio
      css={css`
        ${contentStyle}
        width: 50%;
      `}
      ref={audio}
      loop
      controls
      src={"http://127.0.0.1:3000/transform?mediaUrl=".concat(media)}
      autoPlay={autoPlay}
      onError={() => handleSetLoadError(true)}
    />
  );
};

const Video = function ({
  media,
  autoPlay,
  mediaVisible,
  getMedia,
  cssStyle,
}: {
  media: string;
  autoPlay: boolean;
  mediaVisible: boolean;
  getMedia(media: any): void;
  cssStyle?: SerializedStyles;
}) {
  const [hasChangedProxy, setHasChangedProxy] = useState(false);
  const [hasRemovedProxy, setHasRemovedProxy] = useState(false);
  const video: any = useRef();
  useEffect(() => {
    getMedia(video.current);
  }, [autoPlay, getMedia]);

  return (
    <video
      src={media}
      css={css`
        ${contentStyle}
        width: 100%;
        height: 100%;
        ${cssStyle}
      `}
      ref={video}
      autoPlay={autoPlay}
      controls={!!mediaVisible}
      loop
      playsInline
      onError={el => {
        if (!hasRemovedProxy) {
          el.currentTarget.src = revokeJsonProxy(el.currentTarget.src);
          const el2 = el.currentTarget;
          const pNode = el.currentTarget.parentNode;
          el.currentTarget.remove();
          pNode?.append(el2);
          setHasRemovedProxy(true);
        } else if (!hasChangedProxy) {
          el.currentTarget.src = jsonProxy2(el.currentTarget.src);
          const el2 = el.currentTarget;
          const pNode = el.currentTarget.parentNode;
          el.currentTarget.remove();
          pNode?.append(el2);
          setHasChangedProxy(true);
        }
      }}
    >
      <source
        src={media}
        onError={el => {
          if (!hasRemovedProxy) {
            el.currentTarget.src = revokeJsonProxy(el.currentTarget.src);
            const el2 = el.currentTarget;
            const pNode = el.currentTarget.parentNode;
            el.currentTarget.remove();
            pNode?.append(el2);
            setHasRemovedProxy(true);
          } else if (!hasChangedProxy) {
            el.currentTarget.src = jsonProxy2(el.currentTarget.src);
            const el2 = el.currentTarget;
            const pNode = el.currentTarget.parentNode;
            el.currentTarget.remove();
            pNode?.append(el2);
            setHasChangedProxy(true);
          }
        }}
      />
    </video>
  );
};

const Image = function ({
  image,
  cssStyle,
  imgCssStyle,
  mediaVisible,
  mediaMimeType,
  needCompress = true,
  onLoad,
  isDetail,
}: {
  image: string;
  cssStyle?: SerializedStyles;
  imgCssStyle?: SerializedStyles;
  mediaVisible?: boolean;
  mediaMimeType?: string;
  needCompress?: boolean;
  onLoad?: () => void;
  isDetail?: boolean;
}) {
  const [hasChangedProxy, setHasChangedProxy] = useState(false);
  const [hasRemovedProxy, setHasRemovedProxy] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isGif = mediaMimeType?.includes("image/gif");
  return (
    <>
      <Loading
        cssStyle={css`
          display: ${isDetail && isLoaded && "none !important"};
          ${cssStyle}
        `}
        isDetail={isDetail}
      />
      <img
        id='mediaImg'
        css={css`
          ${contentStyle}
          ${isDetail || iconStyle}
          width: 100%;
          /* visibility: ${!isGif && "hidden"}; */
          visibility: hidden;
          ${cssStyle};
          ${imgCssStyle};
        `}
        src={image}
        onLoad={(el: any) => {
          if (
            isGif ||
            !needCompress ||
            image.includes("https://images.mirror-media.xyz/")
          ) {
            el.target.style.visibility = "visible";
            onLoad && onLoad();
            setIsLoaded && setIsLoaded(true);
            return;
          }
          compress(
            el.currentTarget.src,
            el.currentTarget,
            undefined,
            onLoad,
            setIsLoaded,
          );
        }}
        onError={el => {
          if (!hasChangedProxy) {
            const newImage = jsonProxy2(revokeJsonProxy(image));
            setHasChangedProxy(true);
            if (isGif || !needCompress) {
              el.currentTarget.src = newImage;
              return;
            }
            compress(newImage, el.currentTarget, true);
          } else if (!hasRemovedProxy) {
            const newImage = revokeJsonProxy2(image);
            setHasRemovedProxy(true);
            if (isGif || !needCompress) {
              el.currentTarget.src = newImage;
              return;
            }
            compress(newImage, el.currentTarget, true);
          }
        }}
      />
    </>
  );
};

const Download = function ({
  media,
  mediaVisible,
  mediaMimeType,
  cardWidth,
  isDetail,
}: {
  media: string;
  mediaVisible: boolean;
  mediaMimeType: string;
  cardWidth?: number;
  isDetail?: boolean;
}) {
  if (getPlatformType(media) === "IPFS") {
    media = revokeJsonProxy(media);
  }
  return (
    <div
      css={css`
        ${contentStyle}
        ${isDetail || iconStyle}
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${mediaVisible ? "10px" : "10px 15px"};
        overflow: ${mediaVisible ? "auto" : "hidden"};
        font-size: 16px;
        color: white;
        text-align: center;
        background-color: white;
      `}
      className='hideScrollbar'
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${cardWidth && cardWidth < 150 ? "100%" : "150px"};
          /* width: 10px; */
          height: 33px;
          padding: 16px 10px;
          background: linear-gradient(
              95.04deg,
              rgba(0, 0, 0, 0) 3.11%,
              rgba(0, 0, 0, 0.12) 94.96%
            ),
            #212426;
          border: 2px solid rgba(0, 0, 0, 0.08);
          border-radius: 100px;
          box-shadow:
            -6px -6px 12px rgba(255, 255, 255, 0.04),
            6px 6px 12px rgba(0, 0, 0, 0.16);
        `}
      >
        <span
          css={css`
            ${ellipsisCSS}
          `}
        >
          {mediaMimeType &&
            mediaMimeType.split("/")[1] !== undefined &&
            mediaMimeType.split("/")[1].split(";")[0]}
        </span>
      </div>
      <a
        target='_blank'
        rel='noreferrer noopener'
        download
        href={media}
        css={css`
          display: block;
          margin-top: 22px;
        `}
      >
        <SmallButton
          content={iconDownload}
          tip='Download File'
          cssStyle={css`
            > div {
              margin-top: 16px;
            }
          `}
          borderless
        />
      </a>
    </div>
  );
};

export const Iframe = ({
  id,
  media,
  onLoad,
  onError,
  cssStyles,
}: {
  id?: string;
  media: string;
  onLoad?: (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => void;
  onError?: Function;
  cssStyles?: SerializedStyles;
}) => (
  <iframe
    id={id}
    title='iframe'
    src={media}
    allowFullScreen
    name='mapFrame'
    frameBorder='0'
    width='100%'
    height='100%'
    scrolling='yes'
    className='mediaIframe'
    sandbox='allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation-by-user-activation'
    onLoad={e => onLoad?.(e)}
    onError={e => onError?.(e)}
    css={css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      ${cssStyles};
    `}
  />
);

export const IframeWithoutSandBox = ({
  media,
  onLoad,
}: {
  media: string;
  onLoad?: (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => void;
}) => (
  <iframe
    title='iframe'
    src={media}
    allowFullScreen
    name='mapFrame'
    frameBorder='0'
    width='100%'
    height='100%'
    scrolling='yes'
    onLoad={e => {
      onLoad && onLoad(e);
    }}
    css={css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `}
  />
);

const Empty = function ({
  cssStyle,
  children,
}: {
  cssStyle?: SerializedStyles;
  children?: ReactNode;
}) {
  return (
    <div
      css={css`
        ${contentStyle}
        display: grid;
        place-items: center;
        color: black;
        background: ${colors.nftbg};
        ${cssStyle}
      `}
    >
      {children}
    </div>
  );
};

const Loading = function ({
  cssStyle,
  isDetail,
}: {
  cssStyle?: SerializedStyles;
  isDetail?: boolean;
}) {
  return (
    <Empty
      cssStyle={css`
        background: ${isDetail && "white"};
        ${cssStyle}
      `}
    >
      {isDetail && (
        <img
          src={iconSpinner}
          css={css`
            @keyframes _18hu3ey0 {
              to {
                transform: rotate(1turn);
              }
            }
            animation: _18hu3ey0 1.4s linear infinite;
            width: 30px;
            height: 30px;
          `}
        />
      )}
    </Empty>
  );
};

export type MIMEType =
  | "text/xml"
  | "text/plain"
  | "text/markdown"
  | "application/json"
  | "application/javascript"
  | "text/html"
  | "model/gltf"
  | "audio/mp3"
  | "audio/ogg"
  | "audio/flac"
  | "audio/wav"
  | "audio/vnd.dlna.adts"
  | "audio/x-m4r"
  | "audio/m4a"
  | "audio/mpeg"
  | "video/mp4"
  | "video/quicktime"
  | "image/jpg"
  | "image/jpeg"
  | "image/png"
  | "image/bmp"
  | "image/gif"
  | "image/x-icon"
  | "image/webp"
  | "image/svg+xml"
  | "imageViewer"
  | "application/octet-stream"
  | "binary/octet-stream"
  | "application/wasm"
  | "application/json"
  | "application/pdf"
  | "iframe";

export interface MediaProps {
  mediaUrl: string;
  mediaMimeType: MIMEType | "";
  autoPlay?: boolean;
  mediaVisible?: boolean;
  needCompress?: boolean;
  isMysteryBox?: boolean;
  getMedia?: (media: any) => void;
  cardWidth?: number;
  cssStyle?: SerializedStyles;
  imgCssStyle?: SerializedStyles;
  onLoad?: (e?: React.SyntheticEvent<HTMLIFrameElement, Event>) => void;
  isDetail?: boolean;
}

export const Media = function ({
  mediaUrl,
  mediaMimeType,
  autoPlay = false,
  mediaVisible = false,
  needCompress = true,
  isMysteryBox,
  getMedia = () => {},
  cardWidth,
  cssStyle,
  imgCssStyle,
  onLoad,
  isDetail,
}: MediaProps) {
  contentStyle = mediaVisible
    ? `${baseStyle}background:none;`
    : `${baseStyle}${backgroundStyle}`;

  if (
    mediaMimeType?.includes("text/xml") ||
    mediaMimeType?.includes("text/plain") ||
    mediaMimeType?.includes("text/markdown") ||
    mediaMimeType?.includes("application/json") ||
    mediaMimeType?.includes("application/javascript")
  )
    return (
      <Text media={mediaUrl} mediaVisible={mediaVisible} isDetail={isDetail} />
    );

  if (mediaMimeType?.includes("text/html"))
    return (
      <Html media={mediaUrl} mediaVisible={mediaVisible} isDetail={isDetail} />
    );

  if (mediaMimeType?.includes("model/gltf")) {
    return (
      <Model media={mediaUrl} mediaVisible={mediaVisible} isDetail={isDetail} />
    );
  }

  if (
    mediaMimeType?.includes("audio/mp3") ||
    mediaMimeType?.includes("audio/ogg") ||
    mediaMimeType?.includes("audio/flac") ||
    mediaMimeType?.includes("audio/wav") ||
    mediaMimeType?.includes("audio/vnd.dlna.adts") ||
    mediaMimeType?.includes("audio/x-m4r") ||
    mediaMimeType?.includes("audio/m4a") ||
    mediaMimeType?.includes("audio/mpeg")
  )
    return mediaVisible ? (
      <Audio
        media={mediaVisible ? mediaUrl : ""}
        autoPlay={autoPlay}
        getMedia={getMedia}
      />
    ) : (
      <MusicCard />
    );

  if (
    mediaMimeType?.includes("video/mp4") ||
    mediaMimeType?.includes("video/quicktime")
  )
    return (
      <Video
        media={mediaUrl}
        autoPlay={autoPlay}
        mediaVisible={mediaVisible}
        getMedia={getMedia}
        cssStyle={cssStyle}
      />
    );

  if (
    mediaMimeType?.includes("image/jpg") ||
    mediaMimeType?.includes("image/jpeg") ||
    mediaMimeType?.includes("image/png") ||
    mediaMimeType?.includes("image/bmp") ||
    mediaMimeType?.includes("image/gif") ||
    mediaMimeType?.includes("image/x-icon") ||
    mediaMimeType?.includes("image/webp") ||
    mediaMimeType?.includes("image/svg+xml") ||
    mediaMimeType?.includes("imageViewer")
  )
    return (
      <Image
        image={mediaUrl}
        mediaVisible={mediaVisible}
        mediaMimeType={mediaMimeType}
        needCompress={needCompress}
        cssStyle={cssStyle}
        imgCssStyle={imgCssStyle}
        onLoad={onLoad}
        isDetail={isDetail}
      />
    );

  if (
    mediaMimeType?.includes("application/octet-stream") ||
    mediaMimeType?.includes("binary/octet-stream") ||
    mediaMimeType?.includes("application/wasm") ||
    mediaMimeType?.includes("application/json")
  )
    return (
      <Binary
        media={mediaUrl}
        mediaMimeType={mediaMimeType}
        mediaVisible={mediaVisible}
        autoPlay={autoPlay}
        getMedia={getMedia}
        imgCssStyle={imgCssStyle}
      />
    );

  if (mediaMimeType?.includes("application/pdf")) {
    return <IframeWithoutSandBox media={mediaUrl} onLoad={onLoad} />;
  }

  if (mediaMimeType === "iframe") {
    return <Iframe media={mediaUrl} onLoad={onLoad} />;
  }

  if (mediaUrl)
    return (
      <Download
        media={mediaUrl}
        mediaVisible={mediaVisible}
        mediaMimeType={mediaMimeType}
        cardWidth={cardWidth}
        isDetail={isDetail}
      />
    );

  if (isMysteryBox) return <Image image={mysteryBox} />;

  return <Empty />;
};
