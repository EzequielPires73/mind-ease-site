import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Props {
    id?: string;
    title: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: any;
    onBlur?: any;
    error?: string;
}

export function InputText({ title, disabled, error, id, onBlur, onChange, placeholder, type, value }: Props) {
    const [currentType, setCurrentType] = useState(type ?? 'text');
    return (
        <div className="flex flex-col gap-1 flex-1">
            <label className="text-sm font-medium text-zinc-800">{title}</label>
            <div className="relative flex items-center">
                <input
                    className={`
                        h-12 border text-sm text-zinc-900 rounded-md outline-none p-3 flex-1 text-ellipsis
                        placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal
                        ${error ? 'border-red-500' : 'focus:border-primary-600'} 
                        ${type == 'password' && 'pr-8'}
                    `}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    type={currentType}
                    placeholder={placeholder ?? ''}
                />
                {currentType == 'password' && <button className="absolute right-3" onClick={() => setCurrentType('text')}><FiEye /></button>}
                {type == 'password' && currentType != 'password' && <button className="absolute right-3" onClick={() => setCurrentType('password')}><FiEyeOff /></button>}
            </div>
            {error && <span className="text-sm font- text-red-500">{error}</span>}
        </div>
    )
}