import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

interface lightBoxProps {
  image: string;
  name: string;
}

function LightBox({ image, name }: lightBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image
        src={image}
        alt={`${name}'s profile`}
        layout="fill"
        objectFit="cover" // Ensure the image covers the area without stretching
        className="cursor-pointer rounded-2xl " // Tailwind class to round the corners
        onClick={() => setOpen(true)}
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: image }]}
      />
    </>
  );
}

export default LightBox;
