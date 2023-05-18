import Classnames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useTransition from 'react-transition-state';
import { useAppSelector } from '../../hooks';
import { selectIsCollapsedCheckoutPanelOpen, toggleIsCollapsedCheckoutPanelOpen } from '../../slices/checkout-slice';
import { selectIsCheckoutPanelCollapsed } from '../../slices/common-slice';
import { AppDispatch } from '../../store';
import { Overlay } from '../common';
import CheckoutConfirmationPanelView from './checkout-confirmation/checkout-confirmation';
import CheckoutPanelView from './checkout/checkout';

import './checkout-panel.less';

export const CheckoutPanel: React.FC = (): React.ReactElement => {
    const isCollapsedCheckoutPanelOpen = useAppSelector(selectIsCollapsedCheckoutPanelOpen);
    const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);
    const dispatch = useDispatch<AppDispatch>();
    const [transition, toggleTransition] = useTransition();

    const classes: string = Classnames(
        `checkout-panel z-index-checkout-panel`,
        { 'checkout-panel--side': !isCheckoutPanelCollapsedView },
        { 'checkout-panel--collapsed': isCheckoutPanelCollapsedView },
        {
            [`checkout-panel--${transition.status}`]: isCheckoutPanelCollapsedView && transition.status,
        },
    );

    const closeCheckoutPanel = () => {
        if (isCollapsedCheckoutPanelOpen) {
            dispatch(toggleIsCollapsedCheckoutPanelOpen());
        }
    };

    useEffect(() => {
        toggleTransition(isCollapsedCheckoutPanelOpen);
    }, [isCollapsedCheckoutPanelOpen]);

    return (
        <>
            {isCheckoutPanelCollapsedView && isCollapsedCheckoutPanelOpen && (
                <Overlay onClick={() => closeCheckoutPanel()} zIndexType="overlay" />
            )}

            <section className={classes}>
                <CheckoutPanelView />
                <CheckoutConfirmationPanelView />
            </section>
        </>
    );
};
