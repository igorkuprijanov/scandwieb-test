import React from 'react'
import '../App.css'
import Navbar from './Navbar.js'
import PLP from './PLP.js'
import Product from './Product.js'
import MiniCart from './MiniCart.js'
import Currency from './Currency.js'
import ShoppingBag from './ShoppingBag.js'

class Store extends React.Component{
    
    constructor(){
        super()
        this.state = {
            currentFilter: "all",
            currentItem: null,
            showCart: false,
            inCart: JSON.parse(localStorage.getItem('inCart')) || [],
            showCurrency: false,
            currency: 'USD',
            currencySign: '$',
            showBag: false,
            currentPage: 1,
            
        }
        
        this.changeFilter = this.changeFilter.bind(this)
        this.selectItem = this.selectItem.bind(this)
        this.showMiniCart = this.showMiniCart.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.showCurrency = this.showCurrency.bind(this)
        this.changeCurrency = this.changeCurrency.bind(this)
        this.changeOption = this.changeOption.bind(this)
        this.changeAmount = this.changeAmount.bind(this)
        this.openBag = this.openBag.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.sortItems = this.sortItems.bind(this)
    }
    
    
    /* Checks if current is equal to new filter => if not sets new filter */
    changeFilter(e){
        if(e.target.tagName === "IMG"){
            if(this.state.currentFilter !== 'all' || this.state.currentItem !== null){
                window.scrollTo(0,0)
                this.setState({currentFilter: 'all', currentItem: null, showBag: false, currentPage: 1})   
            }
        }else if(this.state.currentFilter !== e.target.innerHTML || this.state.currentItem !== null){
            window.scrollTo(0,0)
            this.setState({currentFilter: e.target.innerHTML, currentItem: null, showBag: false, currentPage: 1})
            }
    }
    
    
    removeItem(item){
        let items = this.state.inCart
        let index
        this.state.inCart.find((product) => { return product[0].name === item[0].name ? index = this.state.inCart.indexOf(product) : console.log('no item')})
        items.splice(index, 1)
        localStorage.setItem('inCart', JSON.stringify(items))
        this.setState({
            inCart: items
        })
    }
    
    selectItem(e){
        let product
        this.props.categories.forEach((category)=> {category.products.forEach((item)=>{if(item.name === e){product = item}})})
        this.setState({currentItem: product})
    }
    
    showMiniCart(){
        this.setState({showCart: !this.state.showCart, showCurrency: false})
    }
    
    addToCart(item, options, amount){
        localStorage.setItem('inCart', JSON.stringify([...this.state.inCart, [item, options, amount]]))
        this.setState({inCart: [...this.state.inCart, [item, options, amount]]})
    }
    
    showCurrency(){
        this.setState({showCurrency: !this.state.showCurrency, showCart: false})
    }
    changeCurrency(currency){
        this.setState({currency: currency.currency, currencySign: currency.sign, showCurrency: false})
        
    }
    changeOption(options){
        this.setState({
            inCart: (()=>{
                let newCart = []
                this.state.inCart.forEach((item)=>{if(item[0].name === options[0].name){newCart.push(options)}else{newCart.push(item)}})
                return newCart
            })()
        })
        
    }
    changeAmount(item){
        this.setState({
            inCart: (()=>{
                let newCart = []
                this.state.inCart.forEach((element)=>{if(element[0].name === item[0].name){newCart.push(item)}else{newCart.push(element)}})
                return newCart
            })()
        })
    }
    
    
    openBag(){
       this.setState({
           showBag: true,
           currentItem : null,
           showCart: false
       })
    }
    
    sortItems = () =>{
        let allItems = []
        let items = []
        
        if(this.state.currentFilter === 'all'){
            this.props.categories.forEach((categorie) => {categorie.products.forEach((product)=>allItems.push(product))})   
        }else{
            this.props.categories.find((categorie) => {return categorie.name === this.state.currentFilter}).products.forEach((product) => {allItems.push(product)})
        }
        
        for(let i=0; i<allItems.length; i){
            items.push(allItems.splice(0,6))
        }
        return items
    }
    
    changePage = (page) =>{
        window.scrollTo(0,0)
        this.setState({
            currentPage: page
        })
    }
    
    
    
    render(){
        console.log(this.state.inCart)
        return(
        <div id='storeContainer'>
            <Navbar currentFilter={this.state.currentFilter} inCart={this.state.inCart} currentCurrency={this.state.currencySign} arrowDirection={this.state.showCurrency} showCurrency={this.showCurrency} showMiniCart={this.showMiniCart} changeFilter={this.changeFilter} categories={this.props.categories}/>
            {this.state.currentItem ?
                    <Product inCart={this.state.inCart} currency={this.state.currency} currencySign={this.state.currencySign} item={this.state.currentItem} addToCart={this.addToCart}/> :
                this.state.showBag ?
                    <ShoppingBag removeItem={this.removeItem} changeAmount={this.changeAmount} changeOption={this.changeOption} currency={this.state.currency} currencySign={this.state.currencySign} items={this.state.inCart}/> :
                <div>
                <h2  id='storeFilterTitle'>{this.state.currentFilter}</h2>
                <PLP items={this.props} changePage={this.changePage} currentPage={this.state.currentPage} displayableItems={this.sortItems()} inCart={this.state.inCart} addToCart={this.addToCart} currency={this.state.currency} currencySign={this.state.currencySign} filter={this.state.currentFilter} selectItem={this.selectItem}/>
                </div>
                }
                {this.state.showCart ? <MiniCart removeItem={this.removeItem} closeCart={this.showMiniCart} openBag={this.openBag} changeAmount={this.changeAmount} changeOption={this.changeOption} currency={this.state.currency} currencySign={this.state.currencySign} items={this.state.inCart}/> : null}
                {this.state.showCurrency ? <Currency changeCurrency={this.changeCurrency} currencies={this.props.categories[0].products[0].prices}/> : null}
        </div>
        )
    }
}

export default Store