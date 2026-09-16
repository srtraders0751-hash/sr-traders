const menuToggle=document.querySelector('.menu-toggle');
const navMenu=document.querySelector('#navMenu');
menuToggle?.setAttribute('aria-expanded','false');
menuToggle?.addEventListener('click',()=>{navMenu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',navMenu.classList.contains('open'))});
document.querySelectorAll('#navMenu a').forEach(link=>link.addEventListener('click',()=>navMenu.classList.remove('open')));

const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');reveal.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.product-card,.custom-card,.feature,.about-image,.about-copy,.contact-details,.process-grid>div,.enquiry-form').forEach(el=>{el.classList.add('reveal');reveal.observe(el)});

const cards=[...document.querySelectorAll('.product-card,.custom-card')];
const filterButtons=document.querySelectorAll('.filter-btn');
const search=document.querySelector('#productSearch');
function updateCatalogue(){const filter=document.querySelector('.filter-btn.active')?.dataset.filter||'all';const query=(search?.value||'').trim().toLowerCase();cards.forEach(card=>{const matchFilter=filter==='all'||card.dataset.category===filter;const matchSearch=(card.dataset.product||'').toLowerCase().includes(query);card.classList.toggle('is-hidden',!(matchFilter&&matchSearch))})}
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');updateCatalogue()}));
search?.addEventListener('input',updateCatalogue);

document.querySelectorAll('.product-enquire').forEach(link=>link.addEventListener('click',()=>{const product=link.dataset.enquiry;const select=document.querySelector('#enquiryProduct');if(select){select.value=product}}));

document.querySelector('#enquiryForm')?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const msg=`Hello SR Traders,\n\nI would like to enquire about: ${data.get('product')}\nName: ${data.get('name')}\nCompany: ${data.get('company')||'N/A'}\nQuantity: ${data.get('quantity')||'N/A'}\nDestination: ${data.get('destination')||'N/A'}\nMessage: ${data.get('message')||'N/A'}\n\nPlease share availability and quotation details.`;window.open(`https://wa.me/919901457824?text=${encodeURIComponent(msg)}`,'_blank','noopener')});
