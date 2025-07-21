'use client';

import React, { useRef, useEffect, useState, useCallback} from 'react';

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

  // アニメーションループのロジックをuseCallbackでメモ化
  
}