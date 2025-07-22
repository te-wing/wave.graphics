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
    </>
  )
}