var typeset = require('typeset');

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function flicker() {
  if (document.querySelector('.page-title') == null) { return; }
  document.querySelector('.page-title').style.color = 'red';
  setTimeout(function() {
    document.querySelector('.page-title').style.color = 'inherit';
  }, 50);
  setTimeout(flicker, Math.random() * 500);
}

ready(function() {
  setTimeout(flicker, Math.random() * 500);

  var messyHrefs = Array.from(document.querySelectorAll('[data-pending-link]')).forEach(function(pendingLink) {
    var goodLink = pendingLink.querySelector('[data-link]');
    pendingLink.href = goodLink.getAttribute('data-link');
  });

  Array.from(document.querySelectorAll('[data-typeset]')).forEach(function(elem) {
    elem.innerHTML = typeset(elem.innerHTML);

    var paragraphs = elem.querySelectorAll('p');
    var lastParagraph = paragraphs[paragraphs.length - 1];
    var tombstone = document.createElement('span');
    tombstone.classList.add('tombstone');
    lastParagraph.appendChild(tombstone);
  });
})
