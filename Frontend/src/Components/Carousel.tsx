import React, { useEffect, useRef, useState } from 'react';
import './Carousel.css';

interface CarouselItem {
  title: string;
  num: number;
  img: string;
}

const carouselItems: CarouselItem[] = [
  { title: 'Patience', num: 1, img: 'https://img.freepik.com/premium-vector/woman-won-t-let-you-into-dangerous-place_442409-230.jpg'},
  { title: 'Empathy', num: 2, img: 'https://i.pinimg.com/736x/50/79/cb/5079cb0e19c22259ebe65ed3c3c6ed8a.jpg'},
  { title: 'Ethical Conduct', num: 3, img: 'https://i.pinimg.com/originals/80/06/2a/80062ab425efaaee74f78a09a2a7a591.png'},
  { title: 'Knowledge and Expertise', num: 4, img: 'https://img.freepik.com/free-vector/hand-drawn-doctor-cartoon-illustration_23-2150682053.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1718236800&semt=ais_user'},
  { title: 'Quality of Care', num: 5, img: 'https://cdn.pixabay.com/photo/2020/09/06/09/59/hospital-5548564_1280.png'},
  { title: 'Patient Safety', num: 6, img: 'https://cdn.dribbble.com/users/7043853/screenshots/15704967/media/771f54f9a693d08485dce0239aae94d1.png?resize=400x300&vertical=center'},
  { title: 'Skilled Staff', num: 7, img: 'https://img.pikbest.com/origin/10/10/70/364pIkbEsTzCi.png!w700wp'},
  { title: 'Accessibility', num: 8, img: 'https://thumb.ac-illust.com/76/76ae2d09e0cdbb1a33ed5fd7adc645c9_t.jpeg'},
  { title: 'Cleanliness and Hygiene', num: 9, img: 'https://i.pinimg.com/736x/c9/9e/7c/c99e7ce03d66bc21b7f045fb763a4d98.jpg'},
  { title: 'Comprehensive Services', num: 10, img: 'https://cdni.iconscout.com/illustration/premium/thumb/hospital-4600289-3798636.png?f=webp'}
  // Add more items as needed
];

const Carousel: React.FC = () => {
  const [progress, setProgress] = useState(50);
  const [startX, setStartX] = useState(0);
  const [active, setActive] = useState(0);
  const [isDown, setIsDown] = useState(false);

  const speedWheel = 0.02;
  const speedDrag = -0.1;
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const getZindex = (index: number) => {
    return carouselItems.map((_, i) => (index === i ? carouselItems.length : carouselItems.length - Math.abs(index - i)));
  };

  const displayItems = (item: HTMLElement, index: number) => {
    const zIndex = getZindex(active)[index];
    item.style.setProperty('--zIndex', zIndex.toString());
    item.style.setProperty('--active', ((index - active) / carouselItems.length).toString());
  };

  const animate = () => {
    setProgress(prev => Math.max(0, Math.min(prev, 100)));
    setActive(Math.floor((progress / 100) * (carouselItems.length - 1)));
    itemsRef.current.forEach((item, index) => displayItems(item, index));
  };

  useEffect(() => {
    animate();
  }, [progress]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setProgress(prev => prev + e.deltaY * speedWheel);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return;

      const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      setProgress(prev => prev + (x - startX) * speedDrag);
      setStartX(x);
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      setIsDown(true);
      setStartX(e instanceof MouseEvent ? e.clientX : e.touches[0].clientX);
    };

    const handleMouseUp = () => {
      setIsDown(false);
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleWheel);
      carouselElement.addEventListener('mousemove', handleMouseMove);
      carouselElement.addEventListener('touchmove', handleMouseMove);
      carouselElement.addEventListener('mousedown', handleMouseDown);
      carouselElement.addEventListener('touchstart', handleMouseDown);
      carouselElement.addEventListener('mouseup', handleMouseUp);
      carouselElement.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('wheel', handleWheel);
        carouselElement.removeEventListener('mousemove', handleMouseMove);
        carouselElement.removeEventListener('touchmove', handleMouseMove);
        carouselElement.removeEventListener('mousedown', handleMouseDown);
        carouselElement.removeEventListener('touchstart', handleMouseDown);
        carouselElement.removeEventListener('mouseup', handleMouseUp);
        carouselElement.removeEventListener('touchend', handleMouseUp);
      }
    };
  }, [isDown, startX]);

  return (
    <div className="carou" style={{ height: '500px' }} ref={carouselRef}>
      {carouselItems.map((carousel, index) => (
        <div
          className="carou-item"
          key={index}
          ref={(el) => {
            if (el) itemsRef.current[index] = el;
          }}
        >
          <div className="carou-box">
            <div className="title">{carousel.title}</div>
            <div className="num">{carousel.num}</div>
            <img src={carousel.img} alt={carousel.title} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
