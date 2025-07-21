'use client';

import styles from './tanshindoucanvas.module.scss'
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
  const [isPlaying, setIsPlaying] = useState(true); // アニメーションが再生中かどうかの状態
  const animationFrameIdRef = useRef<number | null>(null); // requestAnimationFrame IDを保持
  const pausedTimeRef = useRef<number>(0); // 一時停止した時点の経過時間（ミリ秒）

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // アニメーションが一時停止中の場合は描画ループを停止
    if (!isPlaying) {
        animationFrameIdRef.current = null;
        return;
    }

    // 経過時間 (秒) の計算
    const currentElapsedTime = (Date.now() - startTime + pausedTimeRef.current) / 1000;
    const angle = angularFrequency * currentElapsedTime;

    // --- 描画の基準点を調整 ---
    const circleCenterX = canvas.width / 2;
    const circleCenterY = canvas.height / 3;
    const shmOriginX = canvas.width / 2;
    const shmLineY = canvas.height * 2 / 3;

    const circlePointX = circleCenterX + amplitude * Math.cos(angle);
    const circlePointY = circleCenterY - amplitude * Math.sin(angle);

    const shmCurrentX = shmOriginX + amplitude * Math.cos(angle);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- 上側の円運動の描画 ---
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

    // --- 円運動と単振動を繋ぐ垂線 (正射影) ---
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(circlePointX, circlePointY);
    ctx.lineTo(shmCurrentX, shmLineY);
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.setLineDash([]);

    // --- 下側の左右単振動の描画 ---
    // 単振動の平衡点 (中央の赤い点線)
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(shmOriginX, 0);
    ctx.lineTo(shmOriginX, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.setLineDash([]);

    // 単振動の軌道 (水平線)
    ctx.beginPath();
    ctx.moveTo(shmOriginX - amplitude - 20, shmLineY);
    ctx.lineTo(shmOriginX + amplitude + 20, shmLineY);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 単振動するおもり
    ctx.beginPath();
    ctx.arc(shmCurrentX, shmLineY, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();

    animationFrameIdRef.current = requestAnimationFrame(animate);
  }, [amplitude, angularFrequency, startTime, isPlaying]); // isPlayingを依存配列に追加

  // コンポーネントがマウントされた時、またはパラメータが変更された時にリセット
  useEffect(() => {
    setAmplitude(initialAmplitude);
    setAngularFrequency(initialFrequency);
    // startTimeとpausedTimeRefはhandlePlayPauseで適切に設定される
    // 初期状態は再生なので、ここでは特別startTimeをリセットしない
    // mounted時に一度だけリセットすることで、初回レンダリング時の不自然な動きを避ける
    setStartTime(Date.now());
    pausedTimeRef.current = 0; // マウント時にリセット

    // useEffectのクリーンアップ関数でアニメーションを確実に停止
    return () => {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
        }
    };
  }, [initialAmplitude, initialFrequency]);

  // isPlayingの状態が変化したときにアニメーションを開始/停止する専用のuseEffect
  useEffect(() => {
      if (isPlaying) {
          // 再生時にはアニメーションループを開始
          animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
          // 一時停止時にはアニメーションループを停止
          if (animationFrameIdRef.current) {
              cancelAnimationFrame(animationFrameIdRef.current);
              animationFrameIdRef.current = null;
          }
      }
      // cleanup function for this useEffect specific to animation frame management
      return () => {
        if(animationFrameIdRef.current){
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
      }
  }, [isPlaying, animate]);


  const handlePlayPause = () => {
      setIsPlaying(prevIsPlaying => {
          if (prevIsPlaying) {
              // 現在再生中であれば一時停止
              // 経過時間をpausedTimeRefに加算
              pausedTimeRef.current = pausedTimeRef.current + (Date.now() - startTime);
          } else {
              // 現在一時停止中であれば再生再開
              // 新しいstartTimeを設定することで、一時停止した時点からの時間を継続
              setStartTime(Date.now());
          }
          return !prevIsPlaying; // isPlayingの状態を反転
      });
  };

  const handleReset = () => {
      setAmplitude(initialAmplitude);
      setAngularFrequency(initialFrequency);
      setStartTime(Date.now()); // 時間をリセット
      pausedTimeRef.current = 0; // 一時停止時間もリセット
      setIsPlaying(true); // 再生状態に戻す
  };

  return (
    <>
      <canvas id="myCanvas" ref={canvasRef} width={800} height={490}></canvas>
      <div className={styles.controls}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="amplitude">
                  振幅（円の半径）
                </label>
              </td>
              <td>：</td>
              <td>
                <input
                  type="range"
                  className={styles.slider}
                  id="amplitude"
                  min="10"
                  max="150"
                  value={amplitude}
                  onChange={(e) => {
                    setAmplitude(parseFloat(e.target.value));
                    // スライダーを動かした時に、isPlayingがfalseならstartTimeをリセットしない
                    // isPlayingがtrueなら、一時停止したときのように時間を記録してリセット
                    if (isPlaying) {
                      pausedTimeRef.current = pausedTimeRef.current + (Date.now() - startTime);
                      setStartTime(Date.now());
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="frequency">
                  角振動数
                </label>
              </td>
              <td>：</td>
              <td>
                <input
                  type="range"
                  className={styles.slider}
                  id="frequency"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={angularFrequency}
                  onChange={(e) => {
                    setAngularFrequency(parseFloat(e.target.value));
                    if (isPlaying) {
                      pausedTimeRef.current = pausedTimeRef.current + (Date.now() - startTime);
                      setStartTime(Date.now());
                    }
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleReset}>リセット</button>
        <button onClick={handlePlayPause}>
          {isPlaying ? '一時停止' : '再生'}
        </button>
      </div>
    </>
  );
};

export default OscillationCanvas;