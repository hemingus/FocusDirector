type ConfirmDialogProps = {
    open: boolean;
    title?: string;
    message: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDialog({
    open,
    title = 'Confirm',
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div className="confirm-backdrop" role="dialog" aria-modal="true">
            <div className="confirm-dialog">
                {title && <h3>{title}</h3>}
                <div className="confirm-message">{message}</div>

                <div className="confirm-actions">
                    <button onClick={onCancel}>{cancelLabel}</button>
                    <button onClick={onConfirm} autoFocus>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
