/* eslint-disable no-case-declarations */
import React, { createContext, useContext, useEffect, useState } from "react";

// import "@meteor-web3/meteor-iframe";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { css, SerializedStyles } from "@emotion/react";
import {
  Chain,
  Connector,
  BaseProvider,
  MeteorSnapProvider,
  MeteorWalletProvider,
  MeteorWebProvider,
  SYSTEM_CALL,
  WALLET,
} from "@meteor-web3/connector";
import {
  MeteorContext,
  MeteorContextType,
  useAction,
} from "@meteor-web3/hooks";
import { detectMeteorExtension } from "@meteor-web3/utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Tooltip, CircularProgress } from "@mui/material";
import {
  AuthType,
  ParticleNetwork,
  WalletEntryPosition,
} from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
// import {
//   PrivyProvider,
//   usePrivy,
//   useLogin,
//   useLogout,
//   useWallets,
//   useCreateWallet,
// } from "@privy-io/react-auth";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import ReactDOM from "react-dom";

import {
  EmbedWalletContainer,
  WalletListContainer,
  DetailContainer,
  MeteorWalletDetailContainer,
  MeteorWebDetailContainer,
  MeteorSnapDetailContainer,
} from "./styled";
import { MessageTypes, message } from "../Message";
import { FullScreenModal } from "../Modal";

import aggregatorSVG from "@/assets/icon/aggregator.svg";
import authenticatorSVG from "@/assets/icon/authenticator.svg";
import closeSVG from "@/assets/icon/close2.svg";
import coinbaseSVG from "@/assets/icon/coinbase.svg";
import ConnectingCapabilitySvg from "@/assets/icon/connecting-capability.svg";
import ConnectingWalletSvg from "@/assets/icon/connecting-wallet.svg";
import downloadSVG from "@/assets/icon/download.svg";
import googleSVG from "@/assets/icon/google.svg";
import metamaskSVG from "@/assets/icon/metamask.svg";
import metamaskSnapSVG from "@/assets/icon/metamaskSnap.svg";
import MeteorSnapSvg from "@/assets/icon/meteor-snap.svg";
import MeteorWalletSvg from "@/assets/icon/meteor-wallet.svg";
import MeteorWebSvg from "@/assets/icon/meteor-web.svg";
import meteorWalletScreenshotSVG from "@/assets/icon/meteorWalletScreenshot.svg";
import walletConnectSVG from "@/assets/icon/walletConnect.svg";
import { uuid } from "@/utils/uuid";

export type WalletConfig = {
  enabled?: {
    dataverseSnap?: boolean;
    meteorWallet?: boolean;
    meteorWeb?: boolean;
  };
  // privyAppId?: string;
};

export type StyleConfig = {
  hidden?: boolean;
  customStyle?: React.CSSProperties;
  customCss?: SerializedStyles;
};

export type ConnectRes = {
  address: string;
  chain: Chain;
  wallet: WALLET;
  userInfo?: any;
  pkh: string;
};

export type SupportedWallet =
  | "Google"
  | (typeof WALLET)["METAMASK" | "WALLETCONNECT" | "COINBASE"];

export type SupportedProvider = "meteor-wallet" | "meteor-web" | "meteor-snap";

/**
 * Provides a core method and state call without UI component control.
 * When any item in params is updated, this function will be called.
 * `null` means this value didn't update this time.
 */
export type AuthRef = (params: {
  connectWallet: ConnectWallet;
  connecting: ConnectingStatus;
  autoConnecting: boolean;
  selectedProvider?: SupportedProvider;
  connectedWallet?: SupportedWallet;
  connectRes?: ConnectRes;
}) => void;

export type ConnectWallet = (
  wallet: SupportedWallet,
  /**
   * if it is no set, default will be `selectedProvider`
   */
  providerType?: SupportedProvider,
  /**
   * if it is set true, no message ui will be shown, and possible error will be throw
   * @default false
   */
  noMessage?: boolean,
) => Promise<ConnectRes | undefined>;

export type AuthCache = {
  selectedProvider?: SupportedProvider;
  connectedWallet?: SupportedWallet;
};

export type ConnectingStatus =
  | boolean
  | "connectingWallet"
  | "connectingCapability";

