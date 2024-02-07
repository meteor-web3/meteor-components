/* eslint-disable no-case-declarations */
import React, { useContext, useEffect, useState } from "react";

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
import downloadSVG from "@/assets/icon/download.svg";
import googleSVG from "@/assets/icon/google.svg";
import metamaskSVG from "@/assets/icon/metamask.svg";
import meteorWalletScreenshotPNG from "@/assets/icon/meteorWalletScreenshot.png";
import walletConnectSVG from "@/assets/icon/walletConnect.svg";
import metamaskSnapSVG from "@/assets/icon/metamaskSnap.svg";
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
export type ProviderType =
  | "meteor-wallet"
  | "meteor-web"
  | "meteor-snap"
  | undefined;

export interface AuthProps {
  appId?: string;
  walletConfig?: WalletConfig;
  styleConfig?: StyleConfig;
  authRef?: (params: {
    connectWallet: (wallet: SupportedWallet) => Promise<void>;
    connecting: boolean;
    connectedWallet?: SupportedWallet;
  }) => void;
  onConnectSucceed?: (
    meteorConnector: Connector,
    connectRes: ConnectRes,
  ) => void;
}

let meteorConnector: Connector;
let snapProvider: MeteorSnapProvider;
let meteorWalletProvider: MeteorWalletProvider;
let meteorWebProvider: MeteorWebProvider;
const testAppId = "9aaae63f-3445-47d5-8785-c23dd16e4965";
let appId: string;

export const Auth = ({
  appId, // if domain is not localhost, appId will be used from dapp table registry recording to website
  walletConfig = {
    enabled: { dataverseSnap: true, meteorWallet: true, meteorWeb: true },
  },
  styleConfig = {
    hidden: false,
  },
  authRef,
  onConnectSucceed,
}: AuthProps) => {
  const [connectRes, setConnectRes] = useState<ConnectRes>();
  const [selectedProviderType, setSelectedProviderType] =
    useState<ProviderType>();

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
        <div className='tip'>Prevalent</div>
        {connectRes && (
          <div className='connected'>
            <p>{connectRes.address}</p>
            <p>{connectRes.pkh}</p>
          </div>
        )}
        <WalletList
          uncertainAppId={appId}
          walletConfig={walletConfig}
          setSelectedProviderType={setSelectedProviderType}
        />
        {/* <div className='footer'>
          <a
            href='https://github.com/meteor-web3'
            target='_blank'
            rel='noreferrer'
          >
            Powered by Meteor
          </a>
        </div> */}
      </div>
      <div className='detail'>
        <Detail
          selectedProviderType={selectedProviderType}
          setSelectedProviderType={setSelectedProviderType}
          authRef={authRef}
          onConnect={(connector, connectRes) => {
            setConnectRes(connectRes);
            onConnectSucceed?.(connector, connectRes);
          }}
          onDisconnect={() => setConnectRes(undefined)}
        />
      </div>
    </EmbedWalletContainer>
    // </PrivyProvider>
  );
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

export interface WalletListProps {
  uncertainAppId?: string;
  walletConfig?: WalletConfig;
  setSelectedProviderType: (selectedProviderType: ProviderType) => void;
  onDisconnect?: () => void;
}

