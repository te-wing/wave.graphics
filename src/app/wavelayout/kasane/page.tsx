'use client';

import React, { useState } from 'react';
import SuperpositionCanvas from './canvas';
import styles from './superpositionpage.module.scss'

export default function 重ね合わせ() {
  // スライダの値を管理
  const [leftAmplitude, setLeftAmplitude] = useState(110);
  const [rightAmplitude, setRightAmplitude] = useState(40);

  return (
    <>
      <h2>波の重ね合わせ</h2>
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
    </>
  )
}
