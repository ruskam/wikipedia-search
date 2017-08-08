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
    var input = encodeURIComponent(($("#search-input").val()).trim());
    //var inputRaw = document.getElementById("search-input").value;
    console.log("input is: ", input);
    var wikiRequestTimeout = setTimeout(function(){
            //$wikiElem.text("Failed getting Wiki resources");
        }, 8000);
    var cityTyped = 'butterflies';


    //var wikiUrl ='http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json';
    var wikiUrl ='http://en.wikipedia.org/w/api.php?action=opensearch&search=' + input + '&format=json';
        console.log(wikiUrl);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(response) {
            console.log('response', response);
            var articleList = response[1];
            var urlList = response[3];
            //console.log(articleList);
            if (typeof articleList !== 'undefined' && articleList.length > 0) {
                for (var i = 0; i < articleList.length; i++) {
                    var articleTitle = articleList[i];
                    var articleUrl = urlList[i];
                    //$wikiElem.append('<li><a href="' + articleUrl + '">' + articleTitle + '</a></li>');
                }

                clearTimeout(wikiRequestTimeout);
            }
        }
    });
    return false;
}

$('#form-container').submit(search);
