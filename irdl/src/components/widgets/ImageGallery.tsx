import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import * as ReactImageGallery from 'react-image-gallery';


interface Props {
  width?: number | string,
  height?: number | string,
};

const ImageGallery: React.FC<Props> = (props: Props) => {
  const images = [
    {
      original: 'https://cdn.pixabay.com/photo/2020/03/09/23/04/plum-4917370_960_720.jpg',
      thumbnail: 'https://cdn.pixabay.com/photo/2020/03/09/23/04/plum-4917370_960_720.jpg',
    },
    {
      original: 'https://cdn.pixabay.com/photo/2020/02/21/18/43/kosmeen-4868375_960_720.jpg',
      thumbnail: 'https://cdn.pixabay.com/photo/2020/02/21/18/43/kosmeen-4868375_960_720.jpg',
    },
    {
      original: 'https://cdn.pixabay.com/photo/2016/04/16/12/50/chrysanthemum-1332994_960_720.jpg',
      thumbnail: 'https://cdn.pixabay.com/photo/2016/04/16/12/50/chrysanthemum-1332994_960_720.jpg',
    },
  ];
  return (
    <div style={{width: props.width ? props.width : 600, height: props.height ? props.height : 400, margin: "0 auto",}}>
    <ReactImageGallery.default items={images as any} />
    </div>
  )
}

export default ImageGallery;
