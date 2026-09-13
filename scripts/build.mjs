import fs from 'node:fs';
import path from 'node:path';
import Asciidoctor from '@asciidoctor/core';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'dist');
const processor = Asciidoctor();
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const files = fs.readdirSync(path.join(root, 'content')).filter(f => f.endsWith('.adoc')).sort();
const pages = files.map(file => {
  const source = fs.readFileSync(path.join(root, 'content', file), 'utf8');
  const doc = processor.load(source, {safe: 'safe', base_dir: path.join(root, 'content'), attributes: { 'sectanchors': '', 'idprefix': '', 'idseparator': '-', 'outfilesuffix': '.html', 'lang': 'es' }});
  return {file, source, doc, url:file.replace('.adoc','.html'), title:doc.getDocumentTitle(), number:doc.getAttribute('unit'), summary:doc.getAttribute('description') || '', period:doc.getAttribute('period') || '', ra:doc.getAttribute('ra') || ''};
});
const units = pages.filter(p => p.number);
fs.mkdirSync(out, {recursive:true});
fs.mkdirSync(path.join(out,'fuentes'), {recursive:true});
fs.cpSync(path.join(root, 'assets'), path.join(out, 'assets'), {recursive:true});
const nav = current => `<a class="home-link ${current.url === 'index.html'?'active':''}" href="index.html" ${current.url==='index.html'?'aria-current="page"':''}>Vista del curso</a><p class="nav-label">TEMARIO</p>${units.map(p => `<a class="nav-unit ${p.url===current.url?'active':''}" href="${p.url}" ${p.url===current.url?'aria-current="page"':''}><span>${escape(p.number)}</span><span>${escape(p.title)}</span></a>`).join('')}<div class="nav-end"><a href="guia.html" ${current.url==='guia.html'?'aria-current="page"':''}>Cómo trabajamos</a><a href="creditos.html" ${current.url==='creditos.html'?'aria-current="page"':''}>Fuentes y créditos</a></div>`;
for(const p of pages){
  const home = p.url==='index.html';
  const i = units.indexOf(p);
  const toc = p.doc.getSections().map(s=>`<a href="#${escape(s.getId())}">${escape(s.getTitle())}</a>`).join('');
  const cards = home ? `<section class="course-index" aria-labelledby="course-title"><div class="section-head"><h2 id="course-title">El recorrido del curso</h2><span>10 unidades</span></div>${units.map(u=>`<a class="course-row" href="${u.url}"><span class="row-number">${escape(u.number)}</span><div><h3>${escape(u.title)}</h3><p>${escape(u.summary)}</p></div><span class="row-period">${escape(u.period)}</span><span class="row-arrow" aria-hidden="true">↗</span></a>`).join('')}</section>` : '';
  const milestones = `<div class="milestones"><div><span>08 OCT</span><strong>Instalar un sistema</strong><p>Del diseño a la primera puesta en marcha.</p></div><div><span>21 DIC</span><strong>Desplegar un servicio</strong><p>Una aplicación dentro de un contenedor.</p></div><div><span>22 ENE</span><strong>Gestionar contenedores</strong><p>Mantener, diagnosticar y recuperar.</p></div></div>`;
  const pagination = i>=0?`<nav class="page-turn" aria-label="Entre unidades">${i>0?`<a href="${units[i-1].url}"><span>Anterior</span>${escape(units[i-1].title)}</a>`:'<a href="index.html"><span>Volver a</span>Vista del curso</a>'}${i<units.length-1?`<a href="${units[i+1].url}"><span>Siguiente</span>${escape(units[i+1].title)} →</a>`:'<a href="index.html"><span>Volver a</span>Vista del curso</a>'}</nav>`:'';
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escape(p.summary||'Manual de aula de Administración de Sistemas Operativos. IES Font, 2.º ASIR.')}"><title>${escape(p.title)} · ASO · IES Font</title><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='8' fill='%23142138'/%3E%3Cpath d='m10 12 8 8-8 8m12 0h9' fill='none' stroke='%2382b9ff' stroke-width='3'/%3E%3C/svg%3E"><link rel="stylesheet" href="assets/style.css"><script src="assets/app.js" defer></script></head>
<body><a class="skip" href="#main">Saltar al contenido</a>
<header class="mobile-header"><a href="index.html">ASO <span>/ IES Font</span></a><button id="menu-toggle" aria-expanded="false" aria-controls="sidebar">Índice</button></header>
<aside class="sidebar" id="sidebar"><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">&gt;_</span><span>ASO<small>IES FONT · 2.º ASIR</small></span></a><div class="subject">Administración de<br>sistemas operativos</div><nav aria-label="Navegación del curso">${nav(p)}</nav><div class="sidebar-footer"><span>VALÈNCIA · PRESENCIAL</span><p>Lunes y martes<br>2 horas cada día</p></div></aside>
<div class="workspace"><div class="topbar"><span>IES Font <span class="slash">/</span> 2.º ASIR <span class="slash">/</span> ${home?'El curso':p.number?'Unidad '+escape(p.number):'Información'}</span><span class="topbar-label">MANUAL DE AULA</span></div>
<main id="main" tabindex="-1" class="${home?'home-main':'lesson-main'}"><div class="reading"><header class="page-header"><div class="eyebrow">${home?'APRENDER ADMINISTRANDO':p.number?'UNIDAD '+escape(p.number):'EL CURSO'}</div><h1>${escape(p.title)}</h1>${p.summary?`<p class="lead">${escape(p.summary)}</p>`:''}${p.number?`<div class="lesson-meta"><span>${escape(p.period)}</span><span>${escape(p.ra)}</span><a href="pdf/${p.file.replace('.adoc','.pdf')}" download>Descargar PDF ↓</a></div>`:''}</header>${home?milestones:''}<article class="document">${p.doc.convert()}</article>${cards}${pagination}<footer class="page-footer"><span>ASO · IES Font</span><a href="creditos.html">Fuentes y créditos</a></footer></div>${!home?`<aside class="page-toc" aria-label="En esta página"><p>EN ESTA PÁGINA</p>${toc}<div class="toc-note"><strong>Aprender, comprobar, explicar.</strong><span>Cada práctica incluye una alternativa sin acceso al servidor.</span></div></aside>`:''}</main></div></body></html>`;
  fs.writeFileSync(path.join(out,p.url),html);
  fs.writeFileSync(path.join(out,'fuentes',p.file),p.source);
}
fs.writeFileSync(path.join(out,'404.html'), '<!doctype html><html lang="es"><meta charset="utf-8"><title>Página no encontrada · ASO</title><body><h1>Página no encontrada</h1><p>Vuelve al <a href="index.html">índice de ASO</a>.</p></body></html>');
console.log(`Generadas ${pages.length} páginas desde AsciiDoc en dist/.`);
