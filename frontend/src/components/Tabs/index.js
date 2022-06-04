import React from "react";
import { ActiveLink,  LinkContainer} from './style';

const Tabs = ({ tab, common, tapItems }) => {

    const activeTab= tab? tab:common;
    return (
        <div css={LinkContainer}>
            {
                tapItems.map((t) => <ActiveLink to={`?tab=${t.tab}`} isactive={activeTab === `${t.tab}`} >{t.name}</ActiveLink>)
            }
        </div>
    );
}

export default Tabs;