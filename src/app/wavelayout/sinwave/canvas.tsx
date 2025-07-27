'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './sincanvas.module.scss' // stylesモジュールを再インポート

interface OscillationCanvasProps {
  initialAmplitude?: number;
  initialFrequency?: number;
  initialWaveSpeed?: number; // 波の速さの初期値を追加
}

const OscillationCanvas: React.FC<OscillationCanvasProps> = ({
  initialAmplitude = 100,
  initialFrequency = 2.3,
  initialWaveSpeed = 150, // 波の速さの初期値を設定
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [amplitude, setAmplitude] = useState(initialAmplitude);
  const [angularFrequency, setAngularFrequency] = useState(initialFrequency);
  const [waveSpeed, setWaveSpeed] = useState(initialWaveSpeed); // 波の速さの状態を追加
  const [startTime, setStartTime] = useState(Date.now());
  const [isPlaying, setIsPlaying] = useState(true); // アニメーションが再生中かどうかの状態
  const animationFrameIdRef = useRef<number | null>(null); // requestAnimationFrame IDを保持
  const pausedTimeRef = useRef<number>(0); // 一時停止した時点の経過時間（ミリ秒）

  // 基準となる設計サイズを定義
  const designWidth = 1200; // この幅を基準に描画がスケールされます
  const designHeight = 340; // この高さを基準にアスペクト比が維持されます

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

    // 現在のキャンバス幅と設計幅に基づくスケールファクター
    const scaleFactor = canvas.width / designWidth;

    // --- 描画の基準点を調整 (90度左回転後) ---
    // 全ての座標とサイズにscaleFactorを適用
    const scaledAmplitude = amplitude * scaleFactor;
    const scaledPadding = 20 * scaleFactor; // パディングもスケール
    const scaledGap = 250 * scaleFactor; // 円運動と単振動の間の距離もスケール

    // 円運動のY軸中心
    // 円運動を左端に寄せるために、X座標を振幅とパディングに基づいて設定
    const circleCenterX = scaledAmplitude + scaledPadding; // キャンバスの左端から振幅+20pxに配置
    const circleCenterY = canvas.height / 2; // キャンバスの垂直中央に配置

    // 単振動のX軸中心 (垂直線)
    // 円運動からの相対位置で単振動の開始位置を決定
    const shmLineX = circleCenterX + scaledGap; // 円運動の右に250px離して配置
    const shmOriginY = canvas.height / 2; // 単振動の平衡点（垂直中央）

    // 円運動の点の座標 (90度左回転後のX, Yオフセットを適用)
    // 元のX成分が新しいY成分に、元のY成分が新しいX成分に（符号反転）
    // Y軸が下向きに増加するため、cos(angle)が正の時にYが増加するように調整
    const circlePointX = circleCenterX + scaledAmplitude * Math.sin(angle); // 新しい水平位置
    const circlePointY = circleCenterY + scaledAmplitude * Math.cos(angle); // 新しい垂直位置

    // 単振動の点の座標 (垂直単振動)
    const shmCurrentX = shmLineX; // X座標は固定
    const shmCurrentY = shmOriginY + scaledAmplitude * Math.cos(angle); // Y座標は円運動の垂直成分に同期

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- 左側の円運動の描画 ---
    // 円の中心 (赤点)
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, 5 * scaleFactor, 0, Math.PI * 2); // 半径もスケール
    ctx.fillStyle = 'red';
    ctx.fill();

    // 円の軌道 (灰色の円)
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, scaledAmplitude, 0, Math.PI * 2);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2 * scaleFactor; // 線幅もスケール
    ctx.stroke();

    // 円運動する点 (紫の点)
    ctx.beginPath();
    ctx.arc(circlePointX, circlePointY, 10 * scaleFactor, 0, Math.PI * 2); // 半径もスケール
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1 * scaleFactor; // 線幅もスケール
    ctx.stroke();

    // 半径の線
    ctx.beginPath();
    ctx.moveTo(circleCenterX, circleCenterY);
    ctx.lineTo(circlePointX, circlePointY);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2 * scaleFactor; // 線幅もスケール
    ctx.stroke();

    // --- 円運動と単振動を繋ぐ垂線 (正射影) ---
    // 円の点から単振動の点へ水平に線を引く
    ctx.beginPath();
    ctx.setLineDash([5 * scaleFactor, 5 * scaleFactor]); // 破線の間隔もスケール
    ctx.moveTo(circlePointX, circlePointY);
    ctx.lineTo(shmCurrentX, shmCurrentY); // 単振動のX座標と円運動のY座標
    ctx.strokeStyle = 'orange';
    ctx.stroke();
    ctx.setLineDash([]); // 破線をリセット

    // --- 右側の垂直単振動の描画 ---

    // 円の中心を通る水平の赤い点線を追加
    ctx.beginPath();
    ctx.setLineDash([5 * scaleFactor, 5 * scaleFactor]); // 破線の間隔もスケール
    ctx.moveTo(0, circleCenterY); // キャンバスの左端から
    ctx.lineTo(canvas.width, circleCenterY); // キャンバスの右端まで
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.setLineDash([]); // 破線をリセット

    // 単振動の軌道 (垂直線)
    ctx.beginPath();
    ctx.moveTo(shmLineX, shmOriginY - scaledAmplitude - scaledPadding); // 平衡点から振幅分上へ
    ctx.lineTo(shmLineX, shmOriginY + scaledAmplitude + scaledPadding); // 平衡点から振幅分下へ
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2 * scaleFactor; // 線幅もスケール
    ctx.stroke();

    // 単振動するおもり
    ctx.beginPath();
    ctx.arc(shmCurrentX, shmCurrentY, 20 * scaleFactor, 0, Math.PI * 2); // 半径もスケール
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1 * scaleFactor; // 線幅もスケール
    ctx.stroke();

    // --- 正弦波の描画 ---
    ctx.beginPath();
    ctx.strokeStyle = 'orange'; // 波の色
    ctx.lineWidth = 2 * scaleFactor; // 波の太さもスケール

    // waveSpeedの状態変数を使用
    const waveNumber = angularFrequency / waveSpeed; // 波の波数 k = ω / v

    // 波の開始点 (単振動する青い物体と同じX座標から開始)
    ctx.moveTo(shmCurrentX, shmCurrentY);

    // キャンバスの右端まで波を描画
    for (let x = shmCurrentX; x <= canvas.width; x += 1 * scaleFactor) { // xの増分もスケール
      // 波の位相は、時間経過と位置によって変化
      // 位相 = 角度 - k * (x - 波源のx)
      const wavePhase = angle - waveNumber * (x - shmCurrentX);
      const waveY = shmOriginY + scaledAmplitude * Math.cos(wavePhase); // 振幅はscaledAmplitude
      ctx.lineTo(x, waveY);
    }
    ctx.stroke();


    animationFrameIdRef.current = requestAnimationFrame(animate);
  }, [amplitude, angularFrequency, waveSpeed, startTime, isPlaying]); // waveSpeedを依存配列に追加

  // コンポーネントがマウントされた時、またはパラメータが変更された時にリセット
  useEffect(() => {
    setAmplitude(initialAmplitude);
    setAngularFrequency(initialFrequency);
    setWaveSpeed(initialWaveSpeed); // 波の速さもリセット
    setStartTime(Date.now());
    pausedTimeRef.current = 0; // マウント時にリセット

    // useEffectのクリーンアップ関数でアニメーションを確実に停止
    return () => {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
        }
    };
  }, [initialAmplitude, initialFrequency, initialWaveSpeed]); // initialWaveSpeedを依存配列に追加

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

  // キャンバスのサイズを親要素に合わせて動的に設定するuseEffect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      // 親要素の幅を基準にする
      const currentWidth = parent.offsetWidth;
      const aspectRatio = designHeight / designWidth; // 基準となるアスペクト比

      canvas.width = currentWidth;
      canvas.height = currentWidth * aspectRatio; // 幅に合わせて高さを調整し、アスペクト比を維持

      // サイズ変更後にキャンバス内容を再描画
      if (!isPlaying) { // 一時停止中の場合は一度だけ再描画
          animate();
      }
    };

    // 初期設定
    setCanvasDimensions();

    // ウィンドウのリサイズイベントリスナーを追加
    window.addEventListener('resize', setCanvasDimensions);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [animate, isPlaying]); // animate関数とisPlayingの状態を依存配列に追加

  const handleReset = () => {
      setAmplitude(initialAmplitude);
      setAngularFrequency(initialFrequency);
      setWaveSpeed(initialWaveSpeed); // 波の速さもリセット
      setStartTime(Date.now()); // 時間をリセット
      pausedTimeRef.current = 0; // 一時停止時間もリセット
      setIsPlaying(true); // 再生状態に戻す
  };

  return (
    <>
      <div className={styles.controls}> {/* stylesモジュールを使用 */}
        <canvas
          id="myCanvas"
          ref={canvasRef}
          // widthとheight属性は削除し、CSSで100%幅と自動高さを設定
          style={{ width: '100%', height: 'auto', display: 'block' }} // heightをautoにして、JSで設定
        ></canvas>
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
            <tr>
              <td>
                <label htmlFor="waveSpeed">
                  波の速さ
                </label>
              </td>
              <td>：</td>
              <td>
                <input
                  type="range"
                  className={styles.slider} // stylesモジュールを使用
                  id="waveSpeed"
                  min="10"
                  max="500"
                  step="10"
                  value={waveSpeed}
                  onChange={(e) => {
                    setWaveSpeed(parseFloat(e.target.value));
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
        </div>
      </div>
    </>
  );
};

export default OscillationCanvas;