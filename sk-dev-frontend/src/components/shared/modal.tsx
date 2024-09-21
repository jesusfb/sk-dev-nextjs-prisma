import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

export type ModalProps = {
	title: string;
	desctiption: string;
	children: React.ReactNode;
	buttonText?: string;
	buttonVariant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| null
		| undefined;
	icon: React.ReactNode;
};

export const Modal = ({
	title,
	desctiption,
	children,
	buttonText = 'Open modal',
	buttonVariant = 'default',
	icon,
}: ModalProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{icon ? (
					<button className="cursor-pointer w-max hover:text-red-500">
						{icon}
					</button>
				) : (
					<Button variant={buttonVariant}>{buttonText}</Button>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{desctiption}</DialogDescription>
				</DialogHeader>
				<div>{children}</div>
			</DialogContent>
		</Dialog>
	);
};
