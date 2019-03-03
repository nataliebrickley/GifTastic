var apiKey = "6oreJVucamoE8w9pyekj2hZ6vxC4p8C2"
var topic = "cats"
var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + topic +"&limit=25&offset=0&rating=G&lang=en"
var topics = ["cats", "spongebob", "the office", "disney", "cute"] 

//Create a button for each element in the topics array
for (var i = 0; i < topics.length; i++) {
    var btn = $("<button>").text(topics[i])
    $("#buttons").append(btn)
}


//Make API call
$.ajax({
    url: apiUrl,
    method: "GET"
}).then(function(result){
    console.log(result.data[0]);
})