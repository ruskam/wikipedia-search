$(document).ready(function() {

    // enableAutocomplete();
    $("#search-input").autocomplete({
        source: function(req, res) {
            $.ajax({
                url: "http://en.wikipedia.org/w/api.php",
                dataType: "jsonp",
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': req.term
                },
                success: function(data){
                    res(data[1]);
                    console.log(req.term);
                }
            });
        }
    });
});

function search(){
    $('#wiki-results').html('');
    var $wikiResultsElement = $('#wiki-results');
    var input = encodeURIComponent(($("#search-input").val()).trim());

    console.log("input is: ", input);
    var wikiRequestTimeout = setTimeout(function(){
            //$wikiElem.text("Failed getting Wiki resources");
        }, 10000);

    var wikiUrl ='http://en.wikipedia.org/w/api.php?action=opensearch&search=' + input + '&format=json';
        console.log(wikiUrl);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(response) {
            console.log('response', response);
            var resultList = response[1];
            var descriptionList = response[2];
            var urlList = response[3];
            //console.log(articleList);
            if (typeof resultList !== 'undefined' && resultList.length > 0) {
                for (var i = 0; i < resultList.length; i++) {
                    var articleTitle = resultList[i];
                    var articleDescription = descriptionList[i];
                    var articleUrl = urlList[i];
                    $wikiResultsElement.append('<a href="' + articleUrl + '"class="list-group-item list-group-item-action" target="_blank">' + '<span class="article-title">' + articleTitle + '</span>' + '<br>' + '<span class="article-description">' + articleDescription + '</span></a></li><br>');
                }

                clearTimeout(wikiRequestTimeout);
            }
        }
    });

    $("#form-container").trigger("reset");

    return false;
}

$('#form-container').submit(search);

$(".rotate").hover(function(){
    $(this).toggleClass("around")  ; 
})
