import { Component } from 'react'
import { Searchbar } from'./Searchbar/Searchbar.jsx'
import { getImages } from 'api/image.js';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx'
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import Notiflix from 'notiflix';
import { Box, Container } from 'App-style.js';
import { Loader } from './Loader/Loader.jsx';
// import { ImagesList } from './ImagesList/ImagesList.jsx';


const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  
}


export class App extends Component {
  
  state = {
    images: [],
    searchQuery: '',
    status: STATUS.IDLE,
    error: '',
    numPage: 2

  }

  
  
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };
  
  handleSubmit =(e)=> {
    e.preventDefault()
    const form = document.querySelector('form')
    this.setState({ searchQuery: e.target[1].value.trim() }) 
    console.log(e.target[1].value.trim())
    if (e.target[1].value.trim() === '') {
      form.reset()
      return Notiflix.Notify.warning('Fill in this field');
      
   }
   form.reset()
  } 
  
  
 

  createImages= async()=> {
    try {
      this.setState({status: STATUS.PENDING})
      const data = await getImages(this.state.searchQuery)
      if (data.hits.length === 0) {
        this.setState({
          images: []
        })
        return Notiflix.Notify.failure(`Sorry, image ${this.state.searchQuery} not found`);
      } 
      this.setState({
        images: [ ...data.hits],
        status:STATUS.FULFILLED
      });
      Notiflix.Notify.success(`Total: ${data.total}`);
      this.setState({
        
      });
    
    } catch (error) {
      this.setState({
        error: error.message,
        status: STATUS.REJECTED,
      })
      Notiflix.Notify.failure(error.message);
    }
  }


  
  handleClick = async() => {
    this.setState({ numPage: this.state.numPage + 1});
    try {
      
      this.setState({ status: STATUS.PENDING })
      const data = await getImages(this.state.searchQuery, this.state.numPage)
  
  
      this.setState(prevState => {
  
        console.log(prevState.images); 
  
        return { images: [...prevState.images, ...data.hits], status: STATUS.FULFILLED  };
      });
    
      console.log(this.state.numPage)
      
    } catch (error) {
      this.setState({
        error: error.message,
        status: STATUS.REJECTED,
      })
      Notiflix.Notify.failure(error.message);
    }
    
  
  }
   componentDidUpdate(prevProps, prevState) {
      if (prevState.searchQuery !== this.state.searchQuery) this.createImages()
  }

  render() {
    const { images } = this.state
    return(
      <Container>
        <Searchbar handleSubmit={this.handleSubmit} />
        {/* <ImagesList
          images={images} 
          error={error}
          status={status}
          STATUS={STATUS}
        /> */}
        {this.state.status === STATUS.PENDING && <Loader />}
      
          <ImageGallery images={images} />
        <Box><Button handleClick={this.handleClick} /></Box>
        
        {/* <ImageGallery images={images} />
        <Box><Button handleClick={this.handleClick} /></Box> */}
        
        <Modal />

      </Container>
    );
    
  }
};
