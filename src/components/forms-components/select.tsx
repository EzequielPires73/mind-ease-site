import React, { useState, useEffect } from 'react';
import { OptionSelectProps } from '../../hooks/useSelect';
import { FiChevronDown, FiX } from 'react-icons/fi';

interface Props {
    title?: string;
    value: OptionSelectProps;
    onChange: any;
    options?: OptionSelectProps[];
    onBlur?: (str: string) => void;
}

const Select = ({ onChange, title, value, onBlur, options }: Props) => {
    const inputRef = React.useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
        setIsOpen(true);
    };

    const handleOptionClick = (option: OptionSelectProps) => {
        if (option) {
            onChange(option);
            setInputValue(option.name);
            setIsOpen(false);
        } else {
            console.log(value);
            { value && alert(option); }
            { value?.name && setInputValue(value.name) }
            setIsOpen(false);
        }
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (highlightedIndex > 0) {
                setHighlightedIndex(highlightedIndex - 1);
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (highlightedIndex < options.length - 1) {
                setHighlightedIndex(highlightedIndex + 1);
            }
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (highlightedIndex !== -1) {
                setInputValue(options[highlightedIndex].name);
                onChange(options[highlightedIndex]);
                setIsOpen(false);
            }
        }
    };

    const handleOutsideClick = (event: any) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIsOpen(false);
            { value?.name ? setInputValue(value.name) : setInputValue('') }
        }
    };

    useEffect(() => {
        if (value?.name) {
            setInputValue(value.name);
        } else {
            setInputValue('');
        }
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [value]);

    return (
        <div className="relative flex flex-col w-full flex-1">
            {title && <label className='text-sm font-medium mb-1 text-zinc-800'>{title}</label>}
            <div className="relative flex flex-col w-full" ref={inputRef}>
                <span
                    className={`flex items-center cursor-pointer w-full px-4 py-2 rounded border bg-white focus:outline-none focus:border-primary-500 ${isOpen && 'border-primary-600'}`}
                    onClick={() => setIsOpen(true)}
                >
                    {value?.name ?
                        <span
                            className="w-full focus:outline-none text-sm h-8 flex items-center"
                        >
                            {value?.name}
                        </span> :
                        <span className="w-full focus:outline-none h-8 flex items-center text-gray-400 text-sm font-normal">Escolha um valor</span>
                    }
                    {value?.name && <button className='mr-2' onClick={() => {
                        onChange(null)
                        setInputValue('');
                    }}><FiX /></button>}
                    <button onClick={() => setIsOpen(!isOpen)}><FiChevronDown /></button>
                </span>
                {isOpen && (
                    <div className="absolute top-[44px] z-[9999] w-full mt-2 bg-white rounded border max-h-72 overflow-auto">
                        <ul className="py-1">
                            {options.filter((option) =>
                                option.name.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
                            ).length === 0 &&
                                <span className='flex w-full text-sm px-3 py-2 text-red-700 bg-red-100'>Nenhuma opção pra mostrar</span>
                            }
                            {options
                                .map((option, index) => (
                                    <li
                                        key={index}
                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${value?.id === option.id && 'bg-purple-100 text-purple-900 font-medium'} ${highlightedIndex === index && 'bg-gray-100'}`}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {option.name}
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Select;