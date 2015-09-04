/**
 * UI LOGIC FOR MAKING A CALL
 */

function init() {

    $("#alert").hide();

    // Compatibility shim
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    var userId =  $('#my_id').text();
    var peer = new Peer(userId, {host: '/', port: 9000, path: 'ssnoc'});


    peer.on('open', function(){
        //$('#my_id').text(peer.id);
    });
    // Receiving a call
    peer.on('call', function(call){
        // Answer the call automatically (instead of prompting user) for demo purposes
        call.answer(window.localStream);
        //step3(call);
    });
    peer.on('error', function(err){
        alert(err.message);
        // Return to step 2 if error occurs
        processErrors()
    });

    $(function(){
        $('#make_call').click(function(){
            // Initiate a call!
            var call = peer.call($('#callToId').val(), window.localStream);

        // Hang up on an existing call if present
        if (window.existingCall) {
            window.existingCall.close();
        }

        // Wait for stream on the call, then set peer video display
        call.on('stream', function(stream){
            $('#their-video').prop('src', URL.createObjectURL(stream));
        });

        // UI stuff
        window.existingCall = call;
        $('#their_id').text(call.peer);
        call.on('close', doSomething);
        //$('#step1, #step2').hide();
        //$('#step3').show();
        });

        $('#end_call').click(function(){
            //window.existingCall.close();
            //step2();
        });

        // Get things started
        initializeUI();
    });

    function initializeUI(){

        // Get audio/video stream
        navigator.getUserMedia({audio: true, video: true}, function(stream){
            // Set your video displays
            $('#my-video').prop('src', URL.createObjectURL(stream));
            window.localStream = stream;
            //step2();
        }, function(){ $('#step1-error').show(); });

    }
    function processErrors(){

    }

    function doSomething(){

    }


    //the following is the logic for picture upload.
    $('submit_pic').click(function(){

        var formdata = new FormData();

        if($('#file_input')[0].files[0]){
            formdata.append('profile_picture', $('#file_input')[0].files[0]);
            formdata.append('userName',$('#my_id').val() );

            var options = {
                type: 'POST',
                url: 'makeCall/upload',
                data: formdata,
                success:function(result){
                   // alert(result);
                    $("#alert").text(result);
                    $("#alert").show();
                    $("#alert").fadeOut(5000);
                },
                processData: false,  //tell jquery not to process data
                contentType: false,   //not to set Content-Type of header
                dataType:"json"
            };
            $.ajax(options);
        }

    });

}

$(document).on('ready', init);