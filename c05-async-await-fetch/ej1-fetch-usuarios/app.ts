interface Usuario {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const usuarios: Usuario[] = await response.json();
    return usuarios;

  } catch (error) {
    console.error('Erro en la petición:', error);
    return []; 
  }
}

async function main() {
    const usuarios = await obtenerUsuarios();

    usuarios.forEach(u => {
        console.log(`Nombre: ${u.name} - Email: ${u.email}`);
    });
}

main();