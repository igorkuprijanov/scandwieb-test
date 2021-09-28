import React from 'react'
import '../Styles/Currency.css'

class Currency extends React.Component{
    
    changeCurrency = (e) =>{
        if(e.target.nodeName === "P"){
            this.props.changeCurrency({sign: e.target.parentElement.querySelectorAll('p')[0].innerHTML, currency: e.target.parentElement.querySelectorAll('p')[1].innerHTML})
        }else{
            this.props.changeCurrency({sign: e.target.querySelectorAll('p')[0].innerHTML, currency: e.target.querySelectorAll('p')[1].innerHTML})
        }
    }
    
    render(){
        return(
        <div id='currencyContainer'>
            {this.props.currencies.map((price)=>{return <div onClick={this.changeCurrency} className='currencyChoiceContainer' key={price.currency}><p style={{marginRight: '3px'}} key={price.amount}>{price.currency === "USD" ? '$' : price.currency === 'GBP' ? '£' : price.currency === 'AUD' ? 'A$' : price.currency === 'JPY' ? '¥' : '₽'}</p> <p key={price.currency}>{price.currency}</p></div>})}
        </div>
        )
    }
}

export default Currency