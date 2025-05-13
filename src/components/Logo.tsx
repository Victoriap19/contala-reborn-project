
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'vertical' | 'horizontal';
  withText?: boolean;
  className?: string;
}

export const Logo = ({ size = 'md', variant = 'horizontal', withText = true, className = '' }: LogoProps) => {
  const sizes = {
    sm: { circle: 'w-8 h-8', text: 'text-lg' },
    md: { circle: 'w-10 h-10', text: 'text-2xl' },
    lg: { circle: 'w-16 h-16', text: 'text-4xl' }
  };

  return (
    <div className={`flex ${variant === 'vertical' ? 'flex-col' : 'flex'} items-center ${className}`}>
      <div className={`${sizes[size].circle} relative bg-contala-green rounded-md`}>
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold">C</span>
      </div>
      {withText && (
        <div className={`font-bold ${sizes[size].text} ml-2 text-contala-charcoal`}>
          <span>contala</span>
        </div>
      )}
    </div>
  );
};
