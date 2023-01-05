import React from 'react';

const imgTypes = ['webp', 'jpeg', 'jpg', 'png', 'svg+xml'];

const useImageUpload = () => {
  const [error, setError] = React.useState<string | null>();
  const [imagefile, setImageFile] = React.useState<File>();
  const [imageDataURI, setImageDataURI] = React.useState<string>();
  const [imageUrl, setImageUrl] = React.useState<string>();

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (!e.target.files![0]) {
      return setError('please upload an image');
    }

    const fileType = e.target.files![0].type.split('/')[1];

    if (!imgTypes.includes(fileType!)) {
      return setError('please upload an image');
    }

    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageDataURI(onLoadEvent.target?.result as string);
    };

    reader.readAsDataURL(e.target.files![0]);

    setImageFile(e.target.files![0]);
    const imageUrl = URL.createObjectURL(e.target.files![0]);
    setImageUrl(imageUrl);
  };

  return {
    error,
    imagefile,
    imageUrl,
    uploadFile,
    imageDataURI,
  };
};

export default useImageUpload;
