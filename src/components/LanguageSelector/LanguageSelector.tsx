import React, {useContext, useEffect, useState} from "react";
import './LanguageSelector.scss';
import {languages} from "../../strings";
import {StringsContext} from "../App/App";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";


interface ILanguageSelectorProps {
    onLanguageChange: (language: string) => void;
}

const LanguageSelector = (props: ILanguageSelectorProps) => {

    const strings = useContext(StringsContext);

    const [showOptions, setShowOptions] = useState(false);

    const parentClass = 'language-selector'

    useEffect(() => {
        const handleMouseDown = (event: any) => {
            const isInLanguageSelector = event.path.some((item: { classList: DOMTokenList; }) => {
                return item.classList?.contains(parentClass)
            });
            if (!isInLanguageSelector) {
                setShowOptions(false);
            }
        }

        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, [])


    const handleLanguageChange = (language: string) => {
        props.onLanguageChange(language);
        setShowOptions(false);
    }

    return (
        <div className={parentClass}
             onMouseLeave={() => setShowOptions(false)}>
            <div className="selected"
                 onClick={() => setShowOptions(true)}>
                <FontAwesomeIcon className='chevron' icon={faChevronDown}/>
                {strings.short_form}
            </div>
            {showOptions &&
                <div className='option-container'>
                    {Object.keys(languages)
                        .filter(language => strings.short_form !== language)
                        .map(language => {
                            return (
                                <div className='option' key={language} onClick={() => handleLanguageChange(language)}>
                                    {language}
                                </div>
                            )
                        })}
                </div>
            }
        </div>
    );
};

export default LanguageSelector;