import type { Metadata } from 'next';
import PulseWaveCanvas from './canvas';
import styles from './pulsepage.module.scss';

export const metadata: Metadata = {
  title: 'パルス波 | Wave App by Wing',
  description: 'ごく短い間の単独の波を，パルス波といいます．パルス波を用いて，波の伝わり方を観察しましょう．'
}

export default function パルス波() {
  return(
    <>
      <h2>パルス波</h2>
      <PulseWaveCanvas />
      <section className={styles.detailSection}>
        <h3>パルス波</h3>
        <p>ごく短い間振動させることで生じる，単独の波を，<strong>パルス波</strong>という．</p>
        <h3>波の伝わり方</h3>
        <p>
          媒質自体は，その場で振動するだけで，<strong>波と一緒に移動するわけではない</strong>．<br />
          図では，赤い点が一つ一つの媒質を示しており，これは上下に動くだけで，波の進む向きには移動していないことが分かる．
        </p>
      </section>
    </>
  )
}