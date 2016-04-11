function html() {
   alert("start game");
}
// Create the canvas
//var debug={};
var gametime=1000*92; //90s + 2s Start time
var gamemode=2;  // (-1) Relax mode ; (0) Normal mode ; (1) Challenge mode ; (2) Multi-player mode
var cgrid={};
var i;
var j;
for (i=0;i<100;i++){
	cgrid[i]=0;
}
var multisel={};
for (i=0;i<100;i++){
	multisel[i]=0;
}
var multigrid={};
for (i=0;i<100;i++){
	multigrid[i]=0;
}
var php="multi.php";
var multiget=0;
var multitarget; //target player
var multiscore=0;
var multiscoreAnimate=0;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var seed = Date.now();
var cseed = seed;
var score = 0;
var scoreAnimate = 0;
var fever=0;
var fevers=0;
var feverAnimate = 0;
var time_end=Date.now()+gametime*10;
var mlen=[19,14,21,19,23,20,21,20,20,21,11,31]
canvas.width = 480;
canvas.height = 800;
document.body.appendChild(canvas);
//feverbar
var feverbarReady = false;
var feverbarImage = new Image();
feverbarImage.onload = function () {
	feverbarReady = true;
};
feverbarImage.src = "numcrush/feverbar.png";

//fevercd
var fevercdReady = false;
var fevercdImage = new Image();
fevercdImage.onload = function () {
	fevercdReady = true;
};
fevercdImage.src = "numcrush/fevercd.png";

//gameEnd
var geReady = false;
var geImage = new Image();
geImage.onload = function () {
	geReady = true;
};
geImage.src = "numcrush/ge.png";

//gameStart
var gsReady = false;
var gsImage = new Image();
gsImage.onload = function () {
	gsReady = true;
};
gsImage.src = "numcrush/gs.png";

//Opponent
var opReady = false;
var opImage = new Image();
opImage.onload = function () {
	opReady = true;
};
opImage.src = "numcrush/oppsc.png";

//scorebg
var scbgReady = false;
var scbgImage = new Image();
scbgImage.onload = function () {
	scbgReady = true;
};
scbgImage.src = "numcrush/scbg.png";

//trailbg
var trbgReady = false;
var trbgImage = new Image();
trbgImage.onload = function () {
	trbgReady = true;
};
trbgImage.src = "numcrush/trbg.png";

//topbg
var topbgReady = false;
var topbgImage = new Image();
topbgImage.onload = function () {
	topbgReady = true;
};
topbgImage.src = "numcrush/topbg.png";

//fevershade
var fsReady = false;
var fsImage = new Image();
fsImage.onload = function () {
	fsReady = true;
};
fsImage.src = "numcrush/fevershade.png";

//shade
var shReady = false;
var shImage = new Image();
shImage.onload = function () {
	shReady = true;
};
shImage.src = "numcrush/shade.png";

//t1
var t1Ready = false;
var t1Image = new Image();
t1Image.onload = function () {
	t1Ready = true;
};
t1Image.src = "numcrush/t1.png";
//t2
var t2Ready = false;
var t2Image = new Image();
t2Image.onload = function () {
	t2Ready = true;
};
t2Image.src = "numcrush/t2.png";
//t3
var t3Ready = false;
var t3Image = new Image();
t3Image.onload = function () {
	t3Ready = true;
};
t3Image.src = "numcrush/t3.png";
//t4
var t4Ready = false;
var t4Image = new Image();
t4Image.onload = function () {
	t4Ready = true;
};
t4Image.src = "numcrush/t4.png";
//t5
var t5Ready = false;
var t5Image = new Image();
t5Image.onload = function () {
	t5Ready = true;
};
t5Image.src = "numcrush/t5.png";

