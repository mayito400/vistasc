// activacion de la libreria
$('.owl-carousel').owlCarousel({
    // loop: true,
    navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        // // Navigation
        // navigationText : ["Anterior","Siguiente"],
        // rewindNav : true,
        // scrollPerPage : true,
        //Pagination
        pagination : true,
        paginationNumbers: false,
        margin: 15,
        autoWidth: true,

    // nav: true,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      1000: {
        items: 6
      }
    }
    });