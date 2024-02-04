/* eslint-disable complexity */
/* eslint-disable max-lines */
import arbitrum from "@/assets/logo/arbitrum_logo.svg";
import artBlock from "@/assets/logo/artblocks logo.ico";
import astar from "@/assets/logo/astar_logo.png";
import asyncArt from "@/assets/logo/AsyncArt_logo.jpg";
import aurora from "@/assets/logo/aurora_logo.svg";
import avalanche from "@/assets/logo/avalanche_logo.svg";
import azuki from "@/assets/logo/azuki logo.ico";
import bilibili from "@/assets/logo/bilibili logo.ico";
import binance from "@/assets/logo/binance logo.ico";
import Boba from "@/assets/logo/boba_logo.svg";
import BSC from "@/assets/logo/BSC_logo.png";
import celo from "@/assets/logo/celo_logo.svg";
import coinbase from "@/assets/logo/coinbase logo.png";
import cronos from "@/assets/logo/cronos_logo.svg";
import cryptopunks from "@/assets/logo/cryptopunks.png";
import ethereum from "@/assets/logo/ethereum_logo.png";
import evmos from "@/assets/logo/evmos_logo.svg";
import fantom from "@/assets/logo/fantom_logo.svg";
import flow from "@/assets/logo/flow_logo.png";
import foundation from "@/assets/logo/foundation logo.png";
import fuse from "@/assets/logo/fuse_logo.svg";
import gem from "@/assets/logo/gem logo.png";
import harmony from "@/assets/logo/harmony_logo.svg";
import hashmasks from "@/assets/logo/Hashmasks logo.jpg";
import heco from "@/assets/logo/heco_logo.svg";
import IoTeX from "@/assets/logo/IoTeX_logo.png";
import ipfs from "@/assets/logo/ipfs logo.ico";
import kalamint from "@/assets/logo/kalamint logo.png";
import KCC from "@/assets/logo/KCC_logo.png";
import klaytn from "@/assets/logo/klaytn_logo.svg";
import knownOrigin from "@/assets/logo/KnownOrigin logo.png";
import looksrare from "@/assets/logo/looksrare logo.png";
import loot from "@/assets/logo/loot.ico";
import magiceden from "@/assets/logo/magiceden logo.png";
import makersplace from "@/assets/logo/MakersPlace logo.png";
import meteor from "@/assets/logo/meteor logo.png";
import meter from "@/assets/logo/meter_logo.svg";
import metis from "@/assets/logo/metis_logo.svg";
import mirror from "@/assets/logo/mirror logo.png";
import moonbeam from "@/assets/logo/moonbeam_logo.svg";
import moonriver from "@/assets/logo/moonriver_logo.svg";
import nftgo from "@/assets/logo/nftgo logo.ico";
import nftscan from "@/assets/logo/nftscan logo.png";
import nifty from "@/assets/logo/nifty logo.png";
import oasis from "@/assets/logo/oasis_logo.svg";
import objkt from "@/assets/logo/objkt logo.png";
import OEC from "@/assets/logo/OEC_logo.svg";
import opensea from "@/assets/logo/opensea logo.png";
import optimism from "@/assets/logo/optimism_logo.svg";
import polygon from "@/assets/logo/polygon_logo.png";
import rarible from "@/assets/logo/rarible-logo.jpeg";
import shiden from "@/assets/logo/shiden_logo.svg";
import solana from "@/assets/logo/solana_logo.png";
import solanart from "@/assets/logo/solanart logo.webp";
import superrare from "@/assets/logo/superrare logo.jpeg";
import telos from "@/assets/logo/telos_logo.svg";
import tezos from "@/assets/logo/tezos_logo.png";
import tofunft from "@/assets/logo/tofunft logo.ico";
import treasureland from "@/assets/logo/treasureland logo.svg";
import tryshowtime from "@/assets/logo/tryshowtime logo.png";
import twitter from "@/assets/logo/twitter logo.png";
import viv3 from "@/assets/logo/viv3 logo.png";
import youtube from "@/assets/logo/youtube logo.png";
import zora from "@/assets/logo/zora logo.png";

export enum NftChain {
  Ethereum = "Ethereum",
  Tezos = "Tezos",
  Solana = "Solana",
  BSC = "BSC",
  Polygon = "Polygon",
  Arbitrum = "Arbitrum",
  Optimism = "Optimism",
  Moonbeam = "Moonbeam",
  PlatON = "PlatON",
  Flow = "Flow",
  FTM = "FTM",
  OEC = "OEC",
  IoTeX = "IoTeX",
  Moonriver = "Moonriver",
  KCC = "KCC",
}

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

