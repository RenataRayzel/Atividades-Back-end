const numero = document.getElementById('numero');
const btnGerar = document.getElementById('btnGerar');
const btnLimpar = document.getElementById('btnLimpar');
const btnCopiar = document.getElementById('btnCopiar');
const saida = document.getElementById('saida');

const fmt = new Intl.NumberFormat('pt-BR');

function parseBR(value) {
  if (typeof value !== 'string') return NaN;
  const normalized = value.trim().replace(/\s+/g, '').replace(',', '.');
  return parseFloat(normalized);
}

function gerar() {
  const n = parseBR(numero.value);
  saida.innerHTML = '';

  if (!Number.isFinite(n)) {
    saida.innerHTML = `<div class="empty">Digite um número válido para ver a tabuada.</div>`;
    numero.classList.add('ring');
    return;
  }
  numero.classList.remove('ring');

  const frag = document.createDocumentFragment();
  for (let i = 1; i <= 10; i++) {
    const prod = n * i;
    const div = document.createElement('div');
    div.className = 'line';
    div.innerHTML = `
      <span>${fmt.format(n)} × ${i}</span>S
      <strong>= ${fmt.format(prod)}</strong>
    `;
    frag.appendChild(div);
  }
  saida.appendChild(frag);
}

function limpar() {
  numero.value = '';
  saida.innerHTML = '<div class="empty">Aguardando um número…</div>';
  numero.focus();
  numero.classList.remove('ring');
}

async function copiar() {
  const texto = [...saida.querySelectorAll('.line')]
    .map(el => el.textContent.replace(/\s+/g, ' ').trim())
    .join('\n');
  if (!texto) return;
  try {
    await navigator.clipboard.writeText(texto);
    btnCopiar.textContent = 'Copiado!';
    setTimeout(() => (btnCopiar.textContent = 'Copiar'), 1200);
  } catch (e) {
    alert('Não foi possível copiar automaticamente. Selecione e copie manualmente.');
  }
}

btnGerar.addEventListener('click', gerar);
btnLimpar.addEventListener('click', limpar);
btnCopiar.addEventListener('click', copiar);
numero.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') gerar();
});

limpar();
