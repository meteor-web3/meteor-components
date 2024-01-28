import React, { useState } from "react";

import { SerializedStyles, css } from "@emotion/react";
import {
  useApp,
  useCreateIndexFile,
  useMonetizeFile,
  useStore,
} from "@meteor-web3/hooks";
import { detectMeteorExtension } from "@meteor-web3/utils";
import ImageUploading, { ImageListType } from "react-images-uploading";

import {
  AccountStatus,
  ButtonWrapper,
  Content,
  EncryptWrapper,
  FlexRow,
  UploadImg,
  UploadImgCross,
  UploadImgWrapper,
  Wrapper,
} from "./styled";
import { MonetizeSetting } from "../MonetizeSetting";

import crossIcon from "@/assets/icon/cross.svg";
import imgIcon from "@/assets/icon/img.svg";
import lockIcon from "@/assets/icon/lock.svg";
import {
  Avatar,
  Button,
  CardModal,
  FullScreenModal,
  Textarea,
  message,
} from "@/base-components";
import { Switch } from "@/base-components/Switch";
import {
  addressAbbreviation,
  contextAvatar,
  getAddressFromDid,
} from "@/utils/address";
import { uuid } from "@/utils/uuid";
import { web3Storage } from "@/utils/web3Storage";

export type PrivacySettingsType = {
  currency?: string;
  amount?: number;
  collectLimit?: number;
};

export interface PublishPostProps {
  modelId: string;
  modelVersion: string;
  appId: string;
  /**
   * if not to set, will use env.VITE_WEB3STORAGE_TOKEN
   */
  web3StorageToken?: string;
  cssStyle?: SerializedStyles;
  className?: string;
  style?: React.CSSProperties;
}

