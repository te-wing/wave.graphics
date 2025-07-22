import React, { useRef, useEffect, useCallback, useState } from 'react';

// コンポーネントのプロパティを定義するインターフェース
interface FreeEndReflectionCanvasProps {
  pulseSpread?: number; // パルス波の広がり (標準偏差)
  pulseAmplitude?: number; // パルス波の振幅
  pulseSpeed?: number; // パルス波の伝播速度 (時間軸上の速度)
  duration?: number; // キャンバスが表現する時間軸の全長
  height?: number; // キャンバスの高さ
  lineColor?: string; // 入射波の線の色 (オレンジの線)
  reflectedLineColor?: string; // 反射波の線の色 (赤い線)
  combinedLineColor?: string; // 合成波の線の色 (緑の線)
  backgroundColor?: string; // キャンバスの背景色
}

// 自由端反射波シミュレーションのReactコンポーネント
const FreeEndReflectionCanvas: React.FC<FreeEndReflectionCanvasProps> = ({
  pulseSpread = 0.1, // パルス波の広がり（デフォルト値）
  pulseAmplitude = 50, // パルス波の振幅（デフォルト値）
  pulseSpeed = 0.2, // パルス波の速度（デフォルト値）
  duration = 0.7, // シミュレーションの総時間（デフォルト値）
  height = 300, // キャンバスの高さ（デフォルト値）
  lineColor = '#ea00ffff', // 入射波の線の色（デフォルト値）
  reflectedLineColor = '#00cc00', // 反射波の線の色（デフォルト値）
  combinedLineColor = '#ffa238', // 合成波の線の色（デフォルト値）
  backgroundColor = 'transparent', // キャンバスの背景色（デフォルト値）
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null); // キャンバス要素への参照
  const animationFrameId = useRef<number | null>(null); // アニメーションフレームID
  const startTime = useRef<number | null>(null); // アニメーション開始時刻

  // 波の位置を管理するState
  const [incidentTimeOffset, setIncidentTimeOffset] = useState(0); // 入射パルスの中心時刻
  const [reflectedTimeOffset, setReflectedTimeOffset] = useState(0); // 反射パルスの中心時刻

  // レスポンシブなキャンバスの幅を管理するState
  const [canvasWidth, setCanvasWidth] = useState(800); // デフォルトの幅

  // キャンバスの幅をマウント時とリサイズ時に更新するuseEffect
  useEffect(() => {
    const updateCanvasWidth = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        // 親要素のクライアント幅に合わせてキャンバス幅を設定
        setCanvasWidth(canvasRef.current.parentElement.clientWidth);
      } else {
        // 親要素がない場合や、refがまだ準備できていない場合のフォールバック
        setCanvasWidth(window.innerWidth * 0.9);
      }
    };

    updateCanvasWidth(); // 初期幅を設定
    window.addEventListener('resize', updateCanvasWidth); // リサイズイベントを監視

    // クリーンアップ関数：コンポーネントのアンマウント時にイベントリスナーを削除
    return () => window.removeEventListener('resize', updateCanvasWidth);
  }, []);

  // 現在のキャンバス寸法に基づいてスケーリング係数と反射点を計算
  // xScaleは「時間」単位（ガウス関数で使用）をピクセルに変換
  const xScale = canvasWidth / duration;
  // reflectionPointXは反射壁のピクセル座標（左から80%の位置）
  const reflectionPointX = canvasWidth * 0.8;
  // reflectionPointTimeは反射壁に対応する「時間」座標
  const reflectionPointTime = reflectionPointX / xScale;

  // 特定の「時間」座標における波の振幅を取得するヘルパー関数
  // これはガウス関数の値を直接計算
  const getWaveAmplitudeAtTime = useCallback((
    targetTime: number, // 「時間」座標（ガウス関数のx軸に相当）
    amp: number, // 振幅
    sigma: number, // 広がり（標準偏差）
    centerTime: number // ガウスパルスの中心
  ): number => {
    // ガウス関数: A * exp(-(t - t0)^2 / (2 * sigma^2))
    const exponent = -Math.pow(targetTime - centerTime, 2) / (2 * Math.pow(sigma, 2));
    return amp * Math.exp(exponent);
  }, []);

  // 波を描画する関数
  const drawWave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスをクリアし、背景色を設定
    ctx.clearRect(0, 0, canvasWidth, height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, height);

    // 波を中央に配置するための垂直オフセットを計算（y=0はキャンバス中央）
    const yOffset = height / 2;
    // yScaleは振幅値をピクセル高さに変換
    const yScale = height / (pulseAmplitude * 2);

    // 中央の水平線を描画
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, yOffset);
    ctx.lineTo(canvasWidth, yOffset);
    ctx.stroke();

    // 反射壁（垂直な破線の青い線）を描画
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]); // 破線パターン
    ctx.beginPath();
    ctx.moveTo(reflectionPointX, 0);
    ctx.lineTo(reflectionPointX, height);
    ctx.stroke();
    ctx.setLineDash([]); // 後続の描画のために破線をリセット

    // --- 反射波のみ（赤い細い線）の描画 ---
    ctx.strokeStyle = reflectedLineColor; // 赤い線
    ctx.lineWidth = 1; // 細い線
    ctx.setLineDash([]); // 実線に設定

    ctx.beginPath();
    // 反射波は反射壁より左側のみに描画
    for (let xPixel = 0; xPixel <= reflectionPointX; xPixel++) {
      const t = xPixel / xScale;
      // 反射波の振幅のみを計算
      const reflectedAmplitude = getWaveAmplitudeAtTime(t, pulseAmplitude, pulseSpread, reflectedTimeOffset);
      const y = yOffset - reflectedAmplitude * 0.45 * yScale; // 係数を0.45に変更
      if (xPixel === 0) {
        ctx.moveTo(xPixel, y);
      } else {
        ctx.lineTo(xPixel, y);
      }
    }
    ctx.stroke();

    // --- 入射波の線の描画（オレンジの細い線） ---
    ctx.strokeStyle = lineColor; // オレンジの線
    ctx.lineWidth = 1; // 細い線

    // 左側の実線部分を描画 (入射波のみ)
    ctx.setLineDash([]); // 実線に設定
    ctx.beginPath();
    for (let xPixel = 0; xPixel <= reflectionPointX; xPixel++) {
      const t = xPixel / xScale;
      // 入射波の振幅のみ
      const incidentAmplitude = getWaveAmplitudeAtTime(t, pulseAmplitude, pulseSpread, incidentTimeOffset);
      const y = yOffset - incidentAmplitude * 0.45 * yScale; // 係数を0.45に変更
      if (xPixel === 0) {
        ctx.moveTo(xPixel, y);
      } else {
        ctx.lineTo(xPixel, y);
      }
    }
    ctx.stroke();

    // 右側の破線部分を描画 (入射波のみ)
    ctx.setLineDash([5, 5]); // 破線に設定
    ctx.beginPath();
    // reflectionPointXでのY座標を計算してmoveToする
    const tAtReflectionPoint = reflectionPointX / xScale;
    const incidentAmplitudeAtReflectionPoint = getWaveAmplitudeAtTime(tAtReflectionPoint, pulseAmplitude, pulseSpread, incidentTimeOffset);
    const yAtReflectionPoint = yOffset - incidentAmplitudeAtReflectionPoint * 0.45 * yScale; // 係数を0.45に変更
    ctx.moveTo(reflectionPointX, yAtReflectionPoint);

    for (let xPixel = Math.floor(reflectionPointX) + 1; xPixel < canvasWidth; xPixel++) {
      const t = xPixel / xScale;
      // 入射波の振幅のみ
      const incidentAmplitude = getWaveAmplitudeAtTime(t, pulseAmplitude, pulseSpread, incidentTimeOffset);
      const y = yOffset - incidentAmplitude * 0.45 * yScale; // 係数を0.45に変更
      ctx.lineTo(xPixel, y);
    }
    ctx.stroke();

    ctx.setLineDash([]); // 念のためリセット

    // --- 合成波（緑の太線）の描画 ---
    ctx.strokeStyle = combinedLineColor; // 緑の線
    ctx.lineWidth = 3; // 太線に設定
    ctx.globalAlpha = 0.4; // 透明度を0.6に設定

    ctx.beginPath();
    // 合成波は反射壁より左側のみに描画
    for (let xPixel = 0; xPixel <= reflectionPointX; xPixel++) {
      const t = xPixel / xScale;
      const incidentAmplitude = getWaveAmplitudeAtTime(t, pulseAmplitude, pulseSpread, incidentTimeOffset);
      const reflectedAmplitude = getWaveAmplitudeAtTime(t, pulseAmplitude, pulseSpread, reflectedTimeOffset);
      // 入射波と反射波の振幅を足し合わせる
      const combinedAmplitude = incidentAmplitude + reflectedAmplitude;
      const y = yOffset - combinedAmplitude * 0.45 * yScale; // 係数を0.45に変更
      if (xPixel === 0) {
        ctx.moveTo(xPixel, y);
      } else {
        ctx.lineTo(xPixel, y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]); // 念のためリセット
    ctx.globalAlpha = 1.0; // 透明度を元に戻す

  }, [
    pulseAmplitude, pulseSpread, duration, incidentTimeOffset, reflectedTimeOffset,
    canvasWidth, height, lineColor, reflectedLineColor, combinedLineColor, backgroundColor,
    getWaveAmplitudeAtTime, reflectionPointX, xScale
  ]);

  // アニメーションループ
  const animate = useCallback((timestamp: DOMHighResTimeStamp) => {
    if (!startTime.current) {
      startTime.current = timestamp;
    }
    const elapsed = timestamp - startTime.current; // アニメーション開始からの経過時間（ミリ秒）
    const currentSimulationTime = (elapsed / 1000); // 秒に変換

    // 入射パルスの中心位置を「時間」単位で計算
    const currentIncidentPulseCenter = currentSimulationTime * pulseSpeed;

    // 入射波のStateを更新
    setIncidentTimeOffset(currentIncidentPulseCenter);

    // 反射波の中心を常に計算
    // 自由端反射の場合、反射波の仮想波源は反射点に対してミラーリングされる
    // 入射パルスの中心がC_inc、反射点がRの場合、
    // 仮想波源はR + (R - C_inc) = 2R - C_inc
    const currentReflectedPulseCenter = 2 * reflectionPointTime - currentIncidentPulseCenter;
    setReflectedTimeOffset(currentReflectedPulseCenter);

    // リセット条件：反射波がキャンバスの左端から完全に離れた場合
    // （つまり、その中心が、その広がりを考慮して0よりかなり左にある場合）
    if (currentReflectedPulseCenter < -pulseSpread * 5) {
      startTime.current = timestamp; // アニメーションタイマーをリセット
      setIncidentTimeOffset(0); // 入射波をリセット
      setReflectedTimeOffset(2 * reflectionPointTime); // 反射波を初期位置にリセット
    }

    drawWave(); // 現在のフレームを描画
    animationFrameId.current = requestAnimationFrame(animate); // 次のフレームを要求
  }, [drawWave, pulseSpeed, duration, reflectionPointTime, pulseSpread]);

  // アニメーションループの開始と停止を行うuseEffect
  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current); // アンマウント時にアニメーションフレームをクリーンアップ
      }
    };
  }, [animate]); // 'animate'関数が変更された場合（依存関係の変更による）にエフェクトを再実行

  return (
    // キャンバスを中央に配置し、スタイルを設定するためのコンテナdiv
    <div className="flex justify-center items-center py-8 bg-gray-100 min-h-screen">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={height}
        // レスポンシブデザインと美観のためにTailwind CSSクラスとインラインスタイルを適用
        style={{
          backgroundColor: backgroundColor,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          width: '100%', // キャンバスが親要素の幅の90%を超えないようにする
          height: `${height}px`, // プロパティから明示的な高さを設定
          display: 'block' // 適切なサイズ設定と余分なスペースの回避を保証
        }}
      />
    </div>
  );
};

export default FreeEndReflectionCanvas;
