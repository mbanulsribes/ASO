import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../dist');
const published=new Set(JSON.parse(fs.readFileSync(path.join(root,'../curso.json'),'utf8')).unidadesPublicadas);
const files=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
let errors=[];
for(const file of files){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 if(!html.includes('lang="es"'))errors.push(`${file}: falta idioma`);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const ref=match[1].replaceAll('&amp;','&');
  if(/^(https?:|data:|mailto:)/.test(ref))continue;
  const [target,hash]=ref.split('#');
  const location=target?path.resolve(root,decodeURIComponent(target)):path.join(root,file);
  if(!fs.existsSync(location)){errors.push(`${file}: enlace roto ${ref}`);continue;}
  if(hash && location.endsWith('.html')){
    const content=fs.readFileSync(location,'utf8');
    if(!content.includes(`id="${hash}"`))errors.push(`${file}: ancla inexistente ${ref}`);
  }
 }
 if(/^\d\d-/.test(file) && !html.includes('Plan B'))errors.push(`${file}: falta Plan B`);
 if(html.includes('Unresolved directive'))errors.push(`${file}: directiva sin resolver`);
}
for(const id of published){
 for(const relative of [`${id}.html`, `fuentes/${id}.adoc`, `pdf/${id}.pdf`]){
  if(!fs.existsSync(path.join(root,relative)))errors.push(`Falta un archivo de la unidad publicada: ${relative}`);
 }
}
for(const [directory,extension] of [['','.html'],['fuentes','.adoc'],['pdf','.pdf']]){
 const folder=path.join(root,directory);
 if(!fs.existsSync(folder))continue;
 for(const file of fs.readdirSync(folder)){
  if(/^\d\d-/.test(file) && file.endsWith(extension) && !published.has(file.slice(0,-extension.length)))errors.push(`Archivo de una unidad oculta en dist: ${path.join(directory,file)}`);
 }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`${files.length} páginas verificadas: enlaces, anclas, idioma y Plan B en ${published.size} unidad(es) publicada(s). Sin archivos de unidades ocultas.`);
