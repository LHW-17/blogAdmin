(function () {
  function remSize() {
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    let designWidth = 1200; //pc
    // console.log(deviceWidth);
    //移动端
    // if (deviceWidth <= 750) {
    //   designWidth = deviceWidth;
    // }
    if (deviceWidth <= 320) {
      deviceWidth = 320;
    }
    //1rem = 100px~50px
    document.documentElement.style.fontSize =
      (deviceWidth / designWidth) * 50 + "px";
    //设置字体大小
    document.querySelector("body").style.fontSize = 0.3 + "rem";
  }
  window.onload = function () {
    remSize();
  };
  window.addEventListener("resize", remSize);
})();
