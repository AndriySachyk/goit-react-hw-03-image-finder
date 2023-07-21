import { Component } from 'react'
import { Searchbar } from'./Searchbar/Searchbar.jsx'
import GalleryImages from 'api/image.js';

import { Modal } from './Modal/Modal.jsx';
import Notiflix from 'notiflix';
import { Container } from 'App-style.js';
import { Loader } from './Loader/Loader.jsx';
// import { ImagesList } from './ImagesList/ImagesList.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';



const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  
}

const galleryImages = new GalleryImages();


export class App extends Component {
  
  state = {
    images: [],
    searchQuery: '',
    status: STATUS.IDLE,
    error: '',
    numPage: 1,
    // loadMore: false

  }

  
    
  handleSubmit = (e) => {
    e.preventDefault()
    galleryImages.resetPage()
    this.setState({ searchQuery: e.target[1].value.trim() })
    console.log(e.target[1].value.trim())
    if (this.state.searchQuery === e.target[1].value.trim()) {
      Notiflix.Notify.warning('The request for this value has already been processed, please enter another value');
      return
    }
    e.target.reset()
  
  }

  
  createImages = async () => {
    try {


      if (!this.state.searchQuery) {
        Notiflix.Notify.warning('Please fill in this field');
        // loadMoreBtn.hide()
        this.setState({
          images: []
        })
        return
      }

      const data = await galleryImages.getGallery(this.state.searchQuery)
      console.log(data)
      if (data.hits.length === 0) {
        this.setState({
          images: [],
          status: STATUS.REJECTED
        })

        return Notiflix.Notify.failure(`Sorry, image ${this.state.searchQuery} not found`);
      } 
      this.setState({
        images: [...data.hits],
        status: STATUS.FULFILLED,
        // loadMore: true
      })
      Notiflix.Notify.success(`Total: ${data.totalHits}`);
    } catch (error) {
      this.setState({
        error: error.message,
        status: STATUS.REJECTED,
      })
      Notiflix.Notify.failure(error.message);
    }
  }
  


  // handleSubmit =(e)=> {
  //   e.preventDefault()
  //   const form = document.querySelector('form')
  //   this.setState({ searchQuery: e.target[1].value.trim() }) 
  //   console.log(e.target[1].value.trim())
  //   if (e.target[1].value.trim() === '') {
  //     form.reset()
  //     return Notiflix.Notify.warning('Fill in this field');
      
  //  }
  //  form.reset()
  // } 
  
  
 

  // createImages= async()=> {
  //   try {
  //     this.setState({status: STATUS.PENDING})
  //     const data = galleryImages.getGallery(this.state.searchQuery)
  //     console.log(data)
  //     if (data.hits.length === 0) {
  //       this.setState({
  //         images: [],
  //         status: STATUS.REJECTED
  //       })

  //       return Notiflix.Notify.failure(`Sorry, image ${this.state.searchQuery} not found`);
  //     } 

  //     // this.setState({ images: [ ...data.hits] });

  //     this.setState({
 
  //       status: STATUS.FULFILLED,
  //       loadMore: true
  //     });
  //     Notiflix.Notify.success(`Total: ${data.totalHits}`);
  //     this.setState({
  //       // numPage: 1
  //     });
    
  //   } catch (error) {
  //     this.setState({
  //       error: error.message,
  //       status: STATUS.REJECTED,
  //     })
  //     Notiflix.Notify.failure(error.message);
  //   }
  // }





  // addImagesLoadMore = async () => {
  //   try {
  //     this.setState({ status: STATUS.PENDING })
  //     const data = await addImagesLoadMore(this.state.searchQuery, this.state.numPage)
  //     console.log(data)
  //     if (data.hits.length === 0) {
  //       this.setState({
  //         images: [],
  //         status: STATUS.REJECTED
  //       })

  //       return Notiflix.Notify.failure(`Sorry, image ${this.state.searchQuery} not found`);
  //     }

  //     this.setState({ images: [this.state.images][data.hits] });

  //     this.setState({

  //       status: STATUS.FULFILLED,
  //       loadMore: true
  //     });
  //     // Notiflix.Notify.success(`Total: ${data.total}`);
  //     // this.setState({
  //     //   // numPage: 1
  //     // });

  //   } catch (error) {
  //     this.setState({
  //       error: error.message,
  //       status: STATUS.REJECTED,
  //     })
  //     Notiflix.Notify.failure(error.message);
  //   }
  
  // }
  
  handleClick  = async() => {
    try {
      // loadMoreBtn.disable();
      const result = await galleryImages.getGallery(this.state.searchQuery);
      const totalHits = Math.round(result.totalHits / galleryImages.perPage);
      const thisPage = galleryImages.page;
      console.log(totalHits, 'total')
      console.log(thisPage, 'thisPage')

      if (thisPage > totalHits) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        // console.log(result.hits)
        //  this.setState((state) => {
        //   return {images: [state.images, ...result.hits]};
        // });
      
        // console.log(this.state.images)
          // loadMoreBtn.end();
          // createMarkup(result);
          return
      }

      
      const resulItem = result.hits.map(item => item )

      console.log(result)
      
//       this.setState({
//         images: [...this.state.images.push(...result.hits)]
// })

      // this.setState(prev => {
      //   return { images: new Array(prev.images.push(resulItem)) }
      // })
      
      this.setState(function (state, props) {
        return {
          score: state.images.push(...resulItem)
        }
      });

      console.log(this.state.images)
        // console.log(result.hits)
        // console.log(this.state.images)
      // createMarkup(result);
      // console.log(result);
      // loadMoreBtn.enable();
    } catch (err) {
      // onError(err);

      // loadMoreBtn.end();
    }
    // this.setState((state) => {
    //   return { numPage: state.numPage += 1 };
    // });
    // // this.setState({ numPage: this.state.numPage += 1});
    
    // console.log(this.state.numPage)
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery)  this.createImages()
    // if (prevState.numPage !== this.state.numPage) this.addImagesLoadMore()
    
  }
  render() {
    const { images, status, error, } = this.state
    return(
      <>
      <Searchbar handleSubmit={this.handleSubmit} />
        <Container>
           <ImageGallery images={images} />
          <Button handleClick={this.handleClick} />
          {status === STATUS.PENDING && <Loader />}
          {status === STATUS.REJECTED && <h2>{error}</h2>}

          <Modal largeImage={images.largeImageURL} />

        </Container>
      </>
        );
    
  }
};