//blk
var blkReady={};
var blkImage={};
for(i=0;i<9;i++){
	blkReady[i] = false;
	blkImage[i] = new Image();
}
blkImage.onload = function () {
	for(i=0;i<9;i++){
		blkReady[i] = true;
	}
};
for(i=1;i<10;i++){
	blkImage[i-1].src = "numcrush/blk/"+i+".png";
}
//red
var redReady={};
var redImage={};
for(i=0;i<9;i++){
	redReady[i] = false;
	redImage[i] = new Image();
}
redImage.onload = function () {
	for(i=0;i<9;i++){
		redReady[i] = true;
	}
};
for(i=1;i<10;i++){
	redImage[i-1].src = "numcrush/red/"+i+".png";
}
//blue
var blueReady={};
var blueImage={};
for(i=0;i<9;i++){
	blueReady[i] = false;
	blueImage[i] = new Image();
}
blueImage.onload = function () {
	for(i=0;i<9;i++){
		blueReady[i] = true;
	}
};
for(i=1;i<10;i++){
	blueImage[i-1].src = "numcrush/blue/"+i+".png";
}

//gry
var gryReady={};
var gryImage={};
for(i=0;i<2;i++){
	gryReady[i] = false;
	gryImage[i] = new Image();
}
gryImage.onload = function () {
	for(i=0;i<2;i++){
		gryReady[i] = true;
	}
};
gryImage[0].src = "numcrush/box/1/gry.png";
gryImage[1].src = "numcrush/box/2/gry.png";
//clr
var clrReady={};
var clrImage={};
for(i=0;i<2;i++){
	clrReady[i] = false;
	clrImage[i] = new Image();
}
clrImage.onload = function () {
	for(i=0;i<2;i++){
		clrReady[i] = true;
	}
};
clrImage[0].src = "numcrush/box/1/clr.png";
clrImage[1].src = "numcrush/box/2/clr.png";

//br
var brReady={};
var brImage={};
for(i=0;i<12;i++){
	brReady[i] = false;
	brImage[i] = new Image();
}
brImage.onload = function () {
	for(i=0;i<12;i++){
		brReady[i] = true;
	}
};
for (i=0;i<12;i++){
	brImage[i].src = "numcrush/box/"+(i%2+1)+"/br/"+(Math.floor(i/2)+1)+".png"
}

//re
var reReady={};
var reImage={};
for(i=0;i<12;i++){
	reReady[i] = false;
	reImage[i] = new Image();
}
reImage.onload = function () {
	for(i=0;i<12;i++){
		reReady[i] = true;
	}
};
for (i=0;i<12;i++){
	reImage[i].src = "numcrush/box/"+(i%2+1)+"/re/"+(Math.floor(i/2)+1)+".png"
}

//m
var mReady={};
var mImage={};
for(i=0;i<12;i++){
	mReady[i] = false;
	mImage[i] = new Image();
}
mImage.onload = function () {
	for(i=0;i<12;i++){
		mReady[i] = true;
	}
};
for(i=0;i<10;i++){
	mImage[i].src = "numcrush/m/"+i+".png";
}
mImage[10].src = "numcrush/m/d.png";
mImage[11].src = "numcrush/m/p.png";

//s
var sReady={};
var sImage={};
for(i=0;i<9;i++){
	sReady[i] = false;
	sImage[i] = new Image();
}
sImage.onload = function () {
	for(i=0;i<9;i++){
		sReady[i] = true;
	}
};
for(i=1;i<10;i++){
	sImage[i-1].src = "numcrush/s/"+i+".png";
}

//b
var bReady={};
var bImage={};
for(i=0;i<10;i++){
	bReady[i] = false;
	bImage[i] = new Image();
}
bImage.onload = function () {
	for(i=0;i<10;i++){
		bReady[i] = true;
	}
};
for(i=0;i<10;i++){
	bImage[i].src = "numcrush/b/"+i+".png";
}

//challenge
var chReady={};
var chImage={};
for(i=0;i<50;i++){
	chReady[i] = false;
	chImage[i] = new Image();
}
chImage.onload = function () {
	for(i=0;i<50;i++){
		chReady[i] = true;
	}
};
for(i=1;i<51;i++){
	chImage[i-1].src = "numcrush/cmode/"+i+".png";
}

var reset = function () {
	log.x = canvas.width / 5;
	log.y = canvas.height / 3;

};

// Draw everything
var grid={};
	for(i=0;i<100;i++) {grid[i]=-1;}
