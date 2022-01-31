import React, { useRef, useEffect, useCallback } from 'react';
import render from './render';
import './Home.scss';

const width = 1920;
const height = 1080;
const fps = 30;

const resizeCanvas = (canvasRef) => () => {
  const canvas = canvasRef.current;
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  if (canvas.width  != displayWidth ||
    canvas.height != displayHeight) {
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}

const Home = () => {
  const canvasRef = useRef(null);
  const getContext = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas.getContext('webgl');
  }, [canvasRef.current]);
  const resize = useCallback(resizeCanvas(canvasRef), [canvasRef.current]);
  useEffect(() => {
    const gl = getContext();
    render(gl, fps);
  });
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);
  return (
    <canvas
      className='main-canvas'
      width={width}
      height={height}
      ref={canvasRef} />
  );
};

export default Home;
