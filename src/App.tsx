import React from 'react'
import smallImg from '@/assets/images/5kb.png'
import bigImg from '@/assets/images/22kb.png'
import Class from '@/components/Class'
import './app.scss'

function App() {
  return (
    <>
      <img src={smallImg} alt="小于10kb的图片" />
      <img src={bigImg} alt="大于于10kb的图片" />
      <div className='smallImg'></div> {/* 小图片背景容器 */}
      <div className='bigImg'></div> {/* 大图片背景容器 */}
      <h2>蓝色的标题</h2>
      <div>狐火火</div>
    </>
  )
}
export default App