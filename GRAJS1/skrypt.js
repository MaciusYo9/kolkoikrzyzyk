 


const fieldsElements = document.querySelectorAll(".board_item");
const baner = document.querySelector(".baner");
const button = document.querySelector(".reset-button");
const player1= localStorage.getItem("player1") || "Gracz 11";
const player2= localStorage.getItem("player2") || "Gracz 22";


let fields;


let activePlayer;
let gameActive;
let score1=0;
let score2=0;

const score=()=>{
    
    if(activePlayer==="x"){
        score1+=1;  
        document.querySelector("#score1").innerHTML=player1+" wynik: "+score1;
    }
    else{
        score2+=1;
        document.querySelector("#score2").innerHTML=player2+" wynik: "+score2;
    }
    
    

};




const setDeafults=()=>{
    fields=["","","","","","","","",""];
    activePlayer="x";
    gameActive= true;
    
      
};

setDeafults();

const winningConditions=[ //tablica wygranych pozycji
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];



const validateGame= () => {
    for(let i =0;i<=7;i++){
        const [posA,posB,posC]=winningConditions[i];
        const value1 = fields[posA];
        const value2 = fields[posB];
        const value3 = fields[posC];

        if (value1!="" && value1===value2 && value1===value3){
            gameActive=false;

            // Dodanie klasy wygranepola do zwycięskich pól
            fieldsElements[posA].classList.add("winFields");
            fieldsElements[posB].classList.add("winFields");
            fieldsElements[posC].classList.add("winFields");

            const winner=activePlayer === "x" ? player1 : player2;

            baner.innerHTML="WYGRANA dla "+winner;
            score();
            return; //zatrzyma funkcje całą!!! break tylko kończył for
        }
        
              
        
    }
     // Sprawdzenie, czy wszystkie pola są pełne
     if (fields.every(field => field !== "")) {
        gameActive = false;
        baner.innerHTML = "REMIS!";
    }

};



fieldsElements.forEach((field)=>{ // wyciąga pojedyńcze pole z fiealds z ang pola
    field.addEventListener("click", e=>{

        const pos=e.target.dataset.pos;
        if(gameActive && fields[pos]===""){
            fields[pos]=activePlayer;
            e.target.classList.add(`board_item--filled-${activePlayer}`)
           
            validateGame();
            activePlayer=activePlayer === "x" ? "o" : "x"; //jeżeli będzie true to zwroci o a jak false to da x
    
        }
        

       
    });
});

const HandleButtonClick = () => {
    setDeafults();
    
    fieldsElements.forEach(filed =>{
        filed.classList.remove("board_item--filled-x","board_item--filled-o","winFields");
        baner.innerHTML="";
        
    });

};

button.addEventListener("click", HandleButtonClick);

