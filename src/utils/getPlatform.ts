export enum NftPlatform {
  Unknown = "Unknown",
  Opensea = "OpenSea",
  Superrare = "SuperRare",
  Zora = "Zora",
  Foundation = "Foundation",
  Twitter = "Twitter",
  Rarible = "Rarible",
  NiftyGateway = "NiftyGateway",
  AsyncArt = "AsyncArt",
  KnownOrigin = "KnownOrigin",
  MakerSplace = "Makersplace",
  Kalamint = "Kalamint",
  Objkt = "Objkt",
  Magiceden = "MagicEden",
  Tofunft = "Tofunft",
  Viv3 = "VIV3",
  Looksrare = "Looksrare",
  Treasureland = "Treasureland",
  Nftscan = "Nftscan",
  Artblocks = "Artblocks",
  NftGo = "Nftgo",
  Azuki = "Azuki",
  Gem = "Gem",
  Solanart = "Solannart",
  Coinbase = "Coinbase",
  Binance = "Binance",
  Tryshowtime = "Tryshowtime",
  Bilibili = "Bilibili",
  Mirror = "Mirror",
  Youtube = "Youtube",
  IPFS = "IPFS",
}

interface NFTPlatformMap {
  platformUrl: string[];
  name: NftPlatform;
}

const nftPlatformMap: NFTPlatformMap[] = [
  { platformUrl: ["opensea"], name: NftPlatform.Opensea },
  { platformUrl: ["superrare"], name: NftPlatform.Superrare },
  { platformUrl: ["zora"], name: NftPlatform.Zora },
  {
    platformUrl: ["foundation"],
    name: NftPlatform.Foundation,
  },
  { platformUrl: ["twitter"], name: NftPlatform.Twitter },
  { platformUrl: ["rarible.com"], name: NftPlatform.Rarible },
  {
    platformUrl: ["niftygateway"],
    name: NftPlatform.NiftyGateway,
  },
  { platformUrl: ["async.art"], name: NftPlatform.AsyncArt },
  {
    platformUrl: ["knownorigin"],
    name: NftPlatform.KnownOrigin,
  },
  {
    platformUrl: ["makersplace"],
    name: NftPlatform.MakerSplace,
  },
  {
    platformUrl: ["tryshowtime"],
    name: NftPlatform.Tryshowtime,
  },
  { platformUrl: ["magiceden"], name: NftPlatform.Magiceden },
  { platformUrl: ["objkt"], name: NftPlatform.Objkt },
  { platformUrl: ["kalamint"], name: NftPlatform.Kalamint },
  { platformUrl: ["viv3"], name: NftPlatform.Viv3 },
  { platformUrl: ["mirror"], name: NftPlatform.Mirror },
  { platformUrl: ["bilibili"], name: NftPlatform.Bilibili },
  { platformUrl: ["youtube"], name: NftPlatform.Youtube },
  { platformUrl: ["tofunft"], name: NftPlatform.Tofunft },
  {
    platformUrl: ["looksrare"],
    name: NftPlatform.Looksrare,
  },
  {
    platformUrl: ["treasureland"],
    name: NftPlatform.Treasureland,
  },
  { platformUrl: ["nftscan"], name: NftPlatform.Nftscan },
  { platformUrl: ["artblocks"], name: NftPlatform.Artblocks },
  { platformUrl: ["nftgo"], name: NftPlatform.NftGo },
  { platformUrl: ["azuki.com"], name: NftPlatform.Azuki },
  { platformUrl: ["gem.xyz"], name: NftPlatform.Gem },
  { platformUrl: ["solanart.io"], name: NftPlatform.Solanart },
  {
    platformUrl: [
      "dweb.link",
      "ipfs.io",
      "ipfs.infura.io",
      "ipfs.pixura.io",
      "ipfs.daonomic.com",
      "ipfs.fleek.co",
    ],
    name: NftPlatform.IPFS,
  },
  { platformUrl: ["nft.coinbase"], name: NftPlatform.Coinbase },
  { platformUrl: ["binance.com"], name: NftPlatform.Binance },
];

export function getPlatformType(platformUrl: string) {
  if (!platformUrl) {
    return NftPlatform.Unknown;
  }
  const url = platformUrl.toLowerCase();
  for (const platform of nftPlatformMap) {
    let varify = false;
    platform.platformUrl.map(linkUrl => {
      if (url.includes(linkUrl)) {
        varify = true;
      }
      return null;
    });
    if (varify) {
      return platform.name;
    }
  }

  return NftPlatform.Unknown;
}
