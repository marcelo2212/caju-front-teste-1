import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useState } from "react";
import { useRegistrations } from "~/contexts/RegistrationContext";
import { formatDate, isValidDate } from "~/utils/admissionDateUtils";
import { isValidEmployeeName } from "~/utils/employeeNameUtils";
import { formatCpf, isValidCPF, unmaskCpf } from "~/utils/cpfUtils";
import { isValidEmail } from "~/utils/emailUtils";
import { StatusEnum } from "~/types/StatusEnum";
import { notifyError } from "~/components/CustomToast";
import { newUser } from "~/mocks/newUser-mock";

const NewUserPage = () => {
  const history = useHistory();

  const { addRegistration, filterRegistrationsByCpf, fetchRegistrations } = useRegistrations();

  const [formData, setFormData] = useState(newUser);

  const [errors, setErrors] = useState(newUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "cpf") {
      setFormData({ ...formData, [name]: unmaskCpf(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let tempErrors = { ...errors };
    tempErrors.email = isValidEmail(formData.email) ? "" : "Email inválido.";
    tempErrors.cpf = isValidCPF(unmaskCpf(formData.cpf)) ? "" : "CPF inválido.";
    tempErrors.employeeName = isValidEmployeeName(formData.employeeName)
      ? ""
      : "Nome inválido ou imcompleto.";
    tempErrors.admissionDate = isValidDate(formData.admissionDate)
      ? ""
      : "Data de admissão inválida.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const existingUsers = await filterRegistrationsByCpf(formData.cpf);
        if (existingUsers.length > 0) {
          setErrors({...errors,cpf: "O registro digitado já foi cadastrado.",});
          return;
        }

        await addRegistration({
          ...formData,
          status: StatusEnum.REVIEW,
          admissionDate: formatDate(formData.admissionDate)
        });
        
        cleanForm();

      } catch (error) {
        notifyError("Erro ao cadastrar usuário. Tente novamente.");
      }
    } else {
      notifyError("Por favor, corrija os erros no formulário.");
    }
  };

  const cleanForm = () => {
    setFormData(newUser);
  };

  const goToHome = () => {
    fetchRegistrations();
    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome Completo"
          label="Nome Completo"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          error={errors.employeeName}
        />
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          placeholder="CPF"
          label="CPF"
          name="cpf"
          value={formatCpf(formData.cpf)}
          onChange={handleChange}
          error={errors.cpf}
        />
        <TextField
          label="Data de admissão"
          type="date"
          name="admissionDate"
          value={formData.admissionDate}
          onChange={handleChange}
          error={errors.admissionDate}
        />
        <Button onClick={handleSubmit}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
