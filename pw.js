// Aqui estamos pegando algumas coisinhas da página, como botões e caixas de texto
// para mexermos nelas mais tarde

const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $categoriesContainer = document.querySelector(".categories-container");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".questions-container .question");
const $answersContainer = document.querySelector(".answers-container");
const $categories = document.querySelectorAll(".category");

// Aqui estamos criando algumas variáveis para sabermos em que ponto do jogo estamos
let currentQuestionIndex = 0;
let totalCorrect = 0;
let totalScore = 0; // Adicionamos a variável para a pontuação total
let selectedCategory = "";
let filteredQuestions = [];

// Quando o jogador clicar em "Começar", o jogo vai começar!
$startGameButton.addEventListener("click", startGame);

// Quando o usuario clicar em "Próxima pergunta", vamos mostrar a próxima pergunta
$nextQuestionButton.addEventListener("click", displayNextQuestion);

// Quando o usuario clicar em uma categoria, vamos filtrar as perguntas e mostrar a primeira
$categories.forEach(category => {
    category.addEventListener("click", () => {
        selectedCategory = category.dataset.category;
        filteredQuestions = questions.filter(q => q.category === selectedCategory);
        $categoriesContainer.classList.add("hide");
        $questionsContainer.classList.remove("hide");
        displayNextQuestion();
    });
});

// Essa função inicia o jogo
function startGame() {
    $startGameButton.classList.add("hide");
    $categoriesContainer.classList.remove("hide");
}

// Essa função mostra a próxima pergunta
function displayNextQuestion() {
    resetState(); // Limpa o estado das respostas
  
 // Se já mostramos todas as perguntas da categoria, finalizamos o jogo
    if (filteredQuestions.length === currentQuestionIndex) {
        return finishGame();
    }
    
    // Exibimos o texto da próxima pergunta
    $questionText.textContent = filteredQuestions[currentQuestionIndex].question;
    filteredQuestions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button"); // Criamos um botão para cada resposta
        newAnswer.classList.add("button", "answer"); // Colocamos o texto da resposta no botão
        newAnswer.textContent = answer.text;
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct; // Se for a resposta correta, marcamos o botão
        }
        $answersContainer.appendChild(newAnswer); // Adicionamos o botão ao container de respostas
        newAnswer.addEventListener("click", selectAnswer);// Quando o jogador clicar, vamos ver se a resposta está certa
    });
}

//Reinicia o estado das respostas
function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild); // Remove as respostas anteriores
    }

    document.body.removeAttribute("class");
    $nextQuestionButton.classList.add("hide");
}

// Quando o jogador escolher uma resposta, vamos ver se está certa ou errada
function selectAnswer(event) {
    const answerClicked = event.target;

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        totalCorrect++; // Se a resposta estiver correta, aumentamos o número de respostas corretas
        totalScore += 10; // Adicionamos 10 pontos para resposta correta
    } else {
        document.body.classList.add("incorrect"); 
        totalScore -= 5; // Subtraímos 5 pontos para resposta errada
    }

    document.querySelectorAll(".answer").forEach(button => {
        button.disabled = true;

        if (button.dataset.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });
  
    $nextQuestionButton.classList.remove("hide"); 
    currentQuestionIndex++;
}

// Essa função finaliza o jogo e mostra a pontuação final
function finishGame() {
    const totalQuestions = filteredQuestions.length;
    const performance = Math.floor(totalCorrect * 100 / totalQuestions);
  
    let message = ""; // Inicializamos uma mensagem de feedback para o jogador

     // Aqui é decidido qual mensagem mostrar, levando em consideração a quantidade de acertos pelo usuário
    switch (true) {
        case (performance >= 90):
            message = "Excelente :)";
            break;
        case (performance >= 70):
            message = "Muito bom :)";
            break;
        case (performance >= 50):
            message = "Bom";
            break;
        default:
            message = "Pode melhorar :(";
    }
// Aqui exibimos a pontuação final e o feedback
    $questionsContainer.innerHTML = 
    `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestions} questões!
            <br>
            Sua pontuação final é: ${totalScore} pontos!
            <span>Resultado: ${message}</span>
        </p>
        <button 
            onclick=window.location.reload() 
            class="button"
        >
            Refazer teste
        </button>
    `;
}

