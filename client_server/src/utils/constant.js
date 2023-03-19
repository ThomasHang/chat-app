/*
 * @Author: ThomasHang 11939838031@qq.com
 * @Date: 2023-03-19 00:53:27
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2023-03-19 23:45:19
 * @FilePath: /chat-app/client_server/src/utils/constant.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

//获取base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

//文件大小 b 转kb
const convertFileSizeToKB = (size) => {
  return (size / 1024).toFixed(2); // 保留小数点后两位
};

export { getBase64, convertFileSizeToKB };
