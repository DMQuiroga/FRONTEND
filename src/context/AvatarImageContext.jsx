import React, { useContext, useContext, useState} from 'react';

const AvatarImageContext = React.createContext();

export const AvatarImageProvider = ({children}) =>
const [userUpdateImage, setUserUpdateImage] = useState('')

const updateImage = (image) => {
    setUserUpdateImage(image);
  };

  return (
    <ImageContext.Provider value={{ userUpdateImage, updateImage }}>
      {children}
    </ImageContext.Provider>
  );
