
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

  // Use the full logo if withText is true, otherwise use just the icon
  const logoSrc = withText ? "/lovable-uploads/f7fd1cf0-a461-41be-bf01-3b4928519507.png" : "/lovable-uploads/f7d2f976-6780-4cef-b78b-e23d4ed4088c.png";

  return (
    <div className={`flex ${variant === 'vertical' ? 'flex-col' : 'flex'} items-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="Contala Logo" 
        className={`${sizes[size].logo} object-contain`} 
      />
    </div>
  );
};