export interface AuthProps {
  /**
   * If the appId is not set, it will be inferred based on the website domain.
   * If domain is not localhost, appId will be used from dapp table registry recording to website,
   * otherwise it will be setting to testAppId.
   */
  appId?: string;
  walletConfig?: WalletConfig;
  styleConfig?: StyleConfig;
  /**
   * only available when loaded cache from localStorage
   * @default true
   */
  autoConnect?: boolean;
  authRef?: AuthRef;
  /**
   * Called when the connection is successful
   * @returns meteorConnector(generated inside the component) and ConnectRes
   */
  onConnectSucceed?: (
    meteorConnector: Connector,
    connectRes: ConnectRes,
  ) => void;
  onClose?: () => void;
}

let meteorConnector: Connector;
let snapProvider: MeteorSnapProvider;
let meteorWalletProvider: MeteorWalletProvider;
let meteorWebProvider: MeteorWebProvider;
const testAppId = "9aaae63f-3445-47d5-8785-c23dd16e4965";
const AUTH_CACHE_KEY = "meteor-components-auth-cache";

const getParticleProvider = async () => {
  const preferredAuthType: AuthType = "google";
  const chainId = 1;
  const chainName = "Ethereum";
  const particle = new ParticleNetwork({
    projectId: "12a93f47-6f21-4e4e-888b-9a4b57933c86",
    clientKey: "cMIDP67n1NvlnlOoiG7CLSfvpwRrTaJZQJJKkZJ1",
    appId: "bc6dab3a-9da1-4324-9e71-8f879de9d7b4",
    chainName, //optional: current chain name, default Ethereum.
    chainId, //optional: current chain id, default 1.
    wallet: {
      //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
      displayWalletEntry: false, //show wallet entry when connect particle.
      // defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
      uiMode: "light", //optional: light or dark, if not set, the default is the same as web auth.
      supportChains: [
        { id: 137, name: "polygon" },
        { id: 80001, name: "polygon" },
      ], // optional: web wallet support chains.
      customStyle: {}, //optional: custom wallet style
    },
  });
  const particleProvider = new ParticleProvider(particle.auth);
  if (!particle.auth.isLogin()) {
    if (preferredAuthType) {
      await particle.auth.login({
        preferredAuthType, //support facebook,google,twitter,apple,discord,github,twitch,microsoft,linkedin etc.
      });
    } else {
      await particleProvider.enable();
    }
  }
  return particleProvider;
};

const getMetamaskProvider = () => {
  if (!window.ethereum) {
    throw "MetaMask is not installed or not enabled.";
  }
  return window.ethereum;
};

const getCoinbaseProvider = () => {
  const chainId = 1;
  const jsonRpcUrl = "https://mainnet.infura.io/v3";
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: "Meteor",
    darkMode: false,
  });
  const coinbaseProvider = coinbaseWallet.makeWeb3Provider(jsonRpcUrl, chainId);
  return coinbaseProvider;
};

const getWalletConnectProvider = async () => {
  const client = await EthereumProvider.init({
    // use your own projectId to make sure connect successfully
    projectId: "de2a6e522f354b90448adfa7c76d9c05",
    showQrModal: true,
    chains: [1],
    optionalChains: [80001],
    methods: [
      "wallet_switchEthereumChain",
      "wallet_addEthereumChain",
      "eth_sendTransaction",
      "personal_sign",
      "eth_signTypedData_v4",
    ],
    events: ["chainChanged", "accountsChanged"],
  });
  await client.enable();
  return client;
};

