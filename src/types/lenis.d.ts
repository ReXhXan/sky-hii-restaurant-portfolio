declare module '@studio-freight/react-lenis' {
  import * as React from 'react';
  
  export interface LenisProps {
    children: React.ReactNode;
    root?: boolean;
    options?: any;
    className?: string;
  }
  
  export const ReactLenis: React.FC<LenisProps>;
}
