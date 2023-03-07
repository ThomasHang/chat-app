/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-07 16:21:34
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2023-03-07 16:30:18
 * @FilePath: \chat-app\client_server\src\utils\db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const STORE_NAME = "myStore";

class IndexedDB {
  constructor(dbName) {
    this.dbName = dbName;
    this.db = null;
    this.indexedDB =
      window.indexedDB ||
      window.webkitIndexedDB ||
      window.mozIndexedDB ||
      window.msIndexedDB;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = this.indexedDB.open(this.dbName);

      request.onerror = (event) => {
        console.error("Error opening indexedDB", event);
        reject(event);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.log("IndexedDB initialized");
        resolve();
      };

      request.onupgradeneeded = (event) => {
        console.log("Creating object store");
        this.db = event.target.result;
        this.db.createObjectStore(STORE_NAME, { keyPath: "id" });
      };
    });
  }

  async addData(data) {
    const transaction = this.db.transaction([STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = objectStore.add(data);
      request.onsuccess = () => {
        console.log("Data added to IndexedDB", data);
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error adding data to IndexedDB", event);
        reject(event);
      };
    });
  }

  async getData(id) {
    const transaction = this.db.transaction([STORE_NAME], "readonly");
    const objectStore = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = objectStore.get(id);
      request.onsuccess = (event) => {
        const data = event.target.result;
        console.log("IndexedDB data retrieved", data);
        resolve(data);
      };

      request.onerror = (event) => {
        console.error("Error retrieving data from IndexedDB", event);
        reject(event);
      };
    });
  }
}

export default IndexedDB;
