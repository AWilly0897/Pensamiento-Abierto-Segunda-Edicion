// js/comentario.js
document.addEventListener("DOMContentLoaded", () => {
  mostrarComentariosPublicados();
});

// Mostrar comentarios publicados desde GitHub Issues
async function mostrarComentariosPublicados() {
  const lista = document.getElementById("lista-publicados");
  if (!lista) return;

  const owner = "AWilly0897"; // tu usuario de GitHub
  const repo = "Pensamiento-Abierto-Segunda-Edicion"; // tu repositorio

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`);
    const issues = await response.json();

    // Orden descendente por fecha
    issues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    lista.innerHTML = "";
    issues.forEach(issue => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>${issue.user.login}</strong> 
        (${new Date(issue.created_at).toLocaleString('es-AR')})<br>
        <p>${issue.title}</p>
      `;
      lista.appendChild(item);
    });
  } catch (error) {
    console.error("Error al cargar comentarios:", error);
  }
}
