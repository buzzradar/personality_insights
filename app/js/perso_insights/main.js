/**
 * Created by Juan Infante on 5/11/2018
 */

var Main = function () {


    var setupTryNowButton = function() {

        var layout = '<div class="container">';
        layout += '<div class="row text-center">';
        layout += '<div class="offset-md-2 col-md-2" style="background:orange;">';
        layout += '1';
        layout += '</div>';
        layout += '<div class="col-md-2">';
        layout += '2';
        layout += '</div>';
        layout += '<div class="col-md-2">';
        layout += '3';
        layout += '</div>';
        layout += '<div class="col-md-2">';
        layout += '4';
        layout += '</div>';
        layout += '</div>';
        layout += '<div class="row">';
        layout += '<div class="col-md-12 mt-5">';
        layout += 'This is the whole content';
        layout += '</div>';
        layout += '</div>';
        layout += '</div>';

        $('.try-now-btn').click(function(){

            bootbox.dialog({
                    message: layout,
                    size: 'large',
                    closeButton: true,
                }
            );

        });

    };


    

    return {
        init: function () {
            setupTryNowButton();
        }
    };
}();

Main.init();