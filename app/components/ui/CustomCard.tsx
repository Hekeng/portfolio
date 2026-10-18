import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Link } from 'react-router'

// 1. Создаем "Заводик" стилей карточки
const cardVariants = cva(
	'group relative rounded-xl border p-4 transition-all duration-300',
	{
		variants: {
			interaction: {
				none: 'bg-card',
				lift: 'bg-card hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl',
			},
		},
		defaultVariants: {
			interaction: 'lift',
		},
	}
)

export function ProductCard({ product, className }: any) {
	return (
		<div className={cn(cardVariants(), className)}>
			{/* Ссылка на всю карточку через "invisible overlay" */}
			<Link
				to={`/product/${product.id}`}
				className='absolute inset-0 z-10'
			>
				<span className='sr-only'>Посмотреть {product.name}</span>
			</Link>

			{/* Контент карточки */}
			<div className='relative z-0'>
				<img src={product.image} alt='' className='rounded-lg' />
				<h3 className='mt-2 font-bold'>{product.name}</h3>
				<p className='text-muted-foreground'>{product.price}</p>
			</div>

			{/* Кнопка "В корзину" - она ВЫШЕ ссылки (z-20) */}
			<button
				onClick={(e) => {
					e.preventDefault() // Чтобы не сработал переход по ссылке карточки
					alert('Добавлено!')
				}}
				className='bg-primary relative z-20 mt-4 w-full rounded-md p-2 text-white opacity-0 transition-opacity group-hover:opacity-100'
			>
				Buy
			</button>
		</div>
	)
}
