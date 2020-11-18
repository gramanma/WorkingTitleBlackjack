var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let deck=[];

//will grab currency specified from local storage
let currency=localStorage.getItem("currencySymbol");


var game = new Phaser.Game(config);

    function preload ()
    {
      
        this.load.image('tabletop', 'assets/tabletop.png');
        this.load.image('cardback', 'assets/redback.png');
        this.load.image('hitButton','assets/hitButton.PNG')
        this.load.image('stayButton','assets/stayButton.PNG')
        freshDeck();
        deck.forEach(element => {
            this.load.image(element, 'assets/' + element + '.png');
        });
       
      //  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    function create ()
    {
        this.add.image(400, 300, 'tabletop');
        this.add.image(120, 150, 'cardback');

        var hitButton = this.add.image(650, 400, 'hitButton').setScale(.6);
        hitButton.setInteractive({useHandCursor: true});
        hitButton.on('pointerdown', () => hitClick());
        var stayButton = this.add.image(650, 480, 'stayButton').setScale(.6);
        stayButton.setInteractive({useHandCursor: true});
        stayButton.on('pointerdown', () => stayClick());

        deck=shuffleDeck(deck);
       
        // this.input.mouse.disableContextMenu();

        // this.input.on('pointerup', function (pointer) {

        //     if (pointer.leftButtonReleased())
        //     {
               
        //     }
        // }

      //  deck.forEach(element =>{
       // console.log(element);
      //  });
    //    this.add.image(140, 170, '2C');
     //   this.add.image(140, 370, '2D');
    }

    function update ()
    {
        var pointer = this.input.activePointer;

    }

    function freshDeck(){
        //setup deck array
        var suits = ["C","D","H","S"];
        var pips=["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        for(x=0;x<pips.length;x++){
            for(i=0;i < suits.length;i++){
                deck.push(pips[x] + suits[i]);
            }
        }
    }

    function shuffleDeck(array){
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

        function hitClick(){
            console.log('hit');
        }
    
        function stayClick(){
            console.log('stay');
        }

    