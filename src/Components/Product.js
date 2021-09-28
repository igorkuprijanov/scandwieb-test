import React from 'react'
import Choice from './Choice.js'


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
    
    shouldComponentUpdate(nextProps){
        if(nextProps !== this.props){
            this.setState({
                isItemInCart: (()=>{for(let i=0, length = this.props.inCart.length; i<length; i++){
                                    if(this.props.inCart[i][0] === this.props.item){
                                        return true 
                                    }}})(),
            })
            return true
        }else{
            return false
        }
    }

    
    render(){     
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
                <h1 style={{fontWight: '600', fontSize: '30px', lineHeight: '27px', color: '#1D1F22', marginBottom: '16px'}}>{this.props.item.brand}</h1>
                <h2 style={{marginBottom: '43px', fontWeight: 'normal', fontSize: '30px', lineHeight: '27px'}}>{this.props.item.name}</h2>
                <div >
                    {this.props.item.attributes.map((attribute)=>{return <Choice options={this.state.options} setOptions={this.setOptions} key={attribute.id} attributes={attribute}/>})}
                </div>
                <div>
                    <p style={{fontWeight: 'bold', fontSize: '18px', lineHeight: '18px', marginBottom: '10px', fontFamily: 'Roboto Condensed'}}>PRICE:</p>
                    <p style={{fontWeight: 'bold', fontSize: '24px', lineHeight: '18px', marginBottom: '20px', height: '46px', display: 'flex', alignItems: 'center'}}>{this.props.currencySign} {this.props.item.prices.find(price => price.currency === this.props.currency).amount}</p>
                </div>
                {this.state.isItemInCart ? <button style={{marginBottom: '40px'}} id='alreadyInCartButton'>ALREADY IN CART</button> : <button onClick={this.addToCart} style={{marginBottom: '40px'}} id='addToCartProductButton'>ADD TO CART</button>}
                <div id='descriptionContainer' style={{fontFamily: 'Roboto'}}></div>
            </div>
        </div>
        </div>
        )
    }
}

export default Product