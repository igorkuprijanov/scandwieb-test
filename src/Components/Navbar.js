import React from 'react'
import '../App.css'
import bag from '../Assets/bag.svg'
import arrow from '../Assets/arrow.svg'
import shoppingCart from '../Assets/shoppingCart.svg'

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
            <div style={{width: '20%', display: 'flex', justifyContent: 'center'}}>
            <img id='companyLogo' src={bag} alt='green shoppin bag company' onClick={this.changeFilter}/>
            </div>
            <div id='cartNavigation'>
                <div onClick={this.showCurrency}>
                    <p style={{marginRight: '5px', fontWeight: '500',fontSize: '18px', lineHeight: '160%'}}>{this.props.currentCurrency}</p>
                    <img style={{marginTop: '5px', transform: this.props.arrowDirection ? 'rotate(180deg)' : null}} src={arrow} alt='dropdown button arrow'/>
                </div>
                <div>
                <img style={{width: '20px', height: '20px', alignSelf: 'center', marginLeft: '20px'}} src={shoppingCart} alt='shopping cart overlay icon' onClick={this.showMiniCart}/>
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