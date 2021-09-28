import React from 'react'
import Choice from './Choice.js'
import '../Styles/Product.css'


class Product extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            currentImage: this.props.item.gallery[0],
            isItemInCart: (()=>{for(let i=0, length = this.props.inCart.length; i<length; i++){
                                    if(this.props.inCart[i][0] === this.props.item){
                                        return true 
                                    }}})(),
            options: (() => {
                let data = []
                this.props.item.attributes.forEach((attribute) => {data.push({name: attribute.name, value: attribute.items[0].value})})
                return data
            })()
            
        }
        this.changeImage = this.changeImage.bind(this)
        this.setOptions = this.setOptions.bind(this)
    }
    
    changeImage(e){
        console.log(e.target.getAttribute('src'))
        this.setState({currentImage: e.target.getAttribute('src')})
    }
    
    componentDidMount(){
        let parser = new DOMParser()
        let doc = parser.parseFromString(this.props.item.description, 'text/html')
        let desciprion = doc.body
        document.getElementById('descriptionContainer').appendChild(desciprion)
    }
    
    setOptions(newOptions){
        this.setState({options: (()=>{
            let data = []
            this.state.options.forEach((option) => {
                if(option.name === newOptions.name){
                    data.push(newOptions)
                }else{
                    data.push(option)
                }
            })
            return data
            })()})
    }

    addToCart = () => {
        this.props.addToCart(this.props.item, this.state.options, 1)
        this.setState({isItemInCart: true})
    }
    
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps !== this.props){
            this.setState({
                isItemInCart: (()=>{for(let i=0, length = this.props.inCart.length; i<length; i++){
                                    if(this.props.inCart[i][0] === this.props.item){
                                        return true 
                                    }}})(),
            })
            return true
        }else if(this.state !== nextState){
            return true
        }else{
            return false
        }
    }

    
    render(){ 
        console.log(this.state)
        return(
        <div id='productContainer'>
        <div id='galleryImagesContainer'>
            {this.props.item.gallery.map((image)=>{return <img onClick={this.changeImage} alt='gallery' key={image} src={image} className='galleryImage'/>})}
        </div>
        <div id='productDevider'>
            <div id='imageContainer'>
                <img alt='large product' src={this.state.currentImage}/>
            </div>
            <div id='productDescriptionContainer'>
                <h1 className='productBrand'>{this.props.item.brand}</h1>
                <h2 className='productName'>{this.props.item.name}</h2>
                <div >
                    {this.props.item.attributes.map((attribute)=>{return <Choice options={this.state.options} setOptions={this.setOptions} key={attribute.id} attributes={attribute}/>})}
                </div>
                <div>
                    <p className='productPriceTitle'>PRICE:</p>
                    <p className='productPrice'>{this.props.currencySign} {this.props.item.prices.find(price => price.currency === this.props.currency).amount}</p>
                </div>
                {this.state.isItemInCart ? <button id='alreadyInCartButton'>ALREADY IN CART</button> : <button onClick={this.addToCart} id='addToCartProductButton'>ADD TO CART</button>}
                <div id='descriptionContainer'></div>
            </div>
        </div>
        </div>
        )
    }
}

export default Product