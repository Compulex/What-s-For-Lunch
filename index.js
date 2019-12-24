//Alexa Lewis

var meals = ["Burger", "Deli Sandwich", "Pizza"];

//Burger
var sidesB = ["Fries", "None"];
var sauce = ["Barbeque", "Ketchup", "Mustard"];

//Deli
var sidesD = ["Chips", "None"];
var flavor = ["Barbeque", "Salt & Vinegar", "Sour Cream & Onion"];

//Pizza
var sidesP = ["Chicken Wings", "Garlic Knots", "None"];

//chicken wings
var wings_flavor = ["Barbeque", "Buffalo"];

//garlic knots
var marinara = ["Yes", "No"];

var drinks = ["Juice", "Soda", "Water"];

var order = "Your order: ";
var n = 0;
var c = 0;
//var c, cF, cM, cS, cSa = 0;


//makes first select
function firstSelect(){
	document.body.style.backgroundColor = 'aqua';
	
	var id = "lunch" + n;
	
	var sel = document.createElement('select');
	sel.setAttribute('id', id);
	var div = document.getElementById('meals');
	div.appendChild(sel);
	
	//add blank option
	var blank = document.createElement('option');
	blank.setAttribute('value', 'default');
	blank.appendChild(document.createTextNode('--Select--'));
	sel.appendChild(blank);
	
	var arr = meals;
	
	for(var i=0; i<arr.length; i++){
		//create option element
		var opt = document.createElement('option');
		opt.setAttribute('value', arr[i]);
		
		//add text node
		opt.appendChild(document.createTextNode(arr[i]));
		
		//add option to select
		sel.appendChild(opt);
	}
	n++;
	
	sel.onchange = function(){createSelect(sel, false);};
	
}//firstSelect

function createSelect(dom, changed){
	var id = "lunch" + n;
	
	var sel = document.createElement('select');
	sel.setAttribute('id', id);
	
	dom.parentNode.appendChild(sel);
	var selId = document.getElementById(id);
	
	//add blank option
	var blank = document.createElement('option');
	blank.setAttribute('value', 'default');
	blank.appendChild(document.createTextNode('--Select--'));
	selId.appendChild(blank);
	
	var arr = [];
	var selVal = dom.options[dom.selectedIndex].value;
	
	//get options
	arr = getOptions(selVal);
	
	//adding option for each select from array
	for(var i=0; i<arr.length; i++){
		//create option element
		var opt = document.createElement('option');
		opt.setAttribute('value', arr[i]);
		
		//add text node
		opt.appendChild(document.createTextNode(arr[i]));
		
		//add option to select
		selId.appendChild(opt);
	}
	//animation
	slidingSelect(selVal, selId, changed);
	
	if(n==1){
		order += selVal;
	}
	n++;
	
	selId.onchange = function(){selected(selId);};
}//createSelect

function getOptions(selVal){
	
	var specificArr = []; 
	switch(selVal){
		case 'Burger':
			specificArr = sidesB;
			break;
		case 'Deli Sandwich':
			specificArr = sidesD;
			break;
		case 'Pizza':
			specificArr = sidesP;
			break;
		case 'Fries':
			specificArr = sauce;
			break;
		case 'Garlic Knots':
			specificArr = marinara;
			document.getElementById('sauces').innerHTML = "How about some marinara sauce?";
			break;
		case 'Chips':
			specificArr = flavor;
			break;
		case 'Chicken Wings':
			specificArr = wings_flavor;
			break;
		default:
			specificArr = drinks;
	}	
	return specificArr;
	
}//getOptions

function slidingSelect(selVal, selId, chng){
	//setting each sliding div for next question
	if(selVal == 'Burger' || selVal == 'Deli Sandwich' || selVal == 'Pizza'){
		document.getElementById('sides').appendChild(selId);
		slide(document.getElementById('sides'), chng);
	}
	else if(selVal == 'Fries' || selVal == 'Garlic Knots'){
		document.getElementById('sauces').appendChild(selId);
		slide(document.getElementById('sauces'), chng);
		
	}
	else if(selVal == 'Chips' || selVal == 'Chicken Wings'){
		document.getElementById('flavors').appendChild(selId);
		slide(document.getElementById('flavors'), chng);
	}
	else{
		document.getElementById('drinks').appendChild(selId);
		slide(document.getElementById('drinks'), chng);
	}
}//slidingSelect

