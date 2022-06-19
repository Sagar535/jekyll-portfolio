$(document).ready(function () {
  console.log("Image click function ready");
  $("img").click(function () {
    this.requestFullscreen();
  });
});
