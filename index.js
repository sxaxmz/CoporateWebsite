var img;
var header = document.getElementById("header");
grab_imgs(img);
function grab_imgs (img){
	var json = JSON.parse(imgBanner);
	json.forEach(function(item){
		if (item["tag"] =="main"){
		img = item["img"];
		deploy_imgs(img);
		}
	});
}

function deploy_imgs (img){
	header.style.backgroundImage = "url('images/"+img+"')";
}