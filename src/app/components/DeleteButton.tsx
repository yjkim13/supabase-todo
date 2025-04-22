"use client";

type Props = {
  id: string;
  onDeleted?: () => void;
};

export default function DeleteButton({ id, onDeleted }: Props) {
  const handleDelete = async () => {
    await fetch("/api/todo/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    onDeleted?.(); // 삭제 후 fetchTodos() 트리거
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        marginLeft: "0.5rem",
        backgroundColor: "#e74c3c",
        color: "white",
        border: "none",
        borderRadius: "4px",
        padding: "0.25rem 0.5rem",
        cursor: "pointer",
      }}
    >
      삭제
    </button>
  );
}
