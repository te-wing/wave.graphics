"use client";

import React, { useRef, useEffect, useCallback, useState } from 'react';
import styles from './pulsecanvas.module.scss';

interface PulseWaveCanvasProps {
  pulseSpread?: number;
  pulseAmplitude?: number;
  pulseSpeed?: number;
  duration?: number;
  sampleRate?: number;
  // width?: number;
  height?: number;
  lineColor?: string;
  backgroundColor?: string;
  dotColor?: string;      // 追加: 点の色
  dotRadius?: number;     // 追加: 点の半径
  dotDensity?: number;    // 追加: 点の密度 (例: 10 なら10ピクセルごとに点)
}

const PulseWaveCanvas: React.FC<PulseWaveCanvasProps> = ({
  pulseSpread = 0.05,
  pulseAmplitude = 50,
  pulseSpeed = 0.2,
  duration = 0.7,
  sampleRate = 1000,
  // width = 800,
  height = 300,
  lineColor = 'orange',
  backgroundColor = 'transparent',
  dotColor = 'red',
  dotRadius = 4,          // 点の半径
  dotDensity = 20,        // 20ピクセルごとに点を打つ
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  const [timeOffset, setTimeOffset] = useState(0);
  const [canvasWidth] = useState(800); // 内部描画用の幅をstateで管理

  // ガウス関数に基づく単一パルス波のデータを生成する関数 (変更なし)
  const generateSinglePulseData = useCallback((
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
  // generateSinglePulseDataが返すデータを使って補間することもできるが、
  // ここでは直接ガウス関数を呼び出すことで正確な値を求める
  const getWaveAmplitudeAtTime = useCallback((
    targetTime: number,
    amp: number,
    sigma: number,
    centerTime: number
  ): number => {
    const exponent = -Math.pow(targetTime - centerTime, 2) / (2 * Math.pow(sigma, 2));
    return amp * Math.exp(exponent);
  }, []);


  const drawWave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, height);

    // 波形データ生成
    const waveData = generateSinglePulseData(pulseAmplitude, pulseSpread, duration, sampleRate, timeOffset);

    const xScale = canvasWidth / duration;
    const yScale = height / (pulseAmplitude * 2);
    const yOffset = height / 2; // 中央線

    // --- 波形の描画 (前回のまま) ---
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;

    waveData.forEach((point, index) => {
      const x = point.x * xScale;
      const y = yOffset - point.y * 0.8 * yScale; // 振幅を少し小さくして表示

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // 中央の線
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, yOffset);
    ctx.lineTo(canvasWidth, yOffset);
    ctx.stroke();

    // --- 点の描画 (ここから追加/変更) ---
    ctx.fillStyle = dotColor;

    // キャンバスの幅にわたって一定間隔で点を配置
    for (let xPixel = dotDensity; xPixel < canvasWidth; xPixel += dotDensity) {
      // ピクセル座標を時間座標に変換
      const t = xPixel / xScale;

      // その時間における波の振幅を取得
      // 注意: generateSinglePulseData は全範囲のデータを返すので、
      // ここでは直接 getWaveAmplitudeAtTime を使って計算するのが効率的
      const currentAmplitude = getWaveAmplitudeAtTime(t, pulseAmplitude, pulseSpread, timeOffset);

      // 点のY座標を計算
      const dotY = yOffset - currentAmplitude * 0.8 * yScale;

      // 点を描画
      ctx.beginPath();
      ctx.arc(xPixel, dotY, dotRadius, 0, Math.PI * 2); // x, y, 半径, 開始角, 終了角
      ctx.fill();
    }

  }, [pulseAmplitude, pulseSpread, duration, sampleRate, timeOffset, canvasWidth, height, lineColor, backgroundColor, dotColor, dotRadius, dotDensity, generateSinglePulseData, getWaveAmplitudeAtTime]); // 依存配列に新しいpropsと関数を追加

  // アニメーションループ (変更なし)
  const animate = useCallback((timestamp: DOMHighResTimeStamp) => {
    if (!startTime.current) {
      startTime.current = timestamp;
    }
    const elapsed = timestamp - startTime.current;

    const newOffset = (elapsed / 1000) * pulseSpeed * duration;

    if (newOffset > duration * 1.5) {
      startTime.current = timestamp;
      setTimeOffset(0);
    } else {
      setTimeOffset(newOffset);
    }

    drawWave();
    animationFrameId.current = requestAnimationFrame(animate);
  }, [drawWave, pulseSpeed, duration]);

  // useEffect (変更なし)
  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={height}
      className={styles.canvas}
      style={{height: `${height}px`}}
    />
  );
};

export default PulseWaveCanvas;