declare global {
  import { Buffer as NodeBuffer } from "buffer";

  const Buffer: NodeBuffer;

  interface Window {
    Buffer: NodeBuffer;
  }
}

interface Window {
  address: any;
  did: any;
  allBookmarks: any;
  collections: any;
  lifi: any;
  ethereum: EthereumProvider;
}

declare module "filesize";

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "swiper";
declare module "use-viewport";
