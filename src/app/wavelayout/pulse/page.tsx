import type { Metadata } from 'next';
import PulseWaveCanvas from './canvas';

export const metadata: Metadata = {
  title: 'パルス波 | Wave App by Wing',
  description: 'パルス波を可視化できるツールです．'
}

export default function パルス波() {
  return(
    <>
      <h2>パルス波</h2>
      <PulseWaveCanvas />
      <section>
        <h3>パルス波</h3>
        <p>ごく短い間振動させることで生じる，単独の波</p>
      </section>
    </>
  )
}