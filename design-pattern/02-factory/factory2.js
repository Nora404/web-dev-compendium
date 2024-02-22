const objects = {
    1: {text: "Eins", digit:1},
    2: {text: "Zwei", digit:2},
    3: {text: "Drei", digit:3},
}

function createObject(type){
    return objects[type];
}

function renderObject(type){
    const element = document.getElementById("fabric");
    const object = createObject(type);

    if(object){
        element.innerHTML = `${object.text} / ${object.digit}`;
    } else {
        return null;
    }
}

