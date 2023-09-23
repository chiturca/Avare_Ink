// "use client";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Image from "next/image";
// import { CardList } from "./helpers/CardList";
// import Card from "./components/ui/Card";
// import img from "./assets/img.jpg";
import { getDictionary } from "./dictionaries";

export default async function Home({ params: { lang } }) {
  const { page } = await getDictionary(lang);

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
    <div className="justify-center">
      <h1 className="text-3xl font-bold">{page.home.title}</h1>
      <p className="text-gray-500">{page.home.description}</p>
      {/* <div>
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

      <div className="grid text-center lg:grid-cols-4 lg:text-left lg:pt-0">
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
      </div> */}
    </div>
  );
}
