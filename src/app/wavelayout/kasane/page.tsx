import type { Metadata } from 'next';
import React, { useState } from 'react';
import SuperpositionCanvas from './canvas';

export const metadata: Metadata = {
  title: '波の重ね合わせ | Wave App by Wing',
  description: '先ほどのパルス波を使って，二つの波が重なったらどうなるか，観察してみましょう．'
}

export default function 重ね合わせ() {
  // スライダの値を管理
  const [leftAmplitude, setLeftAmplitude] = useState(50);
  const [rightAmplitude, setRightAmplitude] = useState(50);

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
              min='-90'
              max='90'
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
              min='-90'
              max='90'
              value={rightAmplitude}
              onChange={(e) => setRightAmplitude(Number(e.target.value))}
            />
          </div>
        </div>
      </section>
    </>
  )
}
