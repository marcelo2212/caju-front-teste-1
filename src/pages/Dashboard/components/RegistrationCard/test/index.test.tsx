import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationCard from '..';
import { StatusEnum } from '~/types/StatusEnum';
import { Registration } from '~/types/Registration';


const mockData:Registration = {
  id: '1',
  employeeName: 'João Silva',
  email: 'joao.silva@example.com',
  admissionDate: '2021-08-10',
  status: StatusEnum.REVIEW,
  cpf:'42734740001'
};

const onUpdateStatus = jest.fn();
const onDelete = jest.fn();

describe('RegistrationCard', () => {
  it('deve renderizar corretamente', () => {
    render(<RegistrationCard data={mockData} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />);

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('joao.silva@example.com')).toBeInTheDocument();
    expect(screen.getByText('2021-08-10')).toBeInTheDocument();
  });

  it('deve abrir modal de status ao clicar nos botões de ação', () => {
    render(<RegistrationCard data={mockData} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />);
    
    const approveButton = screen.getByText('Aprovar');
    fireEvent.click(approveButton);
    expect(screen.getByText(/Deseja mudar o status de JOÃO SILVA para APROVADO?/i)).toBeInTheDocument();
  });

  it('deve chamar onUpdateStatus ao confirmar mudança de status', () => {
    render(<RegistrationCard data={mockData} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />);
    
    const approveButton = screen.getByText('Aprovar');
    fireEvent.click(approveButton);
    const yesButton = screen.getByText('Sim');
    fireEvent.click(yesButton);
    
    expect(onUpdateStatus).toHaveBeenCalledWith(mockData, StatusEnum.APPROVED);
  });

  it('deve abrir modal de delete ao clicar no ícone de lixeira', () => {
    render(<RegistrationCard data={mockData} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />);
    
    const deleteIcon = screen.getByRole('button', { name: /trash/i });
    fireEvent.click(deleteIcon);
    expect(screen.getByText(/Deseja realmente excluir o registro de JOÃO SILVA?/i)).toBeInTheDocument();
  });

  it('deve chamar onDelete ao confirmar exclusão', () => {
    render(<RegistrationCard data={mockData} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />);
    
    const deleteIcon = screen.getByRole('button', { name: /excluir/i });
    fireEvent.click(deleteIcon);
    const yesButton = screen.getByText('Sim');
    fireEvent.click(yesButton);
    
    expect(onDelete).toHaveBeenCalledWith(mockData.id);
  });

  it('deve fechar modais ao clicar no botão Não', () => {
    render(<RegistrationCard data={mockData} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />);
    
    const approveButton = screen.getByText('Aprovar');
    fireEvent.click(approveButton);
    const noButton = screen.getByText('Não');
    fireEvent.click(noButton);

    expect(screen.queryByText(/Deseja mudar o status de JOÃO SILVA para APROVADO?/i)).not.toBeInTheDocument();
  });
});
