
var nameButtons = [
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "rat",
    "turtle",
    "horse",
    "unicorn",
    "bull",
    "dragon",
    "salamander",
    "gorilla",
    "orangutan",
    
]

function updateButtonSection() {
    $('#animal-buttons').empty()

    for (name of nameButtons) {
        $('#animal-buttons').append(`
            <button class="searchButton">${name}</button> `
        )
    }
}

$(document).ready(function() {

    updateButtonSection()
    // Start your code from here

    $('body').on('click','.searchButton', function(){
        var title = $(this).text()

        var request = {
            url: `https://api.giphy.com/v1/gifs/search?q=${title}&api_key=bLG4PVTPpCbCRMu9gaPdThLGP83MrtdF&limit=10`,
            success: function(respuesta) {
                
                $('#animals').empty()

                for (gif of respuesta.data) {

                    var gifSrc = gif.images.fixed_height.url
                    var imgSrc = gif.images.fixed_height_still.url
                    
                    var image = $("<img>")
                    image.attr("src", imgSrc)
                    image.attr("data-animation", gifSrc)
                    image.attr("data-image", imgSrc)
                    image.attr("data-Movement", "no")
                    image.addClass("animal-item")       

                   $('#animals').append(image)
                }
            },
            error: function() {
                console.log("Error: datos no encontrados")
            }
        }

        $.ajax(request)
    })

    $('body').on('click', '.animal-item', function() {
        
        var moving = $(this).attr("data-Movement")
        var gifSrc = $(this).attr("data-animation")
        var imgSrc = $(this).attr("data-image")

        if (moving === "no")  {
            $(this).attr("src", gifSrc)
            $(this).attr("data-Movement", "yes")
        }
        else {
            $(this).attr("src", imgSrc)
            $(this).attr("data-Movement", "no")

        }
    })
    
    $('body').on('submit', '#animal-form', function(e) {

        e.preventDefault()

        var newButton = $('#animal-input').val()

        nameButtons.push(newButton)
        updateButtonSection()

    })
    
    
    });