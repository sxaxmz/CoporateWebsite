var Logo = document.getElementById("Logo");
var content1 = document.getElementById("content1");
var slideImg = document.getElementById("slideImg");
var header = document.getElementById("uk-top-page");
var content1Left = document.getElementById("leftContent");
var content1Right = document.getElementById("rightContent");
var dropdownList = document.getElementById("dropdownList");
var lifeAtContent = document.getElementById("lifeAtContent");
var logoLink = document.getElementById("logoLink");
var content,src,caption,length,img,text,tag,position,slideIndex,title,id;
i = 0;
slideIndex = 0; 
tag = "uk";
document.title = "UK CORPORATE";
logoLink.href = "../";

logo(tag, img);
getDropdownList(tag,id,title,text,img);
jsonImg(src,caption,length);
showSlides(slideIndex);

function slideHoverEffect(slideContainer,next,previous){
  next.onmouseover = function (){
  slideContainer.style.background = "linear-gradient(to right, #3c3c3c 90%, #ffffff 100%)";
  }
  next.onmouseout = function (){
    slideContainer.style.background = "#3c3c3c";
  }

  previous.onmouseover = function (){
    slideContainer.style.background = "linear-gradient(to left, #3c3c3c 90%, #ffffff 100%)";
  }
  previous.onmouseout = function (){
    slideContainer.style.background = "#3c3c3c";
  }
}

// Next/previous controls
function plusSlides(n) {
  slideIndex += n
}

// Thumbnail image controls
function currentSlide(n) {
  slideIndex = n
}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1
    }    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" dot-active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " dot-active";
    setTimeout(showSlides, 3000); 
}

function initializeSlides (src,caption,length){

content += '<div class="mySlides fade">'+
          ' <!-- <div class="numbertext">'+length+'</div> -->'+
          '<a href=""><img src="'+src+'" alt="'+caption+'"></a>'+
          '<div class="imgCaption center"><span>'+caption+'</span></div>'+
          '</div>';
}

function jsonImg (src,caption,length) {
  content = '<div class="slideshow-container">';
  var arrayLength
  var json = JSON.parse(slideImgs);
  json.forEach(function(item,index,array){ 
    src = item["src"];
    caption = item["caption"];
    length = (index+1)+"/"+array.length;
    arrayLength = array.length;
    initializeSlides (src,caption,length);
  });
  content +=  '   <a class="prev" onclick="plusSlides(-1)">&#10094;</a>'+
              '   <a class="next" onclick="plusSlides(1)">&#10095;</a>'+
              '   <div class="dots-section">';
      for (var i = 0; i< arrayLength; i++){
   content += '    <span class="dot" onclick="currentSlide('+(i+1)+')"></span>';
 }
   content +=  '</div>'+
               '</div>';
  slideImg.innerHTML = content;
  var next = document.querySelectorAll(".next")[0];
  var previous = document.querySelectorAll(".prev")[0];
  var slideContainer = document.querySelectorAll(".slideshow-container")[0];
  slideHoverEffect(slideContainer,next,previous);
}

function logo (tag, img){
  var json = JSON.parse(logos);
  json.forEach(function(item){
    if (item["tag"] == tag){
      img = item["img"];
    }
  });
  Logo.innerHTML = "<img src="+img+" alt="+tag+">";
}

grab_imgs(img);
function grab_imgs (img){
  var json = JSON.parse(imgBanner);
  json.forEach(function(item){
    if (item["tag"] == tag){
    img = item["img"];
    deploy_imgs(img);
    }
  });
}

function deploy_imgs (img){
  header.style.backgroundImage = "url('../images/"+img+"')";
}

getContent(tag,img,text,position);
function getContent(tag,img,text,position){
  
  var jsonImg = JSON.parse(mainImgs);
  jsonImg.forEach(function(item,index){
    text = "";
    img = "";
    if (tag == item["tag"]){
      img = item["img"];
      position = item["position"];
      setContent(img,text,position);
    }
  });

  var jsonText = JSON.parse(mainTexts);
  jsonText.forEach(function(item,index){
    text = "";
    img = "";
    if (tag == item["tag"]){
      text = item["text"];
      position = item["position"];
      setContent(img,text,position);
    }
  });
}

