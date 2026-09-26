class GraphEditor{

    constructor(viewport, graph){

        this.viewport= viewport;
        this.graph= graph;
        this.canvas=this.viewport.canvas;
        this.selected= null;
        this.hovered= null;
        this.dragging =false;
        this.mouse=null;


        this.ctx = this.canvas.getContext("2d");




        
    }

    enable(){

        this.#addEventListeners();

    }

    disable(){
        this.#removeEventListeners();
        this.selected = false;
        this.hovered = false;
    }






    #addEventListeners(){

        this.boundMouseDown = this.#handleMouseDown.bind(this);
        this.boundMouseMove = this.#handleMouseMove.bind(this);
        this.boundMouseUp  = ()=>this.dragging =false;
        this.contextMenu = (evt)=>evt.preventDefault();



        this.canvas.addEventListener( "mousedown" , this.boundMouseDown);

        this.canvas.addEventListener( "mousemove" ,this.boundMouseMove);

        this.canvas.addEventListener( "contextmenu" ,  this.contextMenu );
        this.canvas.addEventListener( "mouseup" , this.boundMouseUp );

    }

    #removeEventListeners(){
        this.canvas.removeEventListener( "mousedown" ,this.boundMouseDown);

        this.canvas.removeEventListener( "mousemove" ,this.boundMouseMove);

        this.canvas.removeEventListener( "contextmenu" , this.contextMenu );
        this.canvas.removeEventListener( "mouseup" ,this.boundMouseUp );

    }





    #handleMouseMove(evt){
            
            this.mouse = this.viewport.getMouse(evt , true);
            this.hovered = getNearestPoint(this.mouse, this.graph.points, 10*this.viewport.zoom);

            if(this.dragging == true){
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;

            }


    }



    #handleMouseDown(evt){
        if(evt.button == 2 ){  //Right Click on Mouse


                if (this.selected){
                    this.selected = null;
                }
                else if(this.hovered){
                    this.#removePoint(this.hovered);

                }
            }

            if(evt.button == 0 ){ //Left Mouse Click

                //const mouse = new Point(evt.offsetX, evt.offsetY); //Taking coordinates of Mouse pointer
            
                if(this.hovered){
                    this.#selectPoint(this.hovered);
                    this.dragging= true;
                    return;

                }
                this.graph.addPoint(this.mouse);
                this.#selectPoint(this.mouse);
                this.hovered = this.mouse;
        }

    }


    #removePoint(point){
        this.graph.removePoint(point);

        if(this.selected == point ){
         this.selected= null;

        }
        
        this.hovered= null;

    }

    #selectPoint(point){
        if(this.selected){
            this.graph.tryAddsegment(new Segment(this.selected,point));
            }

            this.selected = point;
    }

    dispose(){
        this.graph.dispose();
        this.selected=null;
        this.hover=null;
    }




    display(){
        this.graph.draw(this.ctx);

        if(this.hovered){
            this.hovered.draw(this.ctx,{fill:true});
        }

        if(this.selected){
            const intent = this.hovered ? this.hovered:this.mouse;
            new Segment(this.selected, intent).draw(this.ctx , {dash : [3,3]});
            this.selected.draw(this.ctx,{outline:true});
        }
    }



}