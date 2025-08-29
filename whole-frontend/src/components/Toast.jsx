import { createContext, useContext, useState } from 'react'


const ToastCtx = createContext()
export function ToastProvider({ children }){
const [msg, setMsg] = useState(null)
const show = (text) => { setMsg(text); setTimeout(() => setMsg(null), 2500) }
return (
<ToastCtx.Provider value={{ show }}>
{children}
{msg && <div role="status" className="toast">{msg}</div>}
</ToastCtx.Provider>
)
}
export const useToast = () => useContext(ToastCtx)