(function($){
  $(function(){

    $('.collapsible').collapsible({
    	accordion:false,
    });
  	$('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.tooltipped').tooltip();
    $('.modal').modal();
    $('.materialboxed').materialbox();
    $('.dropdown-trigger').dropdown();
    $('.scrollspy').scrollSpy();
    $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators:true
  });
    if ($(window).width() < 992) {
   			$("#navbar").removeClass("transparent");
   			$("#navbar").addClass("white");
   			

		}else{
			$("#navbar").removeClass("white");
   			$("#navbar").addClass("transparent");
		}

	$(window).scroll(function(){
		if ($ (window).scrollTop() > 1 && $(window).width() < 992) {
   				$("#navbar").addClass("z-depth-1");
  			} else {
    			$("#navbar").removeClass("z-depth-1");
			}


	});

    $(window).resize(function() {
  		if ($(window).width() < 992) {
   			$("#navbar").removeClass("transparent");
   			$("#navbar").addClass("white");

		}else{
			$("#navbar").removeClass("white");
   			$("#navbar").addClass("transparent");
		}


	});


    

    //$('.fixed-action-btn').floatingActionButton();

  }); // end of document ready
})(jQuery); // end of jQuery name space
function calculate() {
	document.getElementById("err_inv").classList.add("hide");
	document.getElementById("result").classList.add("hide");

  var ipaddr 	=  document.getElementById("ip").value;
  var subnet 	=  document.getElementById("subnet").value;
  var ip  	 	= ipaddr.split('.');
  if (
  		(ip[0]>=0&&ip[0]<=255)&&
  		(ip[1]>=0&&ip[1]<=255)&&
  		(ip[2]>=0&&ip[2]<=255)&&
  		(ip[3]>=0&&ip[3]<=255)&&
  		(subnet>=0&&subnet<=32)


  	){
  		var getBinary={};
		getBinary[1]=String("00000000"+parseInt(ip[0],10).toString(2)).slice(-8);
		getBinary[2]=String("00000000"+parseInt(ip[1],10).toString(2)).slice(-8);
		getBinary[3]=String("00000000"+parseInt(ip[2],10).toString(2)).slice(-8);
		getBinary[4]=String("00000000"+parseInt(ip[3],10).toString(2)).slice(-8);
		var binaryFixed = getBinary[1]+"."+getBinary[2]+"."+getBinary[3]+"."+getBinary[4];

		function replaceAll(string, search, replace) {
  		return string.split(search).join(replace);
		}
		var wildcard = replaceAll(binaryFixed , '1',',');
		var wildcard = replaceAll(wildcard , '0','1');
		var wildcard = replaceAll(wildcard , ',','0');

		var availableip = 32 - subnet;
		var availableip = Math.pow(2, availableip);
		var availableip = availableip-2;

		var getClass="";
		if(ip[0]<=126) {
		getClass="A";
		}else if (ip[0]==127) {
		getClass="loopback IP"
		}else if (ip[0]>=128 && ip[0]<=191) {
		getClass="B";
		}else if (ip[0]>=192 && ip[0]<=223) {
		getClass="C";
		}else if (ip[0]>=224 && ip[0]<=239) {
		getClass="D (Multicast Address)";
		}else if (ip[0]>=240 && ip[0]<=225) {
		getClass="E (Experimental)";
		}else {
		getClass="Out of range";
		}

		var mask=subnet;
		var BlockNum=Math.ceil(mask/8);
		var importantBlockBinary=getBinary[BlockNum];
		var maskBinaryBlockCount=mask%8;
		if(maskBinaryBlockCount==0)BlockNum++;
		var maskBinaryBlock="";
		var maskBlock="";
		for(var i=1;i<=8;i++){
		if(maskBinaryBlockCount>=i){
		maskBinaryBlock+="1";
		}else{
		maskBinaryBlock+="0";
		}
		}
		maskBlock=parseInt(maskBinaryBlock,2);

		var netBlockBinary="";
		var bcBlockBinary="";
		for(var i=1;i<=8;i++){
		if(maskBinaryBlock.substr(i-1,1)=="1"){
		netBlockBinary+=importantBlockBinary.substr(i-1,1);
		bcBlockBinary+=importantBlockBinary.substr(i-1,1);
		}else{
		netBlockBinary+="0";
		bcBlockBinary+="1";
		}
		}

		var mask="";
		var maskBinary="";
		var net="";
		var bc="";
		var netBinary="";
		var bcBinary="";
		var rangeA="";
		var rangeB="";

		for(var i=1;i<=4;i++){
		if(BlockNum>i) {

		mask+="255";
		maskBinary+="11111111";
		netBinary+=getBinary[i];
		bcBinary+=getBinary[i];
		net+=parseInt(getBinary[i],2);
		bc+=parseInt(getBinary[i],2);
		rangeA+=parseInt(getBinary[i],2);
		rangeB+=parseInt(getBinary[i],2);
		}else if (BlockNum==i) {

		mask+=maskBlock;
		maskBinary+=maskBinaryBlock;
		netBinary+=netBlockBinary;
		bcBinary+=bcBlockBinary;
		net+=parseInt(netBlockBinary,2);
		bc+=parseInt(bcBlockBinary,2);
		rangeA+=(parseInt(netBlockBinary,2)+1);
		rangeB+=(parseInt(bcBlockBinary,2)-1);
		}else {

		mask+=0;
		maskBinary+="00000000";
		netBinary+="00000000";
		bcBinary+="11111111";
		net+="0";
		bc+="255";
		rangeA+=0;
		rangeB+=255;
		}

		if(i<4){
		mask+=".";
		maskBinary+=".";
		netBinary+=".";
		bcBinary+=".";
		net+=".";
		bc+=".";
		rangeA+=".";
		rangeB+=".";
		}


  		document.getElementById("ip_res").value= ipaddr;
		document.getElementById('ipbinary_res').value = binaryFixed;
  		
  		document.getElementById('subnet_res').value=mask;
		document.getElementById('maskbinary_res').value=maskBinary;
  		document.getElementById('class_res').value=getClass;
		document.getElementById('net_res').value=net;
		document.getElementById('range_res').value=rangeA + " - " + rangeB;
		document.getElementById('bc_res').value=bc;
		document.getElementById('wildcard_res').value = wildcard;
		document.getElementById('hostnum_res').value = availableip;
		document.getElementById("result").classList.remove("hide");
  	  }}else{
  	  	document.getElementById("err_inv").classList.remove("hide");
  	  };


 function classify(){
 	const toxicity = require('@tensorflow-models/toxicity');
 	const txt = document.getElementById("sentiment").value;
 	const threshold = 0.9;
 	toxicity.load(threshold).then(model =>{
 		const sentences = [txt];
 		console.log(sentences);
 		model.classify(sentences).then(predictions =>{
 			console.log(predictions);
 		});
 	});
 };



}
