declare module 'react-tilt-button' {
    import { ReactNode } from 'react';

    export interface TiltButtonProps {
        children?: ReactNode;
        onClick?: () => void;
        disabled?: boolean;
        variant?: 'solid' | 'outline' | 'arcade' | 'carbon' | 'warning';
        width?: number;
        height?: number;
        elevation?: number;
        pressInset?: number;
        tilt?: number;
        radius?: number;
        motion?: number;
        surfaceColor?: string;
        sideColor?: string;
        textColor?: string;
        borderColor?: string;
        borderWidth?: number;
    }

    export function TiltButton(props: TiltButtonProps): JSX.Element;
}
