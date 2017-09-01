$('.fields__field').on('click', function() {
    $('.fields__field').removeClass('fields__field--opened');
    $(this).addClass('fields__field--opened');
})