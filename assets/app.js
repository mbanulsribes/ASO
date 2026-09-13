const toggle = document.querySelector('#menu-toggle');
const sidebar = document.querySelector('#sidebar');
const closeMenu = () => { toggle.setAttribute('aria-expanded','false'); sidebar.classList.remove('open'); };
toggle.addEventListener('click', () => {
  const opened = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(opened));
  sidebar.classList.toggle('open', opened);
});
document.addEventListener('keydown', e => { if(e.key === 'Escape') { closeMenu(); toggle.focus(); } });
document.addEventListener('click', e => { if(!sidebar.contains(e.target) && !toggle.contains(e.target)) closeMenu(); });
