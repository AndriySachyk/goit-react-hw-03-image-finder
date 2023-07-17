import { ImageGalleryItemLi, ImageGalleryItemImg } from "./ImageGalleryItem-style"


export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
    return (
        <>
            <ImageGalleryItemLi className="gallery-item" >
                <ImageGalleryItemImg src={webformatURL} alt="" />
            </ImageGalleryItemLi>
        </>
        
    )
}