const questions = [
    {
        category: "FILMES",
        question: "Qual é o nome do famoso ogro verde protagonista da série de filmes de animação da DreamWorks?",
        answers: [
            { text: "Pocahontas", correct: false },
            { text: "Simba", correct: false },
            { text: "Shrek", correct: true },
            { text: "Aladdin", correct: false },
            { text: "Elsa", correct: false }
        ]
    },
    {
        category: "FILMES",
        question: "Qual é a franquia de filmes de aventura que tem como protagonista o famoso Capitão Jack Sparrow?",
        answers: [
            { text: "O Rei dos Mares", correct: false },
            { text: "Harry Potter", correct: false },
            { text: "Piratas do Caribe", correct: true },
            { text: "Homem-Aranha", correct: false },
            { text: "Senhor dos Aneis", correct: false }
        ]
    },
    {
        category: "FILMES",
        question: "Qual super-herói verde da Marvel é conhecido por sua força sobre-humana e poder de regeneração?",
        answers: [
            { text: 'Homem de Ferro', correct: false },
            { text: 'Capitão America', correct: false },
            { text: 'Thor', correct: false },
            { text: 'Hulk', correct: true },
            { text: 'Homem-Aranha', correct: false }
        ]
    },
    {
        category: "FILMES",
        question: 'Qual o nome de filme da Disney que conta a história de uma princesa com seu longo cabelo mágico?',
        answers: [
            { text: "A Bela e a Fera", correct: false },
            { text: "Frozen", correct: false },
            { text: "Moana", correct: false },
            { text: "Rei Leão", correct: false },
            { text: "Enrolados", correct: true }
        ]
    },
    {   category: "FILMES",
        question: 'Qual filme de aventura e ação dirigido por Steven Spielberg apresenta dinossauros recriados geneticamente em um parque temático?',
        answers: [
          { text: 'Titanic', correct: false },
          { text: 'O mágico de OS', correct: false },
          { text: 'Moana', correct: false },
          { text: 'X-men', correct: false },
          { text: 'Jurassic Park', correct: true }]
  },
  {
         category: "JOGOS",
    question: 'Em qual jogo você navega por um labirinto de blocos, destruindo inimigos e obstáculos com bombas?',
    answers: [
        { text: "Sonic", correct: false },
        { text: "Free fire", correct: false },
        { text: "Minecraft", correct: false },
        { text: "Pou", correct: false },
        { text: "Bomberman", correct: true }]
},
{
    category: "JOGOS",
    question: 'Em qual jogo tem um ouriço azul super rápido, conhecido por suas aventuras em jogos de plataforma?',
    answers: [
        { text: "Pubg mobile", correct: false },
        { text: "Candy Crush", correct: false },
        { text: "Sonic", correct: true },
        { text: "Free fire", correct: false },
        { text: "Minecraft", correct: false }]  
},
{
    category: "JOGOS",
    question: 'É um popular jogo de tiro e sobrevivência disponível em dispositivos móveis. Os jogadores são colocados em uma ilha remota e competem contra outros 49 jogadores  em partidas de 10 minutos.',
    answers: [
        { text: "Clash Royale", correct: false },
        { text: "Free fire", correct: true },
        { text: "Angry birds", correct: false },
        { text: "Mortal combate", correct: false },
        { text: "Bomberman", correct: false }]  
},
{
    category: "JOGOS",
    question: ' É um mundo de blocos onde você pode explorar, sobreviver à noite e criar tudo o que imaginar. Ele oferece modos de jogo como sobrevivência, aventura e educação.',
    answers: [
        { text: "Pou", correct: false },
        { text: "Angry birds", correct: false },
        { text: "Planta vs Zumbi", correct: false },
        { text: "Chash royale", correct: false },
        { text: "Minecraft", correct: true }]  
},
{
    category: "JOGOS",
    question: 'Qual destes é um popular jogo de corrida infinita para dispositivos móveis?',
    answers: [
        { text: "Angry birds", correct: false },
        { text: "Candy chush", correct: false },
        { text: "Temple run", correct: false },
        { text: "Subway surfs", correct: true },
        { text: "Clash royale", correct: false }]  
},
{
    category: "LIVROS",
    question: 'Em que livro os protagonistas compartilham a mesma condição médica mantendo uma distância de 5 passos?',
    answers: [
        { text: "A metamorfose", correct: false },
        { text: "Um estudo em vermelho", correct: false },
        { text: "Por lugares incriveis", correct: false },
        { text: "Teto para Dois", correct: false },
        { text: "A cinco passos de você", correct: true }]  
},
{
    category: "LIVROS",
    question: 'Em qual livro o protagonista descobre que é filho de um deus grego?',
    answers: [
        { text: "Alice no pais das Maravilhas", correct: false },
        { text: "Assassinato no Expresso do Oriente", correct: false },
        { text: "Ariel", correct: false },
        { text: "Crepúsculo", correct: false },
        { text: "Drácula", correct: true }]  
},
{
    category: "LIVROS",
    question: '"É Assim Que Acaba" aborda temas profundos e emocionantes. Qual é o tema central deste livro?',
    answers: [
        { text: "Terror", correct: false },
        { text: "Morte", correct: false },
        { text: "Amizade", correct: false },
        { text: "Abuso", correct: true },
        { text: "Drama", correct: false }]  
},
{
    category: "LIVROS",
    question: 'No livro "The Love Hypothesis" de Ali Hazelwood, qual é a profissão da protagonista, Olive Smith?',
    answers: [
        { text: "Advogada", correct: false },
        { text: "Médica", correct: false },
        { text: " Estudante de doutorado em biologia", correct: true },
        { text: "Engenheira", correct: false },
        { text: "Física Teórica", correct: false }]  
},
{
    category: "LIVROS",
    question: 'Qual é o nome da série de livros, que conta a história de um jovem bruxo e suas aventuras na escola de mágia e bruxaria de Hogwarts?',
    answers: [
        { text: "Os Senhor dos Aneis", correct: false },
        { text: "As Cronicas de Narnia", correct: false },
        { text: "Percy Jackson", correct: false },
        { text: "A Crônica de Gelo e Fogo", correct: false },
        { text: "Harry Potter", correct: true }]  
},
{
    category: "ESPORTES",
    question: 'Qual esporte é conhecido por ter as funções de: atacante, cortador, levantador, bloqueador, jogador de defesa, líbero , e envolve duas equipes que tentam fazer a bola tocar o chão no lado adversário enquanto a quadra é dividida por uma rede?',
    answers: [
        { text: "Vôlei", correct: true },
        { text: "Basquete", correct: false },
        { text: "Tênis", correct: false },
        { text: "Futebol", correct: false },
        { text: "Natação", correct: false }]  
},
{
    category: "ESPORTES",
    question: 'Em qual esporte os competidores nadam em piscinas, usando diferentes estilos de nado, e podem competir individualmente ou em equipe, buscando percorrer uma certa distância o mais rápido possível?',
    answers: [
        { text: "Vôlei", correct: false },
        { text: "Basquete", correct: false },
        { text: "Tênis", correct: false },
        { text: "Futebol", correct: false },
        { text: "Natação", correct: true }]  
},
{
    category: "ESPORTES",
    question: 'Qual esporte envolve driblar uma bola com as mãos e fazer pontos ao arremessá-la em um aro elevado?',
    answers: [
        { text: "Beisebol", correct: false },
        { text: "Ping-Pong", correct: false },
        { text: "Boliche", correct: false },
        { text: "Basquete", correct: true},
        { text: "Paraquedismo", correct: false }]  
},
{
    category: "ESPORTES",
    question: 'Qual esporte envolve o uso de raquetes para golpear uma bola por cima de uma rede e pontuar, em uma quadra dividida em duas metades?',
    answers: [
        { text: "Volei", correct: false },
        { text: "Basquete", correct: false },
        { text: "Tênis", correct: true },
        { text: "Futebol", correct: false },
        { text: "Natação", correct: false }]  
},
{
    category: "ESPORTES",
    question: 'Qual é o esporte em que os jogadores usam os pés para controlar uma bola, tentam marcar gols em um campo retangular, e o jogo dura em média 90 minutos, dividido em dois tempos, com acréscimos no final de cada tempo?',
    answers: [
        { text: "Volei", correct: false },
        { text: "Basquete", correct: false },
        { text: "Tênis", correct: false },
        { text: "Futebol", correct: true },
        { text: "Natação", correct: false }]  
},
{
    category: "ARTISTAS",
    question: `Qual e o nome da famosa cantora e compositora conhecida por sucessos como Summertime Sadness  Young and Beaultiful`,
    answers: [
        { text: "Adele", correct: false },
        { text: "Taylor Swift", correct: false },
        { text: "Rihanna", correct: false },
        { text: "Lana Del Rey", correct: true },
        { text: "Beyonce", correct: false }]  
},
{
    category: "ARTISTAS",
    question: 'Qual o personagem de Roberto Gómez Bolaños interpretou que é conhecido como um super herói atrapalhado?',
    answers: [
        { text: "Capitão America", correct: false },
        { text: " Chapolin Colorado", correct: true },
        { text: "Homem de Ferro", correct: false },
        { text: "Homem Aranha", correct: false },
        { text: "Super-Choque", correct: false }]  
},
{
    category: "ARTISTAS",
    question: 'Qual empresário é conhecido por ser o CEO da SpaceX e da Tesla, além de ter fundado a Neuralink e a The Boring Company?',
    answers: [
        { text: "Elon Musk", correct: true },
        { text: "Gustavo Lima", correct: false },
        { text: "Bill Gates", correct: false },
        { text: "Steve Jobs", correct: false },
        { text: "Mark Zuckerberg", correct: false}]  
},
{
    category: "ARTISTAS",
    question: 'Qual personalidade brasileira é reconhecida por seu trabalho como YouTuber, empresário, escritor e ativista, tendo um canal com milhões de inscritos e um grande impacto nas redes sociais?',
    answers: [
        { text: "Whindersson Nunes", correct: false },
        { text: "Anitta ", correct: false },
        { text: "Felipe Neto", correct: true },
        { text: "Larissa Manoela  ", correct: false },
        { text: "Ludmilla", correct: false }]  
},
{
    category: "ARTISTAS",
    question: 'Qual é o nome do icônico cantor, compositor e dançarino conhecido como o "Rei do Pop"?',
    answers: [
        { text: "Michael Jackson", correct: true },
        { text: "Whitney Houston", correct: false },
        { text: "Madonna", correct: false },
        { text: "Elton John", correct: false },
        { text: "Beyoncé", correct: false }]  
},
]
