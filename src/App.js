import './App.css'
import React from 'react'
import {client, Query, Field } from '@tilework/opus'
import Store from './Components/Store.js'


client.setEndpoint('http://localhost:4000/')

class App extends React.Component {
     
    constructor(){
        super();
        this.state = {
            test: 0,
            ready: false
        }
    }
    
    componentDidMount = async () =>{
        const query = new Query('categories', true)
            .addField('name')
            .addField(new Field('products', true)
                      .addField('id')
                      .addField('name')
                      .addField('inStock')
                      .addField('gallery')
                      .addField('description')
                      .addField('category')
                      .addField(new Field('attributes')
                                .addField('id')
                                .addField('name')
                                .addField('type')
                                .addField(new Field ('items')
                                          .addField('displayValue')
                                          .addField('value')
                                          .addField('id')
                                         )
                               )
                      .addField(new Field ('prices')
                                .addField('currency')
                                .addField('amount')
                               )
                      .addField('brand')
                     )  
        const queryResult = client.post(query)  
    .then((respone)=> this.setState({test: respone.categories, ready: true}))
    }
    
    render(){
    return (
    <div className="App">
      {this.state.ready ? <Store categories={this.state.test}/> : <p>not ready</p>}
    </div>
  )
        
    }
}

export default App
