var webdev = "http://www.reddit.com/user/-random-repick/m/webdev/top/.json?sort=top&limit=5&t=";
var jsjq = "http://www.reddit.com/user/-random-repick/m/jsjq/top/.json?sort=top&limit=5&t=";
var htmlcss = "http://www.reddit.com/user/-random-repick/m/htmlcss/top/.json?sort=top&limit=5&t=";
var php = "http://www.reddit.com/user/-random-repick/m/php/top/.json?sort=top&limit=5&t=";
var design = "http://www.reddit.com/user/-random-repick/m/design/top/.json?sort=top&limit=5&t=";
var fun = "http://www.reddit.com/r/ProgrammerHumor/top/.json?sort=top&limit=8&t=day"

$(document).ready(function () {

	setNavBarPrimaryClickable();

	// ERSTES MAL ÖFFNEN
	$('#subnav').append(getHtmlStrForSubNav());
	getRedditData(webdev,"day");
	setNavBarSecondaryClickable();

});

function getRedditData(url,time){

	$('#content').empty();
	$('#loader').css("display", "block");

	$.getJSON(url+time)
		.done(function( data ) {
			htmlStr1="";
			$.each(data.data.children, function (i,item){
				var linkToThread = "http://www.reddit.com"+item.data.permalink;
				htmlStr1 += "<div class='row'>";
				htmlStr1 += "<a target='_blank' href='" + linkToThread +"'>";
				htmlStr1 += "<div class='panel panel-default col-xs-12'>";
				htmlStr1 += "<div class='panel-body'>";
				htmlStr1 += item.data.title;
				htmlStr1 += "<div id='stats'>";
				htmlStr1 += "<span class='label label-primary'>Sub: /r/"+ item.data.subreddit +"</span> ";
				htmlStr1 += "<span class='label label-primary'>Score: " + item.data.score + "</span> ";
				htmlStr1 += "<span class='label label-primary'>Comments: " + item.data.num_comments +"</span>";
				htmlStr1 += "</div></div></div></div>";
				htmlStr1 += "</a></div>";
			});
			$('#content').append(htmlStr1);
			$('#loader').css("display", "none");
		});
}

function getRedditPics(){

	$('#content').empty();
	$('#loader').css("display", "block");

	$.getJSON(fun)
		.done(function( data ) {
			htmlStr3 = "";
			$.each(data.data.children, function (i,item){
				var checkForAlbum = item.data.url.indexOf("/a/");
				if(checkForAlbum == -1 && item.data.url.indexOf("i.imgur") > -1){
					htmlStr3 += "<div class='thumbnail'>";
					htmlStr3 += "<div class='caption'>";
					htmlStr3 += "<h4>" + item.data.title +"</h4>"
					htmlStr3 += "</div>";
					htmlStr3 += "<a  target='_blank' href='" + item.data.url +"'>";
					htmlStr3 += "<img src='" + item.data.url + "'>";
					htmlStr3 += "</a>";
					htmlStr3 += "</div>";
				}else if(checkForAlbum == -1 && item.data.url.indexOf("imgur") > -1){
					htmlStr3 += "<div class='thumbnail'>";
					htmlStr3 += "<div class='caption'>";
					htmlStr3 += "<h4>" + item.data.title +"</h4>"
					htmlStr3 += "</div>";
					htmlStr3 += "<a target='_blank' href='" + item.data.url.substring(0,7) + "i." + item.data.url.substring(7) +".jpg'>";
					htmlStr3 += "<img src='" + item.data.url.substring(0,7) + "i." + item.data.url.substring(7) + ".jpg'>"
					htmlStr3 += "</a>";
					htmlStr3 += "</div>";
				}
			});
			$('#content').append(htmlStr3);
			$('#loader').css("display", "none");
		});
}

function setNavBarPrimaryClickable(){

	$('.navprimary li a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
		var toAppendId = $(this).attr('href');
		$(toAppendId).empty();
		var priNavTabId = $(this).parent().attr('id');
		if(priNavTabId != "fun"){
			$(toAppendId).append(getHtmlStrForSubNav());
		}

		if(priNavTabId == "webdev"){
			getRedditData(webdev,"day");
		}else if(priNavTabId == "jsjq"){
			getRedditData(jsjq,"day");
		}else if(priNavTabId == "htmlcss"){
			getRedditData(htmlcss,"day");
		}else if(priNavTabId == "php"){
			getRedditData(php,"day");
		}else if(priNavTabId == "design"){
			getRedditData(design,"day");
		}else if(priNavTabId = "fun"){
			getRedditPics();
		}

		setNavBarSecondaryClickable();
	});
}

function setNavBarSecondaryClickable(){

	$('.navsecondary li a').click(function (e){
		e.preventDefault();
	  	$(this).tab('show');
	  	var secNavTabId = $(this).attr('id');
	  	$('.navprimary li').each(function(){
	  		if($(this).hasClass('active')){
	  			var priNavTabId = $(this).attr('id');
	  			if(priNavTabId == "webdev"){
	  				getRedditData(webdev,secNavTabId);
	  				return false;
	  			}else if(priNavTabId == "jsjq"){
	  				getRedditData(jsjq,secNavTabId);
	  				return false;
	  			}else if(priNavTabId == "htmlcss"){
					getRedditData(htmlcss,secNavTabId);
					return false;
				}else if(priNavTabId == "php"){
					getRedditData(php,secNavTabId);
					return false;
				}else if(priNavTabId == "design"){
					getRedditData(design,secNavTabId);
					return false;
				}else if(priNavTabId = "fun"){
					getRedditPics();
					return false;
				}
	  		}
	  	});
	});
}

function getHtmlStrForSubNav(){
	htmlStr2=
	    '<ul class="nav nav-tabs nav-justified navsecondary">'+
        	'<li class="active">'+
        		'<a id="day" href="">Today</a></li>'+
        	'<li><a id="week" href="">Week</a></li>'+
        	'<li><a id="month" href="">Month</a></li>'+
         '</li>';
    return htmlStr2;
}