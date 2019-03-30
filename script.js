

function clearOldResult() {

  var films = $(".film_box");
  films.remove();

  var inputSearch = $("#input_search");
  inputSearch.val("");
}

function printFilms(dataList) {

  clearOldResult();

  var container = $(".films");

  var template = $("#film_template").html();
  var compiled = Handlebars.compile(template);


  for (var i = 0; i < dataList.length; i++) {

    var data = dataList[i];
    var tempData = {

      title: data.title,
      title_orig: data.original_title,
      language: data.original_language,
      vote: data.vote_average,
    }

    var film = compiled(tempData);
    container.append(film);
  }
}

function ajaxSearchMovie(content) {

  var outData = {

    api_key: "edb8c608c84aa9d386ab6be738961e5f",
    language: "it-IT",
    query: content,
  };

  $.ajax({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: outData,
    success: function(inData){

      var res = inData.results;
      var count = res.length;

      if (count > 0) {

        printFilms(res);
      }

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

  ajaxSearchMovie(content);
}

function keyAction(e) {

  if (e.which == 13) {
    inputSearch();
  }
}


function init() {

  var inputbtn = $("#btn_search");
  inputbtn.click(inputSearch);

  var input = $("#input_search");
  input.keyup(keyAction)

  // var inputbtn = $("#btn_search");
  // inputbtn.on("click", inputSearch);
}

$(document).ready(init);



// function addTitle(title, title_orig, language, vote) {
//
//   var tempData = {
//
//     title: title,
//     title_orig: title_orig,
//     language: language,
//     vote: vote,
//   }
//
//   var template = $("#film_template").html();
//   var compiled = Handlebars.compile(template);
//   var li = compiled(tempData);
//
//   var ulFilms = $(".films");
//   ulFilms.append(li);
// }
//
//
// function ajaxResultParses(inData) {
//
//   var ress = inData.results;
//   for (var i = 0; i < ress.length; i++) {
//
//     var res = ress[i];
//     var title = res.title;
//     var title_orig = res.original_title;
//     var language = res.original_language;
//     var vote = res.vote_average;
//
//     addTitle(title, title_orig, language, vote);
//   }
// }


// function ajaxCall() {
//
//   var lista = $("li");
//
//   lista.remove();
//
//
//   var outData = {
//
//     api_key: "edb8c608c84aa9d386ab6be738961e5f",
//     language: "it-IT",
//     query: inputSearch(),
//   };
//
//   $.ajax({
//
//     url: "https://api.themoviedb.org/3/search/movie",
//     method: "GET",
//     data: outData,
//     success: function(inData){
//
//       ajaxResultParses(inData);
//
//     },
//     error: function(request, state, error){
//       console.log("request", request);
//       console.log("state", state);
//       console.log("error", error);
//     }
//   });
// }
