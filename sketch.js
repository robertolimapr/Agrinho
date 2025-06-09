let solo; // Solo da fazenda
let plantas = []; // Lista de plantas
let tempo = 60; // Tempo do jogo
let agua = 150; // Quantidade de água disponível
let energia = 120; // Energia solar disponível
let pontos = 0;
let intervaloTempo;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(16);
  
  // Inicia o cronômetro
  intervaloTempo = setInterval(() => {
    tempo--;
    if (tempo <= 0) {
      clearInterval(intervaloTempo);
      alert("Fim do jogo! Você obteve " + pontos + " pontos.");
      noLoop();
    }
  }, 1000);
  
  // Inicializa o solo
  solo = new Solo();
}

function draw() {
  background(200, 255, 200);
  
  // Desenha o solo
  solo.show();
  
  // Atualiza e desenha as plantas
  for (let i = 0; i < plantas.length; i++) {
    plantas[i].update();
    plantas[i].show();
  }
  
  // Exibe o status dos recursos e tempo
  fill(0);
  text("Água: " + agua, 100, 30);
  text("Energia Solar: " + energia, 100, 60);
  text("Tempo: " + tempo + "s", width - 100, 30);
  text("Pontos: " + pontos, width - 100, 60);
  
  // Instrução para o jogador
  text("Clique para plantar (Milho, Soja ou Trigo)", width / 2, height - 30);
  
  // Se os recursos estão baixos, penalize o jogador
  if (agua <= 0 || energia <= 0) {
    textoRecursosBaixos();
  }
}

function mousePressed() {
  // Plantar sementes nas áreas clicadas
  if (agua > 0 && energia > 0 && tempo > 0) {
    let tipo = random(["milho", "soja", "trigo"]);
    let novaPlanta = new Planta(mouseX, mouseY, tipo);
    plantas.push(novaPlanta);
    ajustaRecursos(tipo);
  }
}

function ajustaRecursos(tipo) {
  // Ajuste dos recursos com base no tipo de planta
  if (tipo === "milho") {
    agua -= 10; // O milho consome mais água
    energia -= 5; // O milho precisa de mais energia solar
  } else if (tipo === "soja") {
    agua -= 7; // A soja consome um pouco menos de água
    energia -= 3; // A soja usa menos energia solar
  } else if (tipo === "trigo") {
    agua -= 5; // O trigo consome menos água
    energia -= 4; // O trigo precisa de energia solar também
  }
  
  // Atualiza os pontos com base no uso equilibrado de recursos
  pontos += 5;
  
  // Penalidade se os recursos estiverem acabando
  if (agua <= 0 || energia <= 0) {
    pontos -= 10;
  }
}

function textoRecursosBaixos() {
  fill(255, 0, 0);
  textSize(20);
  text("Atenção: Recursos baixos! A fazenda pode sofrer!", width / 2, height / 2);
}

// Classe para o solo
class Solo {
  constructor() {
    this.x = 0;
    this.y = height - 50;
    this.largura = width;
    this.altura = 50;
  }
  
  show() {
    fill(139, 69, 19); // Cor do solo
    rect(this.x, this.y, this.largura, this.altura);
  }
}

// Classe para as plantas
class Planta {
  constructor(x, y, tipo) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.growth = 0; // Nível de crescimento
    this.maxGrowth = 100;
  }
  
  update() {
    // A planta cresce com o tempo
    if (this.growth < this.maxGrowth) {
      this.growth += 0.2;
    }
  }
  
  show() {
    // Desenha a planta com base no tipo
    if (this.tipo === "milho") {
      fill(255, 204, 0); // Cor do milho
    } else if (this.tipo === "soja") {
      fill(34, 139, 34); // Cor da soja
    } else if (this.tipo === "trigo") {
      fill(255, 204, 102); // Cor do trigo
    }
    noStroke();
    ellipse(this.x, this.y - this.growth / 2, this.growth);
  }
}
