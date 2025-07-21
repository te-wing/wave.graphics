'use client';

import React, { useRef, useEffect, useState, useCallback} from 'react';

interface OscillationCanvasProps {
  initialAmplitude?: number;
  initialFrequency?: number;
}