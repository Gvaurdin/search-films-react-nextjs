import { useState, useEffect } from 'react';

export default function BackgroundSlider() {
  const [index, setIndex] = useState(1);
  const [loadedImage, setLoadedImage] = useState(null);

  useEffect(() => {
    // функция для предварительной загрузки изображения
    const preloadImage = (index) => {
      const img = new Image();
      img.src = `/images/background-${index}.jpg`;
      img.onload = () => setLoadedImage(img.src);
    };

    // загрузка текущего изображения
    preloadImage(index);

    const interval = setInterval(() => {
      const nextIndex = (index % 8) + 1;
      setIndex(nextIndex);
      preloadImage(nextIndex); // предварительная загрузка следующего изображения
    }, 15000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${loadedImage})`,
        transition: 'background-image 1s ease-in-out' // плавный переход
      }}
    >
    </div>
  );
}

