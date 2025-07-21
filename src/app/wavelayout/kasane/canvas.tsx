"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import styles from './superpositioncanvas.module.scss';

interface SuperpositionCanvasProps {
  waveSpread?: number;
  waveAmplitudeLeft?: number; // 左の波の振幅 (ピクセル単位)
  waveAmplitudeRight?: number; // 右の波の振幅 (ピクセル単位)
  waveSpeed?: number;
  duration?: number;
  sampleRate?: number;
  height?: number;
  lineColor?: string;
  backgroundColor?: string;
  dotColor?: string;
  dotRadius?: number;
  dotDensity?: number;
  showIndividualWaves?: boolean;
}

const SuperpositionCanvas: React.FC<SuperpositionCanvasProps> = ({
  waveSpread = 0.05,
  waveAmplitudeLeft = 50, // 左の波のデフォルト振幅 (50px)
  waveAmplitudeRight = 50, // 右の波のデフォルト振幅 (50px)
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

  const [timeOffsetLeftWave, setTimeOffsetLeftWave] = useState(0);
  const [timeOffsetRightWave, setTimeOffsetRightWave] = useState(0);
  const [canvasWidth] = useState(800);

  const generateGaussianWaveData = useCallback((
    amp: number, // このampはピクセル値として扱われる
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
      const value = amp * Math.exp(exponent); // ampを直接使用
      data.push({
        x: t,
        y: value,
      });
    }
    return data;
  }, []);

  const getGaussianWaveAmplitudeAtTime = useCallback((
    targetTime: number,
    amp: number, // このampはピクセル値として扱われる
    sigma: number,
    centerTime: number
  ): number => {
    const exponent = -Math.pow(targetTime - centerTime, 2) / (2 * Math.pow(sigma, 2));
    return amp * Math.exp(exponent); // ampを直接使用
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
    // waveAmplitudeLeft/Right が直接ピクセル値として扱われるため、yScaleは不要、または1とする
    // ただし、y座標の反転とY軸方向の表示調整のための0.8は残す
    // const yScale = 1; // これで直接ピクセル値として機能する
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
      const t = xPixel / xScale;

      const amplitudeLeft = getGaussianWaveAmplitudeAtTime(t, waveAmplitudeLeft, waveSpread, timeOffsetLeftWave);
      const amplitudeRight = getGaussianWaveAmplitudeAtTime(duration - t, waveAmplitudeRight, waveSpread, timeOffsetRightWave);

      const combinedAmplitude = amplitudeLeft + amplitudeRight;

      // yCenterから、算出された振幅分を引く（Y軸は下方向が正のため）
      // 0.8をかけることで、波が画面内に収まるように調整
      const dotY = yCenter - combinedAmplitude * 0.8;

      ctx.beginPath();
      ctx.arc(xPixel, dotY, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (showIndividualWaves) {
      // 左から来る波の描画
      ctx.strokeStyle = 'rgba(255, 165, 0, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let xPixel = 0; xPixel < canvasWidth; xPixel++) {
        const t = xPixel / xScale;
        const amplitude = getGaussianWaveAmplitudeAtTime(t, waveAmplitudeLeft, waveSpread, timeOffsetLeftWave);
        const y = yCenter - amplitude * 0.8; // 0.8をかける
        if (xPixel === 0) {
          ctx.moveTo(xPixel, y);
        } else {
          ctx.lineTo(xPixel, y);
        }
      }
      ctx.stroke();

      // 右から来る波の描画
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let xPixel = 0; xPixel < canvasWidth; xPixel++) {
        const t = xPixel / xScale;
        const amplitude = getGaussianWaveAmplitudeAtTime(duration - t, waveAmplitudeRight, waveSpread, timeOffsetRightWave);
        const y = yCenter - amplitude * 0.8; // 0.8をかける
        if (xPixel === 0) {
          ctx.moveTo(xPixel, y);
        } else {
          ctx.lineTo(xPixel, y);
        }
      }
      ctx.stroke();
    }

    // 合成波の線を描画
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let xPixel = 0; xPixel < canvasWidth; xPixel++) {
      const t = xPixel / xScale;
      const amplitudeLeft = getGaussianWaveAmplitudeAtTime(t, waveAmplitudeLeft, waveSpread, timeOffsetLeftWave);
      const amplitudeRight = getGaussianWaveAmplitudeAtTime(duration - t, waveAmplitudeRight, waveSpread, timeOffsetRightWave);
      const combinedAmplitude = amplitudeLeft + amplitudeRight;
      const y = yCenter - combinedAmplitude * 0.8; // 0.8をかける
      if (xPixel === 0) {
        ctx.moveTo(xPixel, y);
      } else {
        ctx.lineTo(xPixel, y);
      }
    }
    ctx.stroke();

  }, [waveSpread, duration, timeOffsetLeftWave, timeOffsetRightWave, canvasWidth, height, lineColor, backgroundColor, dotColor, dotRadius, dotDensity, getGaussianWaveAmplitudeAtTime, showIndividualWaves, waveAmplitudeLeft, waveAmplitudeRight]);

  const animateWaves = useCallback((timestamp: DOMHighResTimeStamp) => {
    if (!startTime.current) {
      startTime.current = timestamp;
    }
    const elapsed = timestamp - startTime.current;

    const newOffsetLeft = (elapsed / 1000) * waveSpeed * duration;
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