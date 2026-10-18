import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface SwitchLanguageSelectProps {
	selectTriggerClassName: string
	selectValueClassName: string
	selectContentClassName: string
	selectItemClassName: string
}

const SwitchLanguageSelect = ({
	selectTriggerClassName,
	selectValueClassName,
	selectContentClassName,
	selectItemClassName,
}: SwitchLanguageSelectProps) => {
	return (
		<Select>
			<SelectTrigger className={selectTriggerClassName}>
				<SelectValue
					placeholder='en'
					className={selectValueClassName}
				/>
			</SelectTrigger>
			<SelectContent
				position='popper'
				align='end'
				className={selectContentClassName}
			>
				<SelectItem className={selectItemClassName} value='en'>
					en
				</SelectItem>
				<SelectItem className={selectItemClassName} value='de'>
					de
				</SelectItem>
				<SelectItem className={selectItemClassName} value='ru'>
					ru
				</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default SwitchLanguageSelect
