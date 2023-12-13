"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { storage } from "../../../../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "../ui/Button";

export default function DesignSlider() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const { data: session } = useSession();

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `designImages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  const imgeListRef = ref(storage, "designImages/");
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

  const deleteImage = (url) => {
    const imageRef = ref(storage, url);
    deleteObject(imageRef)
      .then(() => {
        setImageList((prev) => prev.filter((imgUrl) => imgUrl !== url));
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

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
      {session && session.user && session.user.role === "admin" ? (
        <div className="pb-4">
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
            className="opacity-100 px-5 py-1.5 mx-2 bg-sky-200 text-sky-900 font-medium text-xl text-shadow-[0 0 50px #bae6fd] 
             rounded-full shadow-md hover:bg-sky-900 hover:text-sky-200 hover:shadow-lg"
          />
          <Button onClick={uploadImage} name="Upload" />
        </div>
      ) : (
        ""
      )}

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
                priority={true}
              />
              {session && session.user && session.user.role === "admin" && (
                <button
                  className="absolute top-2 w-[20%] px-7 py-2.5 bg-sky-200 text-sky-900 font-medium text-xl text-shadow-[0 0 50px #bae6fd] 
                rounded-full shadow-md ease-in duration-300 hover:bg-sky-900 hover:text-sky-200 hover:shadow-lg hover:scale-110"
                  onClick={() => deleteImage(url)}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
