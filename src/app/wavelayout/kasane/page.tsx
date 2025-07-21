'use client';

import React, { useState } from 'react';
import SuperpositionCanvas from './canvas';

export default function 重ね合わせ() {
  // スライダの値を管理
  const [leftAmplitude, setLeftAmplitude] = useState(110);
  const [rightAmplitude, setRightAmplitude] = useState(40);

  return (
    <>
      <h2>波の重ね合わせ</h2>
      <section>
        <SuperpositionCanvas 
          waveAmplitudeLeft={leftAmplitude}
          waveAmplitudeRight={rightAmplitude}
        />
        <div>
          <div>
            <label htmlFor='leftAmplitudeSlider'>
              左の波の高さ：{leftAmplitude} px
            </label>
            <input
              id='leftAmplitudeSlider'
              type='range'
              min='-120'
              max='120'
              value={leftAmplitude}
              onChange={(e) => setLeftAmplitude(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor='rightAmplitudeSlider'>
              右の波の高さ：{rightAmplitude} px
            </label>
            <input
              id='rightAmplitudeSlider'
              type='range'
              min='-120'
              max='120'
              value={rightAmplitude}
              onChange={(e) => setRightAmplitude(Number(e.target.value))}
            />
          </div>
        </div>
      </section>
    </>
  )
}
