 
  function chatBot(msg, socket){  //Facade pattern

    
    let days = ['today', 'tomorrow', 'on Sunday', 'on Monday', 'on Tuesday', 'on Wednesday', 'on Thursday', 'on Friday', 'on Saturday'];

    let cities = ['Lviv', 'Kyiv', 'Odessa', 'Kharkiv', 'Dnipro'];
     

var randomAdviseRegExp = /^[\w\s]+\?\s\#\@\)\₴\?\$0$/;
var weatherRegExp = /^What\sis\sthe\sweather\s\w+\s?\w+\sin\s\w+\?$/;
var moneyExchangeRegExp = /^Convert\s\d+\s*(dollar|euro|hryvnia)\sto\s(dollar|euro|hryvnia)$/;
var saveNoteRegExp = /^Save\snote\stitle\:\s?[\w\s]+,\sbody\:\s?[\w\s]+/;

if(msg.text.startsWith('@bot ')) {
    var msgText = msg.text.split(/^\@bot\s+/)[1];
    if(weatherRegExp.test(msgText)){
        var weatherQuestionFilter = (message) =>{
                 return message.split(/^What\sis\sthe\sweather\s/)[1].split(/\sin\s/).map((text)=>{return text.split(/\s*\?$/)[0]}).slice(0,2)
                 ;}

        var dayCityParams = weatherQuestionFilter(msgText);
        if((days.some((element) =>{return (dayCityParams[0] == element)}))&&(cities.some((element) =>{return (dayCityParams[1] == element)}))){

        var weatherQuality = [ 'cold', 'warm', 'windy', 'rainy', 'sunny'];
        var timestamp =  new Date();
        var data = {
        name: "Bot",
        nickName: "bot",
        text: 'The weather is ' + weatherQuality[Math.floor(Math.random() * (weatherQuality.length))] + ' in '
         + dayCityParams[1] + ' ' + dayCityParams[0] + ', temperature is +' + (Math.floor(Math.random() * (30-10)+10)) +'C.',
        'timestamp': timestamp
        };
         
        socket.emit('chat message', data);
        }
    }

    else if(moneyExchangeRegExp.test(msgText)){
        var moneyParamsFilter = (message) =>{
                 return message.split(/^Convert\s/)[1].split(" to").join("").split(" ");
                 ;}
               
        var ammountCurrencyParams = moneyParamsFilter(msgText);

        var timestamp =  new Date();
        var data = {
        name: "Bot",
        nickName: "bot",
        text:  `${ammountCurrencyParams[0]} ${ammountCurrencyParams[1]} = ${(Math.floor(Math.random() * (1000-1)+1))} ${ammountCurrencyParams[2]}`,
        'timestamp': timestamp
        };
         
        socket.emit('chat message', data);
        
    }

    else if(saveNoteRegExp.test(msgText)){      
        var noteFilter = (message) =>{
            return message.split(/^Save\snote\stitle\:\s?/)[1].split(/,\sbody\:\s?/);
            ;}
           
   var noteParams = noteFilter(msgText);
   
   var timestamp =  new Date();
   var data = {
   name: "Bot",
   nickName: "bot",
   text: 'Note command is processed',
   'timestamp': timestamp
   };
    
   socket.emit('chat message', data); 
   
 }
        
    


    else if (msgText == 'show quote'){
        var quotes = ['Change the world by being yourself.', 'Every moment is a fresh beginning.',
        'Never regret anything that made you smile.', 'Whatever you do, do it well.', 'What we think, we become.'];

        var timestamp =  new Date();
        var data = {
        name: "Bot",
        nickName: "bot",
        text: quotes[Math.floor(Math.random() * (quotes.length))],
        'timestamp': timestamp
        };
         
        socket.emit('chat message', data);
    }


    else if (randomAdviseRegExp.test(msgText)){
         var advices = ['Don\'t give up!', 'Do all your best and you will succeed.',
        'Take a rest and continue to work.', 'Keep calm and exercise.', 'Look at this issue from the new point of view.'];

        var timestamp =  new Date();
        var data = {
        name: "Bot",
        nickName: "bot",
        text: advices[Math.floor(Math.random() * (advices.length))],
        'timestamp': timestamp
        };
         
        socket.emit('chat message', data);
    }
    else{
        var timestamp =  new Date();
        var data = {
        name: "Bot",
        nickName: "bot",
        text: 'Command is not recognized. Ask bot later.',
        'timestamp': timestamp
        };
         
        socket.emit('chat message', data);
    }
}
   

 };
 
 module.exports = chatBot;