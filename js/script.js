'use strict';

/* DOM referneces */

/* Event listners */

/* Global variables */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

/* Functions */

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLink = document.querySelector(optTitleListSelector + ' a.active');
  if(activeLink){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticle = document.querySelector(optArticleSelector + '.active');
  if (activeArticle){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const href = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const chosenArticle = document.querySelector(href);

  /* [DONE] add class 'active' to the correct article */
  chosenArticle.classList.add('active');
};

const generateTitleLinks = function(customSelector = ''){
  const linksList = document.querySelector(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  /* [DONE] empty links list */
  linksList.innerHTML = '';
  let listHtml = '';
  for (let article of articles){
    /* [DONE] save article ids */
    const id = article.getAttribute('id');
    /* [DONE] save title */
    const title = article.querySelector(optTitleSelector).innerText;
    /* [DONE] generate link html */
    const linkHtml = '<li><a href="#' + id + '"><span>' + title + '</span></a></li>';
    listHtml = listHtml + linkHtml;
  }
  /* [DONE] insert html into title list */
  linksList.innerHTML = listHtml;

  /* Add listner */
  const links = document.querySelectorAll(optTitleListSelector + ' a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

};

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let tagsHtml = '';

    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');

    /* split tags into array */
    const tagsArray = tags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const liHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      tagsHtml = tagsHtml + liHtml;

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = tagsHtml;
  /* END LOOP: for every article: */
  }
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let link of activeTagLinks){
    /* remove class active */
    link.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const chosenTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let link of chosenTagLinks){
    /* add class active */
    link.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

/* Run */

generateTitleLinks();
generateTags();
addClickListenersToTags();