export const Auth = ({
  appId,
  walletConfig = {
    enabled: { dataverseSnap: true, meteorWallet: true, meteorWeb: true },
  },
  styleConfig = {
    hidden: false,
  },
  autoConnect,
  authRef,
  onConnectSucceed,
  onClose,
}: AuthProps) => {
  const [loadedFromCache, setLoadedFromCache] = useState<boolean>(false);
  const [autoConnecting, setAutoConnecting] = useState<boolean>(
    autoConnect || false,
  );
  const [connecting, setConnecting] = useState<ConnectingStatus>(false);
  // cache the real appId
  const [connectingAppId, setConnectingAppId] = useState<string | undefined>(
    appId,
  );
  const [connectRes, setConnectRes] = useState<ConnectRes>();
  const [selectedProvider, setSelectedProvider] = useState<SupportedProvider>();
  const [connectedWallet, setConnectedWallet] = useState<SupportedWallet>();

  const meteorContext = useContext(MeteorContext) as
    | MeteorContextType
    | undefined;
  const { actionConnectWallet, actionCreateCapability } = useAction();

  const handleInitConnector = async (providerType?: SupportedProvider) => {
    // init provider and connector
    let baseProvider: BaseProvider;
    switch (providerType) {
      case "meteor-wallet":
        if (!meteorWalletProvider || meteorWalletProvider.destroyed) {
          meteorWalletProvider = new MeteorWalletProvider();
        }
        baseProvider = meteorWalletProvider;
        break;
      case "meteor-web":
        if (!meteorWebProvider || meteorWebProvider.destroyed) {
          meteorWebProvider = new MeteorWebProvider();
        }
        baseProvider = meteorWebProvider;
        break;
      case "meteor-snap":
        // if (!snapProvider || snapProvider.destroyed) {
        //   const snapOrigin = prompt(
        //     "Please input your snap server url:",
        //     "http://localhost:8080",
        //   );
        //   if (!snapOrigin) {
        //     throw "Please input your snap server url.";
        //   }
        //   snapProvider = new MeteorSnapProvider("local:" + snapOrigin);
        // }
        // provider = snapProvider;
        // break;
        throw "Coming soon...";
      default:
        throw "Not selected any provider or this type of provider is unsupported.";
    }
    if (!meteorConnector) {
      meteorConnector = new Connector(baseProvider);
    } else {
      meteorConnector.setProvider(baseProvider);
    }
    if (meteorContext?.setConnector) {
      const { setConnector } = meteorContext;
      setConnector(meteorConnector);
    }
  };

  const getConnectingAppId = async () => {
    let connectAppId = connectingAppId;
    if (!connectAppId) {
      if (location.hostname !== "localhost") {
        const appInfo = await meteorConnector.getDAppInfo({
          hostname: location.hostname,
        });
        connectAppId = appInfo.id;
      } else {
        connectAppId = testAppId;
      }
      setConnectingAppId(connectAppId);
    }
    return connectAppId;
  };

  const handleConnectWallet: ConnectWallet = async (
    wallet,
    providerType = selectedProvider,
    noMessage = false,
  ) => {
    if (autoConnecting) {
      throw "Please wait for auto connecting...";
    }
    if (connecting) {
      throw "Already connecting, please wait...";
    }
    setConnecting(true);
    if (providerType !== selectedProvider) {
      setSelectedProvider(providerType);
    }
    try {
      // init provider and connector
      setConnecting("connectingWallet");
      await handleInitConnector(providerType);
      // connect real wallet
      let connectRes: {
        address: string;
        chain: Chain;
        wallet: WALLET;
        userInfo?: any;
      };
      if (providerType !== "meteor-web") {
        if (wallet === WALLET.METAMASK && !window.ethereum) {
          throw "MetaMask is not installed or not enabled.";
        }
        connectRes = await meteorConnector.connectWallet({
          wallet: wallet === "Google" ? WALLET.PARTICLE : wallet,
          preferredAuthType: wallet === "Google" ? "google" : undefined,
        });
        if (!connectRes) {
          // if (providerType === "meteor-snap") {
          //   throw "Connect Wallet Failed! Please Check if not install Dataverse Snap or not enabled MetaMask flask.";
          // } else {
          //   throw "Connect Wallet Failed! Please Check if not install Meteor Wallet or not enabled Meteor Wallet.";
          // }
          throw "Connect Wallet Failed! Please Check if not install Meteor Wallet or not enabled Meteor Wallet.";
        }
      } else {
        let ethereumProvider: any;
        switch (wallet) {
          case "Google":
            ethereumProvider = await getParticleProvider();
            break;
          case WALLET.METAMASK:
            ethereumProvider = getMetamaskProvider();
            break;
          case WALLET.COINBASE:
            ethereumProvider = getCoinbaseProvider();
            break;
          case WALLET.WALLETCONNECT:
            ethereumProvider = await getWalletConnectProvider();
            break;
          default:
            throw "Unsupported wallet";
        }
        connectRes = await meteorConnector.connectWallet({
          provider: ethereumProvider,
        });
        if (!connectRes) {
          throw "Connect Wallet Failed! Please Check if not install Dataverse Snap or not enabled MetaMask flask.";
        }
      }

      setConnecting("connectingCapability");
      const connectAppId = await getConnectingAppId();
      const { pkh } = await meteorConnector.runOS({
        method: SYSTEM_CALL.createCapability,
        params: {
          appId: connectAppId!,
        },
      });
      // setConnected(true);
      if (meteorContext?.dispatch) {
        actionConnectWallet(connectRes);
        actionCreateCapability({ pkh, appId: appId! });
      }
      // onConnect?.(meteorConnector, { ...connectRes, pkh });
      setConnectRes({ ...connectRes, pkh });
      onConnectSucceed?.(meteorConnector, { ...connectRes, pkh });
      setConnectedWallet(wallet);
      // save cache to localStorage
      localStorage.setItem(
        AUTH_CACHE_KEY,
        JSON.stringify({
          selectedProvider: providerType,
          connectedWallet: wallet,
        } as AuthCache),
      );
      if (!noMessage) {
        message.success("Wallet connected successfully.");
      }
      return { ...connectRes, pkh };
    } catch (e: any) {
      console.warn(e);
      setConnectRes(undefined);
      if (!noMessage) {
        message({
          type: MessageTypes.Error,
          content: "Failed to connect, " + (e?.message || e),
          duration: 10e3,
        });
      } else {
        throw e;
      }
    } finally {
      setConnecting(false);
    }
  };

  const handleAutoConnect = async (
    providerType: SupportedProvider,
    walletType: SupportedWallet,
  ) => {
    setConnecting(true);
    setAutoConnecting(true);
    try {
      await handleInitConnector(providerType);

      if (providerType === "meteor-web") {
        let ethereumProvider: any;
        switch (walletType) {
          case "Google":
            ethereumProvider = await getParticleProvider();
            break;
          case WALLET.METAMASK:
            ethereumProvider = getMetamaskProvider();
            break;
          case WALLET.COINBASE:
            ethereumProvider = getCoinbaseProvider();
            break;
          case WALLET.WALLETCONNECT:
            ethereumProvider = await getWalletConnectProvider();
            break;
          default:
            throw "Unsupported wallet";
        }
        await (
          meteorConnector.getProvider() as MeteorWebProvider
        ).setExternalProvider(ethereumProvider);
      }
      const connectAppId = await getConnectingAppId();
      const hasCapability = await meteorConnector.runOS({
        method: SYSTEM_CALL.checkCapability,
        params: {
          appId: connectAppId,
        },
      });
      if (hasCapability) {
        const connectResult = await meteorConnector.getCurrentWallet();
        if (connectResult) {
          const connectRes = await meteorConnector.connectWallet({
            wallet: connectResult.wallet,
          });
          const pkh = meteorConnector.getCurrentPkh();
          if (meteorContext?.dispatch) {
            actionConnectWallet(connectResult);
            actionCreateCapability({ pkh, appId: connectAppId });
          }
          setConnectRes({ ...connectRes, pkh });
          onConnectSucceed?.(meteorConnector, { ...connectRes, pkh });
          setConnectedWallet(
            connectResult.wallet === WALLET.PARTICLE
              ? "Google"
              : (connectResult.wallet as SupportedWallet),
          );
        }
      }
    } catch (e: any) {
      console.warn(e);
      setConnectRes(undefined);
    } finally {
      setConnecting(false);
      setAutoConnecting(false);
    }
  };

  // handle cache of selectedProvider
  useEffect(() => {
    const cache: AuthCache | null = JSON.parse(
      localStorage.getItem(AUTH_CACHE_KEY) || "null",
    );
    if (cache) {
      setSelectedProvider(cache.selectedProvider);
      setConnectedWallet(cache.connectedWallet);
      setLoadedFromCache(true);
    } else {
      setAutoConnecting(false);
    }
  }, []);

  // handle autoConnect
  useEffect(() => {
    if (loadedFromCache && autoConnect && selectedProvider && connectedWallet) {
      handleAutoConnect(selectedProvider, connectedWallet);
    }
  }, [loadedFromCache, autoConnect]);

  // handle ref, used by useAuth hooks
  useEffect(() => {
    authRef?.({
      connectWallet: handleConnectWallet,
      connecting,
      autoConnecting,
      selectedProvider,
      connectedWallet,
      connectRes,
    });
  }, [
    authRef,
    handleConnectWallet,
    connecting,
    selectedProvider,
    connectedWallet,
    connectRes,
  ]);

  return (
    // <PrivyProvider
    //   // use your own appId to make sure connect successfully
    //   // this test appId is only for localhost:3000
    //   appId={walletConfig?.privyAppId || "clpispdty00ycl80fpueukbhl"}
    //   config={{
    //     loginMethods: ["google", "twitter", "github", "apple", "discord"],
    //     embeddedWallets: { createOnLogin: "users-without-wallets" },
    //   }}
    // >
    <EmbedWalletContainer
      style={{
        ...(styleConfig.hidden && { display: "none" }),
        ...styleConfig.customStyle,
      }}
      customCss={styleConfig.customCss}
      layout
      transition={{ duration: 0.15 }}
    >
      <div className='wallet-list'>
        <div className='top-tip'>Connect data wallet</div>
        {/* <div className='tip'>Prevalent</div> */}
        {/* {connectRes && (
          <div className='connected'>
            <p>{connectRes.address}</p>
            <p>{connectRes.pkh}</p>
          </div>
        )} */}
        <WalletList
          walletConfig={walletConfig}
          onChange={setSelectedProvider}
        />
      </div>
      <div className='detail'>
        <Detail
          selectedProvider={selectedProvider}
          connecting={connecting}
          handleConnectWallet={handleConnectWallet}
          onClose={onClose}
        />
      </div>
    </EmbedWalletContainer>
    // </PrivyProvider>
  );
};

