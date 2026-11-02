/* =========================================================
   TCC Jennifer — moldura comum das páginas
   - escala o slide para caber na tela
   - injeta logo UNIP, pontilhado dos cantos e número da página
   - barra de navegação + painel com todas as páginas
   - setas do teclado / swipe para navegar
   ========================================================= */
(function () {
  var PAGINAS = [
    { n: 1,  arquivo: 'index.html',                                titulo: 'Capa' },
    { n: 2,  arquivo: 'paginas/02-tema-e-contextualizacao.html',   titulo: 'Tema e contextualização' },
    { n: 3,  arquivo: 'paginas/03-pergunta-de-pesquisa.html',      titulo: 'Pergunta de pesquisa' },
    { n: 4,  arquivo: 'paginas/04-justificativa.html',             titulo: 'Justificativa' },
    { n: 5,  arquivo: 'paginas/05-objetivos.html',                 titulo: 'Objetivos' },
    { n: 6,  arquivo: 'paginas/06-referencial-teorico.html',       titulo: 'Referencial teórico' },
    { n: 7,  arquivo: 'paginas/07-metodologia.html',               titulo: 'Metodologia' },
    { n: 8,  arquivo: 'paginas/08-big-techs.html',                 titulo: 'Big Techs e colonialismo digital' },
    { n: 9,  arquivo: 'paginas/09-infraestrutura-digital.html',    titulo: 'A concentração da infraestrutura digital' },
    { n: 10, arquivo: 'paginas/10-caso-worldcoin.html',            titulo: 'O caso Worldcoin' },
    { n: 11, arquivo: 'paginas/11-consideracoes-finais.html',      titulo: 'Considerações finais e conclusão' },
    { n: 12, arquivo: 'paginas/12-referencias.html',               titulo: 'Referências' },
    { n: 13, arquivo: 'paginas/13-obrigada.html',                  titulo: 'Obrigada!' },
    { n: 14, arquivo: 'paginas/14-trabalho-completo.html',         titulo: 'Trabalho completo (PDF)' }
  ];

  var body = document.body;
  var atual = parseInt(body.getAttribute('data-pagina'), 10) || 1;
  var raiz = body.getAttribute('data-raiz') || '';
  var slide = document.querySelector('.slide');
  var url = function (p) { return raiz + p.arquivo; };

  /* ---------- Pontilhado (meio-tom em ondas) ---------- */
  function pontilhado(classe) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'dots ' + classe);
    svg.setAttribute('viewBox', '0 0 230 210');
    svg.setAttribute('aria-hidden', 'true');
    /* linhas de pontos em onda, que somem em direção ao centro do slide */
    for (var row = 0; row < 24; row++) {
      for (var col = 0; col < 28; col++) {
        var x = 230 - col * 9;
        var y = row * 9.5 + Math.sin(col / 3.4 + row / 6) * 9 + col * 2.2;
        var d = Math.sqrt(Math.pow((230 - x) / 235, 2) + Math.pow(y / 215, 2));
        var r = 2.3 * (1 - d);
        if (r < 0.45 || y > 210 || y < 0) continue;
        var c = document.createElementNS(ns, 'circle');
        c.setAttribute('cx', x.toFixed(1));
        c.setAttribute('cy', y.toFixed(1));
        c.setAttribute('r', r.toFixed(2));
        svg.appendChild(c);
      }
    }
    return svg;
  }

  function logo() {
    var d = document.createElement('div');
    d.className = 'logo-unip' + (atual === 1 ? '' : ' suave');
    d.setAttribute('aria-label', 'UNIP — Universidade Paulista');
    d.innerHTML = '<div class="unip">UNIP</div><div class="faixa">UNIVERSIDADE PAULISTA</div>';
    return d;
  }

  if (slide && !slide.hasAttribute('data-sem-moldura')) {
    slide.prepend(pontilhado('bl'));
    slide.prepend(pontilhado('tr'));
    slide.appendChild(logo());
    var num = document.createElement('div');
    num.className = 'numero';
    num.textContent = atual;
    slide.appendChild(num);
  }

  /* ---------- Escala ---------- */
  function escalar() {
    var w = window.innerWidth - 24;
    var h = window.innerHeight - 64 - 24;
    var s = Math.min(w / 1280, h / 720);
    document.documentElement.style.setProperty('--scale', s.toFixed(4));
  }
  escalar();
  window.addEventListener('resize', escalar);

  /* ---------- Navegação ---------- */
  var ant = PAGINAS[atual - 2];
  var prox = PAGINAS[atual];

  var nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML =
    '<a class="marca" href="' + raiz + 'index.html">TCC JENNIFER</a>' +
    '<div class="centro">' +
      '<a class="btn' + (ant ? '' : ' desativado') + '" href="' + (ant ? url(ant) : '#') + '" aria-label="Página anterior">&#8592;<span class="txt"> Anterior</span></a>' +
      '<span class="contador">' + atual + ' / ' + PAGINAS.length + '</span>' +
      '<a class="btn' + (prox ? '' : ' desativado') + '" href="' + (prox ? url(prox) : '#') + '" aria-label="Próxima página"><span class="txt">Próxima </span>&#8594;</a>' +
    '</div>' +
    '<div class="dir">' +
      '<button type="button" data-acao="paginas" aria-label="Ver todas as páginas">&#9638;<span class="txt"> Páginas</span></button>' +
      '<button type="button" data-acao="tela" aria-label="Tela cheia">&#x26F6;</button>' +
    '</div>';
  body.appendChild(nav);

  var painel = document.createElement('div');
  painel.className = 'painel';
  painel.innerHTML = '<div class="grade">' + PAGINAS.map(function (p) {
    return '<a href="' + url(p) + '"' + (p.n === atual ? ' class="atual"' : '') + '><span>Página ' + p.n + '</span><strong>' + p.titulo + '</strong></a>';
  }).join('') + '</div>';
  body.appendChild(painel);

  nav.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.acao === 'paginas') painel.classList.toggle('aberto');
    if (b.dataset.acao === 'tela') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
  });
  painel.addEventListener('click', function (e) { if (e.target === painel) painel.classList.remove('aberto'); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { if (prox) location.href = url(prox); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { if (ant) location.href = url(ant); }
    else if (e.key === 'Home') location.href = url(PAGINAS[0]);
    else if (e.key === 'End') location.href = url(PAGINAS[PAGINAS.length - 1]);
    else if (e.key === 'Escape') painel.classList.remove('aberto');
  });

  /* swipe no celular */
  var x0 = null;
  document.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 60) {
      if (dx < 0 && prox) location.href = url(prox);
      if (dx > 0 && ant) location.href = url(ant);
    }
    x0 = null;
  }, { passive: true });
})();
