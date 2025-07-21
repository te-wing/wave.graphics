import type { Metadata } from 'next';
import OscillationCanvas from './canvas';

export const metadata: Metadata = {
  title: '単振動 | Wave App by Wing',
  description: '波を理解するのに，単振動は必須です．'
}

export default function 縦波と横波() {
  return(
    <>
      <h2>単振動</h2>
      <OscillationCanvas initialAmplitude={120} initialFrequency={1.5} />
    </>
  )
}