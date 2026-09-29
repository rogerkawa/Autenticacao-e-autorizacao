import app from "./api.js";

const form = document.getElementById("formCadastro");

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", manipulaForm);
});

async function manipulaForm(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmaSenha = document.getElementById("confirmar_senha").value;

  if (!nome || !email || !senha || !confirmaSenha) {
    alert("Todos os campos são obrigatórios!");
    return;
  }

  if (senha !== confirmaSenha) {
    alert("As senhas não coincidem!");
    return;
  }
  try {
    await app.registerUser({ nome, email, senha });
    alert("Usuário cadastrado com sucesso!");
  } catch (error) {
    console.error(error);
    alert(`Erro ao cadastrar usuário: ${error.message}`);
  }
}
