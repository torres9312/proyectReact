import React from 'react';


export function App(){
    var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Agos','Sept','Oct','Nov','Dic'];
    var countrys = [];
    var string = "";
    return(
        <div className="container">
            <div className="dialog" id="dialog">
                <div className="dialog-box">
                    <div className="title-dialog">Contacto</div>
                    <div className="dialog-body">
                        <span className='close-dialog' onClick={closeDialog}>X</span>
                        <div id="content-dialog" id="content-dialog">
                            
                            
                        </div>
                    </div>
                    <div className="footer-dialog">
                        <button type='button' onClick={closeDialog}>OK</button>
                    </div>
                </div>
            </div>
            <div className="box-form">
                <div className="title-form">
                    <h2>Green Leaves</h2>
                    <img src="/logo.png" width="100px" height="100px" alt="" />
                </div>
                
                <form className="form-control" id="form-contact">
                    <div className="form-group">
                        <label htmlFor="name" >Nombre: </label>
                        <div className="form-input">
                            <input type="text" id="name" name="name" placeholder="Nombre"/>
                            <small className="alert" id="alert-name"></small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" >E-mail: </label>
                        <div className="form-input">
                            <input type="text" name="email" id="email" placeholder="Correo"/>
                            <small className="alert" id="alert-email"></small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" >Teléfono: </label>
                        <div className="form-input">
                            <input type="number" onKeyUp={ inputValidation } name="phone" id="phone" placeholder="Teléfono"/>
                            <small className="alert" id="alert-phone"></small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date" >Fecha: </label>
                        <div className="form-input">
                            <div className="date-container">
                                <input type="date" onChange={ getDate } name="date" id="date" placeholder="Fecha"/>
                                <input type="text" placeholder="Fecha" readOnly className="date-format" value="" id="date-format"/>
                            </div>
                            <small className="alert" id="alert-date"></small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city" name="city">Ciudad y Estado: </label>
                        <div className="form-input">
                            <input type="text" placeholder="Ciudad y Estado" onBlur={hideList} autoComplete="off" onKeyUp={ getNamesCity } name="city" id="city" />
                            <div className="list-country" id="list-country" >
                               
                            </div>
                            <small className="alert" id="alert-city"></small>
                        </div>
                    </div>
                    <div className="btn-input">
                        <button type="button" onClick={sendData}>Enviar</button>
                    </div>
                </form>

                <div className="success" id="success">
                
                </div>
            </div>
        </div>
        
        )


        function emailValidation(email) {
            var regexp = /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i;
            return regexp.test(String(email).toLowerCase());
        }


        function phoneValidation(number) {
            var regexp = /^\d+$/;
            return regexp.test(String(number));
        }
        function nameValidation(number) {
            var regexp = /[a-zA-Z]/;
            return regexp.test(String(number));
        }

        

       function closeDialog(){
            var dialog = document.getElementById('dialog');
            dialog.style.display = 'none';

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

        function inputValidation(e){
            
            
            if(e.key == "e"  || e.key == "." || e.key == "," ){
                e.preventDefault();
             }else{
                 
             }
 
             if(e.target.value >9){
                return;  
             }
        }

       
        function sendData(e){
            document.getElementsByClass(name).style.property = new style;

            var arrayNamesForm = ['name','email','phone','date','city'];
            var arrayNamesEsp = ['nombre','correo','teléfono','fecha','ciudad y estado'];

            var status = true;
            var html = "<p>Se encontraron los siguientes errores en sus datos de contacto: </p> \n";
                html += '<li>Faltan datos<li>\n';

            for(let i = 0; i < arrayNamesForm.length ; i++){
                var input = document.getElementById(arrayNamesForm[i]).value;
                let alert = document.getElementById('alert-'+arrayNamesForm[i]);

                

                if(input != '' ){
                    if(arrayNamesForm[i] === 'email'){
                        if(!emailValidation(input)){
                            html += '<li>El correo que ingresó no es valido.</li> \n';
                            alert.innerText = "El campo email es requerido";
                            alert.style.display = 'block';
                            status = false; 
                        }
                    }

                    if(arrayNamesForm[i] === 'phone'){
                        if(!phoneValidation(input)){
                            html += '<li>El campo teléfono solo puede contener números.</li> \n';
                            alert.innerText = "El teléfono es incorrecto";
                            alert.style.display = 'block';
                            status = false; 
                            
                        }
                    
                    }

                    if(arrayNamesForm[i] === 'name'){
                        if(!nameValidation(input)){
                            html += '<li>El campo nombre solo puede contener letras.</li> \n';
                            alert.innerText = "El nombre es incorrecto";
                            alert.style.display = 'block';
                            status = false; 
                            
                        }
                    
                    }
                    
                    
                }else if(input === ''){
                    html += '<li>El campo '+arrayNamesEsp[i]+' no debe ser vacio.</li> \n';
                    alert.innerText = "El campo "+arrayNamesEsp[i]+" es requerido";
                    alert.style.display = 'block';
                    status = false;  
                }
            }

            if(status === false){
                var dialog = document.getElementById('content-dialog');
                dialog.innerHTML = html;
                var dialog = document.getElementById('dialog');
                dialog.style.display = 'flex';
            }else{
                var name = document.getElementById(arrayNamesForm[0]).value;
                var email = document.getElementById(arrayNamesForm[1]).value;
                
                var text = `
                    <p>Estimado <strong>${name}</strong>,</p>

                    <p>
                        Hemos recibido sus datos y nos pondremos en contacto con usted en la
                        brevedad posible. Enviaremos un correo con información a su cuenta:
                        <a href = "${email}">${email}</a>
                    </p>

                    <div class="footer-success">
                            <p>Atte</p>
                            <p class="green">Green Leaves</p>
                            <p>Monterrey, Nuevo Leon, México a 06-Mar-2021</p>
                    </div>
                `;

                var success = document.getElementById('success');
                var formContact = document.getElementById('form-contact');
                
                success.innerHTML = text;

                formContact.style.display = 'none';
                success.style.display = 'block';


            }
            
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
                    var pagraph = document.createElement('p');
                    pagraph.innerHTML = obj.name+", "+obj.adminName1+", "+obj.countryName;
                    
                    listDisplay.appendChild(pagraph);

                   /*  html += '<p onclick="setValueCity()" >'+  + '</p>\n'; */
                });

                    listDisplay.style.display = 'block';
             
            })
        }

        function setValueCity(){
            console.log("algo");
        }
}


