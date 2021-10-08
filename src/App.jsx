import React from 'react';


export function App(){
    var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Agos','Sept','Oct','Nov','Dic'];
    var countrys = [];
    return(
        <div className="container">
            <div className="box-form">
                <div className="title-form">
                    <h2>Green Leaves</h2>
                    <img src="/logo.png" width="100px" height="100px" alt="" />
                </div>
                
                <form className="form-control" id="form-contact">
                    <div className="form-group">
                        <label htmlFor="name" >Nombre</label>
                        <div className="form-input">
                            <input type="text" name="name" name="name" placeholder="Nombre"/>
                            <small className="alert" data-alert="name"></small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" >E-mail</label>
                        <div className="form-input">
                            <input type="text" name="email" id="email" placeholder="Correo"/>
                            <small className="alert" data-alert="email"></small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" >Télefono</label>
                        <div className="form-input">
                            <input type="number" onKeyUp={ inputValidation }  name="phone" id="phone" placeholder="Telefono"/>
                            <small className="alert" data-alert="phone"></small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date" >Fecha</label>
                        <div className="form-input">
                            <div className="date-container">
                                <input type="date" onChange={ getDate } name="date" id="date" placeholder="Fecha"/>
                                <input type="text" placeholder="Fecha" readOnly className="date-format" value="" id="date-format"/>
                            </div>
                            <small className="alert" data-alert="date"></small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city" name="city">Ciudad y Estado</label>
                        <div className="form-input">
                            <input type="text" placeholder="Ciudad y Estado" onBlur={hideList} autoComplete="off" onKeyUp={ getNamesCity } name="city" id="city" />
                            <div className="list-country" id="list-country" >
                               
                            </div>
                            <small className="alert" data-alert="city"></small>
                        </div>
                    </div>
                    <div className="btn-input">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
        )


        
        function inputValidation(e){
            if(e.key == "e" || e.key == "-" || e.key == "." || e.key == "," || e.key == "+" ){
                return false;
            }

            if(e.target.value.length >10){
                if(e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39){
                }else{
                    return false;
                }
            }
        }

       

        function getDate(e) {
            var date = e.target.value;
            var arrayDate = date.split("-");
            var dateFormat = arrayDate[2] +"-"+ months[parseInt(arrayDate[1]-1)] +"-"+ arrayDate[0]

            document.getElementById('date-format').value = dateFormat;
          
            
        }

        function hideList(){
            let listDisplay = document.getElementById('list-country');

            listDisplay.style.display = 'none';
        }

        function getNamesCity(e){
            var name = e.target.value;
            let listDisplay = document.getElementById('list-country');
            listDisplay.innerHTML = "";
            if(name.length >= 3){
                getListCountry(name);
            }else{
                listDisplay.style.display = 'none';
            }

        }

        function setValueCity(e){
            console.log("algo");
        }


        function getListCountry(name) {
            var url = 'http://api.geonames.org/searchJSON?q='+name+'&maxRows=10&username=devuser';

            fetch(url).then((response)=>{
                return response.json();  
              }).then(data=>{
                let array = data.geonames;
                countrys = array;
                let listDisplay = document.getElementById('list-country');
                listDisplay.html = "";

                let html = "";

                array.forEach(obj => {
                    
                    html += '<p onClick={setValueCity} >'+ obj.name+", "+obj.adminName1+", "+obj.countryName + '</p>\n';
                });
                    listDisplay.innerHTML = html;

                    listDisplay.style.display = 'block';
             
            })
        }
}