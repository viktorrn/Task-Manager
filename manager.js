//https://theasciicode.com.ar/

const maxStringSize = 1024;



var cursor_manager = {
    position: 0,
    cursorStyle: "|",
    cursor: "|",
}

var keyboard_manager = {
    lastpressed: 0,
    alt: false,
    ctrl: false,
    highcaseActive: true,
    inputHistory: [],
}

document.addEventListener('keydown', function(event) {
    parseInput(event.keyCode);
    drawString();
});

function parseInput(input)
{
    console.log(input);
    keyboard_manager.lastpressed = 0;
    cursor_manager.cursor = "_";
    switch(input)
    {
        case 8:
            if(cursor_manager.position > 0)
            {
                keyboard_manager.inputHistory.pop();
                cursor_manager.position--;
            }
            
            break;
        case 9:
        case 13:
        case 32:
            addChar(String.fromCharCode(input));
            break;
        default:
            if(input >= 48)
            addChar(String.fromCharCode(input));
            break;
    }
}

function addChar(c) { 
    keyboard_manager.inputHistory.push(c);
    cursor_manager.position++;
}

function drawString()
{
    let resString = "";
    for(let s in keyboard_manager.inputHistory)
    {
        resString += keyboard_manager.inputHistory[s];
        if(s == cursor_manager.position-1) resString += cursor_manager.cursor;
    }

    if(keyboard_manager.inputHistory.length == 0)
        resString += cursor_manager.cursor;
        
    document.getElementById('output').innerText = resString;

}

// init

var cursorBlink = setInterval(()=>{
    if(keyboard_manager.lastpressed < 0.5) return;
    if(cursor_manager.cursor == "")
        cursor_manager.cursor = "_";
    else    
        cursor_manager.cursor = "";
    
    drawString();
},600)

var tickTime = setInterval(()=>{
    keyboard_manager.lastpressed += 0.1;
},100)
