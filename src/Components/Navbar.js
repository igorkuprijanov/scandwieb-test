import React from 'react'
import '../App.css'
import bag from '../Assets/bag.svg'
import arrow from '../Assets/arrow.svg'
import shoppingCart from '../Assets/shoppingCart.svg'
import '../Styles/Navigation.css'

class Navbar extends React.Component{
    
    showMiniCart = () =>{
        this.props.showMiniCart()
    }
    
    changeFilter = (e) =>{
        this.props.changeFilter(e)
    }
    
    showCurrency = () =>{
        this.props.showCurrency()
    }
    
    render(){
        return(
        <div id='navigationBarContainer'>
          <div id='navigationBar'>
           <div id='categoriesNavigation'>
           <p style={this.props.currentFilter === 'all' ? {borderBottom: '2px solid #5ECE7B', color: '#5ECE7B'} : null} onClick={this.changeFilter}>all</p>
            {this.props.categories.map((element)=> <p style={this.props.currentFilter === element.name ? {borderBottom: '2px solid #5ECE7B', color: '#5ECE7B'} : null} onClick={this.changeFilter} key={element.name}>{element.name}</p>)}
            </div>
            <div id='logoContainer'>
            <img id='companyLogo' src={bag} alt='green shoppin bag company' onClick={this.changeFilter}/>
            </div>
            <div id='cartNavigation'>
                <div onClick={this.showCurrency}>
                    <p id='currency'>{this.props.currentCurrency}</p>
                    <img style={{marginTop: '5px', transform: this.props.arrowDirection ? 'rotate(180deg)' : null}} src={arrow} alt='dropdown button arrow'/>
                </div>
                <div>
                <img id='shoppingCartIcon' src={shoppingCart} alt='shopping cart overlay icon' onClick={this.showMiniCart}/>
                {this.props.inCart.length > 0 ? 
                <div id='numOfItemsContainer'><span id='numOfItems'>{this.props.inCart.length}</span></div>
                : null
                }
                </div>
            </div>
            </div>
        </div>
        )
    }
    
}

export default Navbar