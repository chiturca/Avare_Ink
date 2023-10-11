"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import img from "../../assets/img.jpg";

export default function HomeSlider() {
  const Settings = {
    autoPlay: true,
    interval: 10000,
    dots: true,
    infiniteLoop: true,
    speed: 13000,
    autoplay: false,
    cssEase: "linear",
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          rows: 1,
          dots: true,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          rows: 1,
          dots: true,
        },
      },
    ],
  };

  const PhotoList = [
    {
      src: img,
      legend: "Legend 1",
      alt: "alt1",
    },
    {
      src: img,
      legend: "Legend 2",
      alt: "alt2",
    },
    {
      src: img,
      legend: "Legend 3",
      alt: "alt3",
    },
  ];
  return (
    <div>
      <Carousel {...Settings} showThumbs={false}>
        {PhotoList.map((item, index) => {
          return (
            <div key={index}>
              <Image
                className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] w-full"
                src={item.src}
                alt={item.alt}
              />
              <p className="legend">{item.legend}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
