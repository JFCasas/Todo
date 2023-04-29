document.addEventListener('DOMContentLoaded', ()=>{

    //Carousel

    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems,{
        
        numVisible: 3,
        transition: 200,
        indicators: true, 
        noWrap: true
           

    });

    
   

})

$(function(){

    $(".dropdown-trigger").dropdown();
	
});