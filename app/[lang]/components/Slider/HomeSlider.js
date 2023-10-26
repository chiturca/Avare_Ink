"use client";
import { useEffect, useState } from "react";
import { storage } from "../../../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

export default function HomeSlider() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `homeImages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };
  const imgeListRef = ref(storage, "homeImages/");
  useEffect(() => {
    listAll(imgeListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  return (
    <div className="max-h-min">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload</button>
      <Carousel {...Settings} showThumbs={false}>
        {imageList.map((url) => {
          return (
            <div
              key={url}
              className="selected"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "40em",
              }}
            >
              <Image
                className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] w-full"
                src={url}
                alt={v4()}
                width={800}
                height={800}
                objectFit="cover"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
