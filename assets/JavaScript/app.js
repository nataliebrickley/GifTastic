var topics = ["cats", "spongebob", "the office", "disney", "cute", "golden girls", "dance"]

//Create a button for each element in the topics array
for (var i = 0; i < topics.length; i++) {
    var btn = $("<button>").text(topics[i]).attr({ "id": "topic", "value": topics[i] })
    $("#buttons").append(btn)
}

//When user clicks on a topic button...
$(document).on("click", "#topic", function () {
    //create api url
    var topic = $(this).val()
    var apiKey = "6oreJVucamoE8w9pyekj2hZ6vxC4p8C2"
    var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + topic + "&limit=10&offset=0&lang=en"
    //Make API call
    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function (result) {
        //clear the results div 
        $("#results").empty();
        //append 10 static non-animated gif images to the page by...
        for (var i = 0; i < 10; i++) {
            //creating a div
            var gifDiv = $("<div class='gif'>")
            //...creating an image
            var still = result.data[i].images["fixed_height_still"].url
            var animate = result.data[i].images["fixed_height"].url
            var image = $("<img>").attr({ "src": still, "data-animate": animate, "data-still": still })
            //...append the image as well as it's rating
            var rating = $("<p>")
            rating.text("Rating: " + result.data[i].rating.toUpperCase())
            gifDiv.append(image, rating)
            //...appending to the page
            $("#results").append(gifDiv);
            //...and assigning the gif to be off
            var on = false;
        }
        console.log(result);

        //when an image is clicked...
        $("img").on("click", function () {
            //if the gif is off...
            if (!on) {
                //..change the source so that it animates
                $(this).attr("src", $(this).attr("data-animate"))
                //and turn the gif on
                on = true
            }
            //otherwise, the gif is on, so...
            else {
                //...change the source so that it becomes still
                $(this).attr("src", $(this).attr("data-still"))
                //and turn the gif off
                on = false;
            }
        })

        

        //issues: if a gif is animated, the next gifs will require a double click to animate if the first gif is still running (if a gif has been paused, pausing the next one will require a double click.)

    })
})

//when the submit button is clicked...
$(document).on("click","#add-gif", function(event){
    event.preventDefault();
    //...get the users input
    var input = $("#search-gifs").val();
    //add it to our topics array
    topics.push(input);
    //make a button for it
    var btn = $("<button>").text(input).attr({ "id": "topic", "value": input})
    $("#buttons").append(btn)
})


