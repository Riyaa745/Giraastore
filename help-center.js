const helpSearch=document.querySelector('.help-search');
helpSearch?.addEventListener('submit',event=>{
  event.preventDefault();
  const query=helpSearch.querySelector('input').value.trim().toLowerCase();
  document.querySelectorAll('.help-questions .faq-item').forEach(item=>{
    const match=!query||item.textContent.toLowerCase().includes(query);
    item.hidden=!match;
  });
});

document.querySelectorAll('.help-questions .faq-question').forEach(button=>button.addEventListener('click',()=>{
  button.querySelector('b').textContent=button.parentElement.classList.contains('open')?'−':'+';
}));

document.querySelectorAll('.faq-tabs button').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.faq-tabs button').forEach(tab=>tab.classList.remove('active'));
  button.classList.add('active');
}));
