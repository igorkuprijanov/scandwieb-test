import React from 'react'
import '../Styles/Pages.css'


class Pages extends React.Component{
    
    changePage = (e) =>{
        this.props.changePage(parseInt(e.target.innerHTML))
    }
    
    render(){
        return(
        <div id='pagesButtonsContainer'>
            {this.props.displayableItems.length > 1 ? this.props.displayableItems.map((page) => 
                {return <button
                            key={this.props.displayableItems.indexOf(page)+1}
                            onClick={this.changePage}
                            className ={this.props.currentPage === this.props.displayableItems.indexOf(page)+1 ? "pagesButton pagesButtonActive" : "pagesButton"}>{this.props.displayableItems.indexOf(page)+1}
                        </button>})
                : null}
        </div>
        )
    }
}

export default Pages