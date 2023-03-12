/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-04 15:28:19
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2023-03-11 22:33:25
 * @FilePath: \chat-app\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
