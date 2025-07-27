'use client';

import styles from './sinwavecanvas.module.scss' // stylesモジュールを再インポート
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

    // --- 描画の基準点を調整 (90度左回転後) ---
    // 円運動のY軸中心
    const circleCenterX = canvas.width / 4; // キャンバスの左1/4に配置
    const circleCenterY = canvas.height / 2; // キャンバスの垂直中央に配置

    // 単振動のX軸中心 (垂直線)
    const shmLineX = canvas.width * 3 / 4; // キャンバスの右3/4に配置
    const shmOriginY = canvas.height / 2; // 単振動の平衡点（垂直中央）

    // 円運動の点の座標 (90度左回転後のX, Yオフセットを適用)
    // 元のX成分が新しいY成分に、元のY成分が新しいX成分に（符号反転）
    // Y軸が下向きに増加するため、cos(angle)が正の時にYが増加するように調整
    const circlePointX = circleCenterX + amplitude * Math.sin(angle); // 新しい水平位置
    const circlePointY = circleCenterY + amplitude * Math.cos(angle); // 新しい垂直位置

    // 単振動の点の座標 (垂直単振動)
    const shmCurrentX = shmLineX; // X座標は固定
    const shmCurrentY = shmOriginY + amplitude * Math.cos(angle); // Y座標は円運動の垂直成分に同期

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- 左側の円運動の描画 ---
    // 円の中心 (赤点)
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    // 円の軌道 (灰色の円)
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, amplitude, 0, Math.PI * 2);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 円運動する点 (紫の点)
    ctx.beginPath();
    ctx.arc(circlePointX, circlePointY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'purple';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 半径の線 (オレンジ)
    ctx.beginPath();
    ctx.moveTo(circleCenterX, circleCenterY);
    ctx.lineTo(circlePointX, circlePointY);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.stroke();

    // --- 円運動と単振動を繋ぐ垂線 (正射影) ---
    // 円の点から単振動の点へ水平に線を引く
    ctx.beginPath();
    ctx.setLineDash([5, 5]); // 破線
    ctx.moveTo(circlePointX, circlePointY);
    ctx.lineTo(shmCurrentX, shmCurrentY); // 単振動のX座標と円運動のY座標
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.setLineDash([]); // 破線をリセット

    // --- 右側の垂直単振動の描画 ---
    // 単振動の平衡点 (中央の赤い点線 - 垂直線)
    ctx.beginPath();
    ctx.setLineDash([5, 5]); // 破線
    ctx.moveTo(shmLineX, 0); // キャンバスの上端から
    ctx.lineTo(shmLineX, canvas.height); // キャンバスの下端まで
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.setLineDash([]); // 破線をリセット

    // 単振動の軌道 (垂直線)
    ctx.beginPath();
    ctx.moveTo(shmLineX, shmOriginY - amplitude - 20); // 平衡点から振幅分上へ
    ctx.lineTo(shmLineX, shmOriginY + amplitude + 20); // 平衡点から振幅分下へ
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 単振動するおもり (青い円)
    ctx.beginPath();
    ctx.arc(shmCurrentX, shmCurrentY, 20, 0, Math.PI * 2);
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
      <div className={styles.controls}> {/* stylesモジュールを使用 */}
        <canvas id="myCanvas" ref={canvasRef} width={400} height={340}></canvas> {/* 幅と高さを入れ替え */}
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
                  className={styles.slider} // stylesモジュールを使用
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
                  className={styles.slider} // stylesモジュールを使用
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
        <div className={styles.buttonList}> {/* stylesモジュールを使用 */}
          <button className={styles.button} onClick={handleReset}> {/* stylesモジュールを使用 */}
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"/></svg>
          </button>
          <button className={styles.button} onClick={handlePlayPause}> {/* stylesモジュールを使用 */}
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default OscillationCanvas;
