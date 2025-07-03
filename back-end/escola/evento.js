
// Dados de login simples (apenas exemplo)
const USUARIO_PADRAO = "professor";
const SENHA_PADRAO = "1234";

// Lista de eventos (array de objetos)
let eventos = [];

// Login
function fazerlogin() {
 const usuario = document.getElementById("usuario").value;
 const senha = document.getElementById("senha").value;
 const erro = document.getElementById("erro-login");

 if (usuario === USUARIO_PADRAO && senha === SENHA_PADRAO) {
 document.getElementById("login-section").style.display = "none";
 document.getElementById("novo-evento").style.display = "block";
 } else {
 erro.textContent = "Usuário ou senha incorretos!";
 }
}

// Adicionar evento
function adicionarEvento() {
 const titulo = document.getElementById("titulo-evento").value;
 const data = document.getElementById("data-evento").value;
 const turma = document.getElementById("turma-evento").value;
 const descricao = document.getElementById("descrição-evento").value;
 const imagemInput = document.getElementById("imagem-evento");

 if (!titulo || !data || !turma || !descricao || !imagemInput.files[0]) {
 alert("Preencha todos os campos!");
 return;
 }

 const leitor = new FileReader();
 leitor.onload = function (e) {
 const imagemURL = e.target.result;

 const evento = {
 titulo,
 data,
 turma,
 descricao,
 imagem: imagemURL
 };

 eventos.push(evento);
 renderizarEventos();
 limparFormulario();
 };

 leitor.readAsDataURL(imagemInput.files[0]);
}

// Renderiza eventos na tela
function renderizarEventos(filtro = "todos") {
 const container = document.getElementById("lista-eventos");
 container.innerHTML = "";

 const filtrados = filtro === "todos" ? eventos : eventos.filter(e => e.turma === filtro);

 filtrados.forEach((evento, index) => {
 const card = document.createElement("div");
 card.className = "event";

 card.innerHTML = `
 <h3>${evento.titulo}</h3>
 <img src="${evento.imagem}" alt="Imagem do Evento" onclick="abrirImagem('${evento.imagem}')">
 <p><strong>Data:</strong> ${evento.data}</p>
 <p><strong>Turma:</strong> ${evento.turma}</p>
 <button onclick="abrirModal(${index})">Ver Detalhes</button>
 <button onclick="excluirEvento(${index})">Excluir</button>
 `;

 container.appendChild(card);
 });
}

// Limpa formulário após adicionar evento
function limparFormulario() {
 document.getElementById("titulo-evento").value = "";
 document.getElementById("data-evento").value = "";
 document.getElementById("turma-evento").value = "";
 document.getElementById("descrição-evento").value = "";
 document.getElementById("imagem-evento").value = "";
}

// Abrir modal com detalhes do evento
function abrirModal(index) {
 const evento = eventos[index];
 document.getElementById("modal-title").textContent = evento.titulo;
 document.getElementById("modal-img").src = evento.imagem;
 document.getElementById("modal-desc").textContent = evento.descricao;
 document.getElementById("modal-data").textContent = evento.data;
 document.getElementById("modal-turma").textContent = evento.turma;
 document.getElementById("modal").style.display = "block";
}

function fecharModal() {
 document.getElementById("modal").style.display = "none";
}

// Excluir evento
function excluirEvento(index) {
 if (confirm("Tem certeza que deseja excluir este evento?")) {
 eventos.splice(index, 1);
 renderizarEventos();
 }
}

// Abrir imagem ampliada
function abrirImagem(url) {
 document.getElementById("imgExpandida").src = url;
 document.getElementById("imgModal").style.display = "block";
}

function fecharImagem() {
 document.getElementById("imgModal").style.display = "none";
}

// Filtro de eventos
function filtrarEventos(turma) 
{
 renderizarEventos(turma); }