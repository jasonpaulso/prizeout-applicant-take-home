import React, { ComponentType } from 'react';
import { PrizeoutOfferValueOptions } from '../slices/offers-slice';

export interface SelectedOfferValueContextValue {
    activeOfferValue: PrizeoutOfferValueOptions | null;
    setActiveOfferValue: React.Dispatch<React.SetStateAction<PrizeoutOfferValueOptions | null>>;
}

const SelectedOfferValueContext = React.createContext(null);

export const withSelectedOfferValueContext = <P extends Record<string, unknown>>(
    Component: ComponentType<P>,
): React.FC<P> => {
    const WithSelectedOfferValueContext: React.FC<P> = (props) => {
        const [activeOfferValue, setActiveOfferValue] = React.useState<PrizeoutOfferValueOptions | null>(null);

        const value = {
            activeOfferValue,
            setActiveOfferValue,
        };

        return (
            <SelectedOfferValueContext.Provider value={value}>
                <Component {...props} />
            </SelectedOfferValueContext.Provider>
        );
    };

    return WithSelectedOfferValueContext;
};

export default SelectedOfferValueContext;
