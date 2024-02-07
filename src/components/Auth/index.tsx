/* eslint-disable no-case-declarations */
import React, { useContext, useEffect, useState } from "react";

// import "@meteor-web3/meteor-iframe";
// import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
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

import { EmbedWalletContainer, WalletListContainer } from "./styled";
import { MessageTypes, message } from "../Message";
import { FullScreenModal } from "../Modal";

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
   * Provides a core method and state call without UI component control.
   * When any item in params is updated, this function will be called.
   */
  authRef?: (params: {
    connectWallet: ConnectWallet;
    connecting: boolean;
    selectedProvider?: SupportedProvider;
    connectedWallet?: SupportedWallet;
  }) => void;
  /**
   * Called when the connection is successful
   * @returns meteorConnector(generated inside the component) and ConnectRes
   */
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
      <p className='top-tip'>
        {connectRes
          ? "You have already logged in"
          : "Choose a wallet to log in"}
      </p>
      <div className='logo-container' style={{ marginBottom: "16px" }}>
        <img
          className='logo'
          src='https://avatars.githubusercontent.com/u/118692557?s=200&v=4'
          alt='Meteor'
        />
        <span>Meteor</span>
      </div>
      {connectRes && (
        <div className='connected'>
          <p>{connectRes.address}</p>
          <p>{connectRes.pkh}</p>
        </div>
      )}
      <WalletList
        appId={appId}
        walletConfig={walletConfig}
        authRef={authRef}
        onConnect={(connector, connectRes) => {
          setConnectRes(connectRes);
          onConnectSucceed?.(connector, connectRes);
        }}
        onDisconnect={() => setConnectRes(undefined)}
      />
      <div className='footer'>
        <a
          href='https://github.com/meteor-web3'
          target='_blank'
          rel='noreferrer'
        >
          Powered by Meteor
        </a>
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
  | "google"
  | (typeof WALLET)["METAMASK" | "WALLETCONNECT"];

export type SupportedProvider = "meteor-wallet" | "meteor-web" | "meteor-snap";

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

export interface WalletListProps {
  appId?: string;
  walletConfig?: WalletConfig;
  /**
   * Provides a core method and state call without UI component control.
   * When any item in params is updated, this function will be called.
   */
  authRef?: (params: {
    connectWallet: ConnectWallet;
    connecting: boolean;
    selectedProvider?: SupportedProvider;
    connectedWallet?: SupportedWallet;
  }) => void;
  onConnect?: (meteorConnector: Connector, connectRes: ConnectRes) => void;
  onDisconnect?: () => void;
}

