"use client";

export interface IDeleteButton {
    id: string;
    callback: (id: string) => Promise<Error>;
}
export const DeleteButton = ({ id, callback }: IDeleteButton) => {
    const handleClick = async () => {
        await callback(id);
    };

    return (
        <button
            className="bg-red-500 hover:bg-red-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={() => handleClick()}
        >
            Delete
        </button>
    );
};
