import { useState, useEffect, useRef } from 'react';

const useUpload = () => {
  const [imgFile, setImgFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [inputKey, setInputKey] = useState('');

  const imgFilePickedRef = useRef();

  useEffect(() => {
    if (!imgFile) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(imgFile);
  }, [imgFile]);

  const imgPickedHandler = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      const pickedFile = e.target.files[0];
      setImgFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const pickImgHandler = () => {
    imgFilePickedRef.current.click();
  };

  const resetFile = () => {
    setResetDone(true);
    setPreviewUrl();
    setImgFile();
    const randomKey = Date.now().toString();
    setInputKey(randomKey);
  };

  return {
    imgFile,
    previewUrl,
    setPreviewUrl,
    imgFilePickedRef,
    imgFileIsValid: isValid,
    imgPickedHandler,
    pickImgHandler,
    resetImgFile: resetFile,
    resetImgDone: resetDone,
    inputKey,
  };
};

export default useUpload;
