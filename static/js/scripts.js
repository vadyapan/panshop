(function(jQuery){var isLS=typeof window.localStorage!=="undefined";function wls(n,v){var c;if(typeof n==="string"&&typeof v==="string"){localStorage[n]=v;return true}else if(typeof n==="object"&&typeof v==="undefined"){for(c in n)if(n.hasOwnProperty(c))localStorage[c]=n[c];return true}return false}function wc(n,v){var dt,e,c;dt=new Date;dt.setTime(dt.getTime()+31536E6);e="; expires="+dt.toGMTString();if(typeof n==="string"&&typeof v==="string"){document.cookie=n+"="+v+e+"; path=/";return true}else if(typeof n===
    "object"&&typeof v==="undefined"){for(c in n)if(n.hasOwnProperty(c))document.cookie=c+"="+n[c]+e+"; path=/";return true}return false}function rls(n){return localStorage[n]}function rc(n){var nn,ca,i,c;nn=n+"=";ca=document.cookie.split(";");for(i=0;i<ca.length;i++){c=ca[i];while(c.charAt(0)===" ")c=c.substring(1,c.length);if(c.indexOf(nn)===0)return c.substring(nn.length,c.length)}return null}function dls(n){return delete localStorage[n]}function dc(n){return wc(n,"",-1)}jQuery.extend({Storage:{set:isLS?
    wls:wc,get:isLS?rls:rc,remove:isLS?dls:dc}})})(jQuery);
    
    (function ntSaveForms() {
      var text, cl;
      $(".ntSaveForms").each(function(i) {
        cl = "ntSaveForms"+i;
        $(this).addClass(cl); // add new class
        text = $.Storage.get(cl);
        if (text && text.length > 0 && !$(this).val()) {
          $(this).val(text);
          $(this).attr("data-search", text) // set field data
        }
      });
    
      $(".ntSaveForms").keyup(function() {
        $.Storage.set($(this).attr("class").split(" ")[$(this).attr("class").split(" ").length -1], $(this).val()); // save field data
      });
  
      $(".ntSaveFormsSubmit").click(function() {
        $(".ntSaveForms").each(function(i) {
          $.Storage.remove("ntSaveForms"+i); // remove data
        });
      });
    })();
  
  var pagesWithScript = ["/", "/catalog/",];
  
  if (pagesWithScript.indexOf(location.pathname) != -1) {
    $(document).ready(function () {
      var form = document.querySelectorAll("form");
      console.log(form);
  
      form.forEach((item) => {
        item.addEventListener("submit", (e) => {
          e.preventDefault();
          
          $("#basket_total_nmb").removeClass("d-none");
  
          var nmb = 1;
          console.log(nmb);
          var submit_btn = $("#submit_btn:hover");
          var product_id = submit_btn.data("product_id");
          var name = submit_btn.data("name");
          console.log(product_id);
          console.log(name);
  
          var data = {};
          data.product_id = product_id;
          data.nmb = nmb;
          var csrf_token = $(
            '#form_buying_product [name="csrfmiddlewaretoken"]'
          ).val();
          data["csrfmiddlewaretoken"] = csrf_token;
    
          var url = $(form).attr("action");
    
          console.log(data);
          $.ajax({
            url: url,
            type: "POST",
            data: data,
            cache: true,
            success: function (data) {
              console.log("OK");
              console.log(data.products_total_nmb);
              if (data.products_total_nmb || data.products_total_nmb == 0) {
                $("#basket_total_nmb").text("" + data.products_total_nmb + "");
                console.log(data.products);
                $(".basket-items ul").html("");
                $.each(data.products, function (k, v) {
                  $(".basket-items ul").append(
                    "<li>" +
                      v.name +
                      " " +
                      v.nmb +
                      " шт. " +
                      "сумма " +
                      v.price_per_item * v.nmb +
                      " рублей  " +
                      "</li>" +
                      "<hr>"
                  );
                });
              }
            },
            error: function () {
              console.log("error.basketUpdating");
            },
          });
        });
      });
    });
  }
  
  $(document).ready(function () {
    var form = $("#form_buying_product");
    console.log(form);
  
    form.on("submit", function (e) {
      e.preventDefault();
      
      $("#basket_total_nmb").removeClass("d-none");
      
      var nmb = $("#number").val();
      console.log(nmb);
      var submit_btn = $("#submit_btn");
      var product_id = submit_btn.data("product_id");
      var name = submit_btn.data("name");
      console.log(product_id);
      console.log(name);
  
      var data = {};
      data.product_id = product_id;
      data.nmb = nmb;
      var csrf_token = $(
        '#form_buying_product [name="csrfmiddlewaretoken"]'
      ).val();
      data["csrfmiddlewaretoken"] = csrf_token;
  
      var url = $(form).attr("action");
  
      console.log(data);
      $.ajax({
        url: url,
        type: "POST",
        data: data,
        cache: true,
        success: function (data) {
          console.log("OK");
          console.log(data.products_total_nmb);
          if (data.products_total_nmb || data.products_total_nmb == 0) {
            $("#basket_total_nmb").text("" + data.products_total_nmb + "");
            console.log(data.products);
            $(".basket-items ul").html("");
            $.each(data.products, function (k, v) {
              $(".basket-items ul").append(
                "<li>" +
                  v.name +
                  " " +
                  v.nmb +
                  " шт. " +
                  "сумма " +
                  v.price_per_item * v.nmb +
                  " рублей  " +
                  "</li>" +
                  "<hr>"
              );
            });
          }
        },
        error: function () {
          console.log("error.basketUpdating");
        },
      })
    });
  
    function showingBasket() {
      $("#basket-items").removeClass("d-none");
    }
    function no_showing_Basket() {
      $("#basket-items").addClass("d-none");
    }
  
    $("#score-items").mouseover(function () {
      showingBasket();
    });
  
    $(document).mouseout(function () {
      no_showing_Basket();
    });

    $(".ntSaveForms").on('keypress',function(e) {
      if(e.which == 13) {
        $('#search-button-nav').click();
        return true;
      }
    });

    var pagesWithScriptBasket = ["/checkout/", ];

    if (pagesWithScriptBasket.indexOf(location.pathname) != -1) {
    function no_showingBasket_in_checkout() {
      $("#basket-items").addClass("d-none");
    }
  
    $("#score-items").mouseover(function () {
      no_showingBasket_in_checkout();
    });
    }
  
    var pagesWithScriptBasket = ["/event/", "/delivery/", ];
  
    if (pagesWithScriptBasket.indexOf(location.pathname) != -1) {
      $("#subs-footer").removeClass("d-none");
    }
  
    $(document).ready(function () {
      $("#run-carousel").closest("div").remove();
      $("#run-carousel").addClass("active");
      $("#newsletter1").val("* new_subs");
      $("#newsletter1").addClass("d-none");
    });
  
    $(function () {
      if ($("#newsletter2").val()) {
        $("#exampleModal").modal("show");
        $("#newsletter2").val("");
      }
    });

    $(window).on('load', function() {
        var score_items = $("#basket_total_nmb").text();
        if (score_items > 0) {
          $("#basket_total_nmb").removeClass("d-none");
        }
    });
  
    $(function () {
      var name_search = $(".ntSaveForms").attr("data-search")
      var regex = /(?:)/gi;
      var dd=name_search.match(regex);
      if (dd) {
        allItems();
      } 
    });
  
    $(function () {
      var name_search = $(".ntSaveForms").attr("data-search")
      var regex = /(?:Смартфон|Смартфоны|Телефон|Телефоны)/gi;
      var dd=name_search.match(regex);
      if (dd) {
        phoneItems();
      } 
    });
  
    $(function () {
      var name_search = $(".ntSaveForms").attr("data-search")
      var regex = /(?:Ноутбук|Ноутбуки)/gi;
      var dd=name_search.match(regex);
      if (dd) {
        laptopItems();
      } 
    });
  
    $(function () {
      var name_search = $(".ntSaveForms").attr("data-search")
      var regex = /(?:Наушники|Гарнитура|Чехол)/gi;
      var dd=name_search.match(regex);
      if (dd) {
        accessoryItems();
      } 
    });
  
    $(function () {
      var name_search = $(".ntSaveForms").attr("data-search")
      var regex = /(?:Скидка|Скидки|По скидке|Акции|Распродажа)/gi;
      var dd=name_search.match(regex);
      if (dd) {
        discountItems();
      } 
    });
  
    $(function () {
      if (~$("body").text().indexOf("Смартфон")) {
        $(".specone").text("");
        $(".specone").append("<b>" + "Комплектация" + "</b>");
        $(".spectwo").text("");
        $(".spectwo").append("<b>" + "Связь" + "</b>");
        $(".specthree").text("");
        $(".specthree").append("<b>" + "Дисплей" + "</b>");
        $(".specfour").text("");
        $(".specfour").append("<b>" + "Фотокамера" + "</b>");
        $(".specfive").text("");
        $(".specfive").append("<b>" + "Процессор" + "</b>");
      }
    });
  
    $(function () {
      if (~$("body").text().indexOf("Ноутбук")) {
        $(".specone").text("");
        $(".specone").append("<b>" + "Экран" + "</b>");
        $(".spectwo").text("");
        $(".spectwo").append("<b>" + "Процессор" + "</b>");
        $(".specthree").text("");
        $(".specthree").append("<b>" + "Видеокарта" + "</b>");
        $(".specfour").text("");
        $(".specfour").append("<b>" + "Память" + "</b>");
        $(".specfive").text("");
        $(".specfive").append("<b>" + "Другое" + "</b>");
      }
    });
  
    $(function () {
      if (~$("body").text().indexOf("Наушники")) {
        $(".specone").text("");
        $(".specone").append("<b>" + "Основные характеристики:" + "</b>");
        $(".spectwo").text("");
        $(".specthree").text("");
        $(".specfour").text("");
        $(".specfive").text("");
      }
    });
  
    $(function () {
      if (~$("body").text().indexOf("Чехол")) {
        $(".specone").text("");
        $(".specone").append(
          "<p>" + "<b>" + "Основные характеристики:" + "</b>" + "</p>"
        );
        $(".spectwo").text("");
        $(".specthree").text("");
        $(".specfour").text("");
        $(".specfive").text("");
      }
    });
  
    function allItems(){
      $("#all-refresh-container").removeClass("d-none");
      $("#phone-refresh-container").addClass("d-none");
      $("#laptop-refresh-container").addClass("d-none");
      $("#accessory-refresh-container").addClass("d-none");
      $("#discount-refresh-container").addClass("d-none");
      $(".h1-ctlg-top").text("");
      $(".h1-ctlg-top").append("<b>" + "Каталог" + "</b>");
    }
  
    function phoneItems(){
      $("#all-refresh-container").addClass("d-none");
      $("#phone-refresh-container").removeClass("d-none");
      $("#laptop-refresh-container").addClass("d-none");
      $("#accessory-refresh-container").addClass("d-none");
      $("#discount-refresh-container").addClass("d-none");
      $(".h1-ctlg-top").text("");
      $(".h1-ctlg-top").append("<b>" + "Смартфоны" + "</b>");
    }
  
    function laptopItems(){
      $("#all-refresh-container").addClass("d-none");
      $("#phone-refresh-container").addClass("d-none");
      $("#laptop-refresh-container").removeClass("d-none");
      $("#accessory-refresh-container").addClass("d-none");
      $("#discount-refresh-container").addClass("d-none");
      $(".h1-ctlg-top").text("");
      $(".h1-ctlg-top").append("<b>" + "Ноутбуки" + "</b>");
    }
  
    function accessoryItems(){
      $("#all-refresh-container").addClass("d-none");
      $("#phone-refresh-container").addClass("d-none");
      $("#laptop-refresh-container").addClass("d-none");
      $("#accessory-refresh-container").removeClass("d-none");
      $("#discount-refresh-container").addClass("d-none");
      $(".h1-ctlg-top").text("");
      $(".h1-ctlg-top").append("<b>" + "Аксессуары" + "</b>");
    }
  
    function discountItems(){
      $("#all-refresh-container").addClass("d-none");
      $("#phone-refresh-container").addClass("d-none");
      $("#laptop-refresh-container").addClass("d-none");
      $("#accessory-refresh-container").addClass("d-none");
      $("#discount-refresh-container").removeClass("d-none");
      $(".h1-ctlg-top").text("");
      $(".h1-ctlg-top").append("<b>" + "По скидке" + "</b>");
    }
  
    $("#all-items").click(function () {
      allItems();
    });
  
    $("#phone-items").click(function () {
      phoneItems();
    });
  
    $("#laptop-tems").click(function () {
      laptopItems();
    });
  
    $("#accessory-items").click(function () {
      accessoryItems();
    });
  
    $("#discount-items").click(function () {
      discountItems();
    });
  
    $(".ntSaveForms").click(function(){
      $(".close").removeClass("d-none");
    });
  
    $(".close").click(function(){
      $(".close").addClass("d-none");
    });
  
    $(document).mouseup( function(e){ 
          var div = $( ".close" );
          if ( !div.is(e.target) 
              && div.has(e.target).length === 0 ) { 
              div.addClass("d-none");
          }
      });
  
    $(document).on("click", ".delete-item", function (e) {
      e.preventDefault();
      product_id = $(this).data("product_id");
      nmb = 0;
      is_delete = true;
  
      var data = {};
      data.product_id = product_id;
      data.nmb = nmb;
      var csrf_token = $('[name="csrfmiddlewaretoken"]').val();
      data["csrfmiddlewaretoken"] = csrf_token;
  
      if (is_delete) {
        data["is_delete"] = true;
      }
  
      var url = "http://panshop.site/basket_adding/";
  
      console.log(data);
      $.ajax({
        url: url,
        type: "POST",
        data: data,
        cache: true,
        success: function (data) {
          console.log("OK");
          console.log(data.products_total_nmb);
          if (data.products_total_nmb || data.products_total_nmb == 0) {
            $("#basket_total_nmb").text("" + data.products_total_nmb + "");
            console.log(data.products);
            $(".basket-items ul").html("");
            $.each(data.products, function (k, v) {
              $(".basket-items ul").append(
                "<li>" +
                  v.name +
                  " " +
                  v.nmb +
                  " шт. " +
                  "сумма " +
                  v.price_per_item * v.nmb +
                  " рублей  " +
                  "</li>" +
                  "<hr>"
              );
            });
          }
        },
        error: function () {
          console.log("error.delete-item");
        },
      });
  
      $(this).closest("tr").remove();
    });
  
    $(document).ready(function () {
      $(".minus-in-checkout").click(function () {
        let $input = $(this).parent().find(".qty-input");
        let count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
  
        product_id = $(this).data("product_id");
        nmb = count;
        price = $(this).data("price");
        total_price = nmb * price;
        is_delete = true;
  
        var data = {};
        data.product_id = product_id;
        data.nmb = nmb;
        data.total_price = total_price;
        var csrf_token = $('[name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;
  
        if (is_delete) {
          data["is_delete"] = true;
        }
  
        var url = "http://panshop.site/basket_adding/";
  
        console.log(data);
        $.ajax({
          url: url,
          type: "POST",
          data: data,
          cache: true,
          success: function (data) {
            console.log("OK");
            console.log(data.products_total_nmb);
            if (data.products_total_nmb || data.products_total_nmb == 0) {
              $("#basket_total_nmb").text("" + data.products_total_nmb + "");
              console.log(data.products);
              $(".basket-items ul").html("");
              $.each(data.products, function (k, v) {
                $(".basket-items ul").append(
                  "<li>" +
                    v.name +
                    " " +
                    v.nmb +
                    " шт. " +
                    "сумма " +
                    v.price_per_item * v.nmb +
                    " рублей  " +
                    "</li>" +
                    "<hr>"
                );
              });
            }
          },
          error: function () {
            console.log("error.minus");
          },
        });
      });
  
      $(".plus-in-checkout").click(function () {
        let $input = $(this).parent().find(".qty-input");
        let count = parseInt($input.val()) + 1;
        count =
          count > parseInt($input.data("max-count"))
            ? parseInt($input.data("max-count"))
            : count;
        $input.val(parseInt(count));
  
        product_id = $(this).data("product_id");
        nmb = count;
        price = $(this).data("price");
        total_price = nmb * price;
        is_delete = true;
  
        var data = {};
        data.product_id = product_id;
        data.nmb = nmb;
        data.total_price = total_price;
        var csrf_token = $('[name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;
  
        if (is_delete) {
          data["is_delete"] = true;
        }
  
        var url = "http://panshop.site/basket_adding/";
  
        console.log(data);
        $.ajax({
          url: url,
          type: "POST",
          data: data,
          cache: true,
          success: function (data) {
            console.log("OK");
            console.log(data.products_total_nmb);
            if (data.products_total_nmb || data.products_total_nmb == 0) {
              $("#basket_total_nmb").text("" + data.products_total_nmb + "");
              console.log(data.products);
              $(".basket-items ul").html("");
              $.each(data.products, function (k, v) {
                $(".basket-items ul").append(
                  "<li>" +
                    v.name +
                    " " +
                    v.nmb +
                    " шт. " +
                    "сумма " +
                    v.price_per_item * v.nmb +
                    " рублей  " +
                    "</li>" +
                    "<hr>"
                );
              });
            }
          },
          error: function () {
            console.log("error.plus");
          },
        });
      });
    });
  
    $(".qty-input").on("input", function () {
      product_id = $(this).data("product_id");
      nmb = $(this).val();
      price = $(this).data("price");
      total_price = nmb * price;
      is_delete = true;
  
      var data = {};
      data.product_id = product_id;
      data.nmb = nmb;
      data.total_price = total_price;
      var csrf_token = $('[name="csrfmiddlewaretoken"]').val();
      data["csrfmiddlewaretoken"] = csrf_token;
  
      if (is_delete) {
        data["is_delete"] = true;
      }
  
      var url = "http://panshop.site/basket_adding/";
  
      console.log(data);
      $.ajax({
        url: url,
        type: "POST",
        data: data,
        cache: true,
        success: function (data) {
          console.log("OK");
          console.log(data.products_total_nmb);
          if (data.products_total_nmb || data.products_total_nmb == 0) {
            $("#basket_total_nmb").text("" + data.products_total_nmb + "");
            console.log(data.products);
            $(".basket-items ul").html("");
            $.each(data.products, function (k, v) {
              $(".basket-items ul").append(
                "<li>" +
                  v.name +
                  " " +
                  v.nmb +
                  " шт. " +
                  "сумма " +
                  v.price_per_item * v.nmb +
                  " рублей  " +
                  "</li>" +
                  "<hr>"
              );
            });
          }
        },
        error: function () {
          console.log("error.change-number");
        },
      });
    });
  
    function calculatingBasketDiscount() {
      var total_order_amount = 0;
      $(".total-product-in-basket-amount").each(function () {
        total_order_amount =
          total_order_amount + parseFloat($(this).data("total"));
        discount = total_order_amount * 0.9;
      });
  
      $({ countNum: $("#total_order_amount").text() }).animate(
        {
          countNum: discount,
        },
        {
          duration: 500,
          easing: "swing",
          step: function () {
            $("#total_order_amount").text(Math.floor(this.countNum));
          },
          complete: function () {
            $("#total_order_amount").text(this.countNum.toLocaleString("ru-RU"));
          },
        }
      );
    }
  
    function calculatingBasketAmount() {
      var total_order_amount = 0;
      $(".total-product-in-basket-amount").each(function () {
        total_order_amount =
          total_order_amount + parseFloat($(this).data("total"));
      });
  
      $({ countNum: $("#total_order_amount").text() }).animate(
        {
          countNum: total_order_amount,
        },
        {
          duration: 500,
          easing: "swing",
          step: function () {
            $("#total_order_amount").text(Math.floor(this.countNum));
          },
          complete: function () {
            $("#total_order_amount").text(this.countNum.toLocaleString("ru-RU"));
          },
        }
      );
    }
  
    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 2050) {
          $("#toTop").fadeIn();
        } else {
          $("#toTop").fadeOut();
        }
      });
  
      $("#toTop").click(function () {
        $("body, html").animate({ scrollTop: 0 }, 100);
      });
    });
  
    document
      .querySelector("input[name=comments]")
      .addEventListener("keyup", function (e) {
        if (
          this.value == "NEWYEAR23" ||
          this.value == "newyear23" ||
          this.value == "Newyear23" ||
          this.value == "NewYear23"
        ) {
          calculatingBasketDiscount();
          $("#button-promocode").trigger("click");
        }
      });
  
    $(document).ready(function () {
      $(document).on("click input", ".input-group-text", function () {
        var current_nmb = jQuery(this).parent().find("input[type=text]").val();
        console.log(current_nmb);
        var current_tr = $(this).closest("tr");
        var current_price = parseFloat(
          current_tr.find(".product-price").data("price")
        );
        var total_amount = parseFloat(current_nmb * current_price);
        current_tr.find(".plus-in-checkout").attr("data-price", current_price);
        current_tr.find(".minus-in-checkout").attr("data-price", current_price);
        current_tr
          .find(".total-product-in-basket-amount")
          .text(total_amount.toLocaleString("ru-RU") + " ₽")
          .data("total", total_amount);
  
        calculatingBasketAmount();
      });
  
      calculatingBasketAmount();
    });
  
    $(document).ready(function () {
      $(document).on("input", "#counter-items", function () {
        var current_nmb = $(this).val();
        console.log(current_nmb);
        var current_tr = $(this).closest("tr");
        var current_price = parseFloat(
          current_tr.find(".product-price").data("price")
        );
        var total_amount = parseFloat(current_nmb * current_price);
        current_tr.find(".plus-in-checkout").attr("data-price", current_price);
        current_tr.find(".minus-in-checkout").attr("data-price", current_price);
        current_tr
          .find(".total-product-in-basket-amount")
          .text(total_amount.toLocaleString("ru-RU") + " ₽")
          .data("total", total_amount);
  
        calculatingBasketAmount();
      });
  
      calculatingBasketAmount();
    });
  });
  