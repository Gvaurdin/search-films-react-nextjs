import { useState, useEffect } from 'react';

export default function BackgroundSlider() {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex % 8) + 1);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const backgroundImage = `/images/background-${index}.jpg`;

  return <>
    <div
      className='background'
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
    </div>
  </>
}