interface WalletListProps {
  walletConfig?: WalletConfig;
  onChange?: (provider?: SupportedProvider) => void;
}

// pure-ui
const WalletList = ({ walletConfig, onChange }: WalletListProps) => {
  const [selectedProvider, setSelectedProvider] = useState<SupportedProvider>();

  useEffect(() => {
    onChange?.(selectedProvider);
  }, [selectedProvider]);

  const walletProviders = (
    <>
      <Tooltip
        arrow
        placement='right'
        title='You may need to pre-install the Meteor-Wallet browser extension before using it. Only MetaMask stable is available, you need to disable MetaMask flask.'
      >
        <div
          className={`wallet-item`}
          css={css`
            background-color: ${selectedProvider === "meteor-wallet" &&
            "#007aff !important"};
            color: ${selectedProvider === "meteor-wallet" && "#fff !important"};
          `}
          data-disabled={walletConfig?.enabled?.meteorWallet === false}
          onClick={() => setSelectedProvider("meteor-wallet")}
        >
          <img className='wallet-logo' src={MeteorWalletSvg} />
          Meteor Wallet
        </div>
      </Tooltip>
      <Tooltip
        arrow
        placement='right'
        title='Meteor Snap is still in the testing phase, you need to use Metamask flask and run the snap server locally before using it.'
      >
        <div
          className='wallet-item'
          css={css`
            background-color: ${selectedProvider === "meteor-snap" &&
            "#007aff !important"};
            color: ${selectedProvider === "meteor-snap"
              ? "#fff !important"
              : "grey"};
          `}
          data-disabled={walletConfig?.enabled?.dataverseSnap === false}
          data-unavailable={true}
          onClick={() => {
            // handleConnectWallet(WALLET.METAMASK)
            message.info("Coming soon...");
          }}
        >
          <img className='wallet-logo' src={MeteorSnapSvg} />
          Meteor Snap
        </div>
      </Tooltip>
      <Tooltip
        arrow
        placement='right'
        title='This wallet will be embedded in an iframe and only support External-Wallet for now.'
      >
        <div
          className='wallet-item'
          css={css`
            background-color: ${selectedProvider === "meteor-web" &&
            "#007aff !important"};
            color: ${selectedProvider === "meteor-web" && "#fff !important"};
          `}
          data-disabled={walletConfig?.enabled?.meteorWeb === false}
          onClick={() => setSelectedProvider("meteor-web")}
        >
          <img className='wallet-logo' src={MeteorWebSvg} />
          Meteor Web
        </div>
      </Tooltip>
    </>
  );

  return (
    <WalletListContainer layout transition={{ duration: 0.15 }}>
      {/* {connecting && (
        <>
          <div className='wallet-item'>
            <CircularProgress className='wallet-logo' />
            Connecting...
          </div>
          <div
            className='wallet-item'
            onClick={() => {
              setConnecting(false);
            }}
          >
            <CancelOutlinedIcon className='wallet-logo' />
            Force cancel
          </div>
        </>
      )}
      {!connecting &&
        (connectedWallet ? (
          <div
            className='wallet-item'
            onClick={async () => {
              // if (privyAuthenticated) {
              //   await privyLogout();
              // }
              setConnectedWallet(undefined);
              onDisconnect?.();
            }}
          >
            <ArrowBackIcon className='wallet-logo' />
            Reconnect another wallet
          </div>
        ) : (
          walletProviders
        ))} */}
      {walletProviders}
    </WalletListContainer>
  );
};

