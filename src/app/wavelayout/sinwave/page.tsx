import type { Metadata } from 'next';
import OscillationCanvas from './canvas';

export const metadata: Metadata = {
  title: '正弦波 | Wave App by Wing',
  description: '正弦波を可視化できるツールです．'
}

export default function 正弦波() {
  return(
    <>
      <OscillationCanvas />
      <p>すみません，準備中です...</p>
    </>
  )
}