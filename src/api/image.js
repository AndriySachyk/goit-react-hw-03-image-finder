import axios from "axios";
const API_KEY = "36732320-36b39292b107cb29c68f7e6f5"

axios.defaults.baseURL = "https://pixabay.com/api/"


// export const getImages = async(qvery) => {
//     const {data} = await axios(`?q=${qvery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
//     return data
// }

// export const addImagesLoadMore = async(qvery, page) => {
//     const {data} = await axios(`?q=${qvery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`)
//     return data
// }







export default class GalleryImages {
  constructor() {
    this.page = 1;
    // this.searchQury = '';
    this.perPage = 12
  }

  async getGallery(qvery) {
    const {data} = await axios.get(
      `?key=${API_KEY}&q=${qvery}&page=${this.page}&image_type=photo&orientation=horizontal&per_page=${this.perPage}`
    );
    this.incrementPage(); 
    // console.log(gallery.data);
    return data;
  }


  resetPage() {
   return this.page = 1;
  }

  incrementPage() {
   return  this.page += 1;
  }
}