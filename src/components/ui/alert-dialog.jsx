import * as React from "react"

export function AlertDialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {React.Children.map(children, child => React.cloneElement(child, { onOpenChange }))}
      </div>
    </div>
  )
}
export function AlertDialogContent({ children }) { return <div>{children}</div> }
export function AlertDialogHeader({ children }) { return <div className="mb-4">{children}</div> }
export function AlertDialogTitle({ children }) { return <h2 className="text-lg font-bold text-slate-900">{children}</h2> }
export function AlertDialogDescription({ children }) { return <p className="text-sm text-gray-500 mt-2">{children}</p> }
export function AlertDialogFooter({ children }) { return <div className="flex justify-end gap-2 mt-6">{children}</div> }
export function AlertDialogCancel({ children, onOpenChange }) {
  return <button onClick={() => onOpenChange(false)} className="px-4 py-2 border rounded-md hover:bg-gray-100 font-medium text-sm">Cancel</button>
}
export function AlertDialogAction({ children, onClick }) {
  return <button onClick={onClick} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium text-sm">{children}</button>
}