	class TuringMachine{
		constructor(query, preset, firstState){
			this.HeadIndex = 0;
			this.NowState = firstState;
			this.ActTable = {};
			this.presetList = Object.assign([], preset);
			this.MainHTML = document.querySelector(query);
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
		CellUpdate(){
			for(let i=0; i<this.cellHTML.length; i++){
				this.cellHTML[i].innerHTML = this.cell[i];
			}
		}
		Refresh(){
			this.HeadIndex = 0;
			this.NowState = 'A';
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
					throw NoStateReadError;
				let Write = this.ActTable[State][Read][0];
				let Move = this.ActTable[State][Read][1];
				let NextState = this.ActTable[State][Read][2];
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
				alert("현재 상태가 행동표에 정의되지 않았습니다.");
			}
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
	
