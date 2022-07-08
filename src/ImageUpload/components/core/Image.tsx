import React from "react";

const Image: React.FC<{
  className?: string;
  src?: string;
  raw?: File;
  alt?: string;
}> = ({ src, raw, alt, className }) => {
  const source = raw ? URL.createObjectURL(raw) : src;

  return <img className={className} src={source} alt={alt} />;
};

export default Image;
