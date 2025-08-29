import { Link } from 'react-router-dom'
export default function NotFound(){
return (
<section className="stack-lg">
<h1>404</h1>
<p className="muted">We couldn’t find that page.</p>
<Link className="btn" to="/">Go Home</Link>
</section>
)
}