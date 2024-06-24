import React from 'react';
import { quantum } from 'ldrs';

// Register the quantum component
quantum.register();

// Define the props for the PageLoader component
interface PageLoaderProps {
  size?: string;
  speed?: string;
  color?: string;
}

// PageLoader component
const PageLoader: React.FC<PageLoaderProps> = ({ size = "100", speed = "1.75", color = "purple" }) => {
  return <l-quantum size={size} speed={speed} color={color}></l-quantum>;
};

export default PageLoader;
