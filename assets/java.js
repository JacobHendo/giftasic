
$(document).ready(function () {
    //Buttons to pick from, always on the page
    var suggested = ["slipKnot", "Korn", "Metallica", "Stone Sour", "Lamb of God", "Kid Rock", "Ozzy", "Tool"];
    function renderButtons() {
        $("#buttongroups").empty();
        // Loop through the array 
        for (var i = 0; i < suggested.length; i++) {

            // Variable for a button
            var button = $("<button>");
            // Add  class to the button
            button.addClass("topic");
            // Add  attribute to the button 
            button.attr("data-name", suggested[i]);
            //  Button it's nmae
            button.text(suggested[i]);
            // Button to the page
            $("#buttongroups").prepend(button);
        }
    }   
    renderButtons();
    //Click event for the add more topics button
    $("#search").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        // Variable to capture what the user has enetered and trim out all extra spaces
        var newtopic = $("#textInput").val().trim();
        suggested.push(newtopic);
        renderButtons();
    });
    $(document).on("click", ".topic", showGIF);
    function showGIF() {
        //Variable to take the name of the button and run it through the GIPHY API
        var buttonpicked = $(this).attr("data-name");
        //URL for Giphy API for searching including my key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonpicked + "&api_key=XHQogqxx6H0m8DdXV6fUvceRsWPGRySV";
        // AJAX call to the Giphy API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Variable to store the ENTIRE response from GIPHY API
            var result = response.data;
            // Looping over the response from the API
            for (var i = 0; i < result.length; i++) {
                // Checking the rating of the response to make sure it is G or PG only
                if (result[i].rating !== "r" && result[i].rating !== "pg-13") {
                    var gifDiv = $("<div>");
                    // Adds a class to the Div for targeting
                    gifDiv.addClass("gifbox");
                    // Variable to store the rating
                    var rating = result[i].rating;
                    // Creates a <p> tag to display the rating
                    var one = $("<p>").text("Rating: " + rating);
                    // Variable to store the Title
                    var title = result[i].title;
                    // Creates a <p> tag to display the title
                    var two = $("<p>").text("Title: " + title);
                    // Creating an <img> tag to display the GIF
                    var gifImage = $("<img>");
                    // Adding a class to the image to target it later
                    gifImage.addClass("still");
                    // adding a data-state to the gif to target later in animation
                    gifImage.attr("data-state", "paused");
                    // Giving the <img> tag a src of Fixed Still to be loaded on search
                    gifImage.attr("src", result[i].images.fixed_width_still.url);
                    // Giving the <img> tag an atrribute linked to a url for animation
                    gifImage.attr("data-paused", result[i].images.fixed_width_still.url);
                    // Giving the <img> tag the other linked url with different state for animation 
                    gifImage.attr("data-moving", result[i].images.fixed_width.url);
                    // Appends the GIF, rating, and title into the Div created
                    gifDiv.append(two);
                    gifDiv.append(one);
                    gifDiv.append(gifImage);
                    // Actually adds the entire Div to the page
                    $("#GIFarea").prepend(gifDiv);
                }
            }
            $(document).on("click", ".still", function () {
                var animationState = $(".still").attr("data-state");
                if (animationState === "paused") {
                    console.log(result[i]);
                    $(this).attr("src", $(this).attr("data-moving"));
                    $(this).attr("data-state", "moving");
                } else {
                    $(this).attr("src", $(this).attr("data-paused"));
                    $(this).attr("data-state", "paused");
                }
            });
        });
    };
})
