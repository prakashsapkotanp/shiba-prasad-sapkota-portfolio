// simple DOM helpers
const q = s => document.querySelector(s);
const qa = s => Array.from(document.querySelectorAll(s));

// set footer years
[ 'year','year2','year3','year4','year5' ].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.textContent = new Date().getFullYear();
});

// mobile nav toggle
const menuToggle = q('.menu-toggle');
if(menuToggle){
  menuToggle.addEventListener('click', ()=> {
    const nav = q('.nav');
    if(nav) nav.style.display = (nav.style.display === 'flex' ? 'none' : 'flex');
  });
}

// PDF modal preview
const modal = q('#pdfModal');
const pdfFrame = q('#pdfFrame');
const modalDownload = q('#modalDownload');
const openInNew = q('#openInNew');
const viewBtns = qa('.view-btn');

viewBtns.forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const file = btn.dataset.file;
    if(!file) return;
    // show modal
    modal.classList.add('show');
    modal.setAttribute('open','');
    // Use browser's PDF viewer via iframe src
    pdfFrame.src = file;
    modalDownload.href = file;
    openInNew.href = file;
    pdfFrame.focus();
  });
});

const modalClose = q('.modal-close');
if(modalClose){
  modalClose.addEventListener('click', ()=> {
    modal.classList.remove('show');
    modal.removeAttribute('open');
    pdfFrame.src = '';
  });
}

// clicking outside modal content closes
if(modal){
  modal.addEventListener('click', (ev)=>{
    if(ev.target === modal){
      modal.classList.remove('show');
      modal.removeAttribute('open');
      pdfFrame.src = '';
    }
  });
}

// Smooth anchor scrolling for in-page links
document.addEventListener('click', (e)=>{
  if(e.target.matches('a[href^="#"]')){
    e.preventDefault();
    const id = e.target.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth'});
  }
});

// Contact form validation (frontend only)
const form = q('#contactForm');
if(form){
  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    // reset errors
    q('#errName').textContent = '';
    q('#errEmail').textContent = '';
    q('#errMessage').textContent = '';
    let ok = true;
    const name = q('#name').value.trim();
    const email = q('#email').value.trim();
    const message = q('#message').value.trim();

    if(name.length < 2){ q('#errName').textContent = 'Please enter Shiba Prasad Sapkota.'; ok=false; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ q('#errEmail').textContent = 'Please enter a valid email.'; ok=false; }
    if(message.length < 10){ q('#errMessage').textContent = 'Message should be at least 10 characters.'; ok=false; }

    if(ok){
      // show success message — backend required to actually send
      q('#formSuccess').hidden = false;
      form.reset();
    }
  });
}
