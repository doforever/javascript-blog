'use strict';

/* DOM referneces */

const homeButtons = document.querySelectorAll('.home');

/* Event listners */
for (let home of homeButtons){
  home.addEventListener ('click', function(){
    generateTitleLinks();
  });
}

/* Global variables */
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink : Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink : Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
};

const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};

const select = {
  all: {
    articles: '.post',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
    title: '.post-title',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.authors.list',
  },
};

/* Functions */

function titleClickHandler (event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLink = document.querySelector(select.listOf.titles + ' a.active');
  if(activeLink){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticle = document.querySelector(select.all.articles + '.active');
  if (activeArticle){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const href = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const chosenArticle = document.querySelector(href);

  /* [DONE] add class 'active' to the correct article */
  chosenArticle.classList.add('active');
}

function generateTitleLinks (customSelector = ''){
  const linksList = document.querySelector(select.listOf.titles);
  const articles = document.querySelectorAll(select.all.articles + customSelector);

  /* Remove old filters */
  let filter = null;
  if (customSelector.includes('tag')) filter = 'tag';
  if (customSelector.includes('author')) filter = 'author';

  function removeOldFilter(...args) {
    for (let filter of args){
      const activeLinks = document.querySelectorAll('a.active[href^="#' + filter + '"]');
      for (let link of activeLinks){
        link.classList.remove('active');
      }
    }
  }

  if (filter == 'tag'){
    removeOldFilter('author');
  } else if (filter == 'author') {
    removeOldFilter('tag');
  } else {
    removeOldFilter('tag', 'author');
  }

  /* [DONE] remove class 'active' from all articles */
  const activeArticle = document.querySelector(select.all.articles + '.active');
  if (activeArticle){
    activeArticle.classList.remove('active');
  }
  /* display first article */
  articles[0].classList.add('active');
  /* [DONE] empty links list */
  linksList.innerHTML = '';
  let listHtml = '';
  for (let article of articles){
    /* [DONE] save article ids */
    const id = article.getAttribute('id');
    /* [DONE] save title */
    const title = article.querySelector(select.article.title).innerText;
    /* [DONE] generate link html */
    const linkHTMLData = {id: id, title: title};
    const linkHTML = templates.articleLink(linkHTMLData);
    listHtml = listHtml + linkHTML;
  }
  /* [DONE] insert html into title list */
  linksList.innerHTML = listHtml;

  /* Add listner */
  const links = document.querySelectorAll(select.listOf.titles + ' a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  /* Add class activ to first item */
  links[0].classList.add('active');
}

function calculateTagsParams(tags) {
  let params = {};
  for ( let tag in tags) {
    if (!params['min']){
      params['min'] = tags[tag];
    } else { params.min = Math.min(params.min, tags[tag]);}
    if (!params['max']){
      params['max'] = tags[tag];
    } else { params.max = Math.max(params.max, tags[tag]);}
  }
  return params;
}

function calculateTagClass(count, params){
  const countRange = params.max - params.min;
  const classInterval = countRange/(opts.tagSizes.count-1);
  const classNbr = Math.floor((count-params.min)/classInterval) + 1;
  return opts.tagSizes.classPrefix + classNbr;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(select.all.articles);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagsList = article.querySelector(select.article.tags);

    /* make html variable with empty string */
    let tagsHtml = '';

    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');

    /* split tags into array */
    const tagsArray = tags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of tagsArray) {
      /* generate HTML of the link */
      const tagHTMLData = {tag: tag};
      const tagHTML = templates.tagLink(tagHTMLData);

      /* add generated code to html variable */
      tagsHtml = tagsHtml + tagHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = tagsHtml;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(select.listOf.tags);
  const tagsParams = calculateTagsParams(allTags);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagClass = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + tagClass + '">' + tag + '</a></li>';

  /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
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
  const links = document.querySelectorAll(select.all.linksTo.tags);
  /* START LOOP: for each link */
  for (let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(select.all.articles);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find article wrapper */
    const authorWrapper = article.querySelector(select.article.author);

    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');

    /* generate HTML of the link */
    const authorHTMLData = {author: author};
    const authorHTML = templates.authorLink(authorHTMLData);

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors[author]) {
      /* [NEW] add author to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* insert HTML into author wrapper */
    authorWrapper.innerHTML = authorHTML;

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(select.listOf.authors);
  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
  /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a href="#author-' + author + '"><span class="author-name">' + author + '</span></a> ('+ allAuthors[author] + ')</li>';
  /* [NEW] END LOOP: for each author in allAuthors: */
  }
  /*[NEW] add HTML from allAuthorsHTML to authorsList */
  authorList.innerHTML = allAuthorsHTML;
}

function addClickListenersToAuthors (){
  /* find all links to author */
  const links = document.querySelectorAll(select.all.linksTo.authors);
  /* START LOOP: for each link */
  for (let link of links){
    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

function authorClickHandler (event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active author link */
  for (let link of activeAuthorLinks){
    /* remove class active */
    link.classList.remove('active');
    /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const chosenAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
  for (let link of chosenAuthorLinks){
    /* add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

/* Run */

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