interface DetailProps {
  selectedProvider?: SupportedProvider;
  connecting?: ConnectingStatus;
  handleConnectWallet: ConnectWallet;
  onClose?: () => void;
}

const Detail = ({
  selectedProvider,
  connecting,
  handleConnectWallet,
  onClose,
}: DetailProps) => {
  const [isMeteorInstalled, setIsMeteorInstalled] = useState(false);

  useEffect(() => {
    detectMeteorExtension().then(res => setIsMeteorInstalled(res));
  }, []);

  return (
    <DetailContainer>
      <img src={closeSVG} className='close' onClick={() => onClose?.()} />
      {!connecting && (
        <>
          {selectedProvider === "meteor-wallet" ? (
            <MeteorWalletDetail
              handleConnectWallet={handleConnectWallet}
              isMeteorInstalled={isMeteorInstalled}
            />
          ) : selectedProvider === "meteor-web" ? (
            <MeteorWebDetail handleConnectWallet={handleConnectWallet} />
          ) : selectedProvider === "meteor-snap" ? (
            <MeteorSnapDetail handleConnectWallet={handleConnectWallet} />
          ) : (
            <DefaultDetail />
          )}
        </>
      )}
      {connecting && <Loading connecting={connecting} />}
    </DetailContainer>
  );
};

