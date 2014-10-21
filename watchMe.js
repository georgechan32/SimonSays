var myWidth = 0, myHeight = 0;
var oTable = document.getElementById("mainTable");
var cell0 = oTable.rows[0].cells[0];
var cell1 = oTable.rows[0].cells[1];
var cell2 = oTable.rows[0].cells[2];
var cell3 = oTable.rows[1].cells[0];
var cell4 = oTable.rows[1].cells[1];
var cell5 = oTable.rows[1].cells[2];
var cell6 = oTable.rows[2].cells[0];
var cell7 = oTable.rows[2].cells[1];
var cell8 = oTable.rows[2].cells[2];
alertSize();
calculateSquareSize();
var data = "0";
var pattern = "";
var currLevel = 3;
var sequenceByte = 0;
var timer;
var counter = 0;
var userSequence = "0";
var stringIndex = 1;

//createSequence();
function alertSize() {
  
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IEHij
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  
  myWidth = myWidth * .8;
  myHeight = myHeight * .8;
   // window.alert( 'Width = ' + myWidth );
   // window.alert( 'Height = ' + myHeight );
   alert(myWidth + " " + myHeight);
}

function calculateSquareSize()
{
	var squareSizer;
	if(myWidth > myHeight)
	{
		squareSizer = (Math.floor((myHeight / 3))).toString() + "px";
	}
	else
	{
		squareSizer = (Math.floor((myWidth / 3))).toString() + "px";
	}
	
	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			oTable.rows[i].cells[j].style.width = squareSizer;
			oTable.rows[i].cells[j].style.height = squareSizer;
			oTable.rows[i].cells[j].appendChild(btnCreator(i+j, squareSizer));
		}
	}
	alert(squareSizer);
	cell1.firstChild.style.backgroundColor = "blue";
	cell1.firstChild.onclick = btn1Blue;
	cell1.firstChild.onmousedown = blueGlow;
	cell1.firstChild.onmouseup = dark4;
	
	cell3.firstChild.style.backgroundColor = "yellow";
	cell3.firstChild.onclick = btn3Yellow;
	cell3.firstChild.onmousedown = yellowGlow;
	cell3.firstChild.onmouseup = dark4;
	
	cell5.firstChild.style.backgroundColor = "green";
	cell5.firstChild.onclick = btn5Green;
	cell5.firstChild.onmousedown = greenGlow;
	cell5.firstChild.onmouseup = dark4;
	
	cell7.firstChild.style.backgroundColor = "red";
	cell7.firstChild.onclick = btn7Red;
	cell7.firstChild.onmousedown = redGlow;
	cell7.firstChild.onmouseup = dark4;
	
	cell4.firstChild.style.backgroundColor = "#191919";
	//cell4.firstChild.onclick=(btn4Black);
	cell4.firstChild.onclick= createSequence;
	cell4.firstChild.value = "Play!"
}

function btnCreator(val1, size)
{
	var button= document.createElement('input');
	button.style.width = size;
	button.style.height = size;
	//button.style.backgroundColor = "blue";
	button.className = "bf_button";

	button.style.textAlign = "center";
	button.setAttribute('type','button');
	button.setAttribute('name',val1);
	button.setAttribute('value',"");
	return button;
}

function createSequence()
{
	cell4.firstChild.value = ("Level " + (currLevel - 2));
	disableColorBtns();
	timer = setInterval(randColor, 500); 
}

function disableColorBtns()
{
	for(var i = 0; i < 3; i++)
	{
		for(var j = 0; j < 3; j++)
		{
			oTable.rows[i].cells[j].firstChild.disabled = true;
		}
	}

}

function randColor()
{
	if(counter < currLevel * 2)
	{
		if(counter % 2 == 1)
		{
			switch(sequenceByte)
			{
				case 1:
					btnDark(cell1.firstChild);
					break;
				case 2: 
					btnDark(cell3.firstChild);
					break;
				case 3:
					btnDark(cell5.firstChild);
					break;
				case 4: 
					btnDark(cell7.firstChild);
					break;
			}
		}
		else
		{
			sequenceByte = Math.floor((Math.random() * 4)) +1;
			switch(sequenceByte)
			{
				case 1:
					btnGlow(cell1.firstChild);
					break;
				case 2: 
					btnGlow(cell3.firstChild);
					break;
				case 3:
					btnGlow(cell5.firstChild);
					break;
				case 4: 
					btnGlow(cell7.firstChild);
					break;
			}
			data += sequenceByte.toString();
		}
		counter++;
	}
	else
	{
		clearInterval(timer);
		counter = 0;
		cell4.firstChild.onclick=(btn4Black);
		cell4.firstChild.value = "Give up?";
		for(var i = 0; i < 3; i++)
		{
			for(var j = 0; j < 3; j++)
			{
				oTable.rows[i].cells[j].firstChild.disabled = false;
			}
		}
		
		//data.innerHTML = 0;
	}
}

function wrongSequence()
{
	stringIndex = 1;
	disableColorBtns();
	wrongString();
}

function correctSoFar()
{
	stringIndex++;
	if(stringIndex >= data.length)
	{
		stringIndex = 1;
		cell1.firstChild.disabled = true;
		cell3.firstChild.disabled = true;
		cell5.firstChild.disabled = true;
		cell7.firstChild.disabled = true;
		correctString();
	}
}

function btn1Blue()
{
	userSequence += "1";
	//this.style.opacity = .6;
	if(data[stringIndex] != '1')
	{
		wrongSequence();
	}
	else
	{
		correctSoFar();
	}
}

function blueGlow()
{
	cell1.firstChild.style.opacity = .6;
	
}

function btn3Yellow()
{
	userSequence += "2";
	//this.style.opacity = .6;
	if(data[stringIndex] != '2')
	{
		wrongSequence();
	}
	else
	{
		correctSoFar();
	}
	
}
function yellowGlow()
{
	cell3.firstChild.style.opacity = .6;
}

function btn5Green()
{
	userSequence += "3";
	//this.style.opacity = .6;
	if(data[stringIndex] != '3')
	{
		wrongSequence();
	}
	else
	{
		correctSoFar();
	}
	
}
function greenGlow()
{
	cell5.firstChild.style.opacity = .6;
}

function btn7Red()
{
	userSequence += "4";
	//this.style.opacity = .6;
	if(data[stringIndex] != '4')
	{
		wrongSequence();
	}
	else
	{
		correctSoFar();
	}
}
function redGlow()
{
	cell7.firstChild.style.opacity = .6;
}

function correctString()
{
	cell4.firstChild.value = "Good! Next Level?";
	currLevel++;
	userSequence = "0";
	data = "0";
	cell4.firstChild.onclick = createSequence;
}

function wrongString()
{
	cell4.firstChild.value = "Oops...Try Again?";
	currLevel--;
	if(currLevel < 3)
	{
		currLevel = 3;
	}
	userSequence = "0";
	data = "0";
	cell4.firstChild.onclick = createSequence;
	cell4.firstChild.disabled = false;
}

function btn4Black()
{
	if(userSequence == data)
	{
		correctString();
	}
	else
	{
		wrongString();
	}
}

function dark4()
{
	btnDark(cell1.firstChild);
	btnDark(cell3.firstChild);
	btnDark(cell5.firstChild);
	btnDark(cell7.firstChild);
}

function btnGlow(btn)
{
	btn.style.opacity = ".7";
}

function btnDark(btn)
{
	btn.style.opacity = "1";
}