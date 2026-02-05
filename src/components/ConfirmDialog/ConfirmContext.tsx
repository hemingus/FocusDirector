"use client"

import { createContext, useContext } from 'react';
import { useConfirm } from './useConfirm';

type ConfirmContextValue = ReturnType<typeof useConfirm>;

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
    const confirmApi = useConfirm();

    return (
        <ConfirmContext.Provider value={confirmApi}>
            {children}
            {confirmApi.dialog}
        </ConfirmContext.Provider>
    );
}

export function useGlobalConfirm() {
    const ctx = useContext(ConfirmContext);
    if (!ctx) {
        throw new Error('useGlobalConfirm must be used within ConfirmProvider');
    }
    return ctx.confirm;
}