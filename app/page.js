"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { CardList } from "./helpers/CardList";
import Card from "./components/ui/Card";
import img from "./assets/img.jpg";

export default function Home() {
  const fSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    autoplay: false,
    cssEase: "linear",
    autoplaySpeed: 2500,
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

  return (
    <div className="pt-32 pb-16 lg:pt-0 lg:pb-0 justify-center">
      <div>
        <Carousel {...fSettings} showThumbs={false}>
          <div>
            <Image
              className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] w-full"
              src={img}
              alt="Test"
            />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <Image
              className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] w-full"
              src={img}
              alt="Test"
            />
            <p className="legend">Legend 2</p>
          </div>
        </Carousel>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left lg:pt-0">
        {CardList.map((item, index) => {
          return (
            <Card
              key={index}
              href={item.href}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
}