export const WalletList = ({
  uncertainAppId,
  walletConfig,
  setSelectedProviderType,
  onDisconnect,
}: WalletListProps) => {
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connectedWallet, setConnectedWallet] = useState<SupportedWallet>();
  // const [waitForPrivyConnecting, setWaitForPrivyConnecting] =
  //   useState<boolean>(false);
  // meteor-hooks context

  // const { ready: privyReady, authenticated: privyAuthenticated } = usePrivy();
  // const { wallets: privyWallets } = useWallets();
  // const { login: privyLogin } = useLogin();
  // const { logout: privyLogout } = useLogout();
  // const { createWallet: privyCreateWallet } = useCreateWallet();

  const handleSelectProvider = async (selectedProviderType: ProviderType) => {
    setConnecting(true);
    try {
      // init provider and connector
      let provider: BaseProvider;
      switch (selectedProviderType) {
        case undefined:
          if (!snapProvider || snapProvider.destroyed) {
            const snapOrigin = prompt(
              "Please input your snap server url:",
              "http://localhost:8080",
            );
            if (!snapOrigin) {
              throw "Please input your snap server url.";
            }
            snapProvider = new MeteorSnapProvider("local:" + snapOrigin);
          }
          provider = snapProvider;
          break;
        case "meteor-wallet":
          if (!meteorWalletProvider || meteorWalletProvider.destroyed) {
            meteorWalletProvider = new MeteorWalletProvider();
          }
          provider = meteorWalletProvider;
          break;
        case "meteor-web":
          if (!meteorWebProvider || meteorWebProvider.destroyed) {
            meteorWebProvider = new MeteorWebProvider();
          }
          provider = meteorWebProvider;
          break;
        default:
          throw "Unsupported provider.";
      }
      if (!meteorConnector) {
        meteorConnector = new Connector(provider);
        if (location.hostname !== "localhost") {
          const appInfo = await meteorConnector.getDAppInfo({
            hostname: location.hostname,
          });
          appId = appInfo.id;
        } else {
          appId = uncertainAppId ?? testAppId;
        }
      } else {
        meteorConnector.setProvider(provider);
      }
      setSelectedProviderType(selectedProviderType);
      // // connect the real wallet
      // let connectRes: {
      //   address: string;
      //   chain: Chain;
      //   wallet: WALLET;
      //   userInfo?: any;
      // };
      // if (selectedProviderType !== "meteor-web") {
      //   if (wallet === WALLET.METAMASK && !window.ethereum) {
      //     throw "MetaMask is not installed or not enabled.";
      //   }
      //   connectRes = await meteorConnector.connectWallet({
      //     wallet: wallet === "Google" ? WALLET.PARTICLE : wallet,
      //     preferredAuthType: wallet === "Google" ? "google" : undefined,
      //   });
      //   if (!connectRes) {
      //     if (selectedProviderType === undefined) {
      //       throw "Connect Wallet Failed! Please Check if not install Dataverse Snap or not enabled MetaMask flask.";
      //     } else {
      //       throw "Connect Wallet Failed! Please Check if not install Meteor Wallet or not enabled Meteor Wallet.";
      //     }
      //   }
      // } else {
      //   let ethereumProvider: any;
      //   // handle external-wallet process
      //   if (wallet === "Google") {
      //     // if (!privyReady) {
      //     //   throw "Privy is not ready, please waiting...";
      //     // }
      //     // const embededWallet = privyWallets.find(
      //     //   wallet => wallet.walletClientType === "privy",
      //     // );
      //     // if (!embededWallet) {
      //     //   setWaitForPrivyConnecting(true);
      //     //   if (!privyAuthenticated) {
      //     //     privyLogin();
      //     //   } else {
      //     //     privyCreateWallet();
      //     //   }
      //     //   return;
      //     // } else {
      //     //   ethereumProvider = await embededWallet.getEthereumProvider();
      //     // }
      //     const preferredAuthType: AuthType = "google";
      //     const chainId = 1;
      //     const chainName = "Ethereum";
      //     const particle = new ParticleNetwork({
      //       projectId: "12a93f47-6f21-4e4e-888b-9a4b57933c86",
      //       clientKey: "cMIDP67n1NvlnlOoiG7CLSfvpwRrTaJZQJJKkZJ1",
      //       appId: "bc6dab3a-9da1-4324-9e71-8f879de9d7b4",
      //       chainName, //optional: current chain name, default Ethereum.
      //       chainId, //optional: current chain id, default 1.
      //       wallet: {
      //         //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
      //         displayWalletEntry: false, //show wallet entry when connect particle.
      //         // defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
      //         uiMode: "light", //optional: light or dark, if not set, the default is the same as web auth.
      //         supportChains: [
      //           { id: 137, name: "polygon" },
      //           { id: 80001, name: "polygon" },
      //         ], // optional: web wallet support chains.
      //         customStyle: {}, //optional: custom wallet style
      //       },
      //     });
      //     const particleProvider = new ParticleProvider(particle.auth);
      //     if (!particle.auth.isLogin()) {
      //       if (preferredAuthType) {
      //         await particle.auth.login({
      //           preferredAuthType, //support facebook,google,twitter,apple,discord,github,twitch,microsoft,linkedin etc.
      //         });
      //       } else {
      //         await particleProvider.enable();
      //       }
      //     }
      //     ethereumProvider = particleProvider;
      //   } else {
      //     switch (wallet) {
      //       case WALLET.METAMASK:
      //         if (!window.ethereum) {
      //           throw "MetaMask is not installed or not enabled.";
      //         }
      //         ethereumProvider = window.ethereum;
      //         break;
      //       // case WALLET.COINBASE:
      //       //   const chainId = 1;
      //       //   const jsonRpcUrl = "https://mainnet.infura.io/v3";
      //       //   const coinbaseWallet = new CoinbaseWalletSDK({
      //       //     appName: "Meteor",
      //       //     darkMode: false,
      //       //   });
      //       //   const coinbaseProvider = coinbaseWallet.makeWeb3Provider(
      //       //     jsonRpcUrl,
      //       //     chainId,
      //       //   );
      //       //   ethereumProvider = coinbaseProvider;
      //       //   break;
      //       case WALLET.WALLETCONNECT:
      //         const client = await EthereumProvider.init({
      //           // use your own projectId to make sure connect successfully
      //           projectId: "de2a6e522f354b90448adfa7c76d9c05",
      //           showQrModal: true,
      //           chains: [1],
      //           optionalChains: [80001],
      //           methods: [
      //             "wallet_switchEthereumChain",
      //             "wallet_addEthereumChain",
      //             "eth_sendTransaction",
      //             "personal_sign",
      //             "eth_signTypedData_v4",
      //           ],
      //           events: ["chainChanged", "accountsChanged"],
      //         });
      //         await client.enable();
      //         ethereumProvider = client;
      //         break;
      //       default:
      //         throw "Unsupported wallet";
      //     }
      //   }
      //   connectRes = await meteorConnector.connectWallet({
      //     provider: ethereumProvider,
      //   });
      //   if (!connectRes) {
      //     throw "Connect Wallet Failed! Please Check if not install Dataverse Snap or not enabled MetaMask flask.";
      //   }
      // }
      // const { pkh } = await meteorConnector.runOS({
      //   method: SYSTEM_CALL.createCapability,
      //   params: {
      //     appId: appId!,
      //   },
      // });
      // // setConnected(true);
      // if (meteorContext) {
      //   const { dispatch, setConnector } = meteorContext;
      //   dispatch(actionConnectWallet(connectRes));
      //   dispatch(actionCreateCapability({ pkh, appId: appId! }));
      //   setConnector(meteorConnector);
      // }
      // onConnect?.(meteorConnector, { ...connectRes, pkh });
      // setConnectedWallet(wallet);
      // message.success("Wallet connected successfully.");
    } catch (e: any) {
      console.warn(e);
      message({
        type: MessageTypes.Error,
        content: "Failed to connect, " + (e?.message || e),
        duration: 10e3,
      });
      // setConnected(false);
      onDisconnect?.();
    } finally {
      setConnecting(false);
    }
  };

  // useEffect(() => {
  //   const embededWallet = privyWallets.find(
  //     wallet => wallet.walletClientType === "privy",
  //   );
  //   if (embededWallet && waitForPrivyConnecting) {
  //     setWaitForPrivyConnecting(false);
  //     handleConnectWallet("google");
  //   }
  // }, [privyWallets, handleConnectWallet]);

  const walletProviders = (
    <>
      <Tooltip
        arrow
        placement='right'
        title='Meteor Snap is still in the testing phase, you need to use Metamask flask and run the snap server locally before using it.'
      >
        <div
          className='wallet-item'
          css={css`
            color: grey;
          `}
          data-disabled={walletConfig?.enabled?.dataverseSnap === false}
          data-unavailable={true}
          onClick={() => {
            // handleConnectWallet(WALLET.METAMASK)
            message.info("Coming soon...");
          }}
        >
          <img
            className='wallet-logo'
            src='https://avatars.githubusercontent.com/u/11744586?s=200&v=4'
          />
          Meteor Snap
        </div>
      </Tooltip>
      <Tooltip
        arrow
        placement='right'
        title='You may need to pre-install the Meteor-Wallet browser extension before using it. Only MetaMask stable is available, you need to disable MetaMask flask.'
      >
        <div
          className='wallet-item'
          data-disabled={walletConfig?.enabled?.meteorWallet === false}
          onClick={() => handleSelectProvider("meteor-wallet")}
        >
          <img
            className='wallet-logo'
            src='https://avatars.githubusercontent.com/u/118692557?s=200&v=4'
          />
          Meteor Wallet
        </div>
      </Tooltip>
      <Tooltip
        arrow
        placement='right'
        title='This wallet will be embedded in an iframe and only support External-Wallet for now.'
      >
        <div
          className='wallet-item'
          data-disabled={walletConfig?.enabled?.meteorWeb === false}
          onClick={() => handleSelectProvider("meteor-web")}
        >
          <span className='wallet-logo'>🌈</span>
          Meteor Web
        </div>
      </Tooltip>
    </>
  );

  // const walletList = (
  //   <>
  //     <div
  //       className='wallet-item'
  //       data-disabled={walletConfig?.enabled?.dataverseSnap === false}
  //       onClick={handleConnectWallet.bind(null, "Google")}
  //     >
  //       <img
  //         className='wallet-logo'
  //         src='https://avatars.githubusercontent.com/u/1342004?s=200&v=4'
  //       />
  //       Google (Particle)
  //       {/* {selectedProviderType === "meteor-wallet"
  //         ? "(via Particle)"
  //         : "(via Privy)"} */}
  //     </div>
  //     <div
  //       className='wallet-item'
  //       data-disabled={walletConfig?.enabled?.dataverseSnap === false}
  //       onClick={handleConnectWallet.bind(null, WALLET.METAMASK)}
  //     >
  //       <img
  //         className='wallet-logo'
  //         src='https://avatars.githubusercontent.com/u/11744586?s=200&v=4'
  //       />
  //       Metamask
  //     </div>
  //     {/* <div
  //       className='wallet-item'
  //       data-disabled={walletConfig?.enabled?.dataverseSnap === false}
  //       onClick={handleConnectWallet.bind(null, WALLET.COINBASE)}
  //     >
  //       <img
  //         className='wallet-logo'
  //         src='https://avatars.githubusercontent.com/u/1885080?s=200&v=4'
  //       />
  //       Coinbase Wallet
  //     </div> */}
  //     {/* <div
  //       className='wallet-item'
  //       data-disabled={walletConfig?.enabled?.dataverseSnap === false}
  //       onClick={handleConnectWallet.bind(null, "rainbow")}
  //     >
  //       <img
  //         className='wallet-logo'
  //         src='https://avatars.githubusercontent.com/u/48327834?s=200&v=4'
  //       />
  //       Rainbow
  //     </div> */}
  //     <div
  //       className='wallet-item'
  //       data-disabled={walletConfig?.enabled?.dataverseSnap === false}
  //       // onClick={handleConnectWallet.bind(null, WALLET.WALLETCONNECT)}
  //     >
  //       <img
  //         className='wallet-logo'
  //         src='https://avatars.githubusercontent.com/u/37784886?s=200&v=4'
  //       />
  //       WalletConnect
  //     </div>
  //     <div
  //       className='wallet-item'
  //       onClick={() => setSelectedProviderType(undefined)}
  //     >
  //       <ArrowBackIcon className='wallet-logo' />
  //       Go back
  //     </div>
  //   </>
  // );

  return (
    <WalletListContainer layout transition={{ duration: 0.15 }}>
      {connecting && (
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
        ))}
    </WalletListContainer>
  );
};

