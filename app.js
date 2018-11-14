//Initial an array of movies aded
var movies = ["matrix", "avenger"];

//display movie information
function showMovieInfo() {
    var movie = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=2fbfb06c";

    //creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //Creating a div to hold the movie
        var movieDiv = $("<div class='movie'>");

        //Storing the rating data
        var rating = response.Rated;
        //Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);
        //Displaying the rating
        movieDiv.append(pOne);

        //Storing the release year
        var released = response.Released;
        //Creating an element to hold the relase year
        var pTwo = $("<p>").text("Released: " + released);
        //Displaying the release year
        movieDiv.append(pTwo);

        //Storing the plot
        var plot = response.Plot;
        //Creating an element to hold the plot
        var pThree = $("<p>").text("Plot: " + plot);
        //Appending the plot
        movieDiv.append(pThree);

        //Retrieving the URL for the images
        var imgURL = response.Poster;
        //Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        //Appending the image
        movieDiv.append(image);

        //Putting the entire movie above the previous movies
        $("#movies-view").prepend(movieDiv);
    });
}
//function to dipslay movie data
function renderBtn() {
    //Deleting the movies prior to adding new movie
    $("#buttons-view").empty();
    //Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {
        //Generating buttons for each movie in the array
        var a = $("<button>");
        a.addClass("movie-btn");
        a.attr("data-name", movies[i]);
        a.text(movies[i]);
        $("#buttons-view").append(a);
    }
};
//Handling the events where a movie button is clicked
$("#add-movie").on("click", function(event) {
    event.preventDefault();
    //Grabing the value of new input and adding it to the array of movie
    var movie = $("#movie-input").val().trim();
    movies.push(movie);
    renderBtn();
    $("#movie-input").val("");
});

$(document).on("click", ".movie-btn", showMovieInfo);
renderBtn();