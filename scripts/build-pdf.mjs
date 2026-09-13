import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const pdfDir = path.join(dist, 'pdf');
const files = fs.readdirSync(dist).filter(name => /^\d\d-.+\.html$/.test(name)).sort();
const channelPosition = process.argv.indexOf('--channel');
const channel = channelPosition >= 0 ? process.argv[channelPosition + 1] : undefined;
if(channelPosition >= 0 && !channel) throw new Error('Indica el canal del navegador después de --channel.');
if(!files.length) throw new Error('Genera primero la web con pnpm build.');
fs.mkdirSync(pdfDir, {recursive:true});
const browser = await chromium.launch({headless:true, ...(channel ? {channel} : {})});
try {
  const page = await browser.newPage({viewport:{width:1280,height:900}});
  for(const name of files) {
    await page.goto(pathToFileURL(path.join(dist, name)).href, {waitUntil:'load'});
    await page.addStyleTag({path:path.join(root,'assets/pdf.css')});
    await page.emulateMedia({media:'print'});
    await page.evaluate(() => document.fonts.ready);
    // Internal links in exported documents must never point to a local build path.
    await page.evaluate(() => {
      for(const link of document.querySelectorAll('article a[href]')) {
        const href=link.getAttribute('href');
        if(href && !/^(https?:|mailto:|#)/.test(href)) link.removeAttribute('href');
      }
    });
    await page.pdf({
      path:path.join(pdfDir, name.replace('.html','.pdf')),
      format:'A4',
      scale:0.96,
      margin:{top:'15mm',right:'16mm',bottom:'17mm',left:'16mm'},
      printBackground:true,
      tagged:true,
      outline:true,
      displayHeaderFooter:true,
      headerTemplate:'<span></span>',
      footerTemplate:'<div style="width:100%;margin:0 18mm;font-family:Arial,sans-serif;font-size:9px;color:#57687d;display:flex;justify-content:space-between"><span>ASO · IES Font</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'
    });
    console.log(`PDF: ${name.replace('.html','.pdf')}`);
  }
} finally {
  await browser.close();
}
console.log(`Generados ${files.length} PDF de unidades.`);
