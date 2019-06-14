$(document).ready(function() {

    var sports = [
        "swimming", "hiking", "running", "walking", "skiing", "soccer",
        "football", "boxing", "cricket", "hokey", "cycling",
    ];

    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        // Verifying buttons
        for (var i = 0; i < arrayToUse.length; i++) {
            var button = $("<button>");
            button.addClass(classToAdd);
            button.attr("data-type", arrayToUse[i]);
            button.text(arrayToUse[i]);
            $(areaToAddTo).append(button);
        }

    }

    $(document).on("click", ".sports-button", function() {
        $("#sports").empty();
        $(".sports-button").removeClass("active");
        $(this).addClass("active");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            sports + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
        //ajax call 
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var sportsDiv = $("<div class=\"sports-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var sportsImage = $("<img>");
                    sportsImage.attr("src", still);
                    sportsImage.attr("data-still", still);
                    sportsImage.attr("data-animate", animated);
                    sportsImage.attr("data-state", "still");
                    sportsImage.addClass("sports-image");

                    sportsDiv.append(p);
                    sportsDiv.append(sportsImage);

                    $("#sports").append(sportsDiv);
                }
            });
    });
    // Onclick function to animate/pause gifs
    $(document).on("click", ".sports-image", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-sports").on("click", function(event) {
        event.preventDefault();
        var newSport = $("input").eq(0).val();

        if (newSport.length > 2) {
            sports.push(newSport);
        }

        populateButtons(sports, "sports-button", "#sports-buttons");

    });

    populateButtons(sports, "sports-button", "#sports-buttons");
});