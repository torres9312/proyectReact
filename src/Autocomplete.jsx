import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { defaultProps } from "react-autocomplete";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  static countrys = [];

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    var url = 'http://api.geonames.org/searchJSON?q='+userInput+'&maxRows=10&username=devuser';
    var auxArray = [];

    // Filter our suggestions that don't contain the user's input
    

   

    fetch(url).then((response)=>{
        return response.json();  
    }).then(data=>{
        let array = data.geonames;
        
        array.forEach(obj => {
            var string = obj.name+", "+obj.adminName1+", "+obj.countryName;
            auxArray.push(string);
        })
        
        
    }).finally(() => {

       /*  console.log(auxArray); */
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: auxArray,
            showSuggestions: true,
            userInput: userInput
        });
    });

  
  };

  onClick = e => {
    /* this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    }); */
    console.log("algo");
  };

  onKeyDown = e => {
    console.log("algo");
  };


  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    

    if (showSuggestions && userInput && userInput.length >= 3) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions" id="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        if(userInput.length >= 3){
            suggestionsListComponent = (
                <div class="no-suggestions">
                  <em>No hay sugerencias disponibles</em>
                </div>
              );
        }
      }
    }

    function hideList(){
        let listDisplay = document.getElementById('suggestions');
        
        if(listDisplay){
            listDisplay.style.display = 'none';
        }
    }

    


    return (
      <Fragment>
        <input
            id="input-suggest"
            onBlur={hideList}
            type="text"
            onChange={onChange}
            value={userInput}
            placeholder="Ciudad y estado"
            autoComplete="off"
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}


function getListCountry(name) {
    
    
   

}

export default Autocomplete;
