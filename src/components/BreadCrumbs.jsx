import { useNavigate } from 'react-router-dom'

export default function BreadCrumbs({ title }) {
  const navigate = useNavigate()
  return (
    <div>
      <h3 className="text-sm text-firm">
        <span className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300" onClick={() => navigate('/')}>
          Home
        </span>{' '}
        /{' '}
        <span className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300" onClick={() => navigate('/products')}>
          Products
        </span>{' '}
        / <span className="opacity-70">{title}</span>
      </h3>
    </div>
  )
}
