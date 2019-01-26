$(function () {

    var array = [];
    var calTotal = 0;
    var string = '';
    var quant = [];
    var arr = [];

    function ingredients(array) {
        var uniq = _.uniq(array);

        arr = []
        for (var i = 0; i < uniq.length; i++) {
            string = '';
            quant[i] = array.filter(x => x === uniq[i]).length;

            // new something
            string += (i + 1) + '. ' + uniq[i].charAt(0).toUpperCase() + uniq[i].slice(1) + ' x ' + quant[i];
            arr[i] = string;
            console.log("string " + string);
            console.log("arr " + arr[i]);
        }


    }





    $(".quant").click(function (event) {
        event.preventDefault();

        var URL =
            "https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=" + $(this).attr('data-name') +
            "&app_id=ef62ce78&app_key=fef286ab4588a4d52807a0d210ecd303";

        var amount = array.filter(x => x === $(this).attr('data-name')).length;
        var present = $.inArray(($(this).attr('data-name')), array);

        if ($(this).val() != 0) {
            if (present != -1) {
                if (amount > $(this).val()) {
                    array.splice(present, 1);
                    $.ajax({
                        url: URL,
                        method: "GET"
                    }).then(function (response) {
                        calTotal -= response.parsed[0].food.nutrients.ENERC_KCAL;
                        console.log(`calTotal: ${calTotal}`);
                        $('#totalCal').empty().append("Total Kcal is: " + calTotal);
                        ingredients(array);
                    });
                } else if (amount < $(this).val()) {
                    array.push($(this).attr('data-name'));
                    $.ajax({
                        url: URL,
                        method: "GET"
                    }).then(function (response) {
                        calTotal += response.parsed[0].food.nutrients.ENERC_KCAL;
                        console.log(`calTotal: ${calTotal}`);
                        $('#totalCal').empty().append("Total Kcal is: " + calTotal);
                        ingredients(array);
                    });
                };
            } else {
                array.push($(this).attr('data-name'));
                $.ajax({
                    url: URL,
                    method: "GET"
                }).then(function (response) {
                    calTotal += response.parsed[0].food.nutrients.ENERC_KCAL;
                    console.log(`calTotal: ${calTotal}`);
                    $('#totalCal').empty().append("Total Kcal is: " + calTotal);
                    ingredients(array);
                });
            }
        } else {
            if (present != -1) {
                $.ajax({
                    url: URL,
                    method: "GET"
                }).then(function (response) {
                    calTotal -= response.parsed[0].food.nutrients.ENERC_KCAL;
                    console.log(`calTotal: ${calTotal}`);
                    $('#totalCal').empty().append("Total Kcal is: " + calTotal);
                    array.splice(present, 1);
                    ingredients(array);
                });
            }
        }

    });

    $("button.addPizza").on("click", function (event) {
        event.preventDefault();

        let userId = $("#userId").attr("data-id");
        let pizzaRecipe = $('#pizza-recipe').val().trim();
        let ingredients = JSON.stringify(arr);
        let title = $("#pizza-title").val().trim();
        console.log(arr);
        console.log(ingredients);


        let newPizza = {
            userid: userId,
            recipe: pizzaRecipe,
            ingredients: ingredients,
            totalCal: calTotal,
            title: title
        };
        $.ajax('/api/pizza', {
            type: 'POST',
            data: newPizza
        }).then(() => {
            console.log('Created new pizza recipe');
            location.reload();
        });
        $.ajax('/', newPizza).then(() => {
            console.log('Created new pizza recipe');
            // location.reload();
        });
    });

});