'use strict';

/* DOM referneces */

/* Event listners */

/* Global variables */

/* Functions */

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLink = document.querySelector('.titles a.active');
  if(activeLink){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticle = document.querySelector('.posts article.active');
  if (activeArticle){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const href = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const chosenArticle = document.querySelector(href);
  console.log(chosenArticle);

  /* [DONE] add class 'active' to the correct article */
  chosenArticle.classList.add('active');
};

const generateTitleLinks = function(){
  console.log('generate title links');
  const linksList = document.querySelector('.sidebar ul');
  const articles = document.querySelectorAll('article');

  /* [DONE] empty links list */
  linksList.innerHTML = '';
  let listHtml = '';
  for (let article of articles){
    /* [DONE] save article ids */
    const id = article.getAttribute('id');
    /* [DONE] save title */
    const title = article.querySelector('.post-title').innerText;
    /* [DONE] generate link html */
    const linkHtml = '<li><a href="#' + id + '"><span>' + title + '</span></a></li>';
    listHtml = listHtml + linkHtml;
    console.log(linkHtml);
  }
  /* [DONE] insert html into title list */
  linksList.innerHTML = listHtml;

  /* Add listner */
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

};

/* Run */

generateTitleLinks();
