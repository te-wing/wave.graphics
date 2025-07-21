import type { Metadata } from 'next';
import OscillationCanvas from './canvas';
import styles from './tanshindoupage.module.scss';
import { InlineMath, BlockMath } from 'react-katex';

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
          <ul>
            <li><strong>周期性</strong>：一定の時間（周期）で同じ運動を繰り返す．</li>
            <li><strong>対称性</strong>：平衡点を挟んで左右対称に運動する．</li>
            <li><strong>復元力</strong>：「フックの法則」などのように，変位に比例した復元力（平衡点に戻ろうとする力）が働く．</li>
          </ul>      
          <h3>単振動する物体の具体例</h3>
          <p>
            例えば，バネにつけたおもりの往復運動は，単振動である．また，振り子において，触れ角が十分小さい時，おもりの動きは単振動と見なすことができる．<br />
            また，音波中の空気分子の振動も単振動と見做せることから分かるように，波は単振動する分子で構成される．
          </p>
          <h3>数式による表現</h3>
          <p>
            単振動は，正弦関数や余弦関数で記述できる．<br />
            変位<InlineMath math='x(t)' />は次のように表される．<br />
            <InlineMath math='x ( t ) = A \sin ( \omega t + \phi )'/><br />
          </p>
          <p>ここで，</p>
          <ul>
            <li><InlineMath math='A' />：振幅（平衡点からの最大変位）</li>
            <li><InlineMath math='\omega' />：角振動数（円運動に直した時に１秒間にどれだけ回転するか）</li>
            <li><InlineMath math='t' />：時間</li>
            <li><InlineMath math='\phi' />：初期位相（<InlineMath math='t=0' />における変異を決定するための定数）</li>
          </ul>
          <p>さらに，先ほどの変位の式を<InlineMath math='t' />で微分すると，速度<InlineMath math='v(t)' />や加速度<InlineMath math='a(t)' />が求められる．<br />
          <InlineMath math='v ( t ) = A  \omega \cos ( \omega t + \phi )' /><br />
          <InlineMath math='a(t) = - A \omega ^2 \sin ( \omega t + \phi) = - \omega ^2 x' />
          </p>
        </div>
      </section>
    </>
  )
}