document.querySelector("#startButton").addEventListener("click", () => {
    const player1 = document.querySelector("#nick1").value;
    const player2 = document.querySelector("#nick2").value;

    // Zapisz dane w Local Storage
    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);

    // Przekieruj do gry
    window.location.href = "index.html";
});