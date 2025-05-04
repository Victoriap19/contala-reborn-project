
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'vertical' | 'horizontal';
  withText?: boolean;
  className?: string;
}

export const Logo = ({ size = 'md', variant = 'horizontal', withText = true, className = '' }: LogoProps) => {
  const sizes = {
    sm: { circle: 'w-8 h-8', bubble: 'w-3.5 h-3.5', text: 'text-lg' },
    md: { circle: 'w-10 h-10', bubble: 'w-5 h-5', text: 'text-2xl' },
    lg: { circle: 'w-16 h-16', bubble: 'w-8 h-8', text: 'text-4xl' }
  };

  return (
    <div className={`logo-contala ${variant === 'vertical' ? 'flex-col' : 'flex'} items-center ${className}`}>
      <div className={`logo-circle ${sizes[size].circle} relative`}>
        <div 
          className={`absolute ${sizes[size].bubble} bg-contala-pink rounded-full`}
          style={{ 
            transform: size === 'lg' 
              ? 'translateX(-4px) translateY(4px)' 
              : 'translateX(-2px) translateY(2px)'
          }}
        >
          <div 
            className="absolute bg-contala-pink rounded-full"
            style={{ 
              width: size === 'lg' ? '12px' : size === 'md' ? '8px' : '6px',
              height: size === 'lg' ? '12px' : size === 'md' ? '8px' : '6px',
              bottom: size === 'lg' ? '-4px' : '-2px',
              left: size === 'lg' ? '-4px' : '-2px'
            }}
          ></div>
        </div>
      </div>
      {withText && (
        <div className={`font-bold ${sizes[size].text} ml-2 text-contala-pink`}>
          contala
        </div>
      )}
    </div>
  );
};
