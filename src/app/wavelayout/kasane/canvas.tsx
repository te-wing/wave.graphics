"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import styles from './superpositioncanvas.module.scss'; // スタイルファイル名はそのままにしています

interface SuperpositionCanvasProps {
  waveSpread?: number;
  waveAmplitude?: number;
  waveSpeed?: number;
  duration?: number;
  sampleRate?: number;
  height?: number;
  lineColor?: string;
  backgroundColor?: string;
  dotColor?: string;
  dotRadius?: number;
  dotDensity?: number;
  showIndividualWaves?: boolean; // 個々の波を表示するかどうかのオプション
}

const SuperpositionCanvas: React.FC<SuperpositionCanvasProps> = ({
  waveSpread = 0.05,
  waveAmplitude = 50,
  waveSpeed = 0.2,
  duration = 0.7,
  sampleRate = 1000,
  height = 300,
  lineColor = 'orange',
  backgroundColor = 'transparent',
  dotColor = 'red',
  dotRadius = 4,
  dotDensity = 20,
  showIndividualWaves = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  const [timeOffsetLeftWave, setTimeOffsetLeftWave] = useState(0); // 左から来る波の時間オフセット
  const [timeOffsetRightWave, setTimeOffsetRightWave] = useState(0); // 右から来る波の時間オフセット
  const [canvasWidth] = useState(800);

  // ガウス関数に基づく単一波のデータを生成する関数
  const generateGaussianWaveData = useCallback((
    amp: number,
    sigma: number,
    dur: number,
    sr: number,
    centerTime: number
  ) => {
    const data: { x: number; y: number }[] = [];
    const numSamples = Math.floor(dur * sr);
    const timePerSample = 1 / sr;

    for (let i = 0; i < numSamples; i++) {
      const t = i * timePerSample;
      const exponent = -Math.pow(t - centerTime, 2) / (2 * Math.pow(sigma, 2));
      const value = amp * Math.exp(exponent);
      data.push({
        x: t,
        y: value,
      });
    }
    return data;
  }, []);

  // 特定の時刻 (X座標) における波の振幅を取得するヘルパー関数
  const getGaussianWaveAmplitudeAtTime = useCallback((
    targetTime: number,
    amp: number,
    sigma: number,
    centerTime: number
  ): number => {
    const exponent = -Math.pow(targetTime - centerTime, 2) / (2 * Math.pow(sigma, 2));
    return amp * Math.exp(exponent);
  }, []);


  const drawWaves = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, height);

    const xScale = canvasWidth / duration;
    const yScale = height / (waveAmplitude * 2);
    const yCenter = height / 2; // 中央線

    // 中央の線
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, yCenter);
    ctx.lineTo(canvasWidth, yCenter);
    ctx.stroke();

    // 各時刻 (X座標) における合成波の振幅を計算し、点を描画
    ctx.fillStyle = dotColor;

    for (let xPixel = dotDensity; xPixel < canvasWidth; xPixel += dotDensity) {
      const t = xPixel / xScale; // ピクセル座標を時間座標に変換

      // 左から来る波の振幅
      const amplitudeLeft = getGaussianWaveAmplitudeAtTime(t, waveAmplitude, waveSpread, timeOffsetLeftWave);
      // 右から来る波の振幅（時間軸を反転させて、右端から左へ進むようにする）
      const amplitudeRight = getGaussianWaveAmplitudeAtTime(duration - t, waveAmplitude, waveSpread, timeOffsetRightWave);

      // 合成波の振幅
      const combinedAmplitude = amplitudeLeft + amplitudeRight;

      // 点のY座標を計算
      const dotY = yCenter - combinedAmplitude * 0.8 * yScale;

      // 点を描画
      ctx.beginPath();
      ctx.arc(xPixel, dotY, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // オプションで個々の波形も描画
    if (showIndividualWaves) {
      // 左から来る波の描画
      ctx.strokeStyle = 'rgba(255, 165, 0, 0.5)'; // 半透明のオレンジ
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let xPixel = 0; xPixel < canvasWidth; xPixel++) {
        const t = xPixel / xScale;
        const amplitude = getGaussianWaveAmplitudeAtTime(t, waveAmplitude, waveSpread, timeOffsetLeftWave);
        const y = yCenter - amplitude * 0.8 * yScale;
        if (xPixel === 0) {
          ctx.moveTo(xPixel, y);
        } else {
          ctx.lineTo(xPixel, y);
        }
      }
      ctx.stroke();

      // 右から来る波の描画
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.5)'; // 半透明のスカイブルー
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let xPixel = 0; xPixel < canvasWidth; xPixel++) {
        const t = xPixel / xScale;
        const amplitude = getGaussianWaveAmplitudeAtTime(duration - t, waveAmplitude, waveSpread, timeOffsetRightWave);
        const y = yCenter - amplitude * 0.8 * yScale;
        if (xPixel === 0) {
          ctx.moveTo(xPixel, y);
        } else {
          ctx.lineTo(xPixel, y);
        }
      }
      ctx.stroke();
    }

    // 合成波の線を描画
    ctx.strokeStyle = lineColor; // メインの線の色
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let xPixel = 0; xPixel < canvasWidth; xPixel++) {
      const t = xPixel / xScale;
      const amplitudeLeft = getGaussianWaveAmplitudeAtTime(t, waveAmplitude, waveSpread, timeOffsetLeftWave);
      const amplitudeRight = getGaussianWaveAmplitudeAtTime(duration - t, waveAmplitude, waveSpread, timeOffsetRightWave);
      const combinedAmplitude = amplitudeLeft + amplitudeRight;
      const y = yCenter - combinedAmplitude * 0.8 * yScale;
      if (xPixel === 0) {
        ctx.moveTo(xPixel, y);
      } else {
        ctx.lineTo(xPixel, y);
      }
    }
    ctx.stroke();

  }, [waveAmplitude, waveSpread, duration, sampleRate, timeOffsetLeftWave, timeOffsetRightWave, canvasWidth, height, lineColor, backgroundColor, dotColor, dotRadius, dotDensity, getGaussianWaveAmplitudeAtTime, showIndividualWaves]);

  const animateWaves = useCallback((timestamp: DOMHighResTimeStamp) => {
    if (!startTime.current) {
      startTime.current = timestamp;
    }
    const elapsed = timestamp - startTime.current;

    // 左から来る波のオフセット
    const newOffsetLeft = (elapsed / 1000) * waveSpeed * duration;
    // 右から来る波のオフセット (右端から左へ動くように調整)
    const newOffsetRight = (elapsed / 1000) * waveSpeed * duration;

    if (newOffsetLeft > duration * 2 || newOffsetRight > duration * 2) {
      startTime.current = timestamp;
      setTimeOffsetLeftWave(0);
      setTimeOffsetRightWave(0);
    } else {
      setTimeOffsetLeftWave(newOffsetLeft);
      setTimeOffsetRightWave(newOffsetRight);
    }

    drawWaves();
    animationFrameId.current = requestAnimationFrame(animateWaves);
  }, [drawWaves, waveSpeed, duration]);

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animateWaves);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animateWaves]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={height}
      className={styles.canvas}
      style={{ height: `${height}px` }}
    />
  );
};

export default SuperpositionCanvas;