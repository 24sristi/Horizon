$(document).ready(function(){
    $('#filter').click(function(){
        const value = $(this).attr('value');
        if(value == 'all'){
            $('.item').show('1000');
        }else{
            $('.item').not('.'+value).hide('1000');   
            $('.item').filter('.'+value).show('1000');   
        }
    })
})