const innerWalletList = [
  { wallet: "Google", name: "Google (Particle)", logo: googleSVG },
  { wallet: WALLET.METAMASK, name: WALLET.METAMASK, logo: metamaskSVG },
  {
    wallet: WALLET.WALLETCONNECT,
    name: WALLET.WALLETCONNECT,
    logo: walletConnectSVG,
  },
  { wallet: WALLET.COINBASE, name: WALLET.COINBASE, logo: coinbaseSVG },
];

const MeteorWalletDetail = ({
  handleConnectWallet,
  isMeteorInstalled,
}: {
  handleConnectWallet: (wallet: SupportedWallet) => void;
  isMeteorInstalled?: boolean;
}) => {
  return (
    <MeteorWalletDetailContainer>
      {isMeteorInstalled ? (
        <div>
          {innerWalletList.map(item => (
            <div
              key={item.wallet}
              onClick={() =>
                handleConnectWallet(item.wallet as SupportedWallet)
              }
              className='innerWalletItem'
            >
              <img src={item.logo} />
              <div className='name'>{item.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className='description'>
            Meteor Wallet is a browser extension to securely store and manage
            your credentials, attestations, licenses, event tickets, and more —
            all in one place
          </div>
          <img src={meteorWalletScreenshotSVG} className='screenshot' />
          <div className='tip'>Don&#39;t have Meteor wallet?</div>
          <div
            className='install'
            onClick={() => window.open(process.env.METEOR_GOOGLE_STORE)}
          >
            <img src={downloadSVG} className='download' />
            Install for Chrome
          </div>
        </div>
      )}
    </MeteorWalletDetailContainer>
  );
};

const MeteorWebDetail = ({
  handleConnectWallet,
}: {
  handleConnectWallet: (wallet: SupportedWallet) => void;
}) => {
  return (
    <MeteorWebDetailContainer>
      <div className='description'>
        Meteor Web allows you to sign once and keep connected after. It is the
        most seemless way to
        <br /> login.
      </div>
      <div>
        {innerWalletList.map(item => (
          <div
            key={item.wallet}
            onClick={() => handleConnectWallet(item.wallet as SupportedWallet)}
            className='innerWalletItem'
          >
            <img src={item.logo} />
            <div className='name'>{item.name}</div>
          </div>
        ))}
      </div>
    </MeteorWebDetailContainer>
  );
};

const MeteorSnapDetail = ({
  handleConnectWallet,
}: {
  handleConnectWallet: (wallet: SupportedWallet) => void;
}) => {
  return (
    <MeteorSnapDetailContainer>
      <div className='description'>
        Meteor Web allows you to sign once and keep connected after. It is the
        most seemless way to
        <br /> login.
      </div>

      <img src={metamaskSnapSVG} />
      {/* <div className='name'>{item.name}</div> */}

      <img src={metamaskSnapSVG} className='screenshot' />
      <div className='tip'>Don&#39;t have Meteor wallet?</div>
      <div
        className='install'
        onClick={() => window.open(process.env.METEOR_GOOGLE_STORE)}
      >
        <img src={downloadSVG} className='download' />
        Add to MetaMask
      </div>
    </MeteorSnapDetailContainer>
  );
};

const DefaultDetail = () => {
  return (
    <div>
      <div className='title'>What is Dataverse Wallet?</div>
      <div className='aggregator-box'>
        <img src={aggregatorSVG} />
        <div>
          <div className='sub-title'>A Home for your Data Assets</div>
          <div className='sub-description'>
            Wallet is used to securely store your identity, attestations and
            credentials for your personal data.
          </div>
        </div>
      </div>
      <div className='authenticator-box'>
        <img src={authenticatorSVG} />
        <div>
          <div className='sub-title'>A New Way to Sign In</div>
          <div className='sub-description'>
            Wallet works as a dApp <br /> authenticator.
          </div>
        </div>
      </div>
      <div
        className='learn-more'
        onClick={() =>
          window.open("https://docs.meteor.computer/meteor-wallet", "_blank")
        }
      >
        learn more
      </div>
    </div>
  );
};

const Loading = ({ connecting }: { connecting?: ConnectingStatus }) => {
  return (
    <div className='loading-container'>
      {connecting === "connectingWallet" && (
        <>
          <img src={ConnectingWalletSvg} />
          <p className='title'>Connecting wallet...</p>
          <p className='description'>Confirm connection in the popup</p>
        </>
      )}
      {connecting === "connectingCapability" && (
        <>
          <img src={ConnectingCapabilitySvg} />
          <p className='title'>Sign a Message</p>
          <p className='description'>To verify you are the owner of data</p>
        </>
      )}
      <CircularProgress style={{ marginTop: "41px" }} />
    </div>
  );
};

/**
 * remove localStorage cache, next autoConnect will be invalidated
 */
Auth.clearAuthCache = () => {
  localStorage.setItem(AUTH_CACHE_KEY, "null");
};

export interface AuthModalProps {
  authProps?: AuthProps;
  onCancel?: () => void;
  defaultVisible?: boolean;
  controlVisible?: boolean;
}

/**
 * Provides a pop-up window processing for authentication components,
 * adding callback parameters when the pop-up window is closed and
 * parameters that control whether the pop-up window is displayed.
 *
 * **Attention** that authProps.onConnectSucceed will be called before onCancel.
 * If the user connects successfully, the Model will try to automatically close and call onCancel.
 */
Auth.Model = function AuthModel({
  authProps,
  onCancel,
  defaultVisible = true,
  controlVisible,
}: AuthModalProps) {
  const [visible, setVisible] = useState<boolean>(defaultVisible);

  useEffect(() => {
    if (controlVisible !== undefined) {
      setVisible(controlVisible);
    }
  }, [controlVisible]);

  const handleCancel = () => {
    onCancel?.();
    if (controlVisible === undefined) {
      setVisible(false);
    }
  };

  return (
    <FullScreenModal
      controlVisible={visible}
      id={`auth-modal-${uuid()}`}
      clickOutsideToClose
      onCancel={handleCancel}
      rootStyle={css`
        z-index: 1000;
      `}
    >
      <Auth
        {...authProps}
        onClose={handleCancel}
        onConnectSucceed={(meteorConnector, connectRes) => {
          authProps?.onConnectSucceed?.(meteorConnector, connectRes);
          handleCancel();
        }}
      />
    </FullScreenModal>
  );
};

/**
 * Provides a functional call to the authentication component pop-up window, which can be called anywhere in the code.
 * The component will be rendered to the page "root", but if you want to use it with meteor-hooks, you must provide meteorContext (used to pass status information), otherwise set meteorContext to undefined/falsy.
 *
 * @returns ConnectRes if auth success, otherwise void
 */
Auth.openModal = (authProps?: AuthProps, meteorContext?: MeteorContextType) => {
  return new Promise<ConnectRes | void>((resolve, reject) => {
    try {
      const container = document.createElement("div");
      document.body.appendChild(container);
      const authComponent = (
        <Auth.Model
          authProps={{
            ...authProps,
            onConnectSucceed(meteorConnector, connectRes) {
              authProps?.onConnectSucceed?.(meteorConnector, connectRes);
              setTimeout(() => {
                document.body.removeChild(container);
                resolve(connectRes);
              }, 400);
            },
          }}
          onCancel={async () => {
            setTimeout(() => {
              document.body.removeChild(container);
              resolve();
            }, 500);
          }}
        />
      );
      ReactDOM.render(
        meteorContext ? (
          <MeteorContext.Provider value={meteorContext}>
            {authComponent}
          </MeteorContext.Provider>
        ) : (
          authComponent
        ),
        container,
      );
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * Providing a functional authentication method will not generate any UI components, but let developers choose how to connect.
 */
export const useAuth = ({
  appId,
  meteorContext,
  autoConnect,
}: {
  /**
   * If the appId is not set, it will be inferred based on the website domain.
   * If domain is not localhost, appId will be used from dapp table registry recording to website,
   * otherwise it will be setting to testAppId.
   */
  appId?: string;
  /**
   * If you want to use it with meteor-hooks, you must provide meteorContext (used to pass status information), otherwise set meteorContext to undefined/falsy.
   */
  meteorContext?: MeteorContextType;
  autoConnect?: boolean;
}) => {
  const [connectWallet, setConnectWallet] = useState<ConnectWallet>();
  const [connecting, setConnecting] = useState<ConnectingStatus>();
  const [autoConnecting, setAutoConnecting] = useState<boolean>(
    autoConnect || false,
  );
  const [selectedProvider, setSelectedProvider] = useState<SupportedProvider>();
  const [connectedWallet, setConnectedWallet] = useState<SupportedWallet>();
  const [connector, setConnector] = useState<Connector>();
  const [connectRes, setConnectRes] = useState<ConnectRes>();

  const clearAuthCache = () => {
    localStorage.setItem(AUTH_CACHE_KEY, "null");
  };

  const authComponent = (
    <Auth
      styleConfig={{
        hidden: true,
      }}
      appId={appId}
      autoConnect={autoConnect}
      authRef={({
        connectWallet,
        connecting,
        autoConnecting,
        selectedProvider,
        connectedWallet,
      }) => {
        setConnectWallet(() => connectWallet);
        setConnecting(connecting);
        setAutoConnecting(autoConnecting);
        setSelectedProvider(selectedProvider);
        setConnectedWallet(connectedWallet);
      }}
      onConnectSucceed={(connector, connectRes) => {
        setConnector(connector);
        setConnectRes(connectRes);
      }}
    />
  );

  useEffect(() => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
      meteorContext ? (
        <MeteorContext.Provider value={meteorContext}>
          {authComponent}
        </MeteorContext.Provider>
      ) : (
        authComponent
      ),
      container,
    );
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return {
    connectWallet,
    connecting,
    autoConnecting,
    selectedProvider,
    connectedWallet,
    connector,
    connectRes,
    clearAuthCache,
  };
};
