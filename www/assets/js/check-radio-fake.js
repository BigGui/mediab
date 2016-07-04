/** 
  * Replace all checkboxes and radio inputs by fake element with style
  */

    $("input[type=checkbox], input[type=radio]").each(function(i, elem) {
        var type = $(elem).attr('type'),
            fake = $('<a>', {
                        href: "javascript:void(0)",
                        class: 'Fake-'+type
                    });
        $(elem)
            .after(
                fake.on('click touchstart', function(){
                    $(elem).prop('checked', !$(elem).prop('checked'));
                    $(this).toggleClass('Fake-'+type+'--active');
                })
            )
            .on('change', function(evt) {
                if ($(elem).prop('checked')) {
                    fake.addClass('Fake-'+type+'--active');
                }
                else {
                    fake.removeClass('Fake-'+type+'--active');
                }
            })
            .addClass('fake');
    });