fetch("header.html")
  .then(response => {
    if (!response.ok) {
      throw new Error("Napaka pri nalaganju header.html");
    }
    return response.text();
  })
  .then(data => {
    document.getElementById("header").innerHTML = data;
  })
  .catch(error => {
    console.error("Napaka:", error);
  });