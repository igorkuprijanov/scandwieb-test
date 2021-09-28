import React from 'react'
import MiniItem from './MiniItem.js'
import '../Styles/MiniCart.css'

class MiniCart extends React.Component{
    
    changeAmount = (item) =>{
        this.props.changeAmount(item)
    }
    
    changeOption = (options) => {
        this.props.changeOption(options)
    }
    
    openBag = () =>{
        this.props.openBag()
    }
    
    closeCart = (e)=>{
        if(e.target.getAttribute('id') === 'miniCartContainer'){
            this.props.closeCart()
        }
    }
    
    removeItem = (item) =>{
        this.props.removeItem(item)
    }
    
    render(){
        let value = 0
        for(let i=0, size=this.props.items.length; i<size; i++){
            value += (this.props.items[i][0].prices.find(price => price.currency === this.props.currency).amount * this.props.items[i][2])
        }
        return(
        <div id='miniCartContainer' onClick={this.closeCart}>
            <div id='miniCart'>
                <div id='miniCartTitleContainer'>
                    <p className='miniCartTitleFat'>My bag, </p><span >{this.props.items.length}</span><p>{this.props.items.length === 1 ? ' item ' : ' items '}</p>
                </div>
                
                <div id='miniCartItemsContainer'>
                    {this.props.items.map((item) => {return <MiniItem removeItem={this.props.removeItem} changeAmount={this.changeAmount} changeOption={this.changeOption} currency={this.props.currency} currencySign={this.props.currencySign} key={item[0].id} item={item}/>})}
                </div>
                
                <div id='miniCartTotalContainer'>
                    <p className='miniCartTitle'>Total</p>
                    <span className='miniCartTitleFat'>{this.props.currencySign} {Math.floor(value*100)/100}</span>
                </div>
                
                <div id='miniCartButtonsContainer'>
                    <button className='miniCartButton bagButton'onClick={this.openBag}>View bag</button>
                    <button className='miniCartButton checkOut' onClick={()=>{alert('not included')}}>check out</button>
                </div>
            </div>
        </div>
        )
    }
}

export default MiniCart