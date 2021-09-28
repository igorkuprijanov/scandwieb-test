import React from 'react'
import '../App.css'
import arrow from '../Assets/arrow.svg'
import remove from '../Assets/remove.svg'

class MiniItem extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            image: this.props.item[0].gallery[0]
        }
    }
    
    
    removeItem = () =>{
        this.props.removeItem(this.props.item)
    }

    changeAmount = (e) =>{
        if(e.target.innerHTML === '+'){
            this.props.changeAmount([this.props.item[0], this.props.item[1], this.props.item[2]+1])
        }else{
            if(this.props.item[2]>1){
                this.props.changeAmount([this.props.item[0], this.props.item[1], this.props.item[2]-1])
            }
        }
    }
    
    changePicture = (e) =>{
        e.target.getAttribute('name') === 'right' ? 
            this.setState({
            image: this.props.item[0].gallery.indexOf(this.state.image) < (this.props.item[0].gallery.length-1) ? this.props.item[0].gallery[this.props.item[0].gallery.indexOf(this.state.image)+1] : this.props.item[0].gallery[0]
            })
        :
            this.setState({
            image: this.props.item[0].gallery.indexOf(this.state.image) < (this.props.item[0].gallery.length-1) ? this.props.item[0].gallery[this.props.item[0].gallery.indexOf(this.state.image)+1] : this.props.item[0].gallery[0]
            })
    }
    
    changeOption = (e) =>{
        let newAttribute ={ name: e.target.parentElement.getAttribute('name'), value: e.target.getAttribute('name')}
        let newOptions = []
        this.props.item[1].forEach((item)=>{if(item.name === newAttribute.name){newOptions.push(newAttribute)}else{newOptions.push(item)}})
        this.props.changeOption([this.props.item[0], newOptions, this.props.item[2]])
    }
    
    render(){
        let big = this.props.big
        return(
        <div id={big ? 'bigItemContainer' : 'miniItemContainer'}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 'auto'}}>
               <div id={big ? null : 'itemText'}>
                    <p id={big ? 'bigItemBrand' : null}>{this.props.item[0].brand}</p>
                    <p id={big? 'bigItemTitle' : null}>{this.props.item[0].name}</p>
                    <div id={big ? 'bigItemPriceText' : 'itemPriceText'}>
                        <p>{this.props.currencySign}</p>
                        <p>{this.props.item[0].prices.find(price => price.currency === this.props.currency).amount}</p>
                    </div>
                </div>
                <div>
                    {this.props.item[0].attributes.map((attribute)=>
                        {return <div key={attribute.name} name={attribute.name}>
                         {attribute.items.map((item)=>{
                               return item.value === this.props.item[1].find(option => option.name === attribute.name).value ?
                                   attribute.name === 'Color' ?  <button key={item.id} style={{background: item.value}} className= {big ? 'bigItemChoice chosenColorOption' : 'miniItemChoice chosenColorOption'}></button> :  <button key={item.id} className={big ? 'bigItemChoice chosenOption' : 'miniItemChoice chosenOption'}>{item.value}</button>
                                   :
                                    attribute.name === 'Color' ?  <button onClick={this.changeOption} key={item.id} style={{background: item.value}} className={big ? 'bigItemChoice' : 'miniItemChoice'} name={item.value}></button> : <button onClick={this.changeOption} key={item.id} className={big ? 'bigItemChoice' : 'miniItemChoice'} name={item.value}>{item.value}</button>
                                   
                            })}
                        </div>})}
                        
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <button className={big ? 'bigItemAmount' : 'miniItemChoice'} onClick={this.changeAmount}>+</button>
                <span style={{textAlign: 'center'}}>{this.props.item[2]}</span>
                <button className={big ? 'bigItemAmount' : 'miniItemChoice'} onClick={this.changeAmount}>-</button>
            </div>
            <div id={big ? 'bigCartItemImageContainer' : 'miniCartItemImageContainer'}>
               {big && this.props.item[0].gallery.length > 1 ? <div id='arrowContainer'><img onClick={this.changePicture} name='left' id='arrowLeft' alt='arrow' src={arrow}/><img onClick={this.changePicture} name='right' alt='arrow' id='arrowRight' src={arrow}/></div> : null}
                <img alt='product' src={this.state.image}/>
                <img alt='remove button' className={big ? 'bigRemoveItemIcon' : 'removeItemIcon'} onClick={this.removeItem} src={remove}></img>
            </div>
        </div>
        )
    }
}

export default MiniItem