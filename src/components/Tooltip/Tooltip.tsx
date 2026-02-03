import { ReactNode } from 'react';
import './Tooltip.scss';

type TooltipProps = {
    content: ReactNode;
    color?: string;
    children: ReactNode;
};

export function Tooltip({
    content,
    color = 'var(--color-tooltip-default)',
    children,
}: TooltipProps) {
    return (
        <span
            className="tooltip-wrapper"
            style={{ '--tooltip-bg': color } as React.CSSProperties}
        >
            {children}
            <span className="tooltip">{content}</span>
        </span>
    );
}
