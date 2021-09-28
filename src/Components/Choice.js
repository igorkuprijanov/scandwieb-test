import React from 'react'
import '../App.css'

class Choice extends React.Component{
    
    setOptions = (e) =>{
        this.props.setOptions({name: this.props.attributes.name, value: e.target.getAttribute('name')})
    }
    
    render(){
        return(
        <div style={{marginBottom: '40px'}}>
            <div>
                <p style={{fontStyle: 'normal', fontWeight: 'bold', fontSize: '18px', lineHeight: '18px', textTransform: 'uppercase', fontFamily: 'Roboto Condensed'}}>{this.props.attributes.name}:</p>
            </div>
            <div className='choiceOptionContainer'>
                {
                    this.props.attributes.name === "Color" ?
                        this.props.attributes.items.map((item)=>{return item.value === this.props.options.find(option => option.name === this.props.attributes.name).value ? <button className='chosenColorOption' key={item.id} name={item.value} style={{background: item.value}}></button> : <button style={{background: item.value}} onClick={this.setOptions} name={item.value} key={item.id}></button>})
                    :
                        this.props.attributes.items.map((item)=>{return item.value === this.props.options.find(option => option.name === this.props.attributes.name).value ?
                        <button className='chosenOption' key={item.id}>{item.value}</button>
                        :
                        <button onClick={this.setOptions} name={item.value} key={item.id}>{item.value}</button>})
                }
            </div>
        </div>
        )
    }
}

export default Choice