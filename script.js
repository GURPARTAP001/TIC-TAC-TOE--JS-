console.log(window.innerWidth);//this will give the user screen size
let audioturn = new Audio()
let gameover = new Audio()


let isgameover = false
let turn = "X";//initially it the turn of the player X

//Function to change the turn
const changeturn = () => {
    return turn === "X" ? "0" : "X"
}

//Function to check for the winner
const checkWin = () => {
    let boxText = document.getElementsByClassName('boxText');
    //we had made the array  when the winner can happen these are the box no.
    let win = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    win.forEach(e => {
        if ((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[1]].innerText) && (boxText[e[0]].innerText !== ""))
         {
            document.querySelector('.info').innerText = boxText[e[0]].innerText + " WON";
            isgameover = true;
            //bring the dancing sticker 
            document.querySelector('.imagebox').getElementsByTagName('img')[0].style.width = '200px';

            if (window.innerWidth > 950) {
                //the below code is to add the red line animation
                document.querySelector(".line").style.width = "20vw"
                document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg) `
            }

        }
    })

}

//Main game logic
let boxes = document.getElementsByClassName("box")//this will return us mutiple results
//so we have to convert it to array in order to add event lister to them
// here the "element" is the each array item
//through "forEach" we are saying that this logic is valid for all the boxes of the grid
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.boxText')//getting the text present inside the box
    //Adding the event handler
    element.addEventListener('click', () => {
        //if the box is empty the do the following
        if (boxText.innerText === '') {
            boxText.innerText = turn;
            turn = changeturn();//making it equal to as the function is return the value and we have to take that value
            audioturn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "TURN OF : " + turn;
            }
            
        }
    })
})


//Adding the onclick lister to the reset button
let reset=document.querySelector("#reset");
reset.addEventListener('click', () => {
    let boxText = document.querySelectorAll('.boxText');
    Array.from(boxText).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false
    document.getElementsByClassName("info")[0].innerText = "TURN OF : " + turn;

    //removing the dancing sticker 
    document.querySelector('.imagebox').getElementsByTagName('img')[0].style.width = '0px'
    document.querySelector(".line").style.width = "0"

})
