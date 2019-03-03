var topics = ["cats", "spongebob", "the office", "disney", "cute"]

//Create a button for each element in the topics array
for (var i = 0; i < topics.length; i++) {
    var btn = $("<button>").text(topics[i]).attr({"id":"topic", "value":topics[i]})
    $("#buttons").append(btn)
}

//When user clicks on a topic button...
$(document).on("click", "#topic", function() {
    //create api url
    var topic = $(this).val()
    var apiKey = "6oreJVucamoE8w9pyekj2hZ6vxC4p8C2"
    var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + topic + "&limit=10&offset=0&rating=G&lang=en"
    //Make API call
    $.ajax({
        url: apiUrl,
        method: "GET"
    }).then(function (result) {
        //append 10 static non-animated gif images to the page by...
        for (var i = 0; i < 10; i++) {
        //...creating an iframe
        var image = $("<iframe>").attr("src", result.data[i].embed_url)
        //...appending to the page
        $("#results").append(image);
        }
        console.log(result);
        console.log(apiUrl)
    })

})
