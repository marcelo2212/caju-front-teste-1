import React, { useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "../../../../components/Buttons";
import { IconButton } from "../../../../components/Buttons/IconButton";
import TextField from "../../../../components/TextField";
import routes from "../../../../router/routes";
import * as S from "./styles";
import { useRegistrations } from "../../../../contexts/RegistrationContext";
import { formatCpf, unmaskCpf } from "../../../../utils/cpfUtils";

export const SearchBar: React.FC = () => {
  const history = useHistory();
  const { fetchRegistrations, filterRegistrationsByCpf } = useRegistrations();
  const [cpf] = useState<string>("");

  const handleCpfChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const unmaskedCpf = unmaskCpf(value);

    if (unmaskedCpf.length == 11) {
      filterRegistrationsByCpf(unmaskedCpf);
    }

    if (unmaskedCpf.length == 0) {
      fetchRegistrations();
    }
  };

  const handleRefreshClick = () => {
    fetchRegistrations();
  };

  const handleNewAdmissionClick = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField
        value={formatCpf(cpf)}
        onChange={handleCpfChange}
        placeholder="Digite um CPF válido"
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefreshClick}>
          <HiRefresh />
        </IconButton>
        <Button onClick={handleNewAdmissionClick}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
