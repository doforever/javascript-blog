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
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLink = document.querySelector(optTitleListSelector + ' a.active');
  if(activeLink){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
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
  console.log(chosenArticle);

  /* [DONE] add class 'active' to the correct article */
  chosenArticle.classList.add('active');
};

const generateTitleLinks = function(){
  console.log('generate title links');
  const linksList = document.querySelector(optTitleListSelector);
  const articles = document.querySelectorAll(optArticleSelector);

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
    console.log(linkHtml);
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
    console.log(tagsArray);
    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const liHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(liHtml);

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

  /* make new constant named "clickedElement" and give it the value of "this" */

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  /* make a new constant "tag" and extract tag from the "href" constant */

  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

/* Run */

generateTitleLinks();
generateTags();
addClickListenersToTags();
