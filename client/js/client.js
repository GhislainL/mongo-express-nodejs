
var endpointUsers = "http://localhost:3000/users/" 


////////// CLEAN - BEGIN

// CREATE
var requestCreateUser = function(user){
    $.ajax({
        method : "POST",
        url: endpointUsers,
        data: user,
        success : function(data, textStatus, xhr){
            console.log("done : " + JSON.stringify(data));
            window.location.reload(true);
        },
        error: function(xhr, textStatus, errorThrown){
            console.log("fail : " + errorThrown);
        }
    });
};

$('#ModalAdd').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var userid = button.data('userid') // Extract info from data-* attributes

  var modal = $(this)
  
    modal.find('.modal-footer #BtnCreateUser').click(function(e){
        var user = {};
        user.firstname = modal.find('.modal-body #firstname').val();
        user.lastname = modal.find('.modal-body #lastname').val();
        requestCreateUser(user);
    });  
})

// DELETE
var requestDeleteUser = function(userid){
    console.log("requestDeleteUser :" + userid);
    url = endpointUsers + userid;
    $.ajax({
        method : "DELETE",
        url: url,
        success : function(data, textStatus, xhr){
            console.log("done : " + data);
            window.location.reload(true);
        },
        error: function(xhr, textStatus, errorThrown){
            console.log("fail : " + errorThrown);
        }
    });
};


// READ  
function requestGetUser(userId){
    url = endpointUsers + userId
    return $.ajax({
        method : "GET",
        url: url,
        dataType: "text",
        success : function(data){
            console.log("requestGetUser done : " + data);
            return data;
        },
        error: function(){
            console.log("fail");
        }
    });
};

$('#ModalDetails').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var userid = button.data('userid') // Extract info from data-* attributes
  var modal = $(this);

  requestGetUser(userid).done(function(data){
      data = JSON.parse(data);
      modal.find('.modal-body textarea').val(data.firstname + ' ' + data.lastname) ;
      }    
  ).fail(function(){
    modal.find('.modal-body textarea').val("error");}
  );
})

// READ ALL
function requestGetUsers(){
    return $.ajax({
        method : "GET",
        url: endpointUsers,
        dataType: "text",
        success : function(data){
            return data;
        },
        error: function(){
            console.log("fail");
        }
    });
};

function DisplayUsers(){
    requestGetUsers().done(
        function(data){
            $("#Users").empty();
            $.each(JSON.parse(data), function(idx, obj){
                $("#Users").append('<li class="list-group-item">' + obj.firstname + ' ' + obj.lastname +  
                '<button type="button" class="btn btn-default" aria-label="Details" data-toggle="modal" data-target="#ModalDetails" data-userid="'+ obj._id +'"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>' +
                '<button type="button" class="btn btn-default" aria-label="Edit" data-toggle="modal" data-target="#ModalUpdate" data-userid="'+ obj._id +'"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>' +
                '<button type="button" class="btn btn-default" aria-label="Delete" onclick="requestDeleteUser(\''+ obj._id +'\');"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>' +
                '</li>');
            })
        }
    ).fail(
        function(){
            //TODO
        }
    )
}

// UPDATE
function requestUpdateUser(userid, user){
    url = endpointUsers + userid;
    return $.ajax({
        method : "PUT",
        url: url,
        data: user,
        success : function(data, textStatus, xhr){
            console.log("done : " + data);
        },
        error: function(xhr, textStatus, errorThrown){
            console.log("fail : " + errorThrown);
        }
    });
}

////////// CLEAN - END



$('#ModalUpdate').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var userid = button.data('userid') // Extract info from data-* attributes
  var modal = $(this)
  
  requestGetUser(userid).done(function(data){
      data = JSON.parse(data);
      modal.find('.modal-body #lastnameupdate').val(data.lastname);
      modal.find('.modal-body #firstnameupdate').val(data.firstname);
      modal.find('.modal-footer #BtnUpdateUser').click( function(e){
        var user = {};
        user.firstname = modal.find('.modal-body #firstnameupdate').val();
        user.lastname = modal.find('.modal-body #lastnameupdate').val();
        requestUpdateUser(userid, user).done(function(){
            window.location.reload(true);
        }).fail(function(){
            //TODO
        });
    });
 }).fail(function(){
    modal.find('.modal-body textarea').val("error");}
  );
})


$( document ).ready(function() {
    DisplayUsers();

  $("#BtnGetUsers").click( function(e){
      e.preventDefault();
      DisplayUsers();
  });
});



