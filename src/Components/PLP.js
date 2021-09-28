import React from 'react'
import Item from './Item.js'
import '../App.css'
import Pages from './Pages.js'

class PLP extends React.Component{

    selectItem = (e) =>{
        this.props.selectItem(e)
    }
    
    addToCart= (object) =>{
        let item
        let options = []
        let amount = 1
        this.props.items.categories.forEach((categorie) => {categorie.products.forEach((product) => {if(product.name === object){
            item = product
        }})})
        item.attributes.forEach((attribute) => {options.push({name: attribute.name, value: attribute.items[0].value})})
        this.props.addToCart(item, options, amount)
    }
    
    changePage = (page) =>{
        this.props.changePage(page)
    }
    
    render(){
        console.log(this.props)
        return(
        <div>
           <div id='allItems' className='allItems'>
            {this.props.displayableItems[this.props.currentPage -1].map((item) =>{return <Item inCart={this.props.inCart} addToCart={this.addToCart} currencySign={this.props.currencySign} currency={this.props.currency} key={item.id} image={item.gallery} brand={item.brand} name={item.name} prices={item.prices} selectItem={this.selectItem} />})}
            </div>
           <Pages currentPage={this.props.currentPage} changePage={this.changePage} displayableItems={this.props.displayableItems}/>
        </div>
        )
    }
}

export default PLP