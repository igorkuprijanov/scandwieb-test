import React from 'react'
import '../Styles/Item.css'
import shoppingCart from '../Assets/shoppingCartWhite.svg'

class Item extends React.Component{
    
    constructor(props){
        super(props)
        this.elementRef = React.createRef()
        this.state = {
            showCartIcon: this.props.inCart.find((item) => {return item[0].name === this.props.name}) ? false : true
        }
    }
    
    selectItem = (e) =>{
        if(e.target.parentElement.getAttribute('class') === 'cartButton visibleIcon'){
            this.props.addToCart(this.props.name)
            this.setState({
                showCartIcon: false
            })
        }else{
            this.props.selectItem(this.props.name)  
        }
    }
    
    showShoppingIcon = () =>{
        this.elementRef.current.querySelector('.cartButton').classList.add('visibleIcon')
    }
    
    hideShoppingIcon = () =>{
        this.elementRef.current.querySelector('.cartButton').classList.remove('visibleIcon')
    }
    
    
    shouldComponentUpdate(nextProps){
        if(nextProps !== this.props){
            this.setState({
                showCartIcon: this.props.inCart.find((item) => {return item[0].name === this.props.name}) ? false : true
            })
            return true
        }else{
            return false
        }
    }

    
    render(){
        return(
        <div ref={this.elementRef} className='itemContainer' onClick={this.selectItem} onMouseOut={this.state.showCartIcon ? this.hideShoppingIcon : null} onMouseOver={this.state.showCartIcon ? this.showShoppingIcon : null}>
            <img alt='product' className='itemImage' src={this.props.image[0]} />
            <div>
            <p className='itemName'>{this.props.brand} </p>
            <p className='itemName'>{this.props.name}</p>
            </div>
            {this.state.showCartIcon ? <div className='cartButton'><img alt='shopping cart' src={shoppingCart}/></div> : null}
            <div className='itemPriceContainer'>
            <p >{this.props.currencySign}</p>
            <p >{this.props.prices.find(price => price.currency === this.props.currency).amount}</p>
            </div>
        </div>
        )
    }
}


export default Item