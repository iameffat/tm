(function() {
    'use strict';

    function downloadImages() {
        var images = [];
        var today = new Date().toLocaleDateString().split('/').reverse().join('-');

        $("img[highres]").each(function(){
            var src = $(this).attr("highres");
            if (src.includes("_mr.jpg")) {
                src = src.replace("_mr.jpg", ".jpg");
                images.push(src);
            }
        });

        var htmlContent = "<html><head><title>Prothom Alo Image Slider</title><style>.slider {max-width: 100%; position: relative;}.slides {display: none;}.slides img {width: 100%; height: auto;}.prev, .next {cursor: pointer; position: absolute; top: 50%; transform: translateY(-50%); padding: 16px; color: white; font-weight: bold; font-size: 20px; transition: 0.6s ease; border-radius: 0 3px 3px 0;}.next {right: 0; border-radius: 3px 0 0 3px;}.prev:hover, .next:hover {background-color: rgba(0, 0, 0, 0.8);}.caption {text-align: center; color: #fff; position: absolute; bottom: 8px; width: 100%;}</style></head><body><div class='slider'>";

        images.forEach(function(src, index) {
            htmlContent += "<div class='slides'>";
            htmlContent += "<img src='" + src + "'><div class='caption'>" + (index+1) + " / " + images.length + "</div></div>";
        });

        htmlContent += "<a class='prev' onclick='plusSlides(-1)'>&#10094;</a><a class='next' onclick='plusSlides(1)'>&#10095;</a>";
        htmlContent += "<script>var slideIndex = 1;showSlides(slideIndex);function plusSlides(n) {showSlides(slideIndex += n);}function showSlides(n) {var i;var slides = document.getElementsByClassName('slides');if (n > slides.length) {slideIndex = 1} if (n < 1) {slideIndex = slides.length} for (i = 0; i < slides.length; i++) {slides[i].style.display = 'none';} slides[slideIndex-1].style.display = 'block';}</script>";
        htmlContent += "</div></body></html>";

        var blob = new Blob([htmlContent], {type: "text/html"});
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "Prothom_Alo_Image_" + today + ".html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function addDownloadButton() {
        var button = $("<button>Save Images HTML</button>");
        button.css({
            "position": "fixed",
            "bottom": "10px",
            "right": "10px",
            "z-index": "9999",
            "padding": "10px",
            "background-color": "#007bff",
            "color": "#fff",
            "border": "none",
            "border-radius": "5px",
            "cursor": "pointer"
        });
        button.click(downloadImages);
        $("body").append(button);
    }

    $(document).ready(function(){
        addDownloadButton();
    });

})();
