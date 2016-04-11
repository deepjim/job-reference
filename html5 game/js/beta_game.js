function html() {
   alert("start game");
}

var closeAudio = false;  
var closeBack = false; 

$(function (){
	$("#audio_bg").attr("src","audio/bg.mp3");
});
function audioSwitching (audioType,audioName) {
	if (audioType == "audio_bg" && closeBack == false) {
		
			$("#audio_bg").attr("src","audio/" + audioName + ".mp3");
	}
	else if (audioType == "audio_other" && closeAudio == false) {
	
			$("#audio_other").attr("src","audio/" + audioName + ".mp3");
	}
	else if (audioType == "audio_alarm") {
			$("#audio_alarm").attr("src","audio/" + audioName + ".mp3");
	}
}
function soundSet(type) {
	if (type == "ef") {
		if (closeAudio) {
		
			closeAudio = false;
			$("#ef_audio").css("background-image","url(numcrush/eff_close.png)");
			
		}
		else {
		
			closeAudio = true;
			$("#ef_audio").css("background-image","url(numcrush/eff_open.png)");
		}
	}
	else if (type == "bg") {
		if (closeBack) {
	
			closeBack = false;
			$("#bg_audio").css("background-image","url(numcrush/au_close.png)");
			document.getElementById("audio_bg").play();
		}
		else {
		
			closeBack = true;
			$("#bg_audio").css("background-image","url(numcrush/au_open.png)");
			document.getElementById("audio_bg").pause();
		}
	}

	audioSwitching ("audio_other","choose");
}
var score = 0;
var fever = 0;
var trail = 0;
var scoremap = [0,0,0,50,100,300,500,1000,3000,5000,10000,20000,30000,50000,100000,100001,100002,100003];
var block;
function calscore(){
	score = score + scoremap[point];
	document.getElementById("score").innerHTML = score;
	intime = 0;
	pnum = 0;
	ppnum = 0;
	point = 2;
	for (i=1;i<=10;i++){
		for(j=1;j<=10;j++){
			record[i][j] = -1;
            dirmap[i][j] = -1;
		}
	}
		trail[1] = "empty";
		tranum = 0;
		document.getElementById("trail").innerHTML = trail[1];
	
    for(i=0; i <=11; i++) {dirmap[i]=new Array(11);}
	for (i=1;i<=10;i++){
		for(j=1;j<=10;j++){
			block = document.getElementById(i*(12)+j);
			if(block.alt == "r")
				block.src = "numcrush/box/1/br/6.png";
			audioSwitching ("audio_other","disap");
			}
		}
	}

function addscore2(){
	score++;
	document.getElementById("fever").innerHTML = pnum;
	
}

var intime=0; 
var arnum=0;
var pnum=0;   
var ppnum=0;
var pppnum=0;

var record = new Array(11);
for(i=0; i <=11; i++) {record[i]=new Array(11);}
var dirmap = new Array(11);
for(i=0; i <=11; i++) {dirmap[i]=new Array(11);}


function firin(num){
	 for(i=1;i<=10;i++)
    {
        for(j=1;j<=10;j++)
        {
            var selnum = document.getElementById(i*(12)+j);
            if(selnum.alt == num ){
				selnum.src = "numcrush/red/"+num+".png";
				selnum.alt = "r";
			record[i][j]=intime;
			audioSwitching ("audio_other","choose");
			}
            if(i==0||j==0||i==11||j==11){}
               
        }
      
    }
}

