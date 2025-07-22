'use client';

import FixedEndReflectionCanvas from "./canvas";
import { InlineMath } from 'react-katex'

export default function FixedEndWavePage() {
  return(
    <>
      <section>
        <FixedEndReflectionCanvas />
        <p>※右上のリンクで，自由端・固定端を切り替えることができます．</p>
        <h3>図の見方</h3>
        <ul>
          <li><strong>赤い破線</strong>：波が反射する面を示しています．</li>
          <li><strong>紫色の曲線</strong>：入射波（もともとの波）の移動を示しています．反射面より右側では，実際には波は観測されないため，破線で示しています．</li>
          <li><strong>緑色の曲線</strong>：反射波の移動を示しています．</li>
          <li><strong>橙色の太い曲線</strong>：入射波と反射波を合成した波形，すなわち実際に観測される波形です．</li>
        </ul>
      </section>
      <section>
        <h3>固定端反射とは？</h3>
        <p>
          反射のうち，媒質の中で波が固定されている端に達した時に，固定端反射が起こる．<br />
          特徴としては，以下のようなものが挙げられる．
        </p>
        <ul>
          <li>反射波の波形は，図の紫色の点線部分を，反射面に対して線対称移動してから，上下反転させることで得られる．</li>
          <li>入射波と反射波で，位相は<InlineMath  math='\pi' />だけずれる（上下に反転する）．</li>
          <li>端点の変位は<InlineMath math='0' />である．</li>
        </ul>
        <h4>具体例</h4>
        <ul>
          <li>紐やバネの端点を固定して波を生じた時，端点が動かない反射が起きる．</li>
        </ul>
      </section>
    </>
  )
}