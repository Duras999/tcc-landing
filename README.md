# TCC Jennifer

Site da apresentação do TCC **"Inteligência artificial e dependência tecnológica: as assimetrias entre países centrais e o Sul Global"** — Jhenyffer da Silva, UNIP, Relações Internacionais (2026).

Recriado em HTML/CSS a partir do design do Canva (13 páginas), com o mesmo layout 16:9, cores, fontes e ilustrações redesenhadas em código.

## Estrutura

```
tcc-jennifer/
├── index.html                          → Página 1 (capa)
├── paginas/
│   ├── 02-tema-e-contextualizacao.html
│   ├── 03-pergunta-de-pesquisa.html
│   ├── 04-justificativa.html
│   ├── 05-objetivos.html
│   ├── 06-referencial-teorico.html
│   ├── 07-metodologia.html
│   ├── 08-big-techs.html
│   ├── 09-infraestrutura-digital.html
│   ├── 10-caso-worldcoin.html
│   ├── 11-consideracoes-finais.html
│   ├── 12-referencias.html
│   ├── 13-obrigada.html
│   └── 14-trabalho-completo.html     → botão para abrir/baixar o PDF
├── trabalho/
│   └── TCC Jhenyffer - Versão final.pdf  → trabalho completo
├── assets/
│   ├── css/style.css                   → estilos comuns (slide, títulos, listas, navegação)
│   ├── js/site.js                      → logo, pontilhado, numeração, menu e navegação
│   └── img/favicon.svg
└── CNAME                               → jhenyffer.online (GitHub Pages)
```

## Navegação

- Botões **Anterior / Próxima** e menu **Páginas** na barra inferior
- Setas do teclado ← →, Home/End, e deslizar o dedo no celular
- Botão de tela cheia para apresentar

## Publicação

- Hospedado no **GitHub Pages** (repositório `tcc-landing`, branch `main`, pasta raiz), separado do site Durastips.
- Domínio **jhenyffer.online** (arquivo `CNAME`), DNS na GoDaddy:
  - 4 registros **A** para `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - 1 registro **CNAME** para `www` → `duras999.github.io`
- Em **Settings → Pages**, marque **Enforce HTTPS** assim que o GitHub liberar o certificado.
- Qualquer alteração enviada para a branch `main` é publicada automaticamente em 1–2 minutos.

## Trocar por imagens originais (opcional)

As ilustrações (globo da capa, cabeça "AI", gráfico de nuvem, ícones e o logo UNIP) foram redesenhadas em SVG/CSS.
Para usar os arquivos originais, baixe-os do Canva, coloque em `assets/img/` e substitua o `<svg>` correspondente por `<img src="../assets/img/arquivo.png">`.
