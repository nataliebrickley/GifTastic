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
            var image = $("<img>").attr({ "src": still, "data-animate": animate, "data-still": still, "data-state": "still" })
            //...append the image as well as it's rating
            var rating = $("<p>")
            rating.text("Rating: " + result.data[i].rating.toUpperCase())
            gifDiv.append(image, rating)
            //...appending to the page
            $("#results").append(gifDiv);
           
        }

        //when an image is clicked...
        $("img").on("click", function () {
            //if the gif's data-state is still...
            if ($(this).attr("data-state")==="still") {
                //..change the source so that it animates
                $(this).attr("src", $(this).attr("data-animate"))
                //and turn the gif's state to animate
                $(this).attr("data-state", "animate")
            }
            //otherwise, the gif is animated, so...
            else {
                //...change the source so that it becomes still
                $(this).attr("src", $(this).attr("data-still"))
                //and turn the gif's state to still
                $(this).attr("data-state", "still")
            }
        })
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