export const extractHex = (str: string) => {
  return str.match(/0x[\dA-Za-z]+/)?.[0];
};

export const platformMapInExplore = {
  // Opensea: { logo: opensea, alias: '' },
  Marketplace: { logo: meteor, alias: "all" },
  Rarible: { logo: rarible, alias: "rarible" },
  AsyncArt: { logo: asyncArt, alias: "async-art" },
  Foundation: { logo: foundation, alias: "fnd" },
  // NiftyGateway: { logo: nifty, alias: 'nifty-gateway' },
  Superrare: { logo: superrare, alias: "superrare" },
  Zora: { logo: zora, alias: "zora" },
  KnownOrigin: { logo: knownOrigin, alias: "known-origin" },
  Makersplace: { logo: makersplace, alias: "makersplace" },
  ArtBlock: { logo: artBlock, alias: "art-blocks-factory" }, // art-blocks
  CryptoPunk: { logo: cryptopunks, alias: "cryptopunks" },
  Hashmasks: { logo: hashmasks, alias: "hashmasks" },
  Loot: { logo: loot, alias: "lootproject" },
  // Tryshowtime: { logo: tryshowtime, alias: 'tryshowtime' },
};

interface NFTPlatformMap {
  platformUrl: string[];
  logo: string;
  name: NftPlatform;
}

const nftPlatformMap: NFTPlatformMap[] = [
  { platformUrl: ["opensea"], logo: opensea, name: NftPlatform.Opensea },
  { platformUrl: ["superrare"], logo: superrare, name: NftPlatform.Superrare },
  { platformUrl: ["zora"], logo: zora, name: NftPlatform.Zora },
  {
    platformUrl: ["foundation"],
    logo: foundation,
    name: NftPlatform.Foundation,
  },
  { platformUrl: ["twitter"], logo: twitter, name: NftPlatform.Twitter },
  { platformUrl: ["rarible.com"], logo: rarible, name: NftPlatform.Rarible },
  {
    platformUrl: ["niftygateway"],
    logo: nifty,
    name: NftPlatform.NiftyGateway,
  },
  { platformUrl: ["async.art"], logo: asyncArt, name: NftPlatform.AsyncArt },
  {
    platformUrl: ["knownorigin"],
    logo: knownOrigin,
    name: NftPlatform.KnownOrigin,
  },
  {
    platformUrl: ["makersplace"],
    logo: makersplace,
    name: NftPlatform.MakerSplace,
  },
  {
    platformUrl: ["tryshowtime"],
    logo: tryshowtime,
    name: NftPlatform.Tryshowtime,
  },
  { platformUrl: ["magiceden"], logo: magiceden, name: NftPlatform.Magiceden },
  { platformUrl: ["objkt"], logo: objkt, name: NftPlatform.Objkt },
  { platformUrl: ["kalamint"], logo: kalamint, name: NftPlatform.Kalamint },
  { platformUrl: ["viv3"], logo: viv3, name: NftPlatform.Viv3 },
  { platformUrl: ["mirror"], logo: mirror, name: NftPlatform.Mirror },
  { platformUrl: ["bilibili"], logo: bilibili, name: NftPlatform.Bilibili },
  { platformUrl: ["youtube"], logo: youtube, name: NftPlatform.Youtube },
  { platformUrl: ["tofunft"], logo: tofunft, name: NftPlatform.Tofunft },
  {
    platformUrl: ["looksrare"],
    logo: looksrare,
    name: NftPlatform.Looksrare,
  },
  {
    platformUrl: ["treasureland"],
    logo: treasureland,
    name: NftPlatform.Treasureland,
  },
  { platformUrl: ["nftscan"], logo: nftscan, name: NftPlatform.Nftscan },
  { platformUrl: ["artblocks"], logo: artBlock, name: NftPlatform.Artblocks },
  { platformUrl: ["nftgo"], logo: nftgo, name: NftPlatform.NftGo },
  { platformUrl: ["azuki.com"], logo: azuki, name: NftPlatform.Azuki },
  { platformUrl: ["gem.xyz"], logo: gem, name: NftPlatform.Gem },
  { platformUrl: ["solanart.io"], logo: solanart, name: NftPlatform.Solanart },
  {
    platformUrl: [
      "dweb.link",
      "ipfs.io",
      "ipfs.infura.io",
      "ipfs.pixura.io",
      "ipfs.daonomic.com",
      "ipfs.fleek.co",
    ],
    logo: ipfs,
    name: NftPlatform.IPFS,
  },
  { platformUrl: ["nft.coinbase"], logo: coinbase, name: NftPlatform.Coinbase },
  { platformUrl: ["binance.com"], logo: binance, name: NftPlatform.Binance },
];

