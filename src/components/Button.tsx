type SearchType = {
    text: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    color?: string
}

export default function Button({ text, onClick, color = 'bg-gray-200' }: SearchType) {
    return (
        <div className='flex gap-[16px] w-full md:max-w-[275px]'>
            <button
                onClick={onClick}
                className={'px-[16px] py-[8px] rounded-md w-full ' + color}
            >
                {text}
            </button>
        </div>
    );
}
