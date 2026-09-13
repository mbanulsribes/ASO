import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'../dist');
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
if(files.filter(f=>/^\d\d-/.test(f)).length!==10)errors.push('Se esperan diez unidades');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`${files.length} páginas verificadas: enlaces, anclas, idioma y Plan B en las diez unidades.`);
