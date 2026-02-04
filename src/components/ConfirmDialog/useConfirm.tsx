import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';

type ConfirmOptions = {
    title?: string;
    message: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
};

export function useConfirm() {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions | null>(null);
    const [action, setAction] = useState<null | (() => void | Promise<void>)>(null);

    const confirm = (opts: ConfirmOptions, onConfirm: () => void | Promise<void>) => {
        setOptions(opts);
        setAction(() => onConfirm);
        setOpen(true);
    };

    const dialog = (
        <ConfirmDialog
            open={open}
            title={options?.title}
            message={options?.message ?? ''}
            confirmLabel={options?.confirmLabel}
            cancelLabel={options?.cancelLabel}
            onCancel={() => setOpen(false)}
            onConfirm={async () => {
                if (action) await action();
                setOpen(false);
            }}
        />
    );

    return { confirm, dialog };
}



