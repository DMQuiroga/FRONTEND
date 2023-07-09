import React, { useState } from 'react';

export const ImageContext = React.createContext();

export const ImageProvider = ({ children }) => {
  const [userUpdateImage, setUserUpdateImage] = useState('');

  const updateUserImage = (image) => {
    setUserUpdateImage(image);
  };

  return (
    <ImageContext.Provider value={{ userUpdateImage, updateUserImage }}>
      {children}
    </ImageContext.Provider>
  );
};
