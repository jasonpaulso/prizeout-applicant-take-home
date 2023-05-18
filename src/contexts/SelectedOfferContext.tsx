import React from 'react';
import { PrizeoutOffer } from '../slices/offers-slice';

export interface SelectedOfferContextValue {
    activeOffer: PrizeoutOffer | null;
    setActiveOffer: React.Dispatch<React.SetStateAction<PrizeoutOffer | null>>;
}

const SelectedOfferContext = React.createContext(null);

export default SelectedOfferContext;
