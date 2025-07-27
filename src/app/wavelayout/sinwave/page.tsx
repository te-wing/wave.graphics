import type { Metadata } from 'next';
import OscillationCanvas from './canvas';
import { InlineMath, BlockMath } from 'react-katex';

export const metadata: Metadata = {
  title: '正弦波 | Wave App by Wing',
  description: '正弦波を可視化できるツールです．'
}

export default function 正弦波() {
  return(
    <>
      <OscillationCanvas />
      <h2>正弦波</h2>
      <p>波源が単振動をする場合，媒質の各点は波源よりも遅れて単振動するので，<strong>正弦波</strong>が生じる．各点における，元の位置からのズレは，<strong>変位</strong>という．</p>
      <h3>図について</h3>
      <p>横波の場合のモデル．</p>
      <h3>波の要素</h3>
      <ul>
        <li><strong>山</strong>：波形の最も高いところ</li>
        <li><strong>谷</strong>：波形の最も低いところ</li>
        <li><strong>振幅<InlineMath math='A' /></strong>：山の高さ・谷の深さ</li>
        <li><strong>波長<InlineMath math='\lambda' /></strong>：波一つ分の長さ．山と山の間など．</li>
        <li>波の<strong>速さ<InlineMath math='v' /></strong>：山や谷が進む速さを指す．</li>
        <li><strong>周期<InlineMath math='T' /></strong>：媒質の各点が１回振動するのにかかる時間</li>
        <li><strong>振動数<InlineMath math='f' /></strong>：１秒あたりに振動する回数</li>
      </ul>
      <p>これらの要素の関係式は，以下の通り．</p>
      <BlockMath math=' v = f \lambda' />
      <BlockMath math=' f = \frac{1}{T}' />
      <h3>正弦波の具体例</h3>
      <ul>
        <li><strong>音波</strong>：縦波だが，正弦波で表される．</li>
        <li><strong>電磁波</strong>：光（可視光），赤外線，電波など．</li>
      </ul>
    </>
  )
}