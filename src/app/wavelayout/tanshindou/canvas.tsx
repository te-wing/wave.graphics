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

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 経過時間 (秒)
    const elapsedTime = (Date.now() - startTime) / 1000;

    // 円運動の角度 (ラジアン)
    const angle = angularFrequency * elapsedTime;

    // --- 描画の基準点を調整 ---
    // 上側の円運動の中心
    const circleCenterX = canvas.width / 2; // 中央に配置
    const circleCenterY = canvas.height / 4; // 上の方に配置

    // 下側の単振動の平衡点
    const shmOriginX = canvas.width / 2; // 円運動と同じX座標
    const shmLineY = canvas.height * 3 / 4; // 下の方に配置

    // 円周上の点の座標
    // x = R * cos(θ), y = R * sin(θ)
    // CanvasのY座標は下が正なので、円運動のy成分にマイナスをかけると直感的になります
    const circlePointX = circleCenterX + amplitude * Math.cos(angle);
    const circlePointY = circleCenterY - amplitude * Math.sin(angle); // Y軸反転

    // 単振動のX座標 (円周上の点のX座標をそのまま投影)
    // 単振動の平衡点をshmOriginXとして、そこからの変位を計算します
    const shmCurrentX = shmOriginX + amplitude * Math.cos(angle); // 円運動のX成分を直接利用

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- 上側の円運動の描画 ---

    // 円の中心
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    // 円の軌道
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, amplitude, 0, Math.PI * 2);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 円周上の点
    ctx.beginPath();
    ctx.arc(circlePointX, circlePointY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'purple';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 中心から円周上の点への線 (半径)
    ctx.beginPath();
    ctx.moveTo(circleCenterX, circleCenterY);
    ctx.lineTo(circlePointX, circlePointY);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.stroke();

    // --- 円運動と単振動を繋ぐ垂線 (正射影) ---

    // 円周上の点から単振動のおもりへ下ろす垂直な点線
    ctx.beginPath();
    ctx.setLineDash([5, 5]); // 点線
    ctx.moveTo(circlePointX, circlePointY);
    ctx.lineTo(shmCurrentX, shmLineY); // 円周上のX座標から単振動のY座標まで
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.setLineDash([]); // 点線をリセット

    // --- 下側の左右単振動の描画 ---

    // 単振動の平衡点 (中央の赤い点線)
    ctx.beginPath();
    ctx.setLineDash([5, 5]); // 点線
    ctx.moveTo(shmOriginX, shmLineY - amplitude - 20); // 平衡点の少し上から
    ctx.lineTo(shmOriginX, shmLineY + amplitude + 20); // 平衡点の少し下まで
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.setLineDash([]); // 点線をリセット

    // 単振動の軌道 (水平線)
    ctx.beginPath();
    ctx.moveTo(shmOriginX - amplitude - 20, shmLineY); // 振幅の範囲より少し長く
    ctx.lineTo(shmOriginX + amplitude + 20, shmLineY); // 振幅の範囲より少し長く
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 単振動するおもり
    ctx.beginPath();
    ctx.arc(shmCurrentX, shmLineY, 20, 0, Math.PI * 2); // 半径20のおもり
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();

    requestAnimationFrame(animate);
  }, [amplitude, angularFrequency, startTime]);

  useEffect(() => {
    setAmplitude(initialAmplitude);
    setAngularFrequency(initialFrequency);
    setStartTime(Date.now());

    let animationFrameId: number;
    const render = () => {
      animate();
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [animate, initialAmplitude, initialFrequency]);

  const handleReset = () => {
    setAmplitude(initialAmplitude);
    setAngularFrequency(initialFrequency);
    setStartTime(Date.now());
  };

  return (
    <div>
      <canvas id="myCanvas" ref={canvasRef} width={800} height={600}></canvas> {/* 高さも調整すると良いかもしれません */}
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
            setStartTime(Date.now());
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
            setStartTime(Date.now());
          }}
        />
        <button onClick={handleReset}>リセット</button>
      </div>
    </div>
  );
};

export default OscillationCanvas;