'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface OscillationCanvasProps {
  initialAmplitude?: number;
  initialFrequency?: number;
}

const OscillationCanvas: React.FC<OscillationCanvasProps> = ({
  initialAmplitude = 100,
  initialFrequency = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [amplitude, setAmplitude] = useState(initialAmplitude);
  const [angularFrequency, setAngularFrequency] = useState(initialFrequency);
  const [startTime, setStartTime] = useState(Date.now());

  // アニメーションループのロジックを useCallback でメモ化
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 経過時間 (秒)
    const elapsedTime = (Date.now() - startTime) / 1000;
    const angle = angularFrequency * elapsedTime;

    // 描画の基準点 (前回と同じロジック)
    const circleCenterX = canvas.width / 4;
    const circleCenterY = canvas.height / 2;
    const shmLineY = canvas.height / 2;
    const shmOriginX = canvas.width * 3 / 4;

    // 円周上の点の座標
    const circlePointX = circleCenterX + amplitude * Math.cos(angle);
    const circlePointY = circleCenterY + amplitude * Math.sin(angle);

    // 単振動のX座標
    const shmCurrentX = shmOriginX + amplitude * Math.cos(angle);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- 左側の円運動の描画 ---
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, amplitude, 0, Math.PI * 2);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(circlePointX, circlePointY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'purple';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(circleCenterX, circleCenterY);
    ctx.lineTo(circlePointX, circlePointY);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.stroke();

    // --- 円運動と単振動を繋ぐ線 (正射影) ---
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(circlePointX, circlePointY);
    ctx.lineTo(circlePointX, shmLineY);
    ctx.strokeStyle = 'green';
    ctx.stroke();

    ctx.moveTo(shmCurrentX, shmLineY);
    ctx.lineTo(circlePointX, shmLineY);
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.setLineDash([]);

    // --- 右側の単振動の描画 ---
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(shmOriginX, 0);
    ctx.lineTo(shmOriginX, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(shmOriginX - amplitude - 20, shmLineY);
    ctx.lineTo(shmOriginX + amplitude + 20, shmLineY);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(shmCurrentX, shmLineY, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();

    requestAnimationFrame(animate);
  }, [amplitude, angularFrequency, startTime]); // 依存配列に状態を含める

  // 初回レンダリング時とパラメータ変更時にアニメーションを開始/リセット
  useEffect(() => {
    // スライダーの値をstateに同期
    setAmplitude(initialAmplitude);
    setAngularFrequency(initialFrequency);
    setStartTime(Date.now()); // 時間をリセット

    let animationFrameId: number;
    const render = () => {
      animate();
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId); // クリーンアップ
  }, [animate, initialAmplitude, initialFrequency]); // initialAmplitude, initialFrequencyが変更されたら再実行

  const handleReset = () => {
    setAmplitude(initialAmplitude);
    setAngularFrequency(initialFrequency);
    setStartTime(Date.now());
  };

  return (
    <div>
      <canvas id="myCanvas" ref={canvasRef} width={800} height={400}></canvas>
      <div className="controls">
        <label htmlFor="amplitude">振幅 (円の半径):</label>
        <input
          type="range"
          id="amplitude"
          min="10"
          max="150"
          value={amplitude}
          onChange={(e) => {
            setAmplitude(parseFloat(e.target.value));
            setStartTime(Date.now()); // 値変更時に時間リセット
          }}
        />
        <label htmlFor="frequency">角振動数 (ω):</label>
        <input
          type="range"
          id="frequency"
          min="0.1"
          max="10"
          step="0.1"
          value={angularFrequency}
          onChange={(e) => {
            setAngularFrequency(parseFloat(e.target.value));
            setStartTime(Date.now()); // 値変更時に時間リセット
          }}
        />
        <button onClick={handleReset}>リセット</button>
      </div>
    </div>
  );
};

export default OscillationCanvas;