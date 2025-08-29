import { useState } from 'react'
import { useItems } from '../context/ItemsContext.jsx'
import { useToast } from '../components/Toast.jsx'


export default function AddItem(){
const { addItem } = useItems()
const { show } = useToast()
const [form, setForm] = useState({ title:'', owner:'', description:'', status:'AVAILABLE' })


const submit = (e) => {
e.preventDefault()
if(!form.title.trim() || !form.owner.trim()) return show('Please fill the required fields.')
addItem(form)
show('Item added!')
setForm({ title:'', owner:'', description:'', status:'AVAILABLE' })
}


return (
<section className="stack-lg">
<h1>Add Item</h1>
<form className="form" onSubmit={submit}>
<label>Title*<input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required/></label>
<label>Owner*<input value={form.owner} onChange={e=>setForm({...form, owner:e.target.value})} required/></label>
<label>Description<textarea rows="4" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/></label>
<label>Status
<select value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
<option>AVAILABLE</option>
<option>PENDING</option>
<option>SWAPPED</option>
</select>
</label>
<div className="row gap"><button className="btn" type="submit">Save</button></div>
</form>
</section>
)
}