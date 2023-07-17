import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { ImageGalleryUl } from "./ImageGallery-style"



export const ImageGallery = ({images}) => {
    return (
        <>
            <ImageGalleryUl >
                {images.map(image => <ImageGalleryItem key={image.id} webformatURL={image.webformatURL} largeImageURL={image.largeImageURL} />)}
            </ImageGalleryUl>
        </>
    )
}