export const PublishPost: React.FC<PublishPostProps> = ({
  modelId,
  modelVersion,
  appId,
  web3StorageToken,
  cssStyle,
  className,
  style,
}) => {
  const { connectApp } = useApp({
    appId,
  });
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const { createIndexFile } = useCreateIndexFile();
  const { monetizeFile } = useMonetizeFile();

  const [needEncrypt, setNeedEncrypt] = useState<boolean>(false);
  const [settings, setSettings] = useState<PrivacySettingsType>({});

  const [isSettingModalVisible, setSettingModalVisible] =
    useState<boolean>(false);
  const [isCreateProfileModalVisible, setCreateProfileModalVisible] =
    useState<boolean>(false);

  const [content, setContent] = useState("");
  const [images, setImages] = useState<ImageListType>([]);
  const { pkh, address, profileIds } = useStore();

  const onChange = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const onError = (error: any) => {
    if (error?.maxNumber) {
      message.info("Up to four pictures can be uploaded");
    }
  };

  const textareaOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const handleProfileAndPost = async () => {
    setIsPublishing(true);
    try {
      if ((await detectMeteorExtension()) === false) {
        window.open(process.env.METEOR_GOOGLE_STORE);
        return;
      }
      if (isPublishing) return;

      let accountAddress: string;

      if (!address || !pkh) {
        try {
          const res = await connectApp();
          accountAddress = res.address;
        } catch (error) {
          console.error(error);
          return;
        }
      } else {
        accountAddress = address;
      }

      const postImages = await _postImages();
      if (!postImages) return;

      if (needEncrypt) {
        await _post({
          postImages,
        });
      } else {
        await _post({
          postImages,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPublishing(false);
    }
  };

  const _postImages = async () => {
    if (needEncrypt && settings) {
      const amountReg = new RegExp("^([0-9][0-9]*)+(.[0-9]{1,17})?$");
      const { amount, collectLimit } = settings;
      const isValid =
        amount &&
        collectLimit &&
        amountReg.test(String(amount)) &&
        amount > 0 &&
        collectLimit > 0;
      if (!isValid) {
        message.info("Incorrect privacy settings!");
        return;
      }
    }
    const files: File[] = [];
    images.map(image => {
      if (image.file) {
        files.push(image.file);
      }
    });

    const postImages = await uploadImages(files, web3StorageToken);

    if (!content && postImages.length === 0) {
      message.info("Text and pictures cannot both be empty.");
      return;
    }

    return postImages;
  };

  const _post = async ({ postImages }: { postImages: string[] }) => {
    if (!settings) {
      throw new Error("settings undefined");
    }
    try {
      let res;
      const date = new Date().toISOString();
      if (!needEncrypt) {
        res = await createIndexFile({
          modelId,
          fileContent: {
            modelVersion,
            text: content,
            images: postImages,
            videos: [],
            createdAt: date,
            updatedAt: date,
          },
        });
        console.log(
          "[Branch PostType.Public]: After createPublicStream, res:",
          res,
        );
      } else {
        res = await createIndexFile({
          modelId,
          fileContent: {
            modelVersion,
            text: content,
            images: postImages,
            videos: [],
            createdAt: date,
            updatedAt: date,
            encrypted: {
              text: true,
              images: true,
              videos: false,
            },
          },
        });
        res = await monetizeFile({
          fileId: res.fileContent.file.fileId,
          datatokenVars: {
            currency: settings.currency!,
            amount: settings.amount!,
            collectLimit: settings.collectLimit!,
          },
        });
        console.log(
          "[Branch PostType.Payable]: After createPayableStream, res:",
          res,
        );
      }
      message.success("Post successfully!");
      setContent("");
      setImages([]);
    } catch (error: any) {
      message.error(error?.message ?? error);
    }
  };

  const openPrivacySettings = () => {
    setSettingModalVisible(true);
  };

  return (
    <Wrapper css={cssStyle} className={className} style={style}>
      <Content>
        <ImageUploading
          multiple
          maxNumber={4}
          value={images}
          onChange={onChange}
          onError={onError}
          dataURLKey='upload'
        >
          {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
            <>
              <AccountStatus>
                <Avatar
                  className='avatar'
                  avatar={contextAvatar(getAddressFromDid(pkh || ""))}
                />
                <div className='name'>{addressAbbreviation(address) ?? ""}</div>
              </AccountStatus>
              <Textarea
                value={content}
                placeholder="what's happening?"
                onChange={textareaOnChange}
                width={"100%"}
                height={147}
              />
              <FlexRow>
                {imageList.map((image, index) => (
                  <UploadImgWrapper key={uuid()}>
                    <UploadImgCross
                      src={crossIcon}
                      onClick={() => {
                        onImageRemove(index);
                      }}
                    />
                    <UploadImg
                      src={image["upload"]}
                      onClick={() => {
                        onImageUpdate(index);
                      }}
                    />
                  </UploadImgWrapper>
                ))}
              </FlexRow>
              <ButtonWrapper>
                <FlexRow>
                  <Button
                    type='icon'
                    minWidth={"1.75rem"}
                    onClick={onImageUpload}
                  >
                    <img src={imgIcon} />
                  </Button>
                  <Button
                    type='icon'
                    minWidth={"1.75rem"}
                    css={css`
                      margin-left: 26px;
                    `}
                    onClick={openPrivacySettings}
                  >
                    <img src={lockIcon} />
                  </Button>
                </FlexRow>
                <FlexRow>
                  <Button
                    type='primary'
                    loading={isPublishing}
                    onClick={handleProfileAndPost}
                    minWidth={110}
                    css={css`
                      border-radius: 8px;
                      padding: 0.3rem 2rem;
                    `}
                  >
                    Post
                  </Button>
                </FlexRow>
              </ButtonWrapper>
            </>
          )}
        </ImageUploading>
      </Content>
      <CardModal
        controlVisible={isSettingModalVisible}
        onCancel={() => setSettingModalVisible(false)}
        onOk={() => setSettingModalVisible(false)}
      >
        <EncryptWrapper>
          <p className='title'>Encrypt</p>
          <Switch defaultChecked={needEncrypt} onChange={setNeedEncrypt} />
        </EncryptWrapper>
        {needEncrypt && (
          <MonetizeSetting
            onChange={(data, valid) => valid && setSettings(data)}
          />
        )}
      </CardModal>
    </Wrapper>
  );
};

const uploadImages = async (
  files: File[],
  token?: string,
): Promise<string[]> => {
  const imgCIDs = await Promise.all(
    files.map(file => web3Storage.storeFiles([file], token)),
  );
  const imgUrls = imgCIDs.map(cid => `https://${cid}.ipfs.w3s.link`);
  return imgUrls;
};
