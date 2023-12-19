'use client'
import { useRouter } from "next/navigation";
import { ButtonIcon } from "../buttons/button-icon";
import { FiDelete, FiEdit, FiEye, FiTrash } from "react-icons/fi";
import { useState } from "react";
import { ModalAlert } from "../modals/modal-alert";

export interface TableColumn {
    id: number | string,
    name: string,
    size: number,
    identifier: string,
    action?: () => void;
}

export interface TableActions {
    onDelete?: (id) => void | Promise<void>,
    onEdit?: (id) => void | Promise<void>,
    onView?: (id) => void | Promise<void>,
}

interface Props {
    columns: Array<TableColumn>,
    data: Array<any>,
    forwardLink?: (id) => string,
    actions?: TableActions
}

export function TableDefault({ columns, data, forwardLink, actions }: Props) {
    const [showAlert, setShowAlert] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const router = useRouter();
    return (
        <div className="flex flex-col gap-2 w-full">
            <header className="h-12 w-full bg-gray-700 rounded-md flex gap-4 px-4 items-center text-white">
                {
                    columns.map(column => (
                        <div key={column.id} className={`flex text-base font-medium`} style={{ width: column.size }}>{column.name}</div>
                    ))
                }
                {actions && <div key={'actions'} className={`flex text-base font-medium`} style={{ width: 100 }}>Actions</div>}
            </header>
            <div className="border border-gray-300 w-full rounded-md overflow-hidden">
                {data.length == 0 && <span className={`h-12 w-full flex gap-4 px-4 items-center hover:bg-gray-100 transition-all cursor-pointer text-gray-800`}>0 resultados</span>}
                {data.map((item, index) => (
                    <div onClick={() => { forwardLink && router.push(forwardLink(item?.id)) }} key={item?.id ?? index} className={`h-12 w-full flex gap-4 px-4 items-center ${forwardLink && 'hover:bg-gray-100 cursor-pointer'} transition-all text-gray-800 ${index < data.length - 1 && 'border-b'}`}>
                        {
                            columns.map(column => (
                                <div key={column.id} className={`text-sm font-medium line-clamp-1`} style={{ width: column.size }}>
                                    {item[column.identifier]}
                                </div>
                            ))
                        }
                        {actions &&
                            <div key={'actions'} className={`flex gap-1`} style={{ width: 100 }}>
                                {
                                    actions.onDelete &&
                                    <>
                                        <ButtonIcon Icon={FiTrash} onClick={() => {
                                            setShowAlert(true);
                                            setItemSelected(item);
                                        }} />
                                    </>
                                }
                                {
                                    actions.onEdit && <ButtonIcon Icon={FiEdit} onClick={() => actions.onEdit(item.id)} />
                                }
                                {
                                    actions.onView && <ButtonIcon Icon={FiEye} onClick={() => actions.onView(item.id)} />
                                }
                            </div>
                        }
                    </div>
                ))}
            </div>
            {showAlert && itemSelected &&
                <ModalAlert
                    show={showAlert}
                    onSubmit={() => actions.onDelete(itemSelected.id)}
                    title={`Remover ${itemSelected.name ?? itemSelected.id}`}
                    subtitle={`Deseja mesmo remover o item ${itemSelected.name ?? itemSelected.id}?`}
                    close={() => setShowAlert(false)}
                />
            }
        </div>
    )
}