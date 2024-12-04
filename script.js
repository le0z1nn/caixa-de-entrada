document.addEventListener("DOMContentLoaded", () => {
    const emailItems = document.querySelectorAll(".email-item");

    // Adiciona evento de clique nos itens de e-mail
    emailItems.forEach(item => {
        item.addEventListener("click", () => {
            alert(`Você clicou em um e-mail de ${item.querySelector(".sender").textContent}`);
        });
    });

    // Formulário de envio de e-mail
    const sendEmailForm = document.createElement("form");
    sendEmailForm.innerHTML = `
        <h2>Enviar E-mail</h2>
        <input type="text" id="to" placeholder="Destinatário" required><br>
        <input type="text" id="subject" placeholder="Assunto" required><br>
        <textarea id="message" placeholder="Mensagem" required></textarea><br>
        <button type="submit">Enviar</button>
    `;

    document.querySelector(".main-content").prepend(sendEmailForm);

    sendEmailForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const to = document.querySelector("#to").value;
        const subject = document.querySelector("#subject").value;
        const message = document.querySelector("#message").value;

        const response = await fetch("http://localhost:3000/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to, subject, message }),
        });

        const result = await response.json();
        alert(result.message);
    });
});
