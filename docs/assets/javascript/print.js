document.addEventListener("DOMContentLoaded", function () {
  const button = document.createElement("button");

  button.innerHTML = "🖨️ Imprimir";
  button.className = "print-button";

  button.addEventListener("click", function () {
    window.print();
  });

  document.body.appendChild(button);
});