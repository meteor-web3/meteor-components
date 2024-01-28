import { Web3Storage as Web3StorageSDK } from "web3.storage";

export class Web3Storage {
  private accessToken = import.meta.env.VITE_WEB3STORAGE_TOKEN;

  getAccessToken() {
    return this.accessToken;
  }

  makeFileObjects() {
    const obj = { hello: "world" };
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

    const files = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "hello.json"),
    ];
    return files;
  }

  makeStorageClient(token?: string) {
    return new Web3StorageSDK({ token: this.getAccessToken() ?? token ?? "" });
  }

  async storeFiles(files: any, token?: string) {
    const client = this.makeStorageClient(token);
    const cid = await client.put(files, { wrapWithDirectory: false });
    return cid;
  }

  async retrieveFiles(cid: string, token?: string) {
    const client = this.makeStorageClient(token);
    const res = await client.get(cid);
    if (!res || !res.ok) {
      throw new Error(`failed to get ${cid}`);
    }
    let data;
    const files = await res.files();
    for (const file of files) {
      data = await file.text();
    }

    return data;
  }

  async checkStatus(cid: string, token?: string) {
    const client = this.makeStorageClient(token);
    const status = await client.status(cid);
    console.log(status);
    // if (status) {
    // }
  }
}

export const web3Storage = new Web3Storage();
