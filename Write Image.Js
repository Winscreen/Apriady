<!-- Winscreen.web.id -->

      function authorshow(data) {
        for (var i = 0; i < 1; i++) {
          var entry = data.feed.entry[i];
          var avtr = entry.author[0].gd$image.src;
          document.write('<img width="100" height="100" src="' + avtr + '"/>');
        }
      }
