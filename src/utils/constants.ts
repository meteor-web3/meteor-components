import { isFireFox } from "./compatibility";

const jsonProxyUrl = process.env.PROXY1 as string;
const jsonProxyUrl2 = process.env.PROXY2 as string;
const imageProxyStart = "https://ik.imagekit.io/p/";
const imageProxyEnd = "?tr=n-card";

export const jsonProxy = (url: string) =>
  `${jsonProxyUrl}${encodeURIComponent(url)}`;
export const jsonProxy2 = (url: string) =>
  `${jsonProxyUrl2}${encodeURIComponent(url)}`;
export const imageProxy = (url: string) =>
  `${imageProxyStart}${encodeURIComponent(url)}${imageProxyEnd}`;
export const avatarProxy = (address: string) =>
  `https://context.app/api/avatar/${address}?size=40`;

export const revokeJsonProxy = (url: string) =>
  decodeURIComponent(
    url
      .replaceAll(jsonProxyUrl, "")
      .replaceAll(encodeURIComponent(jsonProxyUrl), ""),
  );

export const revokeJsonProxy2 = (url: string) =>
  decodeURIComponent(
    url
      .replaceAll(jsonProxyUrl2, "")
      .replaceAll(encodeURIComponent(jsonProxyUrl2), ""),
  );

export const revokeImageProxy = (url: string) =>
  decodeURIComponent(
    url.replaceAll(imageProxyStart, "").replaceAll(imageProxyEnd, ""),
  );

let version = "0.5.11";
if (isFireFox()) {
  version = "0.4.8";
}
export const LATEST_VERSION = version;

export const defaultplatform = "Marketplace";
export const defaultplatformInExplore = "Marketplace";

export enum PAGE {
  LOGIN = "Login",
  HOME = "Home",
  SPACE = "Space",
  EXPLORE = "Explore",
  FEEDS = "Feeds",
  DATA = "Data",
  SETTINGS = "Settings",
}

export enum CollectionType {
  ALL = "Curated",
  CREATED = "Created",
  OWNED = "Owned",
  PAID = "Paid",
  UNTITLED = "Untitled",
  Collections = "Collections",
  EXPLORE = "Explore",
  FEEDS = "Feeds",
}

export enum StorageType {
  DID = "DID",
  AVATAR = "AVATAR",
  LNG = "i18nextLng",
  TUTORIAL_VISIBLE = "TUTORIAL_VISIBLE",
  API_TOKEN = "API_TOKEN",
}

export enum FeedsType {
  Community = "Community",
  Collectors = "Collectors",
  Artists = "Artists",
  Loot = "Loot",
  Punk = "CryptoPunk",
  FWB = "FWB",
  FingerprintsDAO = "Fingerprint",
  Followings = "Followings",
}

export enum EventType {
  mint = "minted",
  bid = "bid",
  buy = "purchased",
  sale = "sold",
  transfer = "transferred",
}

export const typeArray = [
  "NFT",
  "Mirror",
  "Video",
  "File",
  "Website",
  "Folder",
];

export enum BookmarkType {
  COLLECTION,
  CURATION,
}

export enum ShareBoxPosition {
  top,
  bottom,
}

export enum SortType {
  cell = "cell",
  list = "list",
}

export enum SortBy {
  normal = "normal",
  date = "date",
  collectionName = "collectionName",
  type = "type",
  chain = "chain",
}

export const DEFAULT_COLLECTIONS = [
  CollectionType.ALL,
  CollectionType.CREATED,
  CollectionType.OWNED,
];

export enum IpfsGateway {
  NFTStorage,
  Web3Storage,
}
