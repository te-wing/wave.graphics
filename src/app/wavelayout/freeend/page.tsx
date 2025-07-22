'use client';

import FreeEndReflectionCanvas from "./canvas";

export default function FixedEndWavePage() {
  return(
    <>
      <FreeEndReflectionCanvas />
      <h3>図の見方</h3>
      <ul>
        <li><strong>赤い破線</strong>：波が反射する面を示しています．</li>
        <li><strong>紫色の曲線</strong>：入射波（もともとの波）の移動を示しています．反射面より右側では，実際には波は観測されないため，破線で示しています．</li>
        <li><strong>緑色の曲線</strong>：反射波の移動を示しています．</li>
        <li><strong>橙色の太い曲線</strong>：入射波と反射波を合成した波形，すなわち実際に観測される波形です．</li>
      </ul>
      <h3>自由端反射とは？</h3>
      <p>
        反射のうち，媒質の中で波が固定されていない（自由な）端に達したときに，自由端反射が起こる．<br />
        特徴としては，以下のようなものが挙げられる．
      </p>
      <ul>
        <li>入射波と反射波で，位相は反転しない．</li>
        <li>端点の変位は最大になる．</li>
      </ul>
      <h4>具体例</h4>
      <ul>
        <li>水槽の中で波を生じた場合，端まで達したら波の高さが２倍になり，溢れやすくなる．</li>
      </ul>
    </>
  )
}