const API_KEY="d81ebb0cb1584052a31ec49e0790e74f";
const url="https://newsapi.org/v2/everything?q=";
// const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
// const url = "https://newsapi.org/v2/everything?q=";
// on windos loading
window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`)
    const data=await res.json();
    console.log(data)
    bindData(data.articles)
}

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardsContainer.innerHTML='';
    articles.forEach(article=>{
        if(!article.urlToImage){
            return
        }
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillData(cardClone,article)
        cardsContainer.appendChild(cardClone);
    })
}
function fillData(cardClone,article){
    const newsIamge=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsIamge.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name}.${date}`

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank')
    })
}

let currentSelectedNavLink=null;
function onNavItemClicked(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currentSelectedNavLink?.classList.remove('active');
    currentSelectedNavLink=navItem;
    currentSelectedNavLink.classList.add('active')
}

const searchBtn=document.getElementById('search-button');
const searchTextInput=document.getElementById('news-input');
searchBtn.addEventListener('click',()=>{
    const query=searchTextInput.value;
    if(!query){
        return;
    }
    fetchNews(query);
    currentSelectedNavLink?.classList.remove('active');
    currentSelectedNavLink=null
})
function reload(){
    window.location.reload()
}