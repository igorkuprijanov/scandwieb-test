import React from 'react'
import MiniItem from './MiniItem.js'
import '../App.css'

class ShoppingBag extends React.Component{
    
    changeOption = (options) =>{
        this.props.changeOption(options)
    }
    
    changeAmount = (item) =>{
        this.props.changeAmount(item)
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
        <div id='shoppingBagContainer'>
        <h1>cart</h1>
        {this.props.items.map(item => <MiniItem removeItem={this.removeItem} big={true} changeAmount={this.changeAmount} changeOption={this.changeOption} currency={this.props.currency} currencySign={this.props.currencySign} key={item[0].id} item={item}/>)}
        <div id='shoppingBagToalContainer'>
            <p>Total: </p>
            <span>{this.props.currencySign}{Math.floor(value*100)/100}</span>
        </div>
        </div>
        )
    }
}

export default ShoppingBag