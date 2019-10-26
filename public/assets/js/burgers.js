$(document).ready(function() {

    //functions

    function createBurger(newBurger) {
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          location.reload();
        }
      );
    };

    function createCustomer(newCustomer) {
      return new Promise ((resolve, reject) => {
        $.ajax("/api/customers", {
          type: "POST",
          data: newCustomer
        }).then(results => {
          resolve(results);
        }
        );
      })
    };

    // event handlers
    
    // creates the burger and adds new rows to burger table and customer table
    $(".burger-form").on("submit", async function(event) {
      event.preventDefault();

      let newCustomer = {
        customer_name: $("#new-customer").val().trim()
      }

      let customer = await createCustomer(newCustomer)
  
      let newBurger = {
        burger_name: $("#new-burger").val().trim(),
        CustomerId: customer.id
      };

      createBurger(newBurger);

      
    });

    // changes devoured status on button click and reloads page
    $(".devour-btn").on("click", function(event) {
      let id = $(this).data("id");
  
      let newStatus = {
        devoured: true
      };
  
      $.ajax(`/api/burgers/${id}`, {
        type: "PUT",
        data: newStatus
      }).then(
        function() {
          console.log("burger has been devoured");
          location.reload();
        }
      );
    });

    // gets rid of burger/customer info on button click
    $(".burger-delete").on("click", function() {
        var id = $(this).data('id');
        $.ajax(`/api/burgers/${id}`, {
            type: "DELETE",
        }).then(
            function() {
                console.log("deleted burger");
                location.reload();
            }
        )
    })
  });
  