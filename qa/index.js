var QALogo = document.getElementById("QALogo");
var contentQA1 = document.getElementById("content1");
var slideImg = document.getElementById("slideImg");
var header = document.getElementById("qa-top-page");
var contentQA1Left = document.getElementById("leftContent");
var contentQA1Right = document.getElementById("rightContent");
											/** slideshow **/

logo();
var content,src,caption,length,img,text,tag,position; 
jsonImg(src,caption,length);
tag = "qa";

var slideIndex = 0;
showSlides(slideIndex);

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
      console.log("slideIndex -->"+slideIndex); 
    }    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); 
}

function initializeSlides (src,caption,length){

content += '<div class="mySlides fade">'+
          ' <!-- <div class="numbertext">'+length+'</div> -->'+
          '<img src="'+src+'" style="width:100%">'+
          '<div class="imgCaption"><span>'+caption+'</span></div>'+
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
    console.log(index+" <--> "+src+"  <--> "+ caption+"  <-->"+length);
  });
  content +=  '   <a class="prev" onclick="plusSlides(-1)">&#10094;</a>'+
              '   <a class="next" onclick="plusSlides(1)">&#10095;</a>'+
              '</div>'+
              '<br>'+
              '<div class="center">';
      for (var i = 0; i< arrayLength; i++){
   content += '    <span class="dot" onclick="currentSlide('+(i+1)+')"></span>';
 }
   content +=  '</div>';

   content += '<hr>';
  slideImg.innerHTML = content;
}

function logo (){
  var images, tag;
  var json = JSON.parse(logos);
  json.forEach(function(item){
    if (item["tag"] == "qa"){
      image = item["img"];
      tag = item["tag"];
    }
  });
  QALogo.innerHTML = "<img src="+image+" alt="+tag+">";
}

grab_imgs(img);
function grab_imgs (img){
  var json = JSON.parse(imgBanner);
  json.forEach(function(item){
    if (item["tag"] =="qa"){
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
  
  var jsonImg = JSON.parse(imgs);
  jsonImg.forEach(function(item,index){
    text = "";
    img = "";
    if (tag == item["tag"]){
      img = item["img"];
      position = item["position"];
      console.log(index+"  -->"+tag+" <- "+position+" -> "+ img);
      setContent(img,text,position);
    }
  });

  var jsonText = JSON.parse(texts);
  jsonText.forEach(function(item,index){
    text = "";
    img = "";
    if (tag == item["tag"]){
      text = item["text"];
      position = item["position"];
      console.log(index+"  -->"+tag+" <- "+position+" -> "+ text);
      setContent(img,text,position);
    }
  });
}

function setContent (img, text, position){
  content = "";

  if (position == "right"){
      if (img == ""){     
        contentQA1Right.classList.add("textContent");
        content = '<p>'+text+'</p>';
    } else {
      contentQA1Right.classList.add("mediaContent");
      content = '<img src="../images/'+img+'">';
   }
    console.log(text+" <--> "+position);
    contentQA1Right.innerHTML = content;
  }
  

  if (position == "left"){
      if (img == ""){       
        contentQA1Left.classList.add("textContent");
        content = '<p>'+text+'</p>';
    } else {
      contentQA1Left.classList.add("mediaContent");
      content = '<img src="../images/'+img+'">';
    }
    console.log(content+" <--> "+position);
    contentQA1Left.innerHTML = content;
  }  

  
}