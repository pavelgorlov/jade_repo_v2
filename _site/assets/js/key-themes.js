$('.key-themes__theme').on('click', function() {
    if (!$(this).hasClass('key-themes__theme--opened')){
        $('.key-themes__subtheme').removeClass('key-themes__subtheme--selected')
    };
    $('.key-themes__theme').removeClass('key-themes__theme--opened key-themes__theme--selected');
    $(this).addClass('key-themes__theme--opened key-themes__theme--selected');
})

$('.key-themes__subtheme').on('click', function() {
    $('.key-themes__subtheme').removeClass('key-themes__subtheme--selected');
    $(this).toggleClass('key-themes__subtheme--selected');
})