function secin(num){
	for (i=1;i<=10;i++) {
		for (j=1;j<=10;j++) {
			if(record[i][j]== (intime-1)){
			//	alert("i:"+i+","+"j:"+j);
			   var O = document.getElementById(i*(12)+j);
			   var L = document.getElementById(i*(12)+j-1);
			   var R = document.getElementById(i*(12)+j+1);
			   var U = document.getElementById((i-1)*(12)+j);
			   var D = document.getElementById((i+1)*(12)+j);
			   
			   if(L.alt != num && R.alt != num && U.alt != num && D.alt != num ){
				   O.src = "numcrush/blk/"+pnum+".png";
				   O.alt = nummap[i][j];
				   audioSwitching ("audio_other","choose");
			   }
			   if(L.alt == num){
				   L.src = "numcrush/red/"+num+".png"; 
				   record[i][j-1]=intime;
				   dirmap[i][j-1]=3;
				   L.alt = "r";
				   audioSwitching ("audio_other","choose");
			   }
			   if(R.alt == num){
				   R.src = "numcrush/red/"+num+".png";
				   record[i][j+1]=intime;
				   dirmap[i][j+1]=4;
				   R.alt = "r";
				   audioSwitching ("audio_other","choose");
			   }
			   if(U.alt == num){
				   U.src = "numcrush/red/"+num+".png";
				   record[i-1][j]=intime;
				   dirmap[i-1][j]=1;
				   U.alt = "r";
				   audioSwitching ("audio_other","choose");
			   }
			   if(D.alt == num){
				   D.src = "numcrush/red/"+num+".png";
				   record[i+1][j]=intime;
			       dirmap[i+1][j]=2;
				   D.alt = "r";
				   audioSwitching ("audio_other","choose");
			   }
			  
	}
   }
  }
}
var point = 2;
function thrin(num){
	           
	for (i=1;i<=10;i++) {
		for (j=1;j<=10;j++) {
			
			if(record[i][j]== (intime-1)){
				var O = document.getElementById(i*(12)+j);
			   var L = document.getElementById(i*(12)+j-1);
			   var R = document.getElementById(i*(12)+j+1);
			   var U = document.getElementById((i-1)*(12)+j);
			   var D = document.getElementById((i+1)*(12)+j);
			 
				
			if( dirmap[i][j] == 1 && i!=1){
				if(U.alt == num){
				   U.src = "numcrush/red/"+num+".png";
				   record[i-1][j]=intime;
				   dirmap[i-1][j]=1;
				   point +=1;
				   U.alt = "r";
				   audioSwitching ("audio_other","choose");
			}else{
				O.src = "numcrush/blk/"+pnum+".png";
				D.src = "numcrush/blk/"+ppnum+".png";
                O.alt = nummap[i][j];
                D.alt = nummap[i+1][j];	
				audioSwitching ("audio_other","choose");
			}
			}
			if(dirmap[i][j] == 2 && i!=10){
				if(D.alt == num){
				   D.src = "numcrush/red/"+num+".png";
				   record[i+1][j]=intime;
			       dirmap[i+1][j]=2;
				   point +=1;
				   D.alt = "r";
				   audioSwitching ("audio_other","choose");
			}else{
				O.src = "numcrush/blk/"+pnum+".png";
				U.src = "numcrush/blk/"+ppnum+".png";
				O.alt = nummap[i][j];
				U.alt = nummap[i-1][j];
				audioSwitching ("audio_other","choose");
				
			}
			}
			if(dirmap[i][j] == 3 && j!=1){
				if(L.alt == num){
				   L.src = "numcrush/red/"+num+".png"; 
				   record[i][j-1]=intime;
				   dirmap[i][j-1]=3; 
				   point +=1;
				   L.alt = "r";
				   audioSwitching ("audio_other","choose");
			}else{
				O.src = "numcrush/blk/"+pnum+".png";
				R.src = "numcrush/blk/"+ppnum+".png";
				O.alt = nummap[i][j];
				R.alt = nummap[i][j+1];
				audioSwitching ("audio_other","choose");
			}
			}
			if(dirmap[i][j] == 4 && j!=10){
				if(R.alt == num){
				   R.src = "numcrush/red/"+num+".png";
				   record[i][j+1]=intime;
				   dirmap[i][j+1]=4; 
				   point +=1;
				   R.alt = "r";
				   audioSwitching ("audio_other","choose");
			}else{
				O.src = "numcrush/blk/"+pnum+".png";
				L.src = "numcrush/blk/"+ppnum+".png";
				O.alt = nummap[i][j];
				L.alt = nummap[i][j-1];
				audioSwitching ("audio_other","choose");
			}
			}
}
	}
}
}
var trail = new Array(11);
var tranum = 0;
function innum(num){
	if(tranum <=7){
	tranum++;
	trail[tranum] = num;
	}
    if(tranum >= 8){
		for(i=1;i<=6;i++){
		trail[i]=trail[i+1];
		}
	}
	trail[7]=num;
	
	if(tranum == 1)document.getElementById("trail").innerHTML = trail[1];
    if(tranum == 2)document.getElementById("trail").innerHTML = trail[1]+","+trail[2];
	if(tranum == 3)document.getElementById("trail").innerHTML = trail[1]+","+trail[2]+","+trail[3];
	if(tranum == 4)document.getElementById("trail").innerHTML = trail[1]+","+trail[2]+","+trail[3]+","+trail[4];
	if(tranum == 5)document.getElementById("trail").innerHTML = trail[1]+","+trail[2]+","+trail[3]+","+trail[4]+","+trail[5];
	if(tranum == 6)document.getElementById("trail").innerHTML = trail[1]+","+trail[2]+","+trail[3]+","+trail[4]+","+trail[5]+","+trail[6];
	if(tranum >= 7)document.getElementById("trail").innerHTML = trail[1]+","+trail[2]+","+trail[3]+","+trail[4]+","+trail[5]+","+trail[6]+","+trail[7];
	
		
	if(intime==0){
	      firin(num);
		
	}else if (intime == 1){
		secin(num);
	}else{
		thrin(num);
	}
	ppnum = pnum;
	pnum = num;
	intime++;
	document.getElementById("fever").innerHTML = fever;
}

var elapsedTime = 50;

function countTimer() {
	elapsedTime--;
	var minute = Math.floor(elapsedTime / 60);
	var second = elapsedTime % 60;
	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;

	if (minute == 0 && second == 10) {
		audioSwitching ("audio_alarm","alarm");
	}
		if (minute == 0 && second == 0) {
		timeout();
	}
}
function timeout(){
	alert("timeup");
　　document.getsc.scoree.value = score; 
	document.getsc.submit();

}



