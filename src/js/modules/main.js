/* 
 * Created on : 03-06-2019
 * Author     : Antonio Lima (https://github.com/alimafilho)
 */

 (function($){
  "use strict";

  let $formRatingElement = null
  let $imgRatting = null
  const emojiListImgs = [
    "assets/emogi-slightly-frowning-face@2x.png", 
    "assets/emoji-slightly-miling-face@2x.png", 
    "assets/emoji-grinning-face-with-big-eyes@2x.png"
  ]

  function setInputRating (value) {
    $($formRatingElement).find("input[name='rating']").val(value);
  }

  function formValid (event) {
    // event.preventDefault();

    const inputPurchaseService = $(event.target).find("input[name='purchaseServiceRadio']:checked");
    const inputPurchaseServiceValue = $(inputPurchaseService).val();

    const inputvarietyOfProducts = $(event.target).find("input[name='varietyOfProductsRadio']:checked");
    const inputvarietyOfProductsValue = $(inputvarietyOfProducts).val();

    const inputproductQuality = $(event.target).find("input[name='productQualityRadio']:checked");
    const inputproductQualityValue = $(inputproductQuality).val();
    
    // atendimento
    
    if (!($(inputPurchaseService).is(':checked')) && typeof inputPurchaseServiceValue === "undefined") {
      alert("selecione o atendimento da compra");
      return false;
    } else if (!($(inputvarietyOfProducts).is(':checked')) && typeof inputvarietyOfProductsValue === "undefined") {
      alert("selecione variedade de produtos");
      return false;
    } else if (!($(inputproductQuality).is(':checked')) && typeof inputproductQualityValue === "undefined") {
      alert("selecione a qualidade do produto");
      return false;
    }

    

    // if($ { alert("it's checked "+ inputPurchaseService +"---"+ $(inputPurchaseService).val()); }
    console.warn({inputPurchaseServiceValue:inputPurchaseServiceValue, inputvarietyOfProductsValue:inputvarietyOfProductsValue, inputproductQualityValue:inputproductQualityValue})
    console.log("event", event.target)

    return true
  }

  function appInit () {
    $formRatingElement = $("#formRating");
    $imgRatting = $("#img-emoji-slider");
    
    $('input[type="range"]').rangeslider({
      polyfill: false,
      // Callback function
      onInit: function() {
        $(".slider-marker .slider-marker__item-value").first().addClass("slider-marker__item-value--select");
      },
      onSlide: function(position, value) {
        if (value >= 8) {
          $($imgRatting).attr("src", emojiListImgs[2])
        } else if (value >=4) {
          $($imgRatting).attr("src", emojiListImgs[1])
        } else {
          $($imgRatting).attr("src", emojiListImgs[0])
        }

        $(".slider-marker .slider-marker__item-value").each(function(index, item) {
          if (index === value) {
            $(item).addClass("slider-marker__item-value--select");
          } else {
            if ($(item).hasClass("slider-marker__item-value--select")) {
              $(item).removeClass("slider-marker__item-value--select");
            }
          }
        })

        setInputRating(value)
      },
      // Callback function
      onSlideEnd: function(position, value) {console.log("slid end", position, value)}
    });
    $($formRatingElement).submit(formValid)
  }

  $(document).ready(appInit)
})(jQuery);