const getContentIdByUrl = (url: string) => {
  const platformType = getPlatformType(url);
  let chain;
  let contract;
  let tokenId;
  const contractToken = getContractTokenByUrl(url);
  if (contractToken !== false) {
    ({ contract, tokenId } = contractToken);
  }
  switch (platformType) {
    case NftPlatform.Unknown:
      return url;
    case NftPlatform.Artblocks:
      chain = NftChain.Ethereum;
      break;
    case NftPlatform.AsyncArt: {
      chain = NftChain.Ethereum;
      contract = extractHex(url);
      const tmp = url.split("/");
      tokenId = tmp[tmp.length - 1].split("-")[1];
      break;
    }

    case NftPlatform.Azuki: {
      const idx = url.match(/id=.+/)?.index;
      if (idx) {
        contract = "0xed5af388653567af2f388e6224dc7c4b3241c544";
        tokenId = url.slice(idx + 3);
      }
      chain = NftChain.Ethereum;
      break;
    }
    case NftPlatform.Coinbase:
      chain = NftChain.Ethereum;
      break;
    case NftPlatform.Foundation: {
      const s = url.split("/");
      chain = NftChain.Ethereum;
      tokenId = s[s.length - 1];
      break;
    }
    case NftPlatform.Gem:
      chain = NftChain.Ethereum;
      break;
    case NftPlatform.Kalamint: {
      contract = "KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse";
      const s = url.split("/");
      tokenId = s[s.length - 1];
      chain = NftChain.Tezos;
      break;
    }
    case NftPlatform.Looksrare:
      chain = NftChain.Ethereum;
      break;
    case NftPlatform.Magiceden:
      if (url.includes("item-details")) {
        chain = NftChain.Solana;
        ({ contract, tokenId } = handleSolana(url));
      }
      break;
    case NftPlatform.MakerSplace:
      chain = NftChain.Ethereum;
      break;
    case NftPlatform.NftGo:
      chain = NftChain.Ethereum;
      break;
    case NftPlatform.Nftscan: {
      if (url.includes("bnb")) {
        chain = NftChain.BSC;
      } else if (url.includes("polygon")) {
        chain = NftChain.Polygon;
      } else if (url.includes("solana")) {
        chain = NftChain.Solana;
        ({ contract, tokenId } = handleSolana(url));
      } else if (url.includes("arbitrum")) {
        chain = NftChain.Arbitrum;
      } else if (url.includes("optimism")) {
        chain = NftChain.Optimism;
      } else if (url.includes("moonbeam")) {
        chain = NftChain.Moonbeam;
      } else if (url.includes("platon")) {
        chain = NftChain.PlatON;
      }

      break;
    }
    case NftPlatform.NiftyGateway:
      chain = NftChain.Ethereum;
      break;
    case NftPlatform.Objkt:
      chain = NftChain.Tezos;
      break;
    case NftPlatform.Opensea:
      if (url.includes("matic")) {
        chain = NftChain.Polygon;
      } else if (url.includes("solana")) {
        chain = NftChain.Solana;
      } else {
        chain = NftChain.Ethereum;
      }
      break;
    case NftPlatform.Rarible:
      if (url.includes("solana")) {
        chain = NftChain.Solana;
        contract = url.match("/solana/(.+)\\?")?.[1] ?? undefined;
        tokenId = "-";
      } else if (url.includes("polygon")) {
        chain = NftChain.Solana;
        contract = extractHex(url);
        const tmpSplitArr = url.split("?")[0].split(":");
        tokenId = tmpSplitArr[2];
      } else if (url.includes("tezos")) {
        chain = NftChain.Tezos;
        const res = url.match("/tezos/(.+):(.+)\\?");
        if (res) {
          contract = res[1];
          tokenId = res[2];
        }
      } else if (url.includes("flow")) {
        chain = NftChain.Flow;
        const res = url.match("/flow/(.+):(.+)\\?");
        if (res) {
          contract = res[1];
          tokenId = res[2];
        }
      }
      break;
    case NftPlatform.Solanart: {
      const tmp = url.split("/");
      contract = tmp[tmp.length - 1];
      tokenId = "-";
      chain = NftChain.Solana;
      break;
    }
    case NftPlatform.Superrare: {
      const tmp = url.split("/");
      const tmpSplit = tmp[tmp.length - 1].split("-");
      tokenId = tmpSplit[tmpSplit.length - 1];
      chain = NftChain.Ethereum;
      if (url.includes("artwork-v2")) {
        contract = "0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0";
      }
      break;
    }
    case NftPlatform.Tofunft: {
      const tmp = url.match(
        /https:\/\/tofunft.com\/nft\/(.+?)\/(.+?)\/(\d+)\??/,
      );
      if (tmp) {
        const chainMatch = tmp[1];
        contract = tmp[2];
        tokenId = tmp[3];
        switch (chainMatch) {
          case "bsc": {
            chain = NftChain.BSC;
            break;
          }
          case "eth": {
            chain = NftChain.Ethereum;
            break;
          }
          case "ftm": {
            chain = NftChain.FTM;
            break;
          }
          case "oec": {
            chain = NftChain.OEC;
            break;
          }
          default: {
            break;
          }
        }
      }
      break;
    }
    case NftPlatform.Treasureland: {
      const res = url.match(
        /https:\/\/(www\.)?treasureland.market\/assets\/(.+?\/)(\d+)(\/\d*)?\?chain_id=(\d+)/,
      );
      if (res) {
        contract = res[2].replace("/", "");
        tokenId = res[3];
        const chainMatch = res.slice(-1)[0];
        switch (chainMatch) {
          case "56":
            chain = NftChain.BSC;
            break;
          case "1":
            chain = NftChain.Ethereum;
            break;
          case "137":
            chain = NftChain.Polygon;
            break;
          case "1285":
            chain = NftChain.Moonriver;
            break;
          case "4689":
            chain = NftChain.IoTeX;
            break;
          case "1284":
            chain = NftChain.Moonbeam;
            break;
          case "321":
            chain = NftChain.KCC;
            break;
          default:
            break;
        }
      }
      break;
    }
    case NftPlatform.Tryshowtime:
      chain = NftChain.Polygon;
      break;
    case NftPlatform.Viv3:
      chain = NftChain.Flow;
      break;
    case NftPlatform.Zora:
      chain = NftChain.Ethereum;
      break;
    default:
      break;
  }
  if (chain && contract && tokenId) {
    return makeUpContentId(chain, contract, tokenId);
  } else {
    return url;
  }
};

