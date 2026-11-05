document.documentElement.classList.add('js');

/* ==========================================================
   CONFIGURAÇÃO — edite os dados do projeto aqui
   ========================================================== */
const CONFIG = {
  projectName: "Projeto NFC & EMP",
  institution: "USF",
  course: "Engenharia da Computação",
  discipline: "2° Semestre",
  professor: "Wiliam Lirio",
  year: "2026"
};

/* Para adicionar um integrante, copie um bloco { ... }.
Para usar foto, preencha "foto" com o caminho da imagem (ex.: "imagens/ana.jpg"). */
const TEAM = [
  { nome: "Rafael Montenegro", curso: "Engenharia da computação , 2°semestre ", funcao: "202605192", area: "NFC & EMP", foto: "" },
  { nome: "João Cesar", curso: "Engenharia da computação , 2°semestre ", funcao: "202600646", area: "NFC & EMP", foto: "" },
  { nome: "João Pedro", curso: "Engenharia da computação , 2°semestre ", funcao: "202631829", area: "NFC & EMP", foto: "" },
  { nome: "Chris Souza", curso: "Engenharia da computação , 2°semestre ", funcao: "202646902", area: "NFC & EMP", foto: "" },
  { nome: "Náiade Peluso", curso: "Engenharia da computação , 2°semestre ", funcao: "202306107", area: "NFC & EMP", foto: "" },
  { nome: "Daniel Tenorio", curso: "Engenharia da computação , 2°semestre ", funcao: "202606106", area: "NFC & EMP", foto: "" },
  { nome: "Gabriele Libralão", curso: "Engenharia da computação , 2°semestre ", funcao: "202645621 ", area: "NFC & EMP", foto: "" }
];


const REFERENCES = [
  {
    tipo: "Documento completo",
    autor: "Documento geral com as informações e o desenvolvimento do projeto",
    titulo: "",
    ano: "Acesse aqui ->",
    link: "./Feiradeprojetos.pdf"
  },
  {
    tipo: "ATA",
    autor: "Registro do desenvolvimento do projeto",
    titulo: "",
    ano: "Acesse aqui ->",
    link: "./ATA.pdf"
  },
  {
    tipo: "5W2H",
    autor: "Planejamento das atividades, objetivos e etapas necessárias para a realização do projeto",
    titulo: "",
    ano: "Acesse aqui ->",
    link: "./5W2H.pdf"
  },
  {
    tipo: "Gantt",
    autor: "Organização das atividades e de execução do projeto",
    titulo: "",
    ano: "Acesse aqui ->",
    link: "./Gantt.pdf"
  },
  {
    tipo: "Circuito NFC",
    autor: "Material referente à montagem do circuito NFC",
    titulo: "",
    ano: "Acesse aqui ->",
    link: "./Circuitonfc.pdf"
  },
  {
    tipo: "Circuito EMFI",
    autor: "Material referente à montagem do circuito EMFI",
    titulo: "",
    ano: "Acesse aqui ->",
    link: "./circuitoemp.pdf"
  }
];
/* ==========================================================
   CÓDIGO — normalmente não precisa ser alterado
   ========================================================== */
(function () {
  "use strict";

  /* Helper para criar elementos sem usar innerHTML (mais seguro) */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") node.className = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }
  function icon(id) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + id);
    use.setAttribute("href", "#" + id);
    svg.appendChild(use);
    return svg; 
  }
function safeUrl(u) {
  return /^(https?:\/\/|\/|\.\/)/i.test(u || "") ? u : "";
}

  /* Dados do projeto no rodapé */
  document.querySelectorAll("[data-cfg]").forEach(function (n) {
    var v = CONFIG[n.getAttribute("data-cfg")];
    if (v) n.textContent = v;
  });
  document.title = CONFIG.projectName + " | Tecnologia e Inovação";

  /* Equipe */
  var teamBox = document.getElementById("team-list");
  if (teamBox) {
    teamBox.textContent = "";
    TEAM.forEach(function (m, i) {
      var avatar = el("div", { "class": "avatar" });
      if (m.foto) avatar.appendChild(el("img", { src: m.foto, alt: "Foto de " + m.nome, loading: "lazy" }));
      else avatar.appendChild(icon("i-user"));

      var dl = el("dl", null, [
        el("div", null, [el("dt", { text: "Curso e período" }), el("dd", { text: m.curso })]),
        el("div", null, [el("dt", { text: "Responsabilidade" }), el("dd", { text: m.area })])
      ]);
      var card = el("article", { "class": "card member reveal", style: "--d:" + (i % 3) * 0.08 + "s" }, [
        avatar,
        el("h3", { text: m.nome }),
        el("p", { "class": "role", text: m.funcao }),
        dl
      ]);
      teamBox.appendChild(card);
    });
  }

  /* Referências */
  var refBox = document.getElementById("ref-list");
  if (refBox) {
    refBox.textContent = "";
    REFERENCES.forEach(function (r, i) {
      var meta = el("p", { "class": "meta" });
      meta.appendChild(document.createTextNode(r.ano + " · "));
      var url = safeUrl(r.link);
      if (url) {
        var a = el("a", { href: url, target: "_blank", rel: "noopener noreferrer", text: "Acessar fonte" });
        meta.appendChild(a);
      } else {
        meta.appendChild(document.createTextNode("[Link, se disponível]"));
      }
      var body = el("div", null, [
        el("p", { text: r.autor + ". " + r.titulo + "" }),
        meta
      ]);
      refBox.appendChild(el("article", { "class": "card ref reveal", style: "--d:" + (i % 3) * 0.06 + "s" }, [
        el("span", { "class": "tag", text: r.tipo }),
        body
      ]));
    });
  }

  /* Menu mobile */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("menu");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); }
  });
  window.addEventListener("resize", function () { if (window.innerWidth > 880) setMenu(false); });

  /* Cabeçalho com borda ao rolar */
  var header = document.querySelector(".header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Animações de entrada + link ativo no menu */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (r) { io.observe(r); });

    var links = {};
    nav.querySelectorAll("a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); links[k].removeAttribute("aria-current"); });
          links[en.target.id].classList.add("active");
          links[en.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
  }
})();
