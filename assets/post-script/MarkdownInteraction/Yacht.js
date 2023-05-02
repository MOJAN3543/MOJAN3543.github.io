class YachtDice{
  constructor(query){
    this.RerollCount = 0;
    this.RoundCount = 0;
    this.MainHTML = document.querySelector(query);
  }
  HTMLconstruct(){
    let ScoreModel = document.createElement('div');
    ScoreModel.className = 'Score';
    let RoundModel = document.createElement('div');
    RoundModel.className = 'Round';
    let RoundDiv1Model = document.createElement('div');
    RoundDiv1Model.innerHTML = 'Rounds';
    RoundModel.appendChild(RoundDiv1Model);
    let RoundDiv2Model = document.createElement('div');
    RoundDiv2Model.innerHTML = '□□□□□□□□□□□□';
    RoundModel.appendChild(RoundDiv2Model);
    ScoreModel.appendChild(RoundModel);
    const ScoreString = [['⚀', 'Aces'], ['⚁', 'Deuces'], ['⚂', 'Threes'], ['⚃', 'Fours'], ['⚄', 'Fives'], ['⚅', 'Sixes'], ['', 'Choice'], ['⚃⚃⚃⚃', '4 of a Kind'], ['⚁⚁⚂⚂⚂', 'Full House'], ['⚁⚂⚃⚄', 'Small Straight'], ['⚀⚁⚂⚃⚄', 'Large Straight'], ['⚅⚅⚅⚅⚅',' Yacht']];
    for(let index=0; index<12; index++){
      let ScoreElementModel = document.createElement('div');
      ScoreElementModel.className = 'ScoreElement';
      let DiceMarkModel = document.createElement('div');
      DiceMarkModel.className = 'DiceMark';
      DiceMarkModel.innerHTML = ScoreString[index][0];
      ScoreElementModel.appendChild(DiceMarkModel);
      ScoreElementModel.innerHTML += ScoreString[index][1];
      let ButtonModel = document.createElement('button');
      ButtonModel.innerHTML = 0;
      ButtonModel.onclick = () => this.ScoreCheck(index);
      ScoreElementModel.appendChild(ButtonModel);
      ScoreModel.appendChild(ScoreElementModel);
      if(index==5){
        let Bonus1Model = document.createElement('div');
        Bonus1Model.className = 'Bonus';
        Bonus1Model.innerHTML = 'Subtotal';
        let Bonus1divModel = document.createElement('div');
        Bonus1divModel.innerHTML = '0 / 63';
        Bonus1Model.appendChild(Bonus1divModel);
        let Bonus2Model = document.createElement('div');
        Bonus2Model.className = 'Bonus';
        Bonus2Model.innerHTML = '+35 Bonus';
        let Bonus2divModel = document.createElement('div');
        Bonus2Model.appendChild(Bonus2divModel);
        ScoreModel.appendChild(Bonus1Model);
        ScoreModel.appendChild(Bonus2Model);
      }
    }
    let TotalModel = document.createElement('div');
    TotalModel.className = 'ScoreElement Total';
    TotalModel.innerHTML = 'Total';
    let TotalButtonModel = document.createElement('button');
    TotalButtonModel.innerHTML = '0';
    TotalModel.appendChild(TotalButtonModel);
    ScoreModel.appendChild(TotalModel);
    this.MainHTML.appendChild(ScoreModel);
    let PlayModel = document.createElement('div');
    PlayModel.className = 'Play';
    let DiceModel = document.createElement('div');
    DiceModel.className = 'Dice';
    for(let index=0; index<5; index++){
      let DicedivModel = document.createElement('div');
      DicedivModel.innerHTML = '⚀';
      DicedivModel.onclick = () => this.RerollToggle(index);
      DiceModel.appendChild(DicedivModel);
    }
    PlayModel.appendChild(DiceModel);
    let LineModel = document.createElement('div');
    LineModel.className = 'Line';
    let Linediv1Model = document.createElement('div');
    Linediv1Model.innerHTML = 'Hold';
    LineModel.appendChild(Linediv1Model);
    let Linediv2Model = document.createElement('div');
    Linediv2Model.innerHTML = 'Reroll';
    LineModel.appendChild(Linediv2Model);
    PlayModel.appendChild(LineModel);
    let ControllerModel = document.createElement('div');
    ControllerModel.className = 'Controller';
    let RerollModel = document.createElement('button');
    RerollModel.innerHTML = '🎲';
    RerollModel.onclick = this.Reroll.bind(this);
    ControllerModel.appendChild(RerollModel);
    let ControllerdivModel = document.createElement('div');
    ControllerdivModel.innerHTML = '○ ○ ○';
    ControllerModel.appendChild(ControllerdivModel);
    PlayModel.appendChild(ControllerModel);
    this.MainHTML.appendChild(PlayModel);
  }
  Reroll(){
    let DiceList = this.MainHTML.querySelectorAll('div.Dice > div');
    let RerollDiceCount = 0;
    for(let index=0; index<5; index++)
      RerollDiceCount += DiceList[index].classList.contains("Reroll") ? 1 : 0;
    if(this.RerollCount != 3 && RerollDiceCount){
      const DiceDict = {1: '⚀', 2:'⚁', 3:'⚂', 4:'⚃', 5:'⚄', 6:'⚅'};
      let DiceResult = [];
      for(let index=0; index<5; index++){
        DiceResult.push(Math.floor((Math.random()*6+1)));
      }
      for(let index=0; index<5; index++){
        if(DiceList[index].classList.contains("Reroll")){
          DiceList[index].innerHTML = DiceDict[DiceResult[index]];
          this.DiceRotate(index);
        }
      }
      this.RerollUncheck();
      this.UpdateScoreTable();
      this.RerollCountUp();
    }
  }
  DiceEval(){
    const DiceDict = {'⚀':1, '⚁':2, '⚂':3, '⚃':4, '⚄':5, '⚅':6};
    let DiceList = this.MainHTML.querySelectorAll('div.Dice > div');
    let DiceResult = [0, 0, 0, 0, 0, 0];
    let EvalList = [];
    for(let index=0; index<5; index++)
      DiceResult[DiceDict[DiceList[index].innerHTML]-1]++;
    for(let index=0; index<6; index++) // Aces ~ Sixes
      EvalList.push(DiceResult[index]*(index+1));
    EvalList.push(EvalList.slice(0, 6).reduce(function add(sum, currValue){return sum+currValue;}, 0)); // Choice
    EvalList.push(DiceResult.includes(4)||DiceResult.includes(5) ? EvalList[6] : 0); // 4 of a Kind
    EvalList.push(DiceResult.includes(2)&&DiceResult.includes(3) ? EvalList[6] : 0); // Full House
    let DiceBoolList = [];
    for(let index=0; index<6; index++)
      DiceBoolList.push(!!DiceResult[index] ? 1 : 0);
    EvalList.push(JSON.stringify(DiceBoolList.slice(0, 4)) === "[1,1,1,1]"||JSON.stringify(DiceBoolList.slice(1, 5)) === "[1,1,1,1]"||JSON.stringify(DiceBoolList.slice(2, 6)) === "[1,1,1,1]" ? 15 : 0); // Small Straight;
    EvalList.push(JSON.stringify(DiceResult) === "[0,1,1,1,1,1]" || JSON.stringify(DiceResult) === "[1,1,1,1,1,0]" ? 30 : 0); // Large Straight;
    EvalList.push(DiceResult.includes(5) ? 50 : 0); // Yacht
    return EvalList;
  }
  UpdateScoreTable(){
    let ScoreList = this.MainHTML.querySelectorAll('div.ScoreElement');
    let EvalList = this.DiceEval();
    for(let index=0; index<12; index++)
      if(!ScoreList[index].classList.contains('Fixed') && !ScoreList[index].classList.contains('Bonus'))
        ScoreList[index].querySelector('button').innerHTML = EvalList[index];
  }
  UpdateTotal(){
    let Sum = 0;
    let AcetoSixCount = 0;
    let ScoreList = this.MainHTML.querySelectorAll('div.ScoreElement');
    let Bonus = this.MainHTML.querySelectorAll('div.Bonus > div');
    for(let index=0; index<12; index++){
      if(ScoreList[index].classList.contains('Fixed')){
        Sum += Number(ScoreList[index].querySelector('button').innerHTML);
        if(index <= 5)
          AcetoSixCount++;
      }
      if(index == 5){
        Bonus[0].innerHTML = Sum + ' / 63';
        if(Sum>=63){
          Bonus[1].innerHTML = "+ 35";
          Sum += 35;
        }
        else if(AcetoSixCount == 6)
          Bonus[1].innerHTML = "+ 0";
      }
      else if(index == 11)
        ScoreList[12].querySelector('button').innerHTML = Sum;
    }
  }
  RoundCountUp(){
    let Counter = this.MainHTML.querySelectorAll('div.Round > div')[1];
    this.RoundCount++;
    if(this.RoundCount != 13)
      Counter.innerHTML = '■'.repeat(this.RoundCount) + '□'.repeat(12-this.RoundCount);
  }
  RerollCountUp(){
    let Counter = this.MainHTML.querySelector('div.Controller > div');
    this.RerollCount++;
    Counter.innerHTML = '● '.repeat(this.RerollCount) + '○ '.repeat(3-this.RerollCount);
  }
  RerollUncheck(){
    let DiceList = this.MainHTML.querySelectorAll('div.Dice > div');
    for(let index=0; index<5; index++){
      if(DiceList[index].classList.contains('Reroll')){
        DiceList[index].classList.remove('Reroll');
        DiceList[index].animate({transform: 'translate(0, -10rem)'}, {duration: 500, easing: 'ease', fill: 'forwards'});
      }
    }
  }
  QuickReroll(){
    let DiceList = this.MainHTML.querySelectorAll('div.Dice > div');
    for(let index=0; index<5; index++){
      DiceList[index].classList.add('Reroll');
      DiceList[index].animate({transform: 'translate(0, 20rem)'}, {duration: 400, easing: 'ease', fill: 'forwards'});
      DiceList[index].animate({transform: 'translate(0, 0)'}, {duration: 2400, easing: 'ease-out', fill: 'forwards'});
    }
  }
  RerollToggle(index){
    if(this.RerollCount != 3){
      let DiceList = this.MainHTML.querySelectorAll('div.Dice > div');
      if(DiceList[index].classList.contains('Reroll')){
        DiceList[index].classList.remove('Reroll');
        DiceList[index].animate({transform: 'translate(0, -10rem)'}, {duration: 500, easing: 'ease', fill: 'forwards'});
      }
      else{
        DiceList[index].classList.add('Reroll');
        DiceList[index].animate({transform: 'translate(0, 0)'}, {duration: 500, easing: 'ease', fill: 'forwards'});
      }
    }
  }
  ScoreCheck(index){
    let ScoreList = this.MainHTML.querySelectorAll('div.ScoreElement');
    if(!ScoreList[index].classList.contains('Fixed')){
      ScoreList[index].classList.add('Fixed');
      this.NewRound();
    }
  }
  NewRound(){
    this.RerollCount = 0;
    this.UpdateTotal();
    this.RoundCountUp();
    if(this.RoundCount==13){
      this.RerollCount = 3;
      let Resetbutton = this.MainHTML.querySelector('div.Controller > button');
      Resetbutton.innerHTML = "Game Over : Restart";
      Resetbutton.onclick = this.Reset.bind(this);
    }
    else{
      this.QuickReroll();
      this.Reroll();
    }
  }
  Reset(){
    this.RerollCount = 0;
    this.RoundCount = 0;
    let ScoreList = this.MainHTML.querySelectorAll('div.ScoreElement');
    let Bonus = this.MainHTML.querySelectorAll('div.Bonus > div');
    let Resetbutton = this.MainHTML.querySelector('div.Controller > button');
    Resetbutton.innerHTML = "🎲";
    Resetbutton.onclick = this.Reroll.bind(this);
    for(let index=0; index<12; index++){
      if(ScoreList[index].classList.contains('Fixed'))
        ScoreList[index].classList.remove('Fixed');
      ScoreList[index].querySelector('button').innerHTML = '';
    }
    Bonus[0].innerHTML = '0 / 63';
    Bonus[1].innerHTML = '';
    ScoreList[12].querySelector('button').innerHTML = '';
    this.NewRound();
  }
  DiceRotate(index){
    let DiceList = this.MainHTML.querySelectorAll('div.Dice > div');
    let TurnRandom = Math.round(Math.random());
    if(TurnRandom)
      DiceList[index].animate([{transform: 'rotate(0deg)'}, {transform: 'rotate(2160deg)'}], {duration: 1000, easing: 'linear', fill: 'both'});
    else
      DiceList[index].animate([{transform: 'rotate(0deg)'}, {transform: 'rotate(-2160deg)'}], {duration: 1000, easing: 'linear', fill: 'both'});
  }
}
window.onload = function(){
  let Yacht = new YachtDice('div.Yacht');
  Yacht.HTMLconstruct();
  Yacht.NewRound();
}
