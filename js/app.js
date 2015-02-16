var Location = {
  googlebase: "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=",
  apiKey: "4ceff0c66c6f9d020c54661624fcfaab:11:71287471",

  init: function () {
    Location.getEntry();
  },

  getEntry: function () {
    $('#searchBtn').click(function(){
      Location.validate();
    });
  },

  validate: function() {
    var entry = $("#textbox").val();
    $('#allResults').empty();
    if(entry != "") {
      $('#warning').hide();
      Location.getLatLong(entry);
      $('#loader').show();
    }
    else {
      $('#warning').html("Search box cannot be empty!");
      $('#warning').show();
    }
  },

  getLatLong: function (param) {
    $.getJSON(Location.googlebase + param + "&api-key=" + Location.apiKey, function (data) {
      //console.log(data.response.docs);
      Location.buildResult(data.response.docs);
    });
  },

  buildResult: function(result) {
    $.each(result, function(index,value) {
      var image = result[index].multimedia;
      var snippet = result[index].snippet;
      var title = result[index].headline.print_headline;
      var date = result[index].pub_date;
      var url = result[index].web_url;
      var abstract = result[index].abstract
      console.log(abstract);
      var imageUrl = "";
      var articles = "";

      $.each(image, function(index) {
        if(image.length != 0 && index === 1) {
          imageUrl = "http://www.nytimes.com/"+image[index].url;
        }
      })

      $("#textbox").val("");
      articles = "<div id=eachResult><img src="+imageUrl+"><div id=articleBody><h2>"+title+"</h2><br><span>Date of Publication: "+date+"</span><br><br><p>"+snippet+"</p><p>"+abstract+"</p><br><a target=\"_blank\" href="+url+">Read More</a></div></div>"      
      $('#loader').hide();
      $('#allResults').append(articles);
    })
  }

};

$(document).ready(Location.init);

$(document).bind('keypress', function(e) {
    if(e.keyCode==13){
         $('#searchBtn').trigger('click');
     }
});