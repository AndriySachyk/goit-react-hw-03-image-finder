import axios from "axios";
const API_KEY = "36732320-36b39292b107cb29c68f7e6f5"

axios.defaults.baseURL = "https://pixabay.com/api/"


export const getImages = async(qvery, page) => {
    const {data} = await axios(`?q=${qvery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`)
    return data
}


