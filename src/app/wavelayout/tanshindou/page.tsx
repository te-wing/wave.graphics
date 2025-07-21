import type { Metadata } from 'next';
import OscillationCanvas from './canvas';
import styles from './tanshindoupage.module.scss';

export const metadata: Metadata = {
  title: '単振動 | Wave App by Wing',
  description: '波を理解するのに，単振動は必須です．'
}

export default function 縦波と横波() {
  return(
    <>
      <h2>単振動</h2>
      <section className={styles.mainSection}>
        <OscillationCanvas initialAmplitude={120} initialFrequency={1.5} />
        <div>
          <h3>単振動とは？</h3>
          <p>等速円運動する物体を真横から見ると，往復運動に見える．このような一直線上の運動を，<strong>単振動</strong>という．</p>
          <h4>主な特徴</h4>
          <p>
            <ul>
              <li><strong>周期性</strong>：一定の時間（周期）で同じ運動を繰り返す．</li>
              <li><strong>対称性</strong>：平衡点を挟んで左右対称に運動する．</li>
              <li><strong>復元力</strong>：「フックの法則」などのように，変位に比例した復元力（平衡点に戻ろうとする力）が働く．</li>
            </ul>
          </p>
          <h3>単振動する物体の具体例</h3>
          <p>
            例えば，バネにつけたおもりの往復運動は，単振動である．また，振り子において，触れ角が十分小さい時，おもりの動きは単振動と見なすことができる．<br />
            また，音波中の空気分子の振動も単振動と見做せることから分かるように，波は単振動する分子で構成される．
          </p>
        </div>
      </section>
    </>
  )
}