import app from "./api.js";

const form = document.getElementById("formulario");

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", manipulaForm);
});

async function manipulaForm(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    if (!email || !senha) {
      alert("Todos os campos precisam ser preenchidos!");
      return;
    }

    const result = await app.loginUser({ email, senha });

    localStorage.setItem("token", result.token);

    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
    alert(`Erro ao logar com usuário: ${error.message}`);
  }
}
