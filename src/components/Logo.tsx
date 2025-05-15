import React from 'react';
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'vertical' | 'horizontal';
  withText?: boolean;
  className?: string;
}
export const Logo = ({
  size = 'md',
  variant = 'horizontal',
  withText = true,
  className = ''
}: LogoProps) => {
  const sizes = {
    sm: {
      logo: 'h-8',
      text: 'text-lg'
    },
    md: {
      logo: 'h-10',
      text: 'text-2xl'
    },
    lg: {
      logo: 'h-16',
      text: 'text-4xl'
    }
  };
  return <div className={`flex ${variant === 'vertical' ? 'flex-col' : 'flex'} items-center ${className}`}>
      
      {withText && <div className={`font-bold ${sizes[size].text} ml-2 text-contala-darkpink`}>
          {/* Text is now part of the SVG, so this can be empty or used for additional text */}
        </div>}
    </div>;
};