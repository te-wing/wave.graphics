'use client';

import React, { useState } from 'react';
import SuperpositionCanvas from './canvas';
import styles from './superpositionpage.module.scss'

export default function KasaneWave() {
  // スライダの値を管理
  const [leftAmplitude, setLeftAmplitude] = useState(110);
  const [rightAmplitude, setRightAmplitude] = useState(40);

  return (
    <>
      <section className={styles.controlSection}>
        <SuperpositionCanvas 
          waveAmplitudeLeft={leftAmplitude}
          waveAmplitudeRight={rightAmplitude}
        />
        <table className={styles.controlTable}>
          <tbody>
            <tr>
              <td>
                <label htmlFor='leftAmplitudeSlider'>
                  左の波の高さ：{leftAmplitude} px
                </label>
              </td>
              <td>
                <input
                  id='leftAmplitudeSlider'
                  className={styles.slider}
                  type='range'
                  min='-120'
                  max='120'
                  value={leftAmplitude}
                  onChange={(e) => setLeftAmplitude(Number(e.target.value))}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='rightAmplitudeSlider'>
                  右の波の高さ：{rightAmplitude} px
                </label>
              </td>
              <td>
                <input
                  id='rightAmplitudeSlider'
                  className={styles.slider}
                  type='range'
                  min='-120'
                  max='120'
                  value={rightAmplitude}
                  onChange={(e) => setRightAmplitude(Number(e.target.value))}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h3>波の重ね合わせ</h3>
        <p>複数の波が同じ場所で重なり合ったときに，<strong>それぞれの波は独立に存在しながらも，一時的に合成された波が観測される</strong>現象を，波の重ね合わせという．</p>
        <h4>特徴</h4>
        <ul>
          <li><strong>波の独立性</strong>：波は，他の波と重なっても互いに影響を与えず，それぞれの波形や速さを保ったまま進む．したがって，通り過ぎた後は元の形に戻る．</li>
          <li><strong>合成波</strong>：複数の波が重なり合う瞬間には，その場所でそれぞれの波の<strong>変位を単純に足し合わせたもの</strong>が，新しい波形として現れる．こうして出来上がった波を「合成波」という．</li>
        </ul>
      </section>
    </>
  )
}