//random function
function random(prev){
	var tmp=prev;
	while (tmp>100) {tmp = tmp%10+Math.floor(tmp/10)%10*2+Math.floor(tmp/100)%10*3+Math.floor(tmp/1000)%10*4+Math.floor(tmp/10000)%10*5+Math.floor(tmp/100000)%10*6+Math.floor(tmp/1000000)%10*7+Math.floor(tmp/10000000)%10*8+Math.floor(tmp/100000000)%10*9;}
	return tmp+prev;
}
var trailp = 0;
var trail={};
var list={};
var listp=0;
var mtrailp = 0;
var mtrail={};
var mlist={};
var mlistp=0;
var sel={}; //x*10+y  --> 0-99
	for(i=0;i<100;i++) {sel[i]=0;}

function onload (){
	time_end=Date.now()+gametime;
}

var initialize = function () {
	//multiplayer
	ctx.drawImage(topbgImage, -8, -8);
	if (fever>0){
		ctx.drawImage(fsImage, -8, -8);
		fevers--;
		if (fevers==0) fever=0;
	}
	if (scoreAnimate!=score) {
		if (scoreAnimate==score-1) scoreAnimate=score;
		else scoreAnimate=Math.floor((scoreAnimate+score)/2);
	}
	if (feverAnimate!=fevers) {
		if (feverAnimate==fevers-1) feverAnimate=fevers;
		if (feverAnimate==fevers+1) feverAnimate=fevers;
		else feverAnimate=Math.floor((feverAnimate+fevers)/2);
	}
	if (gamemode==1){
		cseed=random(cseed);
		var mod=Math.floor(4000*(time_end-Date.now())/gametime);
		if (mod<200) mod=200;
		if (cseed%mod<100 && cgrid[cseed%mod]==0) cgrid[cseed%mod]=1;
	}
	for (i=0;i<100;i++){
		if (gamemode==2){
			if (multigrid[i]>=9){
				if (grid[i]<9) grid[i]=multigrid[i];
				multigrid[i]=0;
			}
		}
		if (grid[i]<9){
			if (sel[i]==0){
				ctx.drawImage(gryImage[(i+Math.floor(i/10))%2], 50+36*Math.floor(i/10),65+36*(i%10));
			} else {
				ctx.drawImage(clrImage[(i+Math.floor(i/10))%2], 50+36*Math.floor(i/10),65+36*(i%10));
			}
		} else {
			if (grid[i]<300){
				var tmppic=Math.floor((grid[i]-10)/2);
				if (tmppic>5)tmppic=5;
				ctx.drawImage(brImage[tmppic*2+(i+Math.floor(i/10))%2], 50+36*Math.floor(i/10),65+36*(i%10));
			} else {
				var tmppic=Math.floor((grid[i]-300)/2);
				if (tmppic>4)grid[i]=-2;
				ctx.drawImage(reImage[tmppic*2+(i+Math.floor(i/10))%2], 50+36*Math.floor(i/10),65+36*(i%10));
			}
			grid[i]++;
		}
		if (cgrid[i]!=0){
			if (grid[i]>=0 && grid[i]<9){
				ctx.drawImage(chImage[Math.floor((cgrid[i]-1)/3)], 50+36*Math.floor(i/10),65+36*(i%10));
				cgrid[i]++;
				if (cgrid[i]>150){
					grid[i]=10;
					cgrid[i]=0;
					sel[i]=0;
				}
			} else cgrid[i]=0;
		}
		if(grid[i]==-1){
			seed=random(seed);
			grid[i]=seed%9;
			ctx.drawImage(blkImage[grid[i]], 50+36*Math.floor(i/10),65+36*(i%10));
		} else if (grid[i]<9 && grid[i]>=0) {
			if (sel[i]==0){
				ctx.drawImage(blkImage[grid[i]], 50+36*Math.floor(i/10),65+36*(i%10));
			} else {
				ctx.drawImage(redImage[grid[i]], 50+36*Math.floor(i/10),65+36*(i%10));
			}
		}
		if (gamemode==2){
			if (grid[i]<9 && grid[i]>=0){
				if (multisel[i]>0){
					if (sel[i]>0) ctx.drawImage(blueImage[grid[i]], 0, 0, 40, 20, 50+36*Math.floor(i/10),65+36*(i%10), 40, 20);
					else ctx.drawImage(blueImage[grid[i]], 50+36*Math.floor(i/10),65+36*(i%10));
				}
			}
		}
	}
	if (gamemode==2){
		ctx.drawImage(opImage, 10, 30);
		if (multiscore!=multiscoreAnimate){
			if (multiscoreAnimate==multiscore-1) multiscoreAnimate=multiscore;
			else multiscoreAnimate=Math.floor((multiscoreAnimate+multiscore)/2);
		}
		var tmpscore=multiscoreAnimate;
		var tmplen=1;
		var tmpwidth=0;
		while (tmpscore>10){
			tmpscore/=10;
			tmpwidth+=mlen[Math.floor(tmpscore%10)];
			tmplen++;
		}
		tmpscore=multiscoreAnimate;
		for (i=0;i<tmplen;i++){
			ctx.drawImage(bImage[Math.floor(tmpscore%10)], 254+tmpwidth, 24);
			tmpscore/=10;
			tmpwidth-=mlen[Math.floor(tmpscore%10)];
		}
	}
	ctx.drawImage(t1Image,12,447);
	var tlen=15+Math.floor((time_end-Date.now())/gametime*430);
	if (tlen<15) {tlen=15;}
	ctx.drawImage(t2Image,0,0,tlen,70,9,447,tlen,70);
	if ((time_end-Date.now())/1000<10){
		if ((time_end-Date.now())/1000+(time_end-Date.now())%10<=8) ctx.drawImage(t5Image,4,447);
		else ctx.drawImage(t4Image,4,447);
	} else {
		ctx.drawImage(t3Image,4,447);
	}
	ctx.drawImage(scbgImage,291,551); // fever
	if (fever==0){
		ctx.drawImage(feverbarImage,0,0,0.134*feverAnimate,60,286,547,0.134*feverAnimate,60);
	} else {
		ctx.drawImage(fevercdImage,0,0,0.134*feverAnimate,60,286,547,0.134*feverAnimate,60);
	}
	var tmpx=410-mlen[11];
	ctx.drawImage(mImage[11],tmpx,558);
	tmpx-=mlen[feverAnimate%10];
	ctx.drawImage(mImage[feverAnimate%10],tmpx,558);
	tmpx-=mlen[10];
	ctx.drawImage(mImage[10],tmpx,558);
	tmpx-=mlen[Math.floor(feverAnimate/10)%10];
	ctx.drawImage(mImage[Math.floor(feverAnimate/10)%10],tmpx,558);
	if (feverAnimate>=100){
		tmpx-=mlen[Math.floor(feverAnimate/100)%10];
		ctx.drawImage(mImage[Math.floor(feverAnimate/100)%10],tmpx,558);
	}
	if (feverAnimate>=1000){
		tmpx-=mlen[Math.floor(feverAnimate/1000)%10];
		ctx.drawImage(mImage[Math.floor(feverAnimate/1000)%10],tmpx,558);
	}
	ctx.drawImage(scbgImage,291,636); // score
	var tmpsc=scoreAnimate;
	var sclen=mlen[scoreAnimate%10],scdigit=1;
	while(tmpsc>=10){
		tmpsc=Math.floor(tmpsc/10);
		sclen+=mlen[scoreAnimate%10];
		scdigit++;
	}
	tmpsc=scoreAnimate;
	tmpx=405;
	for (i=0;i<scdigit;i++){
		tmpx-=mlen[tmpsc%10];
		ctx.drawImage(mImage[tmpsc%10],tmpx,643);
		tmpsc=Math.floor(tmpsc/10);
	}
	ctx.drawImage(trbgImage,291,720); // trail
	tmpx=290;
	if (trailp>0){
		for (i=trailp-5;i<trailp;i++){
			if (i<0) i=0;
			ctx.drawImage(sImage[trail[i]-1],tmpx,715);
			tmpx+=22;
		}
	}
	if (Date.now()-time_end+gametime<=2000){
		var size=(Date.now()-time_end+gametime)/1000;
		if (size>1.2){
			size=(1.8-size/2);
			if (size<1.1)size=1.1;
		}
		ctx.drawImage(shImage, -8, -8);
		ctx.drawImage(gsImage, 232-Math.floor(size*135), 392-Math.floor(size*34.5),Math.floor(size*270),Math.floor(size*69));
	}
	else if (Date.now()>time_end && gamemode>=0){
		var size=(Date.now()-time_end)/500;
		if (size>1.2){
			size=(1.8-size/2);
			if (size<1.1)size=1.1;
		}
		ctx.drawImage(shImage, -8, -8);
		ctx.drawImage(geImage, 232-Math.floor(size*186.5), 392-Math.floor(size*35),Math.floor(size*373),Math.floor(size*70));
	}
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// The main game loop
var main = function () {
	
	initialize();
	//then = now;
	// Request to do this again ASAP
	requestAnimationFrame(main);
};
main();

var posdir={}; //position's direction
for (i=0;i<100;i++){posdir[i]=0;} //U,D,L,R -> 1,2,3,4
function enterfunc(){
if (Date.now()-time_end+gametime>2000 && (Date.now()<time_end || gamemode==-1)){
	var addfev=0;
	if (trailp>=3 && listp>0){
		addfev=listp*listp*trailp+5;
		for (i=0;i<100;i++){
			if (sel[i]>0){
				var sellim=(sel[i]*sel[i]+sel[i])*0.5;
				if (sel[i]>8) sellim=36+sel[i]-8;
				score+=(trailp-3+Math.floor(trailp/2.5))*sellim;
				grid[i]=10;
				addfev+=1;
			}
		}
		if (addfev>500) addfev=500;
		fevers+=addfev;
		if (fevers>1000) fevers=1000;
	}
	var newlist={};
	list=newlist;
	listp=0;
	trailp=0;
	for (i=0;i<100;i++){
		sel[i]=0;
	}
	for (i=0;i<listp;i++){
		for (j=0;j<trailp;j++){
			sel[list[i][j]]=1;
		}
	}
}
}
function innum(num){
if (Date.now()-time_end+gametime>2000 && (Date.now()<time_end || gamemode==-1)){
	trail[trailp]=num;
	if (trailp==0){
		for (i=0;i<100;i++){
			if (grid[i]==num-1){
				var group = new Array(100);
				group[0]=i;
				group.d=0;
				list[listp]=group;
				listp++;
			}
		}
	} else {
		var tft={}; // True False Table
		for (i=0;i<100;i++){
			if (grid[i]==num-1){
				tft[i]=1;
			} else {
				tft[i]=0;
			}
		}
		var dt={}; //Direction Table //UDLR
		for (i=0;i<100;i++){
			dt[i]=0;
			var x=Math.floor(i/10);
			var y=i%10;
			if (x>0 && tft[(x-1)*10+y]==1){
				dt[i]+=10;
			}
			if (x<9 && tft[(x+1)*10+y]==1){
				dt[i]+=1;
			}
			if (y>0 && tft[x*10+y-1]==1){
				dt[i]+=1000;
			}
			if (y<9 && tft[x*10+y+1]==1){
				dt[i]+=100;
			}
		}
		var newlist={};
		var newlistp=0;
		for (i=0;i<listp;i++){
			var selected={};
			var cut=0;
			for (j=0;j<100;j++)selected[j]=0;
			for (j=0;j<trailp;j++){
				if (grid[list[i][j]]<0 || grid[list[i][j]]>=9) cut=1;
				if (j==trailp-1 && cut==1)list[i].d=5;
				selected[list[i][j]]=1;
			}
			if (((fever==1 && list[i].d<5) || (list[i].d==0 || list[i].d==1)) && ((Math.floor(dt[list[i][trailp-1]]/1000)==1) && selected[list[i][trailp-1]-1]==0)){
				var group = new Array(100);
				for (j=0;j<trailp;j++){
					group[j]=list[i][j];
				}
				group[trailp]=list[i][trailp-1]-1;
				if (fever==0) {group.d=1;}
				else {group.d=0;}
				newlist[newlistp]=group;
				newlistp++;
			}
			if (((fever==1 && list[i].d<5) || (list[i].d==0 || list[i].d==2)) && ((Math.floor(dt[list[i][trailp-1]]/100)%10==1) && selected[list[i][trailp-1]+1]==0)){
				var group = new Array(100);
				for (j=0;j<trailp;j++){
					group[j]=list[i][j];
				}
				group[trailp]=list[i][trailp-1]+1;
				if (fever==0) {group.d=2;}
				else {group.d=0;}
				newlist[newlistp]=group;
				newlistp++;
			}
			if (((fever==1 && list[i].d<5) || (list[i].d==0 || list[i].d==3)) && ((Math.floor(dt[list[i][trailp-1]]/10)%10==1) && selected[list[i][trailp-1]-10]==0)){
				var group = new Array(100);
				for (j=0;j<trailp;j++){
					group[j]=list[i][j];
				}
				group[trailp]=list[i][trailp-1]-10;
				if (fever==0) {group.d=3;}
				else {group.d=0;}
				newlist[newlistp]=group;
				newlistp++;
			}
			if (((fever==1 && list[i].d<5) || (list[i].d==0 || list[i].d==4)) && ((dt[list[i][trailp-1]]%10==1) && selected[list[i][trailp-1]+10]==0)){
				var group = new Array(100);
				for (j=0;j<trailp;j++){
					group[j]=list[i][j];
				}
				group[trailp]=list[i][trailp-1]+10;
				if (fever==0) {group.d=4;}
				else {group.d=0;}
				newlist[newlistp]=group;
				newlistp++;
			}
		}
		list=newlist;
		listp=newlistp;
	}
	if (trailp<106) {trailp++;}
	else {
		for (i=93;i<100;i++){
			trail[i]=trail[i+7];
		}
		trailp=100;
	}
	for (i=0;i<100;i++){
		sel[i]=0;
	}
	for (i=0;i<listp;i++){
		for (j=0;j<trailp;j++){
			sel[list[i][j]]++;
		}
	}
}
}
function menterfunc(){
if (Date.now()-time_end+gametime>2000 && (Date.now()<time_end || gamemode==-1)){
	var addfev=0;
	if (mtrailp>=3 && mlistp>0){
		addfev=mlistp*mlistp*mtrailp+5;
		for (i=0;i<100;i++){
			if (multisel[i]>0){
				var sellim=(multisel[i]*multisel[i]+multisel[i])*0.5;
				if (multisel[i]>8) sellim=36+multisel[i]-8;
				multiscore+=(mtrailp-3+Math.floor(mtrailp/2.5))*sellim;
				multigrid[i]=10;
				addfev+=1;
			}
		}
		if (addfev>500) addfev=500;
		fevers+=addfev;
		if (fevers>1000) fevers=1000;
	}
	var newlist={};
	mlist=newlist;
	mlistp=0;
	mtrailp=0;
	for (i=0;i<100;i++){
		multisel[i]=0;
	}
	for (i=0;i<mlistp;i++){
		for (j=0;j<mtrailp;j++){
			multisel[mlist[i][j]]=1;
		}
	}
}
}
function minnum(num){
if (Date.now()-time_end+gametime>2000 && (Date.now()<time_end || gamemode==-1)){
	mtrail[mtrailp]=num;
	if (mtrailp==0){
		for (i=0;i<100;i++){
			if (grid[i]==num-1){
				var group = new Array(100);
				group[0]=i;
				group.d=0;
				mlist[mlistp]=group;
				mlistp++;
			}
		}
	} else {
		var tft={}; // True False Table
		for (i=0;i<100;i++){
			if (grid[i]==num-1){
				tft[i]=1;
			} else {
				tft[i]=0;
			}
		}
		var dt={}; //Direction Table //UDLR
		for (i=0;i<100;i++){
			dt[i]=0;
			var x=Math.floor(i/10);
			var y=i%10;
			if (x>0 && tft[(x-1)*10+y]==1){
				dt[i]+=10;
			}
			if (x<9 && tft[(x+1)*10+y]==1){
				dt[i]+=1;
			}
			if (y>0 && tft[x*10+y-1]==1){
				dt[i]+=1000;
			}
			if (y<9 && tft[x*10+y+1]==1){
				dt[i]+=100;
			}
		}
		var newlist={};
		var newlistp=0;
		for (i=0;i<mlistp;i++){
			var selected={};
			var cut=0;
			for (j=0;j<100;j++)selected[j]=0;
			for (j=0;j<mtrailp;j++){
				if (grid[mlist[i][j]]<0 || grid[mlist[i][j]]>=9) cut=1;
				if (j==mtrailp-1 && cut==1)mlist[i].d=5;
				selected[mlist[i][j]]=1;
			}
			if (((fever==1 && mlist[i].d<5) || (mlist[i].d==0 || mlist[i].d==1)) && ((Math.floor(dt[mlist[i][mtrailp-1]]/1000)==1) && selected[mlist[i][mtrailp-1]-1]==0)){
				var group = new Array(100);
				for (j=0;j<mtrailp;j++){
					group[j]=mlist[i][j];
				}
				group[mtrailp]=mlist[i][mtrailp-1]-1;
				if (fever==0) {group.d=1;}
				else {group.d=0;}
				newlist[newlistp]=group;
				newlistp++;
			}
			if (((fever==1 && mlist[i].d<5) || (mlist[i].d==0 || mlist[i].d==2)) && ((Math.floor(dt[mlist[i][mtrailp-1]]/100)%10==1) && selected[mlist[i][mtrailp-1]+1]==0)){
				var group = new Array(100);
				for (j=0;j<mtrailp;j++){
					group[j]=mlist[i][j];
				}
				group[mtrailp]=mlist[i][mtrailp-1]+1;
				if (fever==0) {group.d=2;}
				else {group.d=0;}
				newlist[newlistp]=group;
				newlistp++;
			}
			if (((fever==1 && mlist[i].d<5) || (mlist[i].d==0 || mlist[i].d==3)) && ((Math.floor(dt[mlist[i][mtrailp-1]]/10)%10==1) && selected[mlist[i][mtrailp-1]-10]==0)){
				var group = new Array(100);
				for (j=0;j<mtrailp;j++){
					group[j]=mlist[i][j];
				}
				group[mtrailp]=mlist[i][mtrailp-1]-10;
				if (fever==0) {group.d=3;}
				else {group.d=0;}
				newlist[newlistp]=group;
				newlistp++;
			}
			if (((fever==1 && mlist[i].d<5) || (mlist[i].d==0 || mlist[i].d==4)) && ((dt[mlist[i][mtrailp-1]]%10==1) && selected[mlist[i][mtrailp-1]+10]==0)){
				var group = new Array(100);
				for (j=0;j<mtrailp;j++){
					group[j]=mlist[i][j];
				}
				group[mtrailp]=mlist[i][mtrailp-1]+10;
				if (fever==0) {group.d=4;}
				else {group.d=0;}
				newlist[newlistp]=group;
				newlistp++;
			}
		}
		mlist=newlist;
		mlistp=newlistp;
	}
	if (mtrailp<106) {mtrailp++;}
	else {
		for (i=93;i<100;i++){
			mtrail[i]=mtrail[i+7];
		}
		mtrailp=100;
	}
	for (i=0;i<100;i++){
		multisel[i]=0;
	}
	for (i=0;i<mlistp;i++){
		for (j=0;j<mtrailp;j++){
			multisel[mlist[i][j]]++;
		}
	}
}
}
addEventListener("keypress",function (key){
	if (key.keyCode>=49 && key.keyCode<=57) innum(key.keyCode-48);
	else if (key.keyCode==13) enterfunc();
	else if ((key.keyCode==48 && fevers>50) && (Date.now()-time_end+gametime>2000 && (Date.now()<time_end || gamemode==-1))) fever=1;
},false);
canvas.addEventListener("mousedown", function (event){
	var x=event.pageX - this.offsetLeft;
	var y=event.pageY - this.offsetTop;
	if (x>=50 && x < 123){
		if (y>=533 && y<606) minnum(7);
		else if (y>=606 && y<679) minnum(4);
		else if (y>=679 && y<752) minnum(1);
	}
	else if (x>=123 && x < 196){
		if (y>=533 && y<606) minnum(8);
		else if (y>=606 && y<679) minnum(5);
		else if (y>=679 && y<752) minnum(2);
	}
	else if (x>=196 && x < 269){
		if (y>=533 && y<606) minnum(9);
		else if (y>=606 && y<679) minnum(6);
		else if (y>=679 && y<752) minnum(3);
	}
	else if (x>=277 && x < 425){
		if (y>=522 && y<610){
			if ((fevers>50) && (Date.now()-time_end+gametime>2000 && (Date.now()<time_end || gamemode==-1))) fever=1;
		} else if (y>=612 && y<755) menterfunc();
	}
}, false);