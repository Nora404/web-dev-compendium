const obj01 = {
    text: "Eins",
    digit: 1,
}

const obj02 = {
    text: "Zwei",
    digit: 2,
}

const obj03 = {
    text: "Drei",
    digit: 3,
}

function createObject(type){
    switch (type) {
        case 1:
            return obj01;
        case 2:
            return obj02;
        case 3:
            return obj03;
        default:
            return null;
    }
}

function renderObject(type){
    const element = document.getElementById("fabric");
    const object = createObject(type);

    element.innerHTML = `${object.text} / ${object.digit}`;
}