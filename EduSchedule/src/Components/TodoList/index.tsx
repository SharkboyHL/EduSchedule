import React, { useState, useEffect, FormEvent } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Services/firebaseConnection';

interface Task {
  id: string;
  nome: string;
  descricao: string;
  feita: boolean;
}

interface TodoFormProps {
  onSubmit: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescricao(e.target.value);
  };

  const handleTarefa = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (editingTask) {
        // Editar a tarefa existente
        await updateDoc(doc(db, 'ListaTarefas', editingTask), {
          nome,
          descricao,
        });

        setEditingTask(null); // Limpar a tarefa de edição
      } else {
        // Adicionar nova tarefa ao Firestore
        await addDoc(collection(db, 'ListaTarefas'), {
          nome,
          descricao,
          feita: false,
        });
      }

      console.log('Tarefa salva com sucesso');

      setNome(''); // Limpar os campos após adicionar ou editar a tarefa
      setDescricao('');
      loadTasks(); // Recarregar a lista de tarefas
      onSubmit();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error.message);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      // Excluir a tarefa do Firestore
      await deleteDoc(doc(db, 'ListaTarefas', taskId));
      loadTasks(); // Recarregar a lista de tarefas após excluir
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error.message);
    }
  };

  const handleEdit = (taskId: string) => {
    // Definir a tarefa como em edição
    const task = tarefas.find((task) => task.id === taskId);
    if (task) {
      setNome(task.nome);
      setDescricao(task.descricao);
    }
    setEditingTask(taskId);
  };

  const handleCheckboxChange = async (taskId: string, feita: boolean) => {
    try {
      // Atualizar a propriedade "feita" da tarefa no Firestore
      await updateDoc(doc(db, 'ListaTarefas', taskId), {
        feita: !feita,
      });

      loadTasks(); // Recarregar a lista de tarefas após alterar a propriedade
    } catch (error) {
      console.error('Erro ao marcar/desmarcar tarefa:', error.message);
    }
  };

  const loadTasks = async () => {
    try {
      // Obter todas as tarefas do Firestore
      const querySnapshot = await getDocs(collection(db, 'ListaTarefas'));
      const tasks: Task[] = [];

      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() } as Task);
      });

      setTarefas(tasks);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error.message);
    }
  };

  useEffect(() => {
    // Carregar tarefas quando o componente for montado
    loadTasks();
  }, []);

  return (
    <div className="mae" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className='tituloForm'>
        <h2>To Do List</h2>
        <img src="../../../src/assets/logo-eduS.png" alt="logo-eduS" style={{ width: '90px', height: '90px' }} />
      </div>
      <form onSubmit={handleTarefa}>
        <div>
          <label>Nome da Tarefa:</label>
          <input type="text" value={nome} onChange={handleNomeChange} />
        </div>
        <div>
          <label>Descrição da Tarefa:</label>
          <input type="text" value={descricao} onChange={handleDescricaoChange} />
        </div>
        <button type="submit">
          {editingTask ? 'Salvar Edição' : 'Adicionar Tarefa'}
        </button>
      </form>

      <h2>Tarefas</h2>
      <ul>
        {tarefas.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.feita}
              onChange={() => handleCheckboxChange(task.id, task.feita)}
            />
            {editingTask === task.id ? (
              <div>
                <label>Nome da Tarefa</label>
                <input
                  type="text"
                  value={nome}
                  onChange={handleNomeChange}
                  className="edit-input"
                />
                <br />
                <label>Descrição da Tarefa</label>
                <input
                  type="text"
                  value={descricao}
                  onChange={handleDescricaoChange}
                  className="edit-input"
                />
              </div>
            ) : (
              <>
                <div>
                  <strong>{task.nome}</strong> - {task.descricao} -{' '}
                  {task.feita ? 'Feita' : 'Pendente'}
                </div>
                <div className="edit-buttons">
                  <button onClick={() => handleEdit(task.id)}>
                    <img src="../../../src/assets/lapis.png" alt="Editar" style={{ width: '30px', height: '30px' }} />
                  </button>
                  <button className="delete" onClick={() => handleDelete(task.id)}>
                    <img src="../../../src/assets/lixeira.png" alt="Excluir" style={{ width: '30px', height: '30px' }} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <a href="/">Sair</a>
      </div>
    </div>
  );
};

export default TodoForm;
