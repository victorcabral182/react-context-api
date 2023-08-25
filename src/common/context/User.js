import { createContext, useState } from "react"

export const UserContext = createContext()

//* .displayName define o nome do contexto na extensão react dev tools
UserContext.displayName = "Usuário"

export const UserProvider = ({ children }) => {
  const [nome, setNome] = useState("")
  const [saldo, setSaldo] = useState(0)
  return (
    <UserContext.Provider value={{ nome, setNome, saldo, setSaldo }}>
      {children}
    </UserContext.Provider>
  )
}
