const btnAgeCalculator = document.querySelector('#btn-age-calc');
const day = document.querySelector('.day');
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const dayAge = document.querySelector('.days-age');
const monthAge = document.querySelector('.months-age');
const yearAge = document.querySelector('.years-age');
const spans = document.querySelectorAll('.type-age span');
const pRequired = document.querySelectorAll('.required'); 


function calculaEdad(){
/*Creamos objeto fecha*/
const fecha = new Date();
console.log(fecha);

/*nombra dia mes y año de nacimiento ingresado*/
let diaIngresado = day.value;
console.log(diaIngresado);
let mesIngresado = month.value;
console.log(mesIngresado);
let anioIngresado = year.value;
console.log(anioIngresado);


/*Crea objeto fecha de nacimiento con datos ingresados*/
const fechaNacimiento = new Date(anioIngresado,`${mesIngresado -1}`,diaIngresado);
console.log(fechaNacimiento);

/*Calcula diferencia entre fecha de nac y fecha actual en mlseg*/
let diferencia = new Date(fecha - fechaNacimiento);


const dia = diferencia.getDate() -1;
const mes = diferencia.getMonth();
const anio = diferencia.getFullYear()-1970;

    dayAge.textContent = dia;
    monthAge.textContent = mes;
    yearAge.textContent =  anio;

};

function fechaNoIngresada(){
    //En caso de que no se ingresó datos...
    day.style.borderColor = "#f09f9b";
    month.style.borderColor = "#f09f9b";
    year.style.borderColor = "#f09f9b";
    //llama a cada elemento dentro del nodo spans
    for (let i = 0; i < spans.length; i++) {
        spans[i].style.color = "#f09f9b";
    }
    for (let i = 0; i < pRequired.length; i++) {
        pRequired[i].style.display = "block";
    }
};

//Limpia el msj required de los input
function limpiar(){
day.style.borderColor = "";
month.style.borderColor = "";
year.style.borderColor = "";
//llama a cada elemento dentro del nodo spans
for (let i = 0; i < spans.length; i++) {
spans[i].style.color = "";
}
for (let i = 0; i < pRequired.length; i++) {
pRequired[i].style.display = "none";
}
};


btnAgeCalculator.addEventListener(
    'click', 
    function(){
        //Si alguna estuviera vacio null o undeffined
    if (!day.value || !month.value || !year.value){
        fechaNoIngresada();
        return;
    }else if (day.value < 1 || day.value > 31){
        pRequired[0].style.display = "block";
        pRequired[0].textContent = "Must be a valid day";
        return;
    }else if (month.value < 1 || month.value > 12){
        pRequired[1].style.display = "block";
        pRequired[1].textContent = "Must be a valid month"; 
        return;
    }else if (year.value < 1900){
        pRequired[2].style.display = "block";
        pRequired[2].textContent = "Between 1900 and 2023";
        return;
    }else if (year.value > 2023){
        pRequired[2].style.display = "block";
        pRequired[2].textContent = "Must be in the past";
        return;
    }



    // Validación de días en el mes 
    //Si la fecha ingresada es mayor a la actual tambien 
    const nacimiento = new Date(year.value, month.value - 1, day.value);
    const fechaValidacion = new Date();
    console.log(fechaValidacion)
    if(nacimiento > fechaValidacion){
        pRequired[0].style.display = "block";
        pRequired[0].textContent = "Must be a valid day";
        return;
    }

    let ultimoDiaDelMes = new Date(year.value, month.value, 0).getDate();

    if (day.value > ultimoDiaDelMes) {
        pRequired[0].style.display = "block";
        pRequired[0].textContent = "Must be a valid date";
        return;
    }
    if (nacimiento.getDate() == fechaValidacion.getDate() &&
    nacimiento.getMonth() == fechaValidacion.getMonth() &&
    nacimiento.getFullYear() == fechaValidacion.getFullYear()
    ){pRequired[0].style.display = "block";
     pRequired[0].textContent = "Today";  
    }else{
    //Adicional
    limpiar();
    calculaEdad();
    }
    });