function setContent (img, text, position){
  content = "";

  if (position == "right"){
      if (img == ""){     
        content1Right.classList.add("textContent");
        content = '<p>'+text+'</p>';
    } else {
      content1Right.classList.add("mediaContent");
      content = '<img src="../images/'+img+'">';
   }
    content1Right.innerHTML = content;
  }
  

  if (position == "left"){
      if (img == ""){       
        content1Left.classList.add("textContent");
        content = '<p>'+text+'</p>';
    } else {
      content1Left.classList.add("mediaContent");
      content = '<img src="../images/'+img+'">';
    }
    content1Left.innerHTML = content;
  }  
 
}

function getDropdownList (tag,id,title,text,img){
  var titles = [],ids = [];
  var json = JSON.parse(dropdownItems);
  json.forEach(function(item,index){
    if (tag == item["tag"]){
        id = item["elId"];
        title = item["title"];
        ids.push(id);
        titles.push(title);
        setDropdownItems(id,title);
    }
  });

  json = JSON.parse(dropdownTabs);
  content = '<div class="tab-content center" data-target="#pills-tab">';
  json.forEach(function(item,index){
    if (tag == item["tag"]){
        id = item["elId"];
        text = item["txtContent"];
        if (item["img"] !== "") {
          img = item["img"];
        } else {
          img = "";
        }
        for (var i =0; i<ids.length; i++){
          if (id == ids[i]){
          title = titles[i];
          } 
        }  
      setDropdownTabs(id,title,text,img);
    }
  }); 
  content += '</div>';
  lifeAtContent.innerHTML = content;
  var dropdownItem = document.querySelectorAll(".dropdown-item");
  var tabPane = document.querySelectorAll(".tab-pane");
  showtabs(dropdownItem);
  homeContent(dropdownItem,tabPane);
}
function setDropdownItems (id,title){
  content = '<a class="dropdown-item" id="pills-'+id+'-tab" data-toggle="pill" href="#'+id+'" '+
            'role="tab" aria-controls="pills-'+id+'" aria-selected="false">'+title+'</a>';
  dropdownList.innerHTML += content; 
}

function setDropdownTabs(id,title,text,img){
  content +=  '<div id="'+id+'" class="tab-pane fade show row" role="tabpanel" aria-labelledby="pills-'+id+'-tab">'+             
              '<h3>'+title+'</h3>'+
              '<hr>'; 
  if (img !== "") { 
    content +=  '<div class="container">'+
                '  <div class="row">'+
                '    <div class="col-lg-5 col-md-5 col-xs-12 col-sm-12" style="height: 280px;">'+
                '      <img src="../images/'+img+'"  alt="'+title+'">'+
                '    </div>'+
                '    <div class="col-lg-7 col-md-7 col-xs-12 col-sm-12">'+
                '      <p >'+text+'</p>'+
                '    </div>'+
                '  </div>'+
                '</div>';
  } else {
    content += '<p>'+text+'</p>';
  }
  content += '</div>';
}
function showtabs(dropdownItem){

  dropdownItem.forEach(function(el){
    el.onclick = function (){
      for (var i=0; i<dropdownItem.length; i++){
      dropdownItem[i].classList.remove("active");
      }
      slideImg.classList.remove("active");
      content1.classList.remove("active");
    }
  });
}

function homeContent (dropdownItem,tabContent){
  var homeContents = document.querySelectorAll(".homeContent");
  var homePage = document.querySelectorAll(".homePage"); 
  homePage[0].onclick = function (){
      dropdownItem.forEach(function(el){
        el.classList.remove("active");
      });
      tabContent.forEach(function(el){
        el.classList.remove("active");
      });
      homeContents.forEach(function (el){
        if (!el.classList.contains("active")){
            el.classList.add("active"); 
        }
      });
  }
  
}