'use client';

import { useEffect, useState } from 'react';

interface PartyAnimationsProps {
  isActive: boolean;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'star' | 'diamond' | 'hexagon';

export default function PartyAnimations({ isActive }: PartyAnimationsProps) {
  const [shapes, setShapes] = useState<Array<{
    id: number;
    startY: number;
    startX: number;
    path: 'top' | 'left' | 'right';
    rotation: number;
    shape: ShapeType;
    size: number;
    delay: number;
  }>>([]);

  const yellowColors = ['#FFD700', '#FFC107', '#FFEB3B', '#FFB300', '#FFA000'];
  const shapeTypes: ShapeType[] = ['circle', 'square', 'triangle', 'star', 'diamond', 'hexagon'];

  useEffect(() => {
    if (!isActive) {
      setShapes([]);
      return;
    }

    const createShape = () => {
      const path = Math.random() > 0.5 ? 'top' : (Math.random() > 0.5 ? 'left' : 'right');
      
      let startX, startY;
      
      if (path === 'top') {
        // From top, stay in upper 30% of screen to avoid answer area
        startX = Math.random() * 100;
        startY = -10;
      } else if (path === 'left') {
        // From left, stay in upper portion
        startX = -10;
        startY = Math.random() * 30;
      } else {
        // From right, stay in upper portion
        startX = 110;
        startY = Math.random() * 30;
      }
      
      const newShape = {
        id: Date.now() + Math.random(),
        startX,
        startY,
        path,
        rotation: Math.random() * 360,
        shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        size: 20 + Math.random() * 20, // 20-40px
        delay: Math.random() * 1,
      };
      
      setShapes(prev => [...prev.slice(-4), newShape]);
    };

    // Create shapes every 3-5 seconds
    const interval = setInterval(createShape, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  const renderShape = (shape: ShapeType, size: number, color: string) => {
    switch (shape) {
      case 'circle':
        return (
          <div 
            className="rounded-full"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color 
            }} 
          />
        );
      case 'square':
        return (
          <div 
            className="rounded-sm"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color 
            }} 
          />
        );
      case 'triangle':
        return (
          <div 
            style={{ 
              width: 0, 
              height: 0, 
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }} 
          />
        );
      case 'star':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={color}
            />
          </svg>
        );
      case 'diamond':
        return (
          <div 
            className="rotate-45"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color 
            }} 
          />
        );
      case 'hexagon':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <path
              d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5Z"
              fill={color}
            />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape) => {
        const color = yellowColors[Math.floor(Math.random() * yellowColors.length)];
        
        return (
          <div
            key={shape.id}
            className={`absolute animate-shape-${shape.path}`}
            style={{
              left: `${shape.startX}%`,
              top: `${shape.startY}%`,
              transform: `rotate(${shape.rotation}deg)`,
              animationDelay: `${shape.delay}s`,
              opacity: 0.7,
            }}
          >
            {renderShape(shape.shape, shape.size, color)}
          </div>
        );
      })}
    </div>
  );
}
