import React, { useState, useEffect, useRef } from 'react';
import useWindowSize from './WindowSize';


export default function Canvas(props) {
  console.log(`Canvas..`);
  const [drawing, setDrawing] = useState(false);
  const [[width, height], setWidthHeight] = useState([window.innerWidth, window.innerHeight]);
  const canvasRef = useRef({ offsetLeft: 0, offsetTop: 0 });
  const ctx = useRef();

  useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d');
  }, []);
  
  const [windowWidth, windowHeight] = useWindowSize(() => {
    setWidthHeight([window.innerWidth, window.innerHeight]);
  });

  function handleMouseMove(e) {
    // actual coordinates
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    ];
    if (drawing) {
      ctx.current.lineTo(...coords);
      ctx.current.stroke();
    }
    if (props.handleMouseMove) {
      props.handleMouseMove(...coords);
    }
  }
  function startDrawing(e) {
    ctx.current.lineJoin = 'round';
    ctx.current.lineCap = 'round';
    ctx.current.lineWidth = 10;
    ctx.current.strokeStyle = props.color;
    ctx.current.beginPath();
    // actual coordinates
    ctx.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    );
    setDrawing(true);
  }
  function stopDrawing() {
    ctx.current.closePath();
    setDrawing(false);
  }

  return (
    <React.Fragment>
      <canvas
        ref={canvasRef}
        width={props.width || width}
        height={props.height || height}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={handleMouseMove}
      />
    </React.Fragment>
  );

}