
const cssVariables = document.querySelector(':root');
const ORIGINAL_SIZE = parseInt(getComputedStyle(cssVariables).getPropertyValue('--size').replace('px', ''));
const START_HEIGHT = parseInt(getComputedStyle(cssVariables).getPropertyValue('--height').replace('px', ''));
const START_GAP = parseInt(getComputedStyle(cssVariables).getPropertyValue('--gap').replace('px', ''));

const ORIGINAL_SIZE_HOURS = ORIGINAL_SIZE - START_GAP;
const ORIGINAL_SIZE_MINUTES = ORIGINAL_SIZE - START_GAP * 2;
const ORIGINAL_SIZE_SECONDS = ORIGINAL_SIZE - START_GAP * 3;

// get colors
const COLORS = [
    getComputedStyle(cssVariables).getPropertyValue('--zero-to-ten-color'),
    getComputedStyle(cssVariables).getPropertyValue('--ten-to-twenty-color'),
    getComputedStyle(cssVariables).getPropertyValue('--twenty-to-thirty-color'),
    getComputedStyle(cssVariables).getPropertyValue('--thirty-to-forty-color'),
    getComputedStyle(cssVariables).getPropertyValue('--forty-to-fifty-color'),
    getComputedStyle(cssVariables).getPropertyValue('--fifty-to-sixty-color')

];

// set initial size
cssVariables.style.setProperty('--hours-size', ORIGINAL_SIZE_HOURS + 'px');
cssVariables.style.setProperty('--minutes-size', ORIGINAL_SIZE_MINUTES + 'px');
cssVariables.style.setProperty('--seconds-size', ORIGINAL_SIZE_SECONDS + 'px');

/*
    Change Time
*/
function changeTime(type, control, originalSize, originalGap) {
    // set color
    const setColor = Math.floor(control / 10);
    cssVariables.style.setProperty('--' + type + '-color', COLORS[setColor]);
    if(control % 10 !== 0){
        let setSize;
        if(control >= 10){
            setSize = parseInt(control.toString()[1]);
        }else {
            setSize = control;
        }
        spacing(type, cssVariables, originalGap, setSize + 1);
        cssVariables.style.setProperty('--' + type + '-size', originalSize + ((originalGap / 10) * (setSize)) + 'px');
    }else{
        spacing(type, cssVariables, originalGap, 1);
        cssVariables.style.setProperty('--' + type + '-size', originalSize + ((originalGap / 10) * (0)) + 'px');
    }
}

/*
    Spacing
    - Manages the spacing of the triangles
*/
function spacing(type, cssVariables, originalGap, setSize) {
    if(type === 'minutes'){
        // if it's "minutes", update the seconds as well
        const height = parseInt(getComputedStyle(cssVariables).getPropertyValue('--' + 'seconds' + '-height').replace('px', ''));
        cssVariables.style.setProperty('--' + 'seconds' + '-height', height + ((originalGap / 10) * (setSize)) / 2 + 'px');
    }else if(type === 'hours'){
        // if it's "hours", update the minutes as well
        const height = parseInt(getComputedStyle(cssVariables).getPropertyValue('--' + 'minutes' + '-height').replace('px', ''));
        cssVariables.style.setProperty('--' + 'minutes' + '-height', height + ((originalGap / 10) * (setSize)) / 2 + 'px');
    }
    const height = parseInt(getComputedStyle(cssVariables).getPropertyValue('--' + type + '-height').replace('px', ''));
    cssVariables.style.setProperty('--' + type + '-height', height - ((originalGap / 10) * (setSize)) / 2 + 'px');
}

/*
    Update Time
*/
function updateTime() {
    seconds++;
    if(seconds === 60){
        seconds = 0;
        minutes++;
    }
    if(minutes === 60){
        minutes = 0;
        hours++;
    }
    if(hours === 24){
        hours = 0;
    }

    cssVariables.style.setProperty('--' + 'seconds' + '-height', START_HEIGHT + 'px');
    cssVariables.style.setProperty('--' + 'minutes' + '-height', START_HEIGHT + 'px');
    cssVariables.style.setProperty('--' + 'hours' + '-height', START_HEIGHT + 'px');
    changeTime('seconds', seconds, ORIGINAL_SIZE_SECONDS, START_GAP);
    changeTime('minutes', minutes, ORIGINAL_SIZE_MINUTES, START_GAP);
    changeTime('hours', hours, ORIGINAL_SIZE_HOURS, START_GAP);
}

// get time
const nowTime = new Date();
let hours = nowTime.getHours();
let minutes = nowTime.getMinutes();
let seconds = nowTime.getSeconds();

// inital setup
updateTime();

// every second
setInterval(updateTime, 1000);