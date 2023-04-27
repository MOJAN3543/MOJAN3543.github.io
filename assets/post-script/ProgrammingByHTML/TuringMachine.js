class TuringMachine{
		constructor(query, preset, firstState){
			this.HeadIndex = 0;
			this.presetState = firstState;
			this.NowState = firstState;
			this.ActTable = {};
			this.presetList = Object.assign([], preset);
			this.MainHTML = document.querySelector(query);
			this.HTMLconstruct();
			if(query == 'div.Universal'){
				this.Universalconstruct();
				this.MainHTML.querySelectorAll('button')[2].onclick = this.TextToTuple.bind(this);
				this.MainHTML.querySelectorAll('button')[3].onclick = this.TextToPreset.bind(this);
			}
			this.ButtonHTML = this.MainHTML.querySelectorAll('Button');
			this.headHTML = this.MainHTML.querySelector('div.tape > div.head');
			this.headStateHTML = this.headHTML.querySelector('div.state');
			this.cellHTML = this.MainHTML.querySelectorAll('div.tape > div.cell');
			this.ButtonHTML[0].onclick = this.Act.bind(this);
			this.ButtonHTML[1].onclick = this.Refresh.bind(this);
			this.cell = [];
			for(let i=0; i<preset.length; i++){
				switch(preset[i]){
					case 'B':
						this.cell[i] = '';
						break;
					case -1:
						this.cell[i] = Math.round(Math.random());
						break;
					default:
						this.cell[i] = preset[i];
						break;
				}
			}
			for(let i=preset.length; i<this.cellHTML.length; i++){
				this.presetList.push('');
				this.cell.push('');
			}
			
		}
		HTMLconstruct(){
			let TapeModel = document.createElement('div');
			TapeModel.className = 'tape';
			this.MainHTML.appendChild(TapeModel);
			let HeadModel = document.createElement('div');
			HeadModel.className = 'head';
			HeadModel.innerHTML = '.';
			TapeModel.appendChild(HeadModel);
			let stateModel = document.createElement('div');
			stateModel.className = 'state';
			HeadModel.appendChild(stateModel);
			for(let i=0; i<15; i++){
				let CellModel = document.createElement("div");
				CellModel.className = 'cell';
				TapeModel.appendChild(CellModel);
			}
			let ControllerModel = document.createElement("div");
			ControllerModel.className = 'controller';
			this.MainHTML.appendChild(ControllerModel);
			let ActModel = document.createElement("button");
			ActModel.className = 'nextAct';
			ActModel.innerHTML = '→'
			ControllerModel.appendChild(ActModel);
			let refreshModel = document.createElement("button");
			refreshModel.className = 'refresh';
			refreshModel.innerHTML = '↻';
			ControllerModel.appendChild(refreshModel);
		}
		Universalconstruct(){
			let inputtrayModel = document.createElement("div");
			inputtrayModel.className = 'inputtray';
			this.MainHTML.appendChild(inputtrayModel);
			let Names = ['5-Tuple Action', 'Tape'];
			for(let i=0; i<2; i++){
				let inputandcommitModel = document.createElement("div");
				inputandcommitModel.className = 'inputandcommit';
				inputandcommitModel.innerHTML = Names[i];
				inputtrayModel.appendChild(inputandcommitModel);
				let inputtextModel = document.createElement("input");
				inputtextModel.className = 'inputtext';
				inputtextModel.type = 'text';
				inputandcommitModel.appendChild(inputtextModel);
				let buttonModel = document.createElement("button");
				buttonModel.className = 'commitbutton';
				buttonModel.innerHTML = '⇁';
				inputandcommitModel.appendChild(buttonModel);
			}
			
		}
		CellUpdate(){
			for(let i=0; i<this.cellHTML.length; i++){
				this.cellHTML[i].innerHTML = this.cell[i];
			}
		}
		Refresh(){
			this.HeadIndex = 0;
			this.NowState = this.presetState;
			for(let i=0; i<this.presetList.length; i++){
				switch(this.presetList[i]){
					case 'B':
						this.cell[i] = '';
						break;
					case -1:
						this.cell[i] = Math.round(Math.random());
						break;
					default:
						this.cell[i] = this.presetList[i];
						break;
				}
			}
			for(let i=this.presetList.length; i<this.cellHTML.length; i++){
				this.cell[i] = '';
			}
			this.HeadDisplayUpdate();
			this.HeadUpdate();
			this.CellUpdate();
		}
		HeadDisplayUpdate(){
			this.headStateHTML.innerHTML = this.NowState;
		}
		HeadUpdate(){
			this.headHTML.style.left = this.HeadIndex*2.25+'rem';
		}
		HeadWrite(celldata){
			if(celldata == 'B')
				this.cell[this.HeadIndex] = '';
			else
				this.cell[this.HeadIndex] = celldata;
			this.CellUpdate();
		}
		HeadLeft(){
			if(--this.HeadIndex<0)
				this.HeadIndex = 0;
			this.HeadUpdate();
		}
		HeadRight(){
			if(++this.HeadIndex>=this.cellHTML.length)
				this.HeadIndex = this.cellHTML.length-1;
			this.HeadUpdate();
		}
		//(State, Read, Write, Move, NextState)
		TupletoActTable(Tuple){
			if(!(Tuple[0] in this.ActTable))
				this.ActTable[Tuple[0]] = {};
			if(!(Tuple[1] in this.ActTable[Tuple[0]]))
				this.ActTable[Tuple[0]][Tuple[1]] = {};
			this.ActTable[Tuple[0]][Tuple[1]] = [Tuple[2], Tuple[3], Tuple[4]];
		}
		Act(){
			let State = this.NowState;
			let Read = this.cell[this.HeadIndex];
			if(Read === '')
				Read = 'B';
			try {
				if(!(State in this.ActTable)||!(Read in this.ActTable[State]))
					throw 'NoStateReadError';
				let Write = this.ActTable[State][Read][0];
				let Move = this.ActTable[State][Read][1];
				let NextState = this.ActTable[State][Read][2];
				if((Move == 'L' && this.HeadIndex == 0)||(Move == 'R' && this.HeadIndex == 14))
					throw 'OutOfBound';
				this.HeadWrite(Write);
				switch(Move){
					case 'L':
						this.HeadLeft();
						break;
					case 'R':
						this.HeadRight();
						break;
				}
				this.NowState = NextState;
				this.HeadDisplayUpdate();
			}
			catch(err){
				switch(err){
					case 'NoStateReadError':
						alert("현재 상태가 행동표에 정의되지 않았습니다.");
						break;
					case 'OutOfBound':
						alert("헤드가 움직일 공간이 없습니다.");
						break;
						
				}
			}
		}
		TextToTuple(){
			try{
				let text = this.MainHTML.querySelectorAll('input')[0].value;
				let tuplelist = text.split(';');
				let CommandList = [];
				tuplelist.forEach(function(tuple){
					if(tuple[0] != '(' || tuple[tuple.length-1] != ')')
						throw "UndueTupleString";
					let Command = tuple.slice(1, tuple.length-1).split(',');
					if(Command.length != 5)
						throw "TupleLengthError";
					if('A' > Command[0] || Command[0] > 'Z')
						throw "StateIndexError";
					if('A' > Command[4] || Command[4] > 'Z')
						throw "NextIndexError";
					if(Command[3] != 'L' && Command[3] != 'N' && Command[3] != 'R')
						throw "MoveIndexNotLRN";
					Command.forEach(function(Com){
						if(Com.length != 1)
							throw "CommandLengthError";
					});
					CommandList.push(Command);
				});
				CommandList.forEach(Command => this.TupletoActTable(Command))
				this.Refresh();
			}
			catch(err){
				switch(err){
					case 'UndueTupleString':
						alert("작성된 튜플의 양식이 적절하지 않습니다.");
						break;
					case 'TupleLengthError':
						alert("튜플의 길이가 5가 아닙니다.");
						break;
					case 'MoveIndexNotLRN':
						alert("튜플의 4번째 인자가 L, R, N중 하나가 아닙니다.");
						break;
					case 'CommandLengthError':
						alert("튜플의 인자의 길이가 한글자가 아닙니다.");
						break;
					case 'StateIndexError':
						alert("튜플의 1번째 인자가 대문자 알파벳이 아닙니다.");
						break;
					case 'NextIndexError':
						alert("튜플의 5번째 인자가 대문자 알파벳이 아닙니다.");
						break;
					default:
						alert(err);
						break;
				}	
			}
		}
		TextToPreset(){
			try{
				let text = this.MainHTML.querySelectorAll('input')[1].value;
				if(text.length>15)
					throw "TextLengthError";
				this.presetList = [];
				text.split('').forEach(textElement => this.presetList.push(textElement))
				this.Refresh();
			}
			catch(err){
				switch(err){
					case 'TextLengthError':
						alert("작성된 테이프의 길이가 16자 이상입니다.");
						break;
					default:
						alert(err);
				}
			}
		}
		SetPreset(preset){
			let inputList = this.MainHTML.querySelectorAll('input');
			inputList[0].value = preset[0];
			inputList[1].value = preset[1];
			this.TextToTuple();
			this.TextToPreset();
		}
	}
	class Rule{ // ⮓ ⮡
		constructor(query, preset){
			this.rule = preset;
			this.rulebinary = [!!(preset&128), !!(preset&64), !!(preset&32), !!(preset&16), !!(preset&8), !!(preset&4), !!(preset&2), !!(preset&1)];
			this.MainHTML = document.querySelector(query);
			this.automatarow = 4;
			this.automatacolumn = 20;
			this.evalrow = 1;
			this.evalcolumn = 0;
			this.evalNum = 0;
			this.automata = [];
			this.HTMLconstruct();
			this.ruleUpdate();
		}
		HTMLconstruct(){
			let describeModel = document.createElement('div');
			describeModel.className = "describe";
			describeModel.append("Rule ");
			let describeNumModel = document.createElement('input');
			describeNumModel.type = "text";
			describeNumModel.setAttribute("maxlength", 3);
			describeNumModel.placeholder = "N";
			describeNumModel.onchange = this.describeNumInput.bind(this);
			describeNumModel.className = "describeNum";
			describeNumModel.value = this.rule;
			describeModel.appendChild(describeNumModel);
			describeModel.append(" Machine");
			this.MainHTML.appendChild(describeModel);
			let ruleModel = document.createElement('div');
			ruleModel.className = "rule";
			for(let i=0; i<8; i++){
				let ruleElementModel = document.createElement('div');
				ruleElementModel.className = "ruleElement";
				let binary = [(7-i)&4, (7-i)&2, (7-i)&1];
				for (let index in binary){
					let ruleCellModel = document.createElement('div');
					ruleCellModel.className = binary[index] != 0 ? "Activecell" : "cell";
					ruleElementModel.appendChild(ruleCellModel);
				}
				let trash = document.createElement('div');
				ruleElementModel.appendChild(trash);
				let ruleCellModel = document.createElement('div');
				ruleCellModel.className = "cell";
				ruleElementModel.appendChild(ruleCellModel);
				ruleElementModel.onclick = () => this.ruleToggle(i);
				ruleModel.appendChild(ruleElementModel);
			}
			this.MainHTML.appendChild(ruleModel);
			let automataModel = document.createElement('div');
			automataModel.className = "automata";
			for(let height=0; height<this.automatarow; height++){
				for(let width=0; width<this.automatacolumn; width++){
					let cellModel = document.createElement('div');
					cellModel.className = "cell";
					cellModel.onclick = () => this.cellToggle(height, width);
					automataModel.appendChild(cellModel);
				}
				this.automata.push(new Array(this.automatacolumn).fill(false));
			}
			this.MainHTML.appendChild(automataModel);
			let controllerModel = document.createElement('div');
			let nextActModel = document.createElement('button');
			nextActModel.className = 'nextAct';
			nextActModel.innerHTML = '→';
			nextActModel.onclick = this.automataAct.bind(this);
			controllerModel.appendChild(nextActModel);
			let nextLineModel = document.createElement('button');
			nextLineModel.className = 'nextLine';
			nextLineModel.innerHTML = '⮒';
			nextLineModel.onclick = this.automataNextLine.bind(this);
			controllerModel.appendChild(nextLineModel);
			let refreshModel = document.createElement('button');
			refreshModel.className = 'refresh';
			refreshModel.innerHTML = '↻';
			refreshModel.onclick = this.refresh.bind(this);
			controllerModel.appendChild(refreshModel);
			controllerModel.className = 'controller';
			this.MainHTML.appendChild(controllerModel);
		}
		ruleUpdate(){
			let ruleIndicatorList = this.MainHTML.querySelectorAll('div.ruleElement > div:nth-child(5)');
			for(let index=0; index<8; index++)
				ruleIndicatorList[index].className = this.rulebinary[index] ? "Activecell" : "cell";
			let describeNumModel = this.MainHTML.querySelector('input.describeNum');
			describeNumModel.value = this.rulebinaryToNum();
		}
		ruleToggle(Index){
			this.rulebinary[Index] = !this.rulebinary[Index];
			this.ruleUpdate();
		}
		rulebinaryToNum(){
			let ret = 0;
			for(let index in this.rulebinary)
				ret += this.rulebinary[index] ? Math.pow(2, 7-index) : 0;
			return ret;
		}
		describeNumInput(){
			let describeNum = this.MainHTML.querySelector('input.describeNum');
			let val = Number(describeNum.value);
			if(val<0)
				val = 0;
			if(val>255)
				val = 255;
			this.rulebinary = [!!(val&128), !!(val&64), !!(val&32), !!(val&16), !!(val&8), !!(val&4), !!(val&2), !!(val&1)];
			this.ruleUpdate();
		}
		addLine(){
			let automata = this.MainHTML.querySelector('div.automata');
			let height = this.automatarow;
			this.automatarow++;
			automata.style.gridTemplate = "repeat("+String(this.automatarow)+", 2rem) / repeat("+String(this.automatacolumn)+", 2rem)";
			automata.style.height = String(this.automatarow*2.25+0.25)+"rem";
			for(let width=0; width<this.automatacolumn; width++){
				let cellModel = document.createElement('div');
				cellModel.className = "cell";
				cellModel.onclick = () => this.cellToggle(height, width);
				automata.appendChild(cellModel);
			}
			let Newline = new Array(this.automatacolumn).fill(false);
			this.automata.push(Newline);
		}
		automataUpdate(){
			let cellList = this.MainHTML.querySelectorAll('div.automata > div');
			let index=0;
			for(let height=0; height<this.automatarow; height++)
				for(let width=0; width<this.automatacolumn; width++)
					cellList[index++].className = this.automata[height][width] ? "Activecell" : "cell";
			cellList[this.evalrow*this.automatacolumn+this.evalcolumn].style.border = "0.2rem dashed";
			let parentCell = [];
			parentCell.push(this.evalcolumn != 0 ? this.automata[this.evalrow-1][this.evalcolumn-1] : this.automata[this.evalrow-1][this.automatacolumn-1]);
			parentCell.push(this.automata[this.evalrow-1][this.evalcolumn])
			parentCell.push(this.evalcolumn != this.automatacolumn-1 ? this.automata[this.evalrow-1][this.evalcolumn+1] : this.automata[this.evalrow-1][0]);
			this.evalNum = 4*parentCell[0]+2*parentCell[1]+1*parentCell[2];
			this.MainHTML.querySelectorAll('div.ruleElement')[7-this.evalNum].style.border = "0.15rem dashed";
			
		}
		evalStyleRemove(){
			let cellList = this.MainHTML.querySelectorAll('div.automata > div');
			cellList[this.evalrow*this.automatacolumn+this.evalcolumn].style.removeProperty("border");
			this.MainHTML.querySelectorAll('div.ruleElement')[7-this.evalNum].style.removeProperty("border");
		}
		automataAct(){
			this.evalStyleRemove();
			let parentCell = [];
			parentCell.push(this.evalcolumn != 0 ? this.automata[this.evalrow-1][this.evalcolumn-1] : this.automata[this.evalrow-1][this.automatacolumn-1]);
			parentCell.push(this.automata[this.evalrow-1][this.evalcolumn])
			parentCell.push(this.evalcolumn != this.automatacolumn-1 ? this.automata[this.evalrow-1][this.evalcolumn+1] : this.automata[this.evalrow-1][0]);
			let evalNum = 4*parentCell[0]+2*parentCell[1]+1*parentCell[2];
			let res = this.rulebinary[7-evalNum];
			this.automata[this.evalrow][this.evalcolumn] = res;
			this.evalrow += this.evalcolumn != this.automatacolumn-1 ? 0 : 1;
			this.evalcolumn += this.evalcolumn != this.automatacolumn-1 ? 1 : -this.automatacolumn+1;
			if(this.evalrow >= this.automatarow)
				this.addLine();
			this.automataUpdate();
		}
		automataNextLine(){
			let leftcolumn = this.automatacolumn - this.evalcolumn;
			for(let index=0; index<leftcolumn; index++)
				this.automataAct();
		}
		refresh(){
			this.evalStyleRemove();
			for(let index=0; index<this.automatarow; index++)
				this.automata[index].fill(false);
			this.evalrow = 1;
			this.evalcolumn = 0;
			this.automata[0][19] = true;
			this.automataUpdate();
		}
		cellToggle(row, column){
			this.automata[row][column] = !this.automata[row][column];
			this.evalStyleRemove();
			this.automataUpdate();
		}
	}
	class TagSystem{
		constructor(query, isCyclic, preset){
			this.MainHTML = document.querySelector(query);
			this.HTMLconstruct();
			this.isCyclic = isCyclic;
			this.Startword = preset[0];
			this.Nowword = this.Startword;
			this.ProductionRule = preset[1];
			this.CyclicIndex = 0;
			this.PresetUpdate();
		}
		HTMLconstruct(){
			let inputtrayModel = document.createElement("div");
			inputtrayModel.className = 'inputtray';
			this.MainHTML.appendChild(inputtrayModel);
			let Names = ['Start Word', 'Production Rule'];
			for(let i=0; i<2; i++){
				let inputandcommitModel = document.createElement("div");
				inputandcommitModel.className = 'inputandcommit';
				inputandcommitModel.innerHTML = Names[i];
				inputtrayModel.appendChild(inputandcommitModel);
				let inputtextModel = document.createElement("input");
				inputtextModel.className = 'inputtext';
				inputtextModel.type = 'text';
				inputandcommitModel.appendChild(inputtextModel);
				let buttonModel = document.createElement("button");
				buttonModel.className = 'commitbutton';
				buttonModel.innerHTML = '⇁';
				inputandcommitModel.appendChild(buttonModel);
			}
			this.MainHTML.querySelectorAll("button")[0].onclick = this.getStartWord.bind(this);
			this.MainHTML.querySelectorAll("button")[1].onclick = this.getProductionRule.bind(this);
			let tagsystemModel = document.createElement("div");
			tagsystemModel.className = 'tagsystem';
			this.MainHTML.appendChild(tagsystemModel);
			let productModel = document.createElement("div");
			productModel.className = 'product';
			tagsystemModel.appendChild(productModel);
			productModel.innerHTML += "When Head is";
			let HeadtextModel = document.createElement("textarea");
			HeadtextModel.className = 'Headtext';
			HeadtextModel.readOnly = true;
			HeadtextModel.style.opacity = 1;
			productModel.appendChild(HeadtextModel);
			productModel.innerHTML += "Product";
			let producttextModel = document.createElement("textarea");
			producttextModel.className = 'producttext';
			producttextModel.readOnly = true;
			producttextModel.style.opacity = 1;
			productModel.appendChild(producttextModel);
			let wordModel = document.createElement("textarea");
			wordModel.className = 'word';
			wordModel.readOnly = true;
			wordModel.style.opacity = 1;
			tagsystemModel.appendChild(wordModel);
			let controllerModel = document.createElement('div');
			let nextActModel = document.createElement('button');
			nextActModel.className = 'nextAct';
			nextActModel.innerHTML = '→';
			nextActModel.onclick = this.Act.bind(this);
			controllerModel.appendChild(nextActModel);
			let refreshModel = document.createElement('button');
			refreshModel.className = 'refresh';
			refreshModel.innerHTML = '↻';
			refreshModel.onclick = this.Refresh.bind(this);
			controllerModel.appendChild(refreshModel);
			controllerModel.className = 'controller';
			this.MainHTML.appendChild(controllerModel);
		}
		PresetUpdate(){
			let StartDisplay = this.MainHTML.querySelectorAll('input')[0];
			let ProductionDisplay = this.MainHTML.querySelectorAll('input')[1];
			StartDisplay.value = this.Startword;
			if(this.isCyclic)
				ProductionDisplay.value = '('+this.ProductionRule.join()+')';
			else{
				let keyList = Object.keys(this.ProductionRule);
				ProductionDisplay.value += '(';
				for(let index=0; index<keyList.length; index++)
					ProductionDisplay.value += keyList[index] + ':' + this.ProductionRule[keyList[index]] + ',';
				ProductionDisplay.value = ProductionDisplay.value.slice(0, ProductionDisplay.value.length-1);
				ProductionDisplay.value += ')';
			}
			this.DisplayUpdate();
		}
		DisplayUpdate(){
			let HeadDisplay = this.MainHTML.querySelectorAll('textarea')[0];
			let ProductDisplay = this.MainHTML.querySelectorAll('textarea')[1];
			let WordDisplay = this.MainHTML.querySelectorAll('textarea')[2];
			if(this.isCyclic){
				HeadDisplay.innerHTML = '1';
				ProductDisplay.innerHTML = this.ProductionRule[this.CyclicIndex];
				WordDisplay.innerHTML = this.Nowword;
			}
			else{
				HeadDisplay.innerHTML = this.Nowword.length != 0 ? this.Nowword[0] : ' ';
				if(this.Nowword[0] in this.ProductionRule)
					ProductDisplay.innerHTML = this.ProductionRule[this.Nowword[0]] == 'H' ? 'STOP' : this.ProductionRule[this.Nowword[0]];
				else
					ProductDisplay.innerHTML = 'STOP';
				WordDisplay.innerHTML = this.Nowword;
			}
		}
		Refresh(){
			if(this.isCyclic){
				this.CyclicIndex = 0;
				this.Nowword = this.Startword;
			}
			else{
				this.Nowword = this.Startword;
			}
			this.DisplayUpdate();
		}
		getStartWord(){
			let startwordinput = this.MainHTML.querySelectorAll('input')[0].value;
			try{
				if(this.isCyclic){
					const binaryregExp = /[^0-1]/;
					if(binaryregExp.test(startwordinput))
						throw 'NonBinary';
				}
				else{
					const nonbinaryregExp = /[^A-z]/;
					if(nonbinaryregExp.test(startwordinput))
						throw 'NonNonBinary';
				}
				this.Startword = startwordinput;
				this.Nowword = this.Startword;
			}
			catch(err){
				switch(err){
					case 'NonBinary':
						alert("Start Word의 양식이 적절하지 않습니다: 값이 이진수가 아님");
						break;
					case 'NonNonBinary':
						alert("Start Word의 양식이 적절하지 않습니다: 값이 알파벳이 아님");
					default:
						alert(err);
				}
			}
			this.DisplayUpdate();
			this.Refresh();
		}
		getProductionRule(){
			let productionruleinput = this.MainHTML.querySelectorAll('input')[1].value;
			try{
				if(this.isCyclic){
					if(productionruleinput[0] != '(' || productionruleinput[productionruleinput.length-1] != ')')
						throw "Nobracket";
					const binaryregExp = /[^0-1,]/;
					if(binaryregExp.test(productionruleinput.slice(1, productionruleinput.length-1)))
						throw 'NonBinary';
					this.ProductionRule = productionruleinput.slice(1, productionruleinput.length-1).split(',');
				}
				else{
					if(productionruleinput[0] != '(' || productionruleinput[productionruleinput.length-1] != ')')
						throw "Nobracket";
					const binaryregExp = /[^A-z,:]/;
					if(binaryregExp.test(productionruleinput.slice(1, productionruleinput.length-1)))
						throw 'UndueString';
					let Prerefine = productionruleinput.slice(1, productionruleinput.length-1).split(',');
					let res = {};
					if(Prerefine.length == 0)
						throw 'NoRule';
					for(let index=0; index<Prerefine.length; index++){
						if(Prerefine[index].length == 0)
							throw 'NoRule';
						if(Prerefine[index][1] != ':')
							throw "UndueForm";
						if(Prerefine[index][0] in res)
							throw "DuplicatedKey"
						res[Prerefine[index][0]] = Prerefine[index].slice(2);
					}
					this.ProductionRule = res;
				}
			}
			catch(err){
				switch(err){
					case 'Nobracket':
						alert("Production Rule의 양식이 적절하지 않습니다: 괄호 없음");
						break;
					case 'NonBinary':
						alert("Production Rule의 양식이 적절하지 않습니다: 0, 1, ',' 이외의 값이 있음");
						break;
					case 'UndueString':
						alert("Production Rule의 양식이 적절하지 않습니다: 알파벳, ',', ':' 이외의 값이 있음");
						break;
					case 'NoRule':
						alert('Production Rule의 양식이 적절하지 않습니다: Rule이 비어있음');
						break
					case 'UndueForm':
						alert("Production Rule의 양식이 적절하지 않습니다: 입력 받는 기호가 한글자가 아니거나, 콜론이 제 위치에 있지 않음");
						break;
					case 'DuplicatedKey':
						alert("Production Rule의 양식이 적절하지 않습니다: 입력 받는 기호가 중복됨.");
					default:
						alert(err);
				}
			}
			this.DisplayUpdate();
			this.Refresh();
		}
		Act(){
			if(this.Nowword.length != 0){
				if(this.isCyclic){
					if(this.Nowword[0] == '1')
						this.Nowword += this.ProductionRule[this.CyclicIndex];
					this.CyclicIndex = (this.CyclicIndex+1)%this.ProductionRule.length;
					this.Nowword = this.Nowword.slice(1, this.Nowword.length);
				}
				else{
					if(this.Nowword[0] in this.ProductionRule){
						this.Nowword += this.ProductionRule[this.Nowword[0]];
						this.Nowword = this.Nowword.slice(2, this.Nowword.length);
					}
				}
			}
			this.DisplayUpdate();
		}
	}
	let BitNotdiv = new TuringMachine('div.BitNot', [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 'A');
	BitNotdiv.CellUpdate();
	BitNotdiv.HeadUpdate();
	BitNotdiv.HeadDisplayUpdate();
	BitNotdiv.TupletoActTable(['A', '0', '1', 'R', 'A']);
	BitNotdiv.TupletoActTable(['A', '1', '0', 'R', 'A']);
	BitNotdiv.TupletoActTable(['A', 'B', 'B', 'N', 'B']);
	BitNotdiv.TupletoActTable(['B', 'B', 'B', 'N', 'B']);
	
	let UniversalTuringMachine = new TuringMachine('div.Universal', [-1, -1, -1, -1, -1], 'A');
	UniversalTuringMachine.SetPreset(["(A,0,0,R,A);(A,1,1,R,A);(A,B,B,N,B);(B,B,B,N,B)", "110101010"]);
	UniversalTuringMachine.CellUpdate();
	UniversalTuringMachine.HeadUpdate();
	UniversalTuringMachine.HeadDisplayUpdate();
	
	let RuleMachine = new Rule('div.Rule110', 110);
	RuleMachine.automata[0][19] = true;
	RuleMachine.automataUpdate();
	
	let cyclicsystem = new TagSystem('div.Cyclic', true, ["11001", ['010', '000', '1111']]);
	let twotagsystem = new TagSystem('div.TwoTag', false, ["baa", {'a':'ccbaH', 'b':'cca', 'c':'cc'}]);
