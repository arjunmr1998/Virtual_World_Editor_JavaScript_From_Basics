class StopEditor{
    constructor(viewport, world){
        this.viewport = viewport;
        this.world = world;

        this.canvas = viewport.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.mouse =null;
        this.intent =null;

        this.markings = world.markings;

    }

       enable(){

        this.#addEventListeners();

    }

    disable(){
        this.#removeEventListeners();
   
    }






    #addEventListeners(){

        this.boundMouseDown = this.#handleMouseDown.bind(this);
        this.boundMouseMove = this.#handleMouseMove.bind(this);
    
        this.contextMenu = (evt)=>evt.preventDefault();



        this.canvas.addEventListener( "mousedown" , this.boundMouseDown);

        this.canvas.addEventListener( "mousemove" ,this.boundMouseMove);

        this.canvas.addEventListener( "contextmenu" ,  this.contextMenu );
      

    }

    #removeEventListeners(){
        this.canvas.removeEventListener( "mousedown" ,this.boundMouseDown);

        this.canvas.removeEventListener( "mousemove" ,this.boundMouseMove);

        this.canvas.removeEventListener( "contextmenu" , this.contextMenu );
  

    }


    #handleMouseMove(evt){
            
            this.mouse = this.viewport.getMouse(evt , true);
            const seg = getNearestSegment(
                this.mouse, 
                this.world.laneGuides, 
                10*this.viewport.zoom);

            if(seg){

               const proj = seg.projectPoint(this.mouse);
               if(proj.offset >=0 && proj.offset <=1){
                this.intent = new Stop(
                    proj.point,
                    seg.directionVector(),
                    world.roadWidth/2,
                    this.world.roadWidth /2
                
                ) ;


               }else{
                this.intent =null;
               }

            }else{
                this.intent = null;
            }


    }




    #handleMouseDown(evt){
        if(evt.button == 0 ) {  //left
            if(this.intent){
                this.markings.push(this.intent);
                this.intent =null;


            }
        }


        if(evt.button == 2){   //right
            for(let i =0 ; i< this.markings.length ;i++){
                const poly = this.markings[i].poly;
                if(poly.containsPoint(this.mouse)){
                    this.markings.splice(i,1);
                    return;

                }


            }


        }





    }


    display(){
        if(this.intent){
            this.intent.draw(this.ctx);
        }
    }







}