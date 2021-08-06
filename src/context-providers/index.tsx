import React, { Fragment, ReactNode } from 'react';
import Toast from './Toast';
import Confirmation from './Confirmation';

type ContextProviderProps = {
    children: ReactNode;
}

const ContextProviders: React.FC<ContextProviderProps> = (props) => {
    const {children} = props;
    return (
        <Fragment>
            <Toast>
                <Confirmation>
                    {children}
                </Confirmation>
            </Toast>
        </Fragment> 
    );
}

export default ContextProviders;