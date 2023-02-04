fetch("/create_preference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then(function (response) {
      return response.json();
    })
    .catch(function () {
      alert("Unexpected error");
      $('#checkout-btn').attr("disabled", false);
    });