function selected(sel){
	var selVal = sel.options[sel.selectedIndex].value;
	
	//sides
	if(selVal == 'Fries' || selVal == 'Garlic Knots' || selVal == 'Chips' || selVal == 'Chicken Wings'){
		if(c > 0){
			change(c);
			createSelect(sel, true);
		}
		else{
			order += ' with a side of ' + selVal;
			createSelect(sel, false);
			c += 1;
		}
	}
	//sauces
	else if(selVal == 'Barbeque' || selVal == 'Ketchup' || selVal == 'Mustard'){
		if(c > 1){
			change(c);
			createSelect(sel, true);
		}
		else{
			order += ' dipped in ' + selVal + ' sauce';
			createSelect(sel, false);
			c += 1;
		}
	}
	
	//chips flavors
	else if(selVal == 'Barbeque' || selVal == "Salt & Vinegar" || selVal == "Sour Cream & Onion"){
		if(c > 1){
			change(c);
			createSelect(sel, true);
		}
		else{
			order += ' ' + selVal + ' flavor';
			createSelect(sel, false);
			c += 1;
		}
	}
	
	//wings flavors
	else if(selVal == 'Barbeque' || selVal == 'Buffalo'){
		if(c > 1){
			change(c);
			createSelect(sel, true);
		}
		else{
			order += ' ' + selVal + ' flavor';
			createSelect(sel, false);
			c += 1;
		}
	}
	
	//yes to marinara sauce
	else if(selVal == 'Yes'){
		if(c > 1){
			change(c);
			createSelect(sel, true);
		}
		else{
			order += ' and marinara sauce';
			createSelect(sel, false);
			c += 1;
		}
	}
	
	//no option
	else if(selVal == 'None' || selVal == 'No'){
		if(c > 1){
			change(c);
			createSelect(sel, true);
		}
		else{
			createSelect(sel, false);
			c += 1;
		}
	}
	
	//bevs
	else if(selVal == 'Juice' || selVal == 'Soda' || selVal == 'Water'){
		order += ' and a glass of ' + selVal;
		createForm(sel);
	}
	
	console.log(c);
}//selected

function change(count){
	var divSi = document.getElementById('sides');
	var divSa = document.getElementById('sauces');
	var divF = document.getElementById('flavors');
	var divD = document.getElementById('drinks');
	
	//select is already created in proceeding div
	if(divD.lastChild.nodeType == 1){ 
		console.log('Fix me after sauces/flavors');
		bye(divD);
	}
	else if(divF.lastChild.nodeType == 1){
		bye(divF);
	}
	else if(divSa.lastChild.nodeType == 1){
		bye(divSa);
	}
	else if(divSi.lastChild.nodeType == 1){
		bye(divSi);
	}
	count = 0;
}//change

/*-----------------------------STOP--------------------------------------*/

function createForm(dom){
	var f = document.createElement('form');
	f.setAttribute('id', 'f1');
	
	var bdy = dom.parentNode.parentNode;
	bdy.appendChild(document.createElement('BR'));
	bdy.appendChild(document.createTextNode(order));
	bdy.appendChild(f);
	
	f.appendChild(document.createElement('BR'));
	
	var ipt = document.createElement('input');
	ipt.setAttribute('type', 'text');
	ipt.setAttribute('name', 'full');
	
	//adding label next to text field
	
	f.appendChild(ipt);
	f.insertBefore(document.createTextNode('Name: '), f.lastChild);
	
	f.appendChild(document.createElement('BR'));
	
	//radio buttons
	var rd = document.createElement('input');
	rd.setAttribute('type', 'radio');
	rd.setAttribute('name', 'choose');
	rd.setAttribute('value', 'Dine In');
	
	//adding label next to radio button
	f.appendChild(rd);
	//console.log(f.lastChild);
	f.appendChild(document.createTextNode('Dine In'));
	
	var rd1 = document.createElement('input');
	rd1.setAttribute('type', 'radio');
	rd1.setAttribute('name', 'choose');
	rd1.setAttribute('value', 'Take Out');
	
	f.appendChild(rd1);
	f.appendChild(document.createTextNode('Take Out'));
	
	var dt = '';
	if(rd.checked == true){
		dt += rd.value;
	}
	else if(rd1.checked == true){
		yn += rd1.value;
	}
	
	//confirm order button
	var btn = document.createElement('button');
	btn.appendChild(document.createTextNode('Confirm'));
	f.appendChild(btn);
	
	//btn.onclick = changeImg(dt, ipt.value, order);
}//createForm



