import { useEffect, useState, useRef, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';
import { api } from './services/api';

interface UsersProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App(){

  const [users, setUsers] = useState<UsersProps[]>([]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const response = await api.get("/customers");
    setUsers(response.data);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    if(!nameRef.current?.value || !emailRef.current?.value) return;

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value
    });

    setUsers(allUsers => [...allUsers, response.data]);

    nameRef.current.value = "";
    emailRef.current.value = "";

   }

  async function handleDelete(id: string){
    try{
      await api.delete("/customer", {
        params: {
          id: id,
        }
      });

      const allUsers = users.filter( (user)=> user.id !== id);
      setUsers(allUsers);

    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl text-white font-medium text-center mb-8">Gerenciar Usuários</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-bold text-white">Nome:</label>
          <input type="text" placeholder="Digite o seu nome" ref={nameRef} className="w-full mb-5 p-2 rounded" />
          <label className="font-bold text-white">E-mail:</label>
          <input type="email" placeholder="Digite o seu email" ref={emailRef} className="w-full mb-5 p-2 rounded" />
          <input type="submit" value="Cadastrar" 
          className="cursor-pointer w-full p-2 bg-green-500 rounded" />
        </form>

        <section className="flex flex-col gap-4">

          {users.map( (user) => (
            <article key={user.id} className="w-full bg-slate-400 p-2 relative hover:scale-105 duration-200">
              <p><span className="font-bold">Nome:</span> {user.name}</p>
              <p><span className="font-bold">Email:</span> {user.email}</p>
              <p><span className="font-bold">Status:</span> {user.status ? 'ATIVO' : 'INATIVO' }</p>
              <button onClick={() => handleDelete(user.id)} className="bg-red-600 w-7 h-7 flex items-center justify-center rounded absolute right-0 -top-2"><FiTrash size={18} color="#fff" /></button>
            </article>
          ))}

        </section>
      </main>
    </div>
  )
}