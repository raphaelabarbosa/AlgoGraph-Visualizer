let Input;

function setup(){
    let canvas = createCanvas(500,500);
    background(220);
    canvas.parent('canvas-side'); 

    Input = createInput();
    Input.parent('graph-builder-container');

    // Opções de geração do grafo
    layoutRadio = createRadio();
    layoutRadio.parent('graph-builder-container');

    layoutRadio.option('random', 'Random');
    layoutRadio.option('layer', 'Layered');

    layoutRadio.selected('random'); // padrão

    Button = createButton('submit');
    Button.parent('graph-builder-container');

    Button.mousePressed(graph_draw);
}

function graph_draw(){
    background(220);

    let graph_input = Input.value().split(","); //Separando valores do input em um array: string "n, v1-v2, v3-v2,...""
    let adj_map = new Map(); //Map de adjacência
    let pos = new Map(); //Posições dos vértices
    let selectedLayout = layoutRadio.value(); //Tipo de geração grafos

    // let n = parseInt(graph_input[0].trim()); //Número de vértices
    //console.log(n);

    // Separa vértices únicos e ordena em ordem crescente.
    for(let i = 0; i < graph_input.length; i++){ 
        let edge = graph_input[i].split("-").map(x => parseInt(x.trim())); //edge = {x1,x2}
        //console.log(edge);

        if (!adj_map.has(edge[0])) {
            adj_map.set(edge[0], []);
        }

        if (!adj_map.has(edge[1])) {
            adj_map.set(edge[1], []);
        }

        adj_map.get(edge[0]).push(edge[1]);
        adj_map.get(edge[1]).push(edge[0]);
    }

    //Funções //////////////////////////////////

    const layer_vertices = () =>{
        let vis = new Set();
        // let pai = new Map();

        const bfs = (x) =>{
            let queue = [];
            let head = 0;
            vis.add(x);
            queue.push(x);
            // pai.set(v, null);

            //Setar posição -  centro
            pos.set(x, {
                x: random(100, width - 100),
                y: random(100, height - 100)
            });

            while(head < queue.length){
                let v = queue[head]; head++;
                for(const viz of adj_map.get(v)){
                    if(!vis.has(viz)){
                        // pai.set(viz, v);
                        vis.add(viz);
                        queue.push(viz);

                        //Setar posição
                        pos.set(viz, {
                            x: pos.get(v).x + random(-100,100),
                            y: pos.get(v).y + 100
                        });
                    }
                }
            }
        }

        for(const x of adj_map.keys()){
            if(!vis.has(x)){
                bfs(x);
            }
        }
    }

    const random_vertices = () =>{
        //Posições randomicas
        for (const v of adj_map.keys()) {
            pos.set(v, {
                x: random(25, width - 25),
                y: random(25, height - 25)
            });
        }
    }

    const draw_edge = () =>{
        //Desenha as arestas O(n+m)
        for (const [v, vizinhos] of adj_map) {
            let p = pos.get(v);

            for (const viz of vizinhos) {
                if (v < viz) {
                    let pz = pos.get(viz);
                    line(p.x, p.y, pz.x, pz.y);
                }
            }
        }
    }

    const draw_vertices = () =>{
        //Desenha os vértices O(n)
        let diametro = 25;
        for (const v of adj_map.keys()) {
            let p = pos.get(v);
            fill(255); 
            stroke(0);
            circle(p.x, p.y, diametro);
            fill(0); 
            textSize(10);
            textAlign(CENTER, CENTER);
            text(v, p.x, p.y);
        }
    }

    if (selectedLayout === 'random') {
        random_vertices();
    }
    else if (selectedLayout === 'layer') {
        layer_vertices();
    }

    draw_edge();
    draw_vertices();
}