export const WalletList = ({
  appId,
  walletConfig,
  authRef,
  onConnect,
  onDisconnect,
}: WalletListProps) => {
  const [connecting, setConnecting] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<SupportedProvider>();
  const [connectedWallet, setConnectedWallet] = useState<SupportedWallet>();
  // const [waitForPrivyConnecting, setWaitForPrivyConnecting] =
  //   useState<boolean>(false);
  // meteor-hooks context
  const meteorContext = useContext(MeteorContext) as
    | MeteorContextType
    | undefined;
  const { actionConnectWallet, actionCreateCapability } = useAction();

  // const { ready: privyReady, authenticated: privyAuthenticated } = usePrivy();
  // const { wallets: privyWallets } = useWallets();
  // const { login: privyLogin } = useLogin();
  // const { logout: privyLogout } = useLogout();
  // const { createWallet: privyCreateWallet } = useCreateWallet();

  const handleConnectWallet: ConnectWallet = async (
    wallet: SupportedWallet,
    providerType: SupportedProvider | undefined = selectedProvider,
    noMessage: boolean = false,
  ) => {
    setSelectedProvider(providerType);
    setConnecting(true);
    try {
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
          throw "Unsupported provider.";
      }
      if (!meteorConnector) {
        meteorConnector = new Connector(baseProvider);
      } else {
        meteorConnector.setProvider(baseProvider);
      }
      if (!appId) {
        if (location.hostname !== "localhost") {
          const appInfo = await meteorConnector.getDAppInfo({
            hostname: location.hostname,
          });
          appId = appInfo.id;
        } else {
          appId = testAppId;
        }
      }
      // connect the real wallet
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
          wallet: wallet === "google" ? WALLET.PARTICLE : wallet,
          preferredAuthType: wallet === "google" ? "google" : undefined,
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
        // handle external-wallet process
        if (wallet === "google") {
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
            // case WALLET.COINBASE:
            //   const chainId = 1;
            //   const jsonRpcUrl = "https://mainnet.infura.io/v3";
            //   const coinbaseWallet = new CoinbaseWalletSDK({
            //     appName: "Meteor",
            //     darkMode: false,
            //   });
            //   const coinbaseProvider = coinbaseWallet.makeWeb3Provider(
            //     jsonRpcUrl,
            //     chainId,
            //   );
            //   ethereumProvider = coinbaseProvider;
            //   break;
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
          appId: appId!,
        },
      });
      // setConnected(true);
      if (meteorContext?.dispatch) {
        const { setConnector } = meteorContext;
        actionConnectWallet(connectRes);
        actionCreateCapability({ pkh, appId: appId! });
        setConnector(meteorConnector);
      }
      onConnect?.(meteorConnector, { ...connectRes, pkh });
      setConnectedWallet(wallet);
      if (!noMessage) {
        message.success("Wallet connected successfully.");
      }
      return { ...connectRes, pkh };
    } catch (e: any) {
      console.warn(e);
      // setConnected(false);
      onDisconnect?.();
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

  // useEffect(() => {
  //   const embededWallet = privyWallets.find(
  //     wallet => wallet.walletClientType === "privy",
  //   );
  //   if (embededWallet && waitForPrivyConnecting) {
  //     setWaitForPrivyConnecting(false);
  //     handleConnectWallet("google");
  //   }
  // }, [privyWallets, handleConnectWallet]);

  useEffect(() => {
    authRef?.({
      connectWallet: handleConnectWallet,
      connecting,
      selectedProvider,
      connectedWallet,
    });
  }, [
    authRef,
    handleConnectWallet,
    connecting,
    selectedProvider,
    connectedWallet,
  ]);

  const walletProviders = (
    <>
      <Tooltip
        arrow
        placement='right'
        title='Dataverse Snap is still in the testing phase, you need to use Metamask flask and run the snap server locally before using it.'
      >
        <div
          className='wallet-item'
          data-disabled={walletConfig?.enabled?.dataverseSnap === false}
          data-unavailable={true}
          onClick={() => {
            // handleConnectWallet(WALLET.METAMASK, "meteor-snap");
            message.info("Coming soon...");
          }}
        >
          <img
            className='wallet-logo'
            src='https://avatars.githubusercontent.com/u/11744586?s=200&v=4'
          />
          Dataverse Snap
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
          onClick={() => setSelectedProvider("meteor-wallet")}
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
          onClick={() => setSelectedProvider("meteor-web")}
        >
          <span className='wallet-logo'>🌈</span>
          Meteor Web
        </div>
      </Tooltip>
    </>
  );

  const walletList = (
    <>
      <div
        className='wallet-item'
        data-disabled={walletConfig?.enabled?.dataverseSnap === false}
        onClick={() => handleConnectWallet("google")}
      >
        <img
          className='wallet-logo'
          src='https://avatars.githubusercontent.com/u/1342004?s=200&v=4'
        />
        Google (Particle)
        {/* {selectedProvider === "meteor-wallet"
          ? "(via Particle)"
          : "(via Privy)"} */}
      </div>
      <div
        className='wallet-item'
        data-disabled={walletConfig?.enabled?.dataverseSnap === false}
        onClick={() => handleConnectWallet(WALLET.METAMASK)}
      >
        <img
          className='wallet-logo'
          src='https://avatars.githubusercontent.com/u/11744586?s=200&v=4'
        />
        Metamask
      </div>
      {/* <div
        className='wallet-item'
        data-disabled={walletConfig?.enabled?.dataverseSnap === false}
        onClick={handleConnectWallet.bind(null, WALLET.COINBASE)}
      >
        <img
          className='wallet-logo'
          src='https://avatars.githubusercontent.com/u/1885080?s=200&v=4'
        />
        Coinbase Wallet
      </div> */}
      {/* <div
        className='wallet-item'
        data-disabled={walletConfig?.enabled?.dataverseSnap === false}
        onClick={handleConnectWallet.bind(null, "rainbow")}
      >
        <img
          className='wallet-logo'
          src='https://avatars.githubusercontent.com/u/48327834?s=200&v=4'
        />
        Rainbow
      </div> */}
      <div
        className='wallet-item'
        data-disabled={walletConfig?.enabled?.dataverseSnap === false}
        onClick={() => handleConnectWallet(WALLET.WALLETCONNECT)}
      >
        <img
          className='wallet-logo'
          src='https://avatars.githubusercontent.com/u/37784886?s=200&v=4'
        />
        WalletConnect
      </div>
      <div
        className='wallet-item'
        onClick={() => setSelectedProvider(undefined)}
      >
        <ArrowBackIcon className='wallet-logo' />
        Go back
      </div>
    </>
  );

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
        ) : selectedProvider && selectedProvider !== "meteor-snap" ? (
          walletList
        ) : (
          walletProviders
        ))}
    </WalletListContainer>
  );
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
export const useAuth = (
  /**
   * If the appId is not set, it will be inferred based on the website domain.
   * If domain is not localhost, appId will be used from dapp table registry recording to website,
   * otherwise it will be setting to testAppId.
   */
  appId?: string,
  /**
   * If you want to use it with meteor-hooks, you must provide meteorContext (used to pass status information), otherwise set meteorContext to undefined/falsy.
   */
  meteorContext?: MeteorContextType,
) => {
  const [connectWallet, setConnectWallet] = useState<ConnectWallet>();
  const [connecting, setConnecting] = useState<boolean>();
  const [selectedProvider, setSelectedProvider] = useState<SupportedProvider>();
  const [connectedWallet, setConnectedWallet] = useState<SupportedWallet>();
  const [connector, setConnector] = useState<Connector>();
  const [connectRes, setConnectRes] = useState<ConnectRes>();

  useEffect(() => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const authComponent = (
      <Auth
        styleConfig={{
          hidden: true,
        }}
        appId={appId}
        authRef={({
          connectWallet,
          connecting,
          selectedProvider,
          connectedWallet,
        }) => {
          setConnectWallet(() => connectWallet);
          setConnecting(connecting);
          setSelectedProvider(selectedProvider);
          setConnectedWallet(connectedWallet);
        }}
        onConnectSucceed={(connector, connectRes) => {
          setConnector(connector);
          setConnectRes(connectRes);
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
    return () => {
      document.body.removeChild(container);
    };
  }, [appId, meteorContext]);

  return {
    connectWallet,
    connecting,
    selectedProvider,
    connectedWallet,
    connector,
    connectRes,
  };
};
