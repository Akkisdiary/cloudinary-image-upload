import React from 'react';

interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  raw?: File;
}

const Image: React.FC<IImageProps> = ({ src, raw, ...props }) => {
  const source = raw ? URL.createObjectURL(raw) : src;
  return <img src={source} data-testid="raw-img" {...props} />;
};

export default Image;
