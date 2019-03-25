function addTitle(title, title_orig, language, vote) {

  var tempData = {

    title: title,
    title_orig: title_orig,
    language: language,
    vote: vote,
  }

  var template = $("#film_template").html();
  var compiled = Handlebars.compile(template);
  var li = compiled(tempData);

  var ulFilms = $(".films");
  ulFilms.append(li);
}


function ajaxResultParses(inData) {

  var ress = inData.results;
  for (var i = 0; i < ress.length; i++) {

    var res = ress[i];
    var title = res.title;
    var title_orig = res.original_title;
    var language = res.original_language;
    var vote = res.vote_average;

    addTitle(title, title_orig, language, vote);
  }
}


function ajaxTest() {

  var lista = $("li");
  var lines = $("hr");
  lista.remove();
  lines.remove();

  var outData = {

    api_key: "edb8c608c84aa9d386ab6be738961e5f",
    language: "it-IT",
    query: inputSearch(),
  };

  $.ajax({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: outData,
    success: function(inData){

      ajaxResultParses(inData);

    },
    error: function(request, state, error){
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

function inputSearch() {

  var me = $("#input_search");
  var content = me.val().toLowerCase();

  return content;
}


function init() {

  var doc = $(document);

  var inputbtn = $("#btn_search");
  inputbtn.on("click", ajaxTest);

  var input = $("#input_search");
  input.keyup(function(e) {
    if (e.which == 13) {
      ajaxTest();
    };
  });

}

$(document).ready(init);
