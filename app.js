// async function getStarWarsFilms() {
//     console.log("starting")
//     let movieData = await axios.get(
//         "https://swapi.dev/api/films/");
    
//         console.log("all done!");
//         console.log(movieData.data);
// }

// getStarWarsFilms();


// const h1 = document.querySelector('h1')

// function changeColor(el, color) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             el.style.color = color;
//             resolve()
//         }, 1000)
//     })
// }

// async function rainbow(el){
//     await changeColor(el, 'red')
//     await changeColor(el, 'orange')
//     await changeColor(el, 'yellow')
//     await changeColor(el, 'green')
//     await changeColor(el, 'blue')
//     await changeColor(el, 'indigo')
//     await changeColor(el, 'violet')
// }

// rainbow(h1)

// const deck = {
//     async init() {
//         let res = await axios.get("https://deckofcardsapi.com/api/deck/new/?deck_count=1");
//         this.deckId = res.data.deck_id;
//     },
//     async shuffle() {
//         let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`)
//         console.log(res);
//     },
//     async drawCard() {
//         let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
//         console.log(res.data)
//     }
// }

// class Pokemon {
//     constructor(id){
//         this.id = id;
//         this.types = []
//     }
//     async getInfo() {
//        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
//        this.name = res.data.name;
       
//        for(let type of res.data.types) {
//         this.types.push(type.type.name)
//         console.log(this.types)
//        }
//     }
// }

// function getThreePokemon(){
//     let baseURL = "https://pokeapi.co/api/v2/pokemon";
//     axios.get(`${baseURL}/1`)
//     .then(({data}) => {
//         console.log(`The first pokemon is ${data.name}`);
//         return axios.get(`${baseURL}/2`)
//     })
//     .then(({data}) => {
//         console.log(`The second pokemon is ${data.name}`);
//         return axios.get(`${baseURL}/3`)
//     })
//     .then(({data}) => {
//         console.log(`The third pokemon is ${data.name}`)
//     })
//     .catch(err => console.log(err))
// }


// async function getThreePokemonAsync(){
//     let baseURL = "https://pokeapi.co/api/v2/pokemon";
//     let {data: p1} = await axios.get(`${baseURL}/1`)
//     console.log(p1.name)
//     let {data: p2} = await axios.get(`${baseURL}/2`)
//     console.log(p2.name)
//     let {data: p3} = await axios.get(`${baseURL}/3`)
//     console.log(p3.name)
// }

// async function catchSomeOfEmParallel() {
//     let baseURL = "https://pokeapi.co/api/v2/pokemon";
    
//     let pokemon = await Promise.all([
//         axios.get(`${baseURL}/1/`),
//         axios.get(`${baseURL}/2/`),
//         axios.get(`${baseURL}/3/`)
//     ]);
    
//     console.log(`The first pokemon is ${pokemon[0].data.name}`);
//     console.log(`The second pokemon is ${pokemon[1].data.name}`);
//     console.log(`The third pokemon is ${pokemon[2].data.name}`)
// }

// catchSomeOfEmParallel();


//Part 1

//1

// baseURL = 'http://numbersapi.com'

// async function getNumFact(num) {
// let res = await axios.get(`${baseURL}/${num}?json`)
// console.log(res.data.text)
// }


//2

// baseURL = 'http://numbersapi.com'
// const ul = document.getElementById('facts')

// async function getNumFact(num1, num2, num3) {
// let res = await axios.get(`${baseURL}/${num1},${num2},${num3}?json`);

// for (const fact in res.data) {
//     let li = document.createElement('li');
//     li.innerText = res.data[fact]
//     ul.append(li)
// }

// }


//3

// async function getFourNumFacts(num) {
//     const ul = document.getElementById('facts')
//     baseURL = 'http://numbersapi.com';

//     let facts = await Promise.all([
//         axios.get(`${baseURL}/${num}?json`),
//         axios.get(`${baseURL}/${num}?json`),
//         axios.get(`${baseURL}/${num}?json`),
//         axios.get(`${baseURL}/${num}?json`)
//     ]);

//     for(let i = 0; i < facts.length; i++) { 
//         let li = document.createElement('li');
//         li.innerText = facts[i].data.text;
//         ul.append(li);
//     };

// }

//Part 2

//1

// async function draw() {
//     let res = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
//     console.log(res.data.cards[0].value + ' of ' + res.data.cards[0].suit);
// }


//2

// async function drawTwoCards() {
    
//     let res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
//     let deck_id = res.data.deck_id;

//     let cardData = await Promise.all([
//         axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`),
//         axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
//     ]);

//     for(let i = 0; i < cardData.length; i++) {
//         console.log(cardData[i].data.cards[0].value + ' of ' + cardData[i].data.cards[0].suit)
//     }
// }


//3

let deck_id = null

const deck = {
    async init() {
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
        this.deck_id = res.data.deck_id
    },
    async drawCard() {
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=1`);

        if(res.data.remaining > 0) {
            displayCards(res.data)

        } else {

            let btn = document.getElementById('draw-card');
            btn.style.display = "none";
        }
    }
}

function displayCards(cardData){

    let div = document.createElement('div');
    div.classList.add('card-container');

    let img = document.createElement('img')
    img.setAttribute('src', cardData.cards[0].image);

    document.getElementById('pile').appendChild(div);
    div.append(img);
}

$('document').ready(() => {
    deck.init();
})

$('#draw-card').on("click", function() {
    $('#pile').empty();
    deck.drawCard();
})
