import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const PaymentContext = createContext();
PaymentContext.displayName = "Pagamento";

export const PaymentProvider = ({ children }) => {
  const PaymentTypes = [
    {
      id: 1,
      nome: "Boleto",
      juros: "1",
    },
    {
      id: 2,
      nome: "Cartão de crédito",
      juros: "1.3",
    },
    {
      id: 3,
      nome: "PIX",
      juros: "1",
    },
    {
      id: 4,
      nome: "Crediário",
      juros: "1.5",
    },
  ];

  const [formaPagamento, setFormaPagamento] = useState(PaymentTypes[0]);

  return (
    <PaymentContext.Provider
      value={{ formaPagamento, setFormaPagamento, PaymentTypes }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const { PaymentTypes, formaPagamento, setFormaPagamento } =
    useContext(PaymentContext);

  function mudarFormaPagamento(id) {
    const pagamentoAtual = PaymentTypes.find(
      (pagamento) => pagamento.id === id
    );
    setFormaPagamento(pagamentoAtual);
  }

  return {
    PaymentTypes,
    formaPagamento,
    mudarFormaPagamento,
  };
};
