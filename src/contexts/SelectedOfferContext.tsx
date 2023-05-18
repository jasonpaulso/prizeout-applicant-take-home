import React, { ComponentType } from 'react';
import { PrizeoutOffer } from '../slices/offers-slice';

export interface SelectedOfferContextValue {
    activeOffer: PrizeoutOffer | null;
    setActiveOffer: React.Dispatch<React.SetStateAction<PrizeoutOffer | null>>;
}

const SelectedOfferContext = React.createContext(null);

export const withSelectedOfferContext = <P extends Record<string, unknown>>(
    Component: ComponentType<P>,
): React.FC<P> => {
    const WithSelectedOfferContext: React.FC<P> = (props) => {
        const [activeOffer, setActiveOffer] = React.useState<PrizeoutOffer | null>(null);
        console.log('🚀 ~ file: SelectedOfferContext.tsx:18 ~ activeOffer:', activeOffer);

        const value = {
            activeOffer,
            setActiveOffer,
        };

        return (
            <SelectedOfferContext.Provider value={value}>
                <Component {...props} />
            </SelectedOfferContext.Provider>
        );
    };

    return WithSelectedOfferContext;
};

export default SelectedOfferContext;
