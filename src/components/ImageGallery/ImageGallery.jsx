import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { ImageGalleryUl } from "./ImageGallery-style"

import { nanoid } from 'nanoid';



export const ImageGallery = ({ images, }) => {
    return (
        <>
            <ImageGalleryUl >
                {images.map(image => <ImageGalleryItem key={nanoid()} webformatURL={image.webformatURL} largeImageURL={image.largeImageURL} />)}
            </ImageGalleryUl>
            
        </>
    )
}