const contractTokenReg = new RegExp("0x.+/.+");
const handleSolana = (url: string) => {
  const tmpSplitArr = url.split("/");
  return {
    contract:
      tmpSplitArr[tmpSplitArr.length - 1].match(/[\d+A-Za-z]*/)?.[0] ??
      tmpSplitArr[tmpSplitArr.length - 1],
    tokenId: "-",
  };
};
const getContractTokenByUrl = (url: string) => {
  if (getPlatformType(url) !== NftPlatform.Unknown) {
    const result = url.match(contractTokenReg)?.[0].split("/");
    if (result) {
      return { contract: result[0], tokenId: result[1] };
    }
  }
  return false;
};
const makeUpContentId = (
  chain: NftChain,
  contract: string,
  tokenId: string,
) => {
  return `${chain}:${contract}:${tokenId}`;
};

export const getPlatformLogo = (platformUrl: string) => {
  if (!platformUrl) {
    return NftPlatform.Unknown;
  }

  const url = platformUrl.toLowerCase();
  for (const platform of nftPlatformMap) {
    let varify = true;
    platform.platformUrl.map(linkUrl => {
      if (url.includes(linkUrl)) {
        varify = false;
      }
      return null;
    });
    if (varify) {
      return platform.logo;
    }
  }

  return NftPlatform.Unknown;
};

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

// eslint-disable-next-line complexity
export function getChainLogo(chain?: string) {
  switch (chain) {
    case "":
    case "Ethereum":
    case "ERC1155":
    case "ERC721":
      return ethereum;
    case "BSC":
      return BSC;
    case "Polygon":
      return polygon;
    case "Flow":
      return flow;
    case "Tezos":
      return tezos;
    case "Solana":
      return solana;
    case "Arbi":
      return arbitrum;
    case "Astar":
      return astar;
    case "Aurora":
      return aurora;
    case "Avax":
      return avalanche;
    case "Boba":
      return Boba;
    case "Celo":
      return celo;
    case "Cronos":
      return cronos;
    case "Evmos":
      return evmos;
    case "FTM":
      return fantom;
    case "Fuse":
      return fuse;
    case "Harmony":
      return harmony;
    case "Heco":
      return heco;
    case "Klaytn":
      return klaytn;
    case "Meter":
      return meter;
    case "Metis":
      return metis;
    case "Moonbeam":
      return moonbeam;
    case "Moonriver":
      return moonriver;
    case "Oasis":
      return oasis;
    case "OEC":
      return OEC;
    case "Optimism":
      return optimism;
    case "Shiden":
      return shiden;
    case "Telos":
      return telos;
    case "IoTeX":
      return IoTeX;
    case "KCC":
      return KCC;
    default:
      return "";
  }
}