export const Detail = ({
  selectedProviderType,
  authRef,
  setSelectedProviderType,
  onConnect,
  onDisconnect,
}: {
  selectedProviderType: ProviderType;
  authRef?: (params: {
    connectWallet: (wallet: SupportedWallet) => Promise<void>;
    connecting: boolean;
    connectedWallet?: SupportedWallet;
  }) => void;
  setSelectedProviderType: (selectedProviderType: ProviderType) => void;
  onConnect?: (meteorConnector: Connector, connectRes: ConnectRes) => void;
  onDisconnect?: () => void;
}) => {
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connectedWallet, setConnectedWallet] = useState<SupportedWallet>();
  const meteorContext = useContext(MeteorContext);
  const { actionConnectWallet, actionCreateCapability } = useAction();

  const handleConnectWallet = async (wallet: SupportedWallet) => {
    setConnecting(true);
    try {
      let connectRes: {
        address: string;
        chain: Chain;
        wallet: WALLET;
        userInfo?: any;
      };
      if (selectedProviderType !== "meteor-web") {
        if (wallet === WALLET.METAMASK && !window.ethereum) {
          throw "MetaMask is not installed or not enabled.";
        }
        connectRes = await meteorConnector.connectWallet({
          wallet: wallet === "Google" ? WALLET.PARTICLE : wallet,
          preferredAuthType: wallet === "Google" ? "google" : undefined,
        });
        if (!connectRes) {
          throw "Connect Wallet Failed! Please Check if not install Meteor Wallet or not enabled Meteor Wallet.";
        }
      } else {
        let ethereumProvider: any;
        if (wallet === "Google") {
          // if (!privyReady) {
          //   throw "Privy is not ready, please waiting...";
          // }
          // const embededWallet = privyWallets.find(
          //   wallet => wallet.walletClientType === "privy",
          // );
          // if (!embededWallet) {
          //   setWaitForPrivyConnecting(true);
          //   if (!privyAuthenticated) {
          //     privyLogin();
          //   } else {
          //     privyCreateWallet();
          //   }
          //   return;
          // } else {
          //   ethereumProvider = await embededWallet.getEthereumProvider();
          // }
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
          ethereumProvider = particleProvider;
        } else {
          switch (wallet) {
            case WALLET.METAMASK:
              if (!window.ethereum) {
                throw "MetaMask is not installed or not enabled.";
              }
              ethereumProvider = window.ethereum;
              break;
            case WALLET.COINBASE:
              const chainId = 1;
              const jsonRpcUrl = "https://mainnet.infura.io/v3";
              const coinbaseWallet = new CoinbaseWalletSDK({
                appName: "Meteor",
                darkMode: false,
              });
              const coinbaseProvider = coinbaseWallet.makeWeb3Provider(
                jsonRpcUrl,
                chainId,
              );
              ethereumProvider = coinbaseProvider;
              break;
            case WALLET.WALLETCONNECT:
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
              ethereumProvider = client;
              break;
            default:
              throw "Unsupported wallet";
          }
        }
        connectRes = await meteorConnector.connectWallet({
          provider: ethereumProvider,
        });
        if (!connectRes) {
          throw "Connect Wallet Failed! Please Check if not install Dataverse Snap or not enabled MetaMask flask.";
        }
      }

      const { pkh } = await meteorConnector.runOS({
        method: SYSTEM_CALL.createCapability,
        params: {
          appId,
        },
      });
      // setConnected(true);
      if (meteorContext) {
        const { dispatch, setConnector } = meteorContext;
        dispatch(actionConnectWallet(connectRes));
        dispatch(actionCreateCapability({ pkh, appId }));
        setConnector(meteorConnector);
      }
      onConnect?.(meteorConnector, { ...connectRes, pkh });
      setConnectedWallet(wallet);
      message.success("Wallet connected successfully.");
    } catch (e: any) {
      console.warn(e);
      message({
        type: MessageTypes.Error,
        content: "Failed to connect, " + (e?.message || e),
        duration: 10e3,
      });
      // setConnected(false);
      onDisconnect?.();
    } finally {
      setConnecting(false);
    }
  };

  useEffect(() => {
    authRef?.({
      connectWallet: handleConnectWallet,
      connecting,
      connectedWallet,
    });
  }, [authRef, handleConnectWallet, connecting, connectedWallet]);

  return (
    <DetailContainer>
      <img src={closeSVG} className='close' />
      {selectedProviderType === "meteor-wallet" ? (
        <MeteorWalletDetail handleConnectWallet={handleConnectWallet} />
      ) : selectedProviderType === "meteor-web" ? (
        <MeteorWebDetail handleConnectWallet={handleConnectWallet} />
      ) : selectedProviderType === "meteor-snap" ? (
        <MeteorSnapDetail handleConnectWallet={handleConnectWallet} />
      ) : (
        <DefaultDetail />
      )}
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

export const MeteorWalletDetail = ({
  handleConnectWallet,
}: {
  handleConnectWallet: (wallet: SupportedWallet) => void;
}) => {
  const [isMeteorInstalled, setIsMeteorInstalled] = useState(false);

  useEffect(() => {
    detectMeteorExtension().then(res => setIsMeteorInstalled(res));
  });

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
          <img src={meteorWalletScreenshotPNG} className='screenshot' />
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

export const MeteorWebDetail = ({
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

export const MeteorSnapDetail = ({
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

export const DefaultDetail = () => {
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
      <div className='learn-more' onClick={() => window.open("")}>
        learn more
      </div>
    </div>
  );
};

export interface AuthModalProps {
  authProps?: AuthProps;
  onCancel?: () => void;
  defaultVisible?: boolean;
  controlVisible?: boolean;
}

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

  const handleCancel = async () => {
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
        onConnectSucceed={(meteorConnector, connectRes) => {
          handleCancel();
          authProps?.onConnectSucceed?.(meteorConnector, connectRes);
        }}
      />
    </FullScreenModal>
  );
};

Auth.openModal = (meteorContext: MeteorContextType, authProps?: AuthProps) => {
  return new Promise<ConnectRes | void>((resolve, reject) => {
    try {
      const container = document.createElement("div");
      document.body.appendChild(container);
      ReactDOM.render(
        <MeteorContext.Provider value={meteorContext}>
          <Auth.Model
            authProps={{
              ...authProps,
              onConnectSucceed(meteorConnector, connectRes) {
                authProps?.onConnectSucceed?.(meteorConnector, connectRes);
                setTimeout(() => {
                  document.body.removeChild(container);
                  resolve(connectRes);
                }, 500);
              },
            }}
            onCancel={async () => {
              setTimeout(() => {
                document.body.removeChild(container);
                resolve();
              }, 500);
            }}
          />
        </MeteorContext.Provider>,
        container,
      );
    } catch (e) {
      reject(e);
    }
  });
};
