let Input;

function setup(){
    createCanvas(300,300);
    background(220);

    Input = createInput();
    Button = createButton('submit');
    Input.parent('graph-builder-container');
    Button.parent('graph-builder-container');
}

function draw(){
    Button.mousePressed(graph_draw);
}

function graph_draw(){
    background(220);
    let arestas = Input.value().split(",");

    for(let i = 0; i < arestas.length; i++){
            let par = arestas[i].split("-");
            let a = parseInt(par[0].trim());
            let b = parseInt(par[1].trim());
            text(`Vértice 1: ${a} - Vértice 2: ${b}`, 20, 50 + (i * 20));
    }
}