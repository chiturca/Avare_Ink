"use client";
import { CardList } from "./helpers/CardList";
import Card from "./components/ui/Card";
import Slider from "./components/Slider/HomeSlider";
import { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function Home() {
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `homeImages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded");
    });
  };
  return (
    <div className="justify-center">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload</button>
      <Slider />
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
      </div>
    </